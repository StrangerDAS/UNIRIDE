import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import PageWrapper from '../components/PageWrapper'

export default function NotFound() {
  return (
    <PageWrapper className="flex items-center justify-center min-h-screen">
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-9xl font-black text-gradient mb-6"
        >
          404
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl font-bold mb-3"
        >
          Page not found
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-white/40 mb-8"
        >
          Looks like you took a wrong turn. Let&apos;s get you back on the road.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <FiArrowLeft /> Back to Home
          </Link>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
