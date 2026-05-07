import { motion } from 'framer-motion'

/**
 * Animated wrapper for page-level route transitions.
 * Does NOT add top padding — MainLayout handles that via pt-16/pt-20.
 */
export default function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
