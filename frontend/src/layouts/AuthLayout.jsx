import { Outlet, Link } from 'react-router-dom'
import { RiMotorbikeLine } from 'react-icons/ri'

/**
 * AuthLayout — minimal layout for login/signup pages.
 * No navbar/footer, just logo + centered card.
 */
export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12">
      <Link to="/" className="flex items-center gap-2 mb-10">
        <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/30">
          <RiMotorbikeLine className="text-white text-xl" />
        </div>
        <span className="text-2xl font-bold">
          uniride<span className="text-brand">.</span>
        </span>
      </Link>
      <Outlet />
    </div>
  )
}
