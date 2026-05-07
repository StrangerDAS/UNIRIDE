import { useState, useEffect, useCallback } from 'react'
import { vehicleAPI, itemAPI } from '../api/endpoints'
import useVehicleStore from '../store/vehicleStore'

/**
 * useVehicles — fetches unified items (vehicles + accessories) and exposes filter state.
 */
export function useVehicles() {
  const store = useVehicleStore()
  const { fetchVehicles, getFiltered, filters, setFilter, clearFilters, loading } = store

  useEffect(() => {
    fetchVehicles(() =>
      itemAPI.getAll().then((res) => res.data?.items || res.data)
    )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    vehicles: getFiltered(),
    loading,
    filters,
    setFilter,
    clearFilters,
  }
}

/**
 * useVehicle — fetches a single vehicle by ID.
 */
export function useVehicle(id) {
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Try to find from store first (avoid redundant fetch)
  const cached = useVehicleStore((s) => s.vehicles.find((v) => v._id === id))

  const fetch = useCallback(async () => {
    if (cached) { setVehicle(cached); setLoading(false); return }
    setLoading(true)
    try {
      const { data } = await vehicleAPI.getById(id)
      setVehicle(data)
    } catch {
      // fallback handled in component via mock
      setError('Could not load vehicle')
    } finally {
      setLoading(false)
    }
  }, [id, cached])

  useEffect(() => { fetch() }, [fetch])

  return { vehicle, loading, error }
}
