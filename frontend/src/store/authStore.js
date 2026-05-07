import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Auth store — persists token & user to localStorage
 */
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setAuth: (user, token) => set({ user, token }),

      /** Update user data in store without changing token (e.g. after KYC step) */
      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),

      logout: () => set({ user: null, token: null }),

      isAuthenticated: () => !!get().token,

      /** True when both phone and Aadhaar are verified */
      isKycComplete: () => {
        const user = get().user
        if (!user) return false
        if (user.role === 'admin') return true
        return !!user.phoneVerified && !!user.aadhaarVerified
      },

      isOwner: () => !!get().user?.isOwner,
      isRider: () => !!get().user?.isRider,

      hasRole: (roles) => {
        const user = get().user
        if (!user) return false
        return roles.includes(user.role)
      },
    }),
    {
      name: 'uniride-auth',
    }
  )
)

export default useAuthStore
