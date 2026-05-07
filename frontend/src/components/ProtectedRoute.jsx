import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../store/authStore'

/**
 * Wraps routes that require authentication and/or specific roles.
 * @param {string[]} roles - allowed roles (e.g. ['owner', 'admin'])
 */
export default function ProtectedRoute({ roles = [] }) {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />
  }

  if (roles.length > 0) {
    const hasRole = roles.includes(user?.role)
    const hasOwnerAccess = roles.includes('owner') && user?.isOwner
    const hasUserAccess = roles.includes('user') && user?.isRider
    if (!hasRole && !hasOwnerAccess && !hasUserAccess) {
      return <Navigate to="/" replace />
    }
  }

  return <Outlet />
}
