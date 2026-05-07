import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/**
 * MainLayout — wraps all public pages with Navbar + Footer.
 * Auth pages (login/signup) use AuthLayout instead.
 */
export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
