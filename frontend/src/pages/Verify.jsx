import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiCheckCircle, FiUploadCloud, FiMapPin, FiCreditCard, FiLock, FiAlertCircle } from 'react-icons/fi'
import PageWrapper from '../components/PageWrapper'
import useAuthStore from '../store/authStore'

export default function Verify() {
  const { user } = useAuthStore()
  const [activeStep, setActiveStep] = useState(2) // Simulate step 2 is active

  const steps = [
    { num: 1, title: 'Profile Info', icon: FiUser, status: 'complete' },
    { num: 2, title: 'Identity', icon: FiCreditCard, status: 'current' },
    { num: 3, title: 'License', icon: FiCheckCircle, status: 'pending' },
    { num: 4, title: 'Address', icon: FiMapPin, status: 'pending' },
  ]

  return (
    <PageWrapper>
      <div className="pt-24 pb-24 max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center md:justify-start gap-3">
            <FiShield className="text-brand hidden md:block" />
            Verification Center
          </h1>
          <p className="text-white/50 text-lg">Complete these steps to unlock renting and listing features.</p>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Sidebar Steps */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-[#111] border border-white/5 rounded-3xl p-6 sticky top-28">
              <div className="space-y-6">
                {steps.map((step) => (
                  <div key={step.num} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                      step.status === 'complete' ? 'bg-brand/20 border-brand text-brand' :
                      step.status === 'current' ? 'bg-white border-white text-black' :
                      'bg-transparent border-white/20 text-white/40'
                    }`}>
                      {step.status === 'complete' ? <FiCheckCircle size={14} /> : <span className="text-sm font-bold">{step.num}</span>}
                    </div>
                    <div>
                      <h4 className={`font-semibold text-sm ${step.status === 'pending' ? 'text-white/40' : 'text-white'}`}>{step.title}</h4>
                      <p className="text-xs text-white/40 mt-1 capitalize">{step.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {/* STEP 2 CONTENT (Active Demo) */}
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Step 1 Recap */}
                <div className="card p-6 bg-gradient-to-r from-brand/5 to-transparent border-brand/20">
                  <div className="flex items-center gap-3 mb-4">
                    <FiUser className="text-brand" />
                    <h2 className="text-lg font-bold">1. Profile Information</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white/40 text-xs mb-1">Full Name</p>
                      <p className="font-medium">{user?.name || 'John Doe'}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">Phone</p>
                      <p className="font-medium">{user?.phone || '+91 9876543210'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-white/40 text-xs mb-1">Email</p>
                      <p className="font-medium flex items-center gap-2">
                        {user?.email || 'user@example.com'} 
                        <FiCheckCircle className="text-green-400" />
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 Active */}
                <div className="card p-6 md:p-8 border-white/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-[50px] rounded-full pointer-events-none" />
                  
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <FiCreditCard className="text-white text-xl" />
                    <h2 className="text-2xl font-bold">2. Identity Verification</h2>
                  </div>

                  <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 text-center relative z-10 mb-6">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiLock className="w-8 h-8 text-white/40" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Aadhaar Integration Coming Soon</h3>
                    <p className="text-white/50 text-sm max-w-sm mx-auto">
                      We are currently upgrading our identity verification systems to support digital Aadhaar KYC. This feature will be unlocked shortly.
                    </p>
                  </div>

                  <button disabled className="btn-primary w-full py-4 rounded-xl opacity-50 cursor-not-allowed">
                    Proceed to License Upload
                  </button>
                </div>

                {/* Step 3 & 4 Placeholders */}
                <div className="card p-6 opacity-50 pointer-events-none">
                  <div className="flex items-center gap-3 mb-2">
                    <FiCheckCircle className="text-white/40" />
                    <h2 className="text-lg font-bold text-white/40">3. Driving License Upload</h2>
                  </div>
                  <p className="text-sm text-white/30 ml-8">Upload front and back photos of your valid driving license.</p>
                </div>

                <div className="card p-6 opacity-50 pointer-events-none">
                  <div className="flex items-center gap-3 mb-2">
                    <FiMapPin className="text-white/40" />
                    <h2 className="text-lg font-bold text-white/40">4. Address Verification</h2>
                  </div>
                  <p className="text-sm text-white/30 ml-8">Provide proof of your current local address.</p>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </PageWrapper>
  )
}

function FiShield(props) {
  return (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );
}
