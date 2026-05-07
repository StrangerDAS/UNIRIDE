import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiMapPin, FiClock, FiShield, FiArrowLeft, FiCalendar } from 'react-icons/fi'
import { RiMotorbikeLine, RiEBikeLine } from 'react-icons/ri'
import PageWrapper from '../components/PageWrapper'
import { useVehicle } from '../hooks/useVehicles'
import { MOCK_VEHICLES } from '../utils/mockData'
import useAuthStore from '../store/authStore'

export default function VehicleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, isKycComplete } = useAuthStore()
  const { vehicle: fetched, loading } = useVehicle(id)
  const [activeImg, setActiveImg] = useState(0)

  // Fallback to mock data if API not available
  const vehicle = fetched || MOCK_VEHICLES.find((v) => v._id === id) || MOCK_VEHICLES[0]

  const handleBook = () => {
    if (!isAuthenticated()) {
      navigate('/auth/login', { state: { from: `/book/${id}` } })
    } else if (!isKycComplete()) {
      navigate('/complete-profile')
    } else {
      navigate(`/book/${id}`)
    }
  }

  if (loading) {
    return (
      <PageWrapper>
        <div className="container-main py-10">
          <div className="skeleton h-8 w-40 rounded-xl mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="skeleton h-80 rounded-2xl" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton h-5 rounded-lg" style={{ width: `${70 - i * 8}%` }} />
              ))}
            </div>
          </div>
        </div>
      </PageWrapper>
    )
  }

  if (!vehicle) return null

  const Icon = vehicle.type === 'bike' ? RiMotorbikeLine : RiEBikeLine

  return (
    <PageWrapper>
      <div className="container-main py-10">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition"
        >
          <FiArrowLeft /> Back to Explore
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Images */}
          <div className="lg:col-span-3 space-y-3">
            {/* Main image */}
            <div className="card h-72 md:h-96 flex items-center justify-center bg-surface-2 overflow-hidden">
              {vehicle.images?.[activeImg] ? (
                <img
                  src={vehicle.images[activeImg]}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon className="text-white/10 text-9xl" />
              )}
            </div>
            {/* Thumbnails */}
            {vehicle.images?.length > 1 && (
              <div className="flex gap-2">
                {vehicle.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      activeImg === i ? 'border-brand' : 'border-white/10'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            {vehicle.description && (
              <div className="card p-6 mt-4">
                <h2 className="font-semibold mb-3">About this vehicle</h2>
                <p className="text-white/50 text-sm leading-relaxed">{vehicle.description}</p>
              </div>
            )}

            {/* Specs */}
            {vehicle.specs && (
              <div className="card p-6">
                <h2 className="font-semibold mb-4">Specifications</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(vehicle.specs).map(([k, v]) => (
                    <div key={k} className="text-center bg-surface-2 rounded-xl p-3">
                      <div className="text-white/30 text-xs capitalize mb-1">{k}</div>
                      <div className="font-semibold text-sm">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Details + Book */}
          <div className="lg:col-span-2 space-y-5">
            {/* Main info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-brand/10 text-brand capitalize text-xs">
                  <Icon className="mr-1" />{vehicle.type}
                </span>
                {vehicle.status === 'approved' ? (
                  <span className="badge bg-green-500/10 text-green-400 border border-green-500/20 text-xs">
                    Available
                  </span>
                ) : (
                  <span className="badge bg-red-500/10 text-red-400 text-xs">Unavailable</span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">{vehicle.name}</h1>
              <div className="flex items-center gap-4 mt-3 text-sm text-white/50">
                <span className="flex items-center gap-1">
                  <FiStar className="text-brand fill-brand" />
                  {vehicle.rating} ({vehicle.totalReviews} reviews)
                </span>
                {vehicle.location && (
                  <span className="flex items-center gap-1">
                    <FiMapPin size={13} /> {vehicle.location}
                  </span>
                )}
              </div>
            </div>

            {/* Pricing card */}
            <div className="card p-5">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-gradient">₹{vehicle.pricePerHour}</span>
                <span className="text-white/40 text-sm">/hour</span>
              </div>
              {vehicle.pricePerDay && (
                <div className="text-white/40 text-sm flex items-center gap-1">
                  <FiClock size={13} />
                  ₹{vehicle.pricePerDay} / full day (24 hrs)
                </div>
              )}
              <div className="divider my-4" />
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2"><FiShield size={13} className="text-green-400" /> Verified vehicle</li>
                <li className="flex items-center gap-2"><FiCalendar size={13} className="text-brand" /> Instant booking</li>
                <li className="flex items-center gap-2"><FiClock size={13} className="text-blue-400" /> Flexible hours</li>
              </ul>
            </div>

            {/* Owner */}
            {vehicle.owner && (
              <div className="card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-3 flex items-center justify-center text-xl font-bold text-brand shrink-0">
                  {vehicle.owner.name?.[0] || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{vehicle.owner.name}</div>
                  <div className="text-white/40 text-xs mt-0.5">
                    ⭐ {vehicle.owner.rating} · {vehicle.owner.totalTrips} trips
                  </div>
                </div>
                <span className="badge bg-green-500/10 text-green-400 text-xs shrink-0">Verified</span>
              </div>
            )}

            {/* Book button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBook}
              disabled={vehicle.status !== 'approved'}
              className="btn-primary w-full text-center text-base py-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {vehicle.status === 'approved' ? 'Book This Vehicle' : 'Currently Unavailable'}
            </motion.button>
            <p className="text-center text-white/30 text-xs">No payment required to confirm</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
