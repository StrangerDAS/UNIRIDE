import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiClock, FiMapPin, FiStar } from 'react-icons/fi'
import { RiMotorbikeLine, RiEBikeLine } from 'react-icons/ri'

/**
 * Vehicle card shown in explore grid and related listings.
 */
export default function VehicleCard({ vehicle, index = 0 }) {
  const {
    _id,
    name,
    type,
    pricePerDay,
    pricePerHour,
    images,
    location,
    rating = 4.5,
    totalReviews = 12,
    status,
  } = vehicle

  const isAvailable = status === 'approved'
  const Icon = type === 'bike' ? RiMotorbikeLine : RiEBikeLine

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/vehicles/${_id}`} className="block group">
        <div className="card card-hover">
          {/* Image */}
          <div className="relative h-48 bg-surface-2 overflow-hidden">
            {images?.[0] ? (
              <img
                src={images[0]}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon className="text-white/10 text-8xl" />
              </div>
            )}
            {/* Type badge */}
            <span className="absolute top-3 left-3 badge bg-black/60 text-white/80 backdrop-blur-sm capitalize">
              <Icon className="mr-1 text-brand" />
              {type}
            </span>
            {/* Status badge */}
            {!isAvailable && (
              <span className="absolute top-3 right-3 badge bg-red-500/20 text-red-400 border border-red-500/20">
                Unavailable
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-base leading-tight line-clamp-1">{name}</h3>
              <div className="flex items-center gap-1 shrink-0">
                <FiStar className="text-brand fill-brand" size={13} />
                <span className="text-sm font-medium">{rating}</span>
                <span className="text-xs text-white/30">({totalReviews})</span>
              </div>
            </div>

            {location && (
              <div className="flex items-center gap-1 mt-1.5 text-white/40 text-xs">
                <FiMapPin size={11} />
                <span>{location}</span>
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div>
                {pricePerHour && (
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-brand">₹{pricePerHour}</span>
                    <span className="text-xs text-white/40">/hr</span>
                  </div>
                )}
                {pricePerDay && (
                  <div className="flex items-center gap-1 text-xs text-white/40 mt-0.5">
                    <FiClock size={10} />
                    <span>₹{pricePerDay}/day</span>
                  </div>
                )}
              </div>
              <span
                className={`badge text-xs ${
                  isAvailable
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-surface-3 text-white/30'
                }`}
              >
                {isAvailable ? 'Available' : 'Booked'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
