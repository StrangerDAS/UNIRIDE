import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSearch, FiCamera, FiShield, FiDollarSign, FiCheckCircle, FiNavigation } from 'react-icons/fi'

const modalContent = {
  explore: {
    title: 'Explore Vehicles',
    icon: FiSearch,
    description: 'Renting a ride has never been easier. Find the perfect vehicle for your needs around Dibrugarh.',
    points: [
      { text: 'Users can browse bikes, scooties, helmets, and accessories.', icon: FiSearch },
      { text: 'Compare prices to find the best deals.', icon: FiDollarSign },
      { text: 'Choose nearby rides for quick convenience.', icon: FiNavigation },
      { text: 'Book instantly and hit the road safely.', icon: FiCheckCircle },
    ]
  },
  list: {
    title: 'List Your Vehicle',
    icon: FiCamera,
    description: 'Turn your idle vehicle into a source of income. It is fast, secure, and fully controlled by you.',
    points: [
      { text: 'Owners can easily upload their vehicle details.', icon: FiCamera },
      { text: 'Add beautiful photos, set your pricing, and manage availability.', icon: FiDollarSign },
      { text: 'Earn money by securely renting it out to verified locals.', icon: FiCheckCircle },
      { text: 'Strict verification keeps the platform safe for everyone.', icon: FiShield },
    ]
  },
  howItWorks: {
    title: 'How It Works',
    icon: FiNavigation,
    description: 'A seamless process designed for both owners and renters.',
    points: [
      { text: '1. Owner lists vehicle securely on the platform.', icon: FiCamera },
      { text: '2. URENT verifies the listing to maintain quality.', icon: FiShield },
      { text: '3. User searches and books the vehicle for their dates.', icon: FiSearch },
      { text: '4. Secure online payment locks in the reservation.', icon: FiDollarSign },
      { text: '5. Pickup, inspect, and ride off safely.', icon: FiNavigation },
      { text: '6. Return vehicle safely at the end of the trip.', icon: FiCheckCircle },
    ]
  }
}

export default function InfoModal({ isOpen, onClose, type }) {
  if (!type || !modalContent[type]) return null;

  const content = modalContent[type];
  const MainIcon = content.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-md bg-[#161616] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] bg-brand/20 blur-[80px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="relative p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center border border-brand/20">
                  <MainIcon className="text-brand text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{content.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 relative">
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                {content.description}
              </p>

              <ul className="space-y-4">
                {content.points.map((point, index) => {
                  const PointIcon = point.icon;
                  return (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand/10 group-hover:border-brand/30 transition-colors">
                        <PointIcon className="text-white/40 text-xs group-hover:text-brand transition-colors" />
                      </div>
                      <span className="text-sm text-white/80 leading-relaxed group-hover:text-white transition-colors">
                        {point.text}
                      </span>
                    </motion.li>
                  )
                })}
              </ul>

              <button
                onClick={onClose}
                className="w-full mt-8 btn-primary py-3 rounded-xl font-semibold shadow-[0_0_20px_rgba(255,107,0,0.15)] hover:shadow-[0_0_25px_rgba(255,107,0,0.3)] transition-all"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
