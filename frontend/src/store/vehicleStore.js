import { create } from 'zustand'
import { MOCK_VEHICLES } from '../utils/mockData'

/**
 * Vehicle store — holds vehicle list + active filters.
 * Filter logic is computed in the selector, not stored.
 */
const useVehicleStore = create((set, get) => ({
  vehicles: [],
  loading: false,
  error: null,

  // Active filter state
  filters: {
    type: '',        // 'bike' | 'scooty' | ''
    category: '',    // 'vehicle' | 'accessory' | ''
    minPrice: '',
    maxPrice: '',
    search: '',
  },

  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),

  clearFilters: () =>
    set({ filters: { type: '', category: '', minPrice: '', maxPrice: '', search: '' } }),

  setVehicles: (vehicles) => set({ vehicles }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  /** Load vehicles from API (falls back to mock) */
  fetchVehicles: async (apiCall) => {
    set({ loading: true, error: null })
    try {
      const data = await apiCall()
      set({ vehicles: data, loading: false })
    } catch {
      set({ vehicles: MOCK_VEHICLES, loading: false })
    }
  },

  /** Computed: filtered vehicles based on current filters */
  getFiltered: () => {
    const { vehicles, filters } = get()
    return vehicles.filter((v) => {
      if (filters.category && v.category !== filters.category) return false
      if (filters.type && v.type !== filters.type) return false
      const price = v.pricePerHour || v.pricePerDay || 0
      if (filters.minPrice && price < Number(filters.minPrice)) return false
      if (filters.maxPrice && price > Number(filters.maxPrice)) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (
          !v.name.toLowerCase().includes(q) &&
          !(v.location || '').toLowerCase().includes(q)
        )
          return false
      }
      return true
    })
  },
}))

export default useVehicleStore
