import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

// Route guards
import ProtectedRoute from './components/ProtectedRoute'

// Loading fallback
import PageLoader from './components/PageLoader'

import { auth, db } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import useAuthStore from './store/authStore'

// ── Lazy-loaded pages ──────────────────────────────────────
const Home          = lazy(() => import('./pages/Home'))
const Overview      = lazy(() => import('./pages/Overview'))
const Explore       = lazy(() => import('./pages/Explore'))
const UserHub       = lazy(() => import('./pages/UserHub'))
const OwnerSetup    = lazy(() => import('./pages/OwnerSetup'))
const HowItWorks    = lazy(() => import('./pages/HowItWorks'))
const Verify        = lazy(() => import('./pages/Verify'))
const VehicleDetail = lazy(() => import('./pages/VehicleDetail'))
const BookingFlow   = lazy(() => import('./pages/BookingFlow'))
const OwnerDashboard= lazy(() => import('./pages/OwnerDashboard'))
const AdminPanel    = lazy(() => import('./pages/AdminPanel'))
const Profile       = lazy(() => import('./pages/Profile'))
const Login         = lazy(() => import('./pages/Login'))
const Signup        = lazy(() => import('./pages/Signup'))
const NotFound      = lazy(() => import('./pages/NotFound'))

export default function App() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const userEmail = user.email || ''
        const userName = user.displayName || (userEmail ? userEmail.split('@')[0] : 'User')
        
        // Synchronize with Firestore in the background (non-blocking)
        const syncFirestore = async () => {
          try {
            const userRef = doc(db, 'users', user.uid)
            const userSnap = await getDoc(userRef)
            
            if (!userSnap.exists()) {
              await setDoc(userRef, {
                uid: user.uid,
                displayName: userName,
                email: userEmail,
                phoneNumber: user.phoneNumber || '',
                photoURL: user.photoURL || '',
                roles: ['user'], // Default role
                createdAt: serverTimestamp()
              })
            }
          } catch (error) {
            console.error("Error saving user to Firestore:", error)
          }
        }
        
        syncFirestore();

        const userObj = {
          _id: user.uid,
          email: userEmail,
          name: userName,
          phone: user.phoneNumber || '',
          role: 'user',
          isRider: true,
          isOwner: true, 
          phoneVerified: !!user.phoneNumber,
          photoURL: user.photoURL || null
        }
        
        // In firebase, get access token this way
        try {
          const token = await user.getIdToken()
          setAuth(userObj, token)
        } catch (e) {
          console.error("Token fetch failed", e)
        }
        
        if (location.pathname === '/' || location.pathname.startsWith('/auth')) {
          navigate('/hub')
        }
      } else {
        // User is signed out
        setAuth(null, null)
      }
    })

    return () => unsubscribe()
  }, [setAuth, navigate, location.pathname])

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes>

          {/* ── Landing — fullscreen 3D, no layout ──────── */}
          <Route path="/" element={<Overview />} />

          {/* ── Public — with Navbar/Footer ─────────────── */}
          <Route element={<MainLayout />}>
            <Route path="/home"          element={<Home />} />
            <Route path="/how-it-works"  element={<HowItWorks />} />
            {/* Authenticated users */}
            <Route element={<ProtectedRoute roles={['user', 'owner', 'admin']} />}>
              <Route path="/hub"               element={<UserHub />} />
              <Route path="/verify"            element={<Verify />} />
              <Route path="/owner/setup"       element={<OwnerSetup />} />
              <Route path="/explore"           element={<Explore />} />
              <Route path="/vehicles/:id"      element={<VehicleDetail />} />
              <Route path="/404"               element={<NotFound />} />
              <Route path="/profile"           element={<Profile />} />
              <Route path="/book/:id"          element={<BookingFlow />} />
            </Route>

            {/* Owner + Admin */}
            <Route element={<ProtectedRoute roles={['owner', 'admin']} />}>
              <Route path="/dashboard" element={<OwnerDashboard />} />
            </Route>

            {/* Admin only */}
            <Route element={<ProtectedRoute roles={['admin']} />}>
              <Route path="/admin"     element={<AdminPanel />} />
            </Route>
          </Route>

          {/* ── Auth — minimal layout ────────────────────── */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/login"  element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}
