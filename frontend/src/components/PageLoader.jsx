import { RiMotorbikeLine } from 'react-icons/ri'

/**
 * Full-screen loading spinner shown during lazy-load suspense.
 */
export default function PageLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/5" />
          <div className="absolute inset-0 rounded-full border-2 border-t-brand animate-spin" />
          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <RiMotorbikeLine className="text-brand text-2xl" />
          </div>
        </div>
        <p className="text-white/30 text-sm">Loading...</p>
      </div>
    </div>
  )
}
