import { motion } from 'framer-motion'
import { FiMapPin, FiStar, FiShoppingBag } from 'react-icons/fi'

export default function AccessoryCard({ item, index = 0, onAdd }) {
  const { _id, name, pricePerDay, location, rating = 4.5, totalReviews = 0, description } = item

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="card card-hover">
        <div className="relative h-36 bg-surface-2 overflow-hidden flex items-center justify-center">
          <FiShoppingBag className="text-white/10 text-7xl" />
          <span className="absolute top-3 left-3 badge bg-purple-500/20 text-purple-300 border border-purple-500/20 backdrop-blur-sm text-xs">
            <FiShoppingBag className="mr-1" size={11} /> Accessory
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-base leading-tight line-clamp-1">{name}</h3>
            <div className="flex items-center gap-1 shrink-0">
              <FiStar className="text-brand fill-brand" size={13} />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-white/30">({totalReviews})</span>
            </div>
          </div>
          {description && (
            <p className="text-white/40 text-xs mt-1.5 line-clamp-2">{description}</p>
          )}
          {location && (
            <div className="flex items-center gap-1 mt-1.5 text-white/40 text-xs">
              <FiMapPin size={11} /><span>{location}</span>
            </div>
          )}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-brand">₹{pricePerDay}</span>
              <span className="text-xs text-white/40">/day</span>
            </div>
            {onAdd && (
              <button
                onClick={() => onAdd(item)}
                className="badge bg-brand/10 text-brand border border-brand/20 hover:bg-brand/20 transition cursor-pointer text-xs px-3 py-1.5"
              >
                + Add
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
