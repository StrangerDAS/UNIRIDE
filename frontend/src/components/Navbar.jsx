import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { RiMotorbikeLine } from 'react-icons/ri'
import useAuthStore from '../store/authStore'

const navLinks = [
  { label: 'Explore', to: '/explore' },
  { label: 'How it works', to: '/how-it-works' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout, isAuthenticated, isKycComplete } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const getDashboardLink = () => {
    if (!user) return null
    if (user.role === 'admin') return { to: '/admin', label: 'Admin Panel' }
    if (user.isOwner) return { to: '/dashboard', label: 'Dashboard' }
    return { to: '/profile', label: 'Profile' }
  }

  const dashLink = getDashboardLink()

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/30 group-hover:shadow-brand/50 transition-shadow">
              <RiMotorbikeLine className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              urent<span className="text-brand">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `btn-ghost text-sm ${isActive ? 'text-white' : 'text-white/60'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated() ? (
              <>
                {dashLink && (
                  <Link to={dashLink.to} className="btn-ghost text-sm text-white/70">
                    {dashLink.label}
                  </Link>
                )}
                {isAuthenticated() && !isKycComplete() && (
                  <Link
                    to="/verify"
                    className="text-xs bg-amber-500/15 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-full font-semibold hover:bg-amber-500/25 transition flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                    Verify
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="btn-ghost text-sm text-white/70">
                  Log in
                </Link>
                <Link to="/auth/signup" className="btn-primary text-sm px-5 py-2.5">
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="container-main py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="btn-ghost text-sm w-full text-left"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="divider my-2" />
              {isAuthenticated() ? (
                <>
                  {dashLink && (
                    <Link
                      to={dashLink.to}
                      className="btn-ghost text-sm text-white/70 w-full text-left"
                      onClick={() => setMenuOpen(false)}
                    >
                      {dashLink.label}
                    </Link>
                  )}
                  <button onClick={handleLogout} className="btn-secondary text-sm mt-1">
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="btn-ghost text-sm text-white/70"
                    onClick={() => setMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="btn-primary text-sm mt-1 text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
