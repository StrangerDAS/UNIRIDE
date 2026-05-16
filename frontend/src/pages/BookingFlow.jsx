import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FiCalendar, FiClock, FiUpload, FiCheck,
  FiArrowRight, FiArrowLeft, FiAlertCircle, FiShield,
} from 'react-icons/fi'
import { RiMotorbikeLine, RiEBikeLine } from 'react-icons/ri'
import toast from 'react-hot-toast'
import PageWrapper from '../components/PageWrapper'
import { bookingStep1Schema } from '../utils/schemas'
import { useVehicle } from '../hooks/useVehicles'
import useBookingStore from '../store/bookingStore'
import { bookingAPI } from '../api/endpoints'
import { MOCK_VEHICLES } from '../utils/mockData'

const STEPS = ['Select Time', 'Upload Docs', 'Agreement', 'Confirm']

const nowLocal = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

const calcPrice = (start, end, ratePerHour) => {
  if (!start || !end || !ratePerHour) return 0
  const ms = new Date(end) - new Date(start)
  if (ms <= 0) return 0
  return Math.ceil(ms / (1000 * 60 * 60)) * ratePerHour
}

const AGREEMENT_TEXT = [
  { title: '1. Vehicle Condition & Verification', text: 'User must inspect vehicle and record photos/videos at pickup.' },
  { title: '2. Responsibility During Rental', text: 'User is fully responsible for vehicle during rental period.' },
  { title: '3. Damage Policy', text: 'Without proof, user is liable for damages.' },
  { title: '4. Platform Liability', text: 'URENT is only a connecting platform and not responsible for damage, theft, or disputes.' },
  { title: '5. Owner Protection', text: 'Owner is not responsible for misuse or accidents.' },
  { title: '6. Compliance', text: 'User must upload valid documents and follow traffic laws.' },
  { title: '7. Acceptance', text: 'User agrees to all terms and accepts full responsibility.' },
]

export default function BookingFlow() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [agreementChecked, setAgreementChecked] = useState(false)

  const { vehicle: fetchedVehicle, loading } = useVehicle(id)
  const vehicle = fetchedVehicle || MOCK_VEHICLES.find((v) => v._id === id) || MOCK_VEHICLES[0]

  const {
    currentStep, nextStep, prevStep, reset,
    bookingDetails, setBookingDetails,
    documents, setDocumentUploaded,
    setSelectedVehicle,
  } = useBookingStore()

  useEffect(() => {
    if (vehicle) setSelectedVehicle(vehicle)
    return () => reset()
  }, [vehicle]) // eslint-disable-line react-hooks/exhaustive-deps

  const {
    register, handleSubmit, watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingStep1Schema),
    defaultValues: { startTime: bookingDetails.startTime, endTime: bookingDetails.endTime },
  })

  const startTime = watch('startTime')
  const endTime = watch('endTime')
  const estimated = calcPrice(startTime, endTime, vehicle?.pricePerHour)

  const handleStep0 = (data) => {
    setBookingDetails({ ...data, estimatedTotal: estimated })
    nextStep()
  }

  const maxStep = 3

  const handleConfirm = async () => {
    if (!agreementChecked) return toast.error('Please accept the rental agreement')
    try {
      await bookingAPI.create({
        items: [{ itemId: id }],
        startTime: bookingDetails.startTime,
        endTime: bookingDetails.endTime,
        agreementAccepted: true,
      })
    } catch { /* offline fallback */ }
    toast.success('Booking confirmed! 🎉')
    reset()
    navigate('/profile')
  }

  if (loading) {
    return (
      <PageWrapper>
        <div className="container-main py-10 max-w-2xl">
          <div className="skeleton h-8 w-48 rounded-xl mb-6" />
          <div className="skeleton h-64 rounded-2xl" />
        </div>
      </PageWrapper>
    )
  }

  const Icon = vehicle?.type === 'bike' ? RiMotorbikeLine : RiEBikeLine

  return (
    <PageWrapper>
      <div className="container-main py-10 max-w-2xl">
        <button
          onClick={() => (currentStep === 0 ? navigate(-1) : prevStep())}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition"
        >
          <FiArrowLeft /> {currentStep === 0 ? 'Back to vehicle' : 'Previous step'}
        </button>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                i < currentStep ? 'bg-brand text-white' :
                i === currentStep ? 'bg-brand/20 border border-brand text-brand' :
                'bg-surface-2 text-white/30'
              }`}>
                {i < currentStep ? <FiCheck size={14} /> : i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${i === currentStep ? 'text-white' : 'text-white/30'}`}>
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-4 sm:w-8 mx-1 ${i < currentStep ? 'bg-brand' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Vehicle summary */}
        <div className="card p-4 flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-surface-2 rounded-xl flex items-center justify-center shrink-0">
            <Icon className="text-brand text-3xl" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold truncate">{vehicle?.name}</div>
            <div className="text-white/40 text-sm">{vehicle?.location}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-bold text-brand">₹{vehicle?.pricePerHour}/hr</div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Time */}
          {currentStep === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <form onSubmit={handleSubmit(handleStep0)} className="space-y-5">
                <h2 className="text-xl font-bold">Select rental period</h2>
                <div>
                  <label className="label" htmlFor="startTime"><FiCalendar className="inline mr-1" />Start time</label>
                  <input id="startTime" type="datetime-local" min={nowLocal()} className="input-field" {...register('startTime')} />
                  {errors.startTime && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><FiAlertCircle size={12}/>{errors.startTime.message}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="endTime"><FiClock className="inline mr-1" />End time</label>
                  <input id="endTime" type="datetime-local" min={startTime || nowLocal()} className="input-field" {...register('endTime')} />
                  {errors.endTime && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><FiAlertCircle size={12}/>{errors.endTime.message}</p>}
                </div>
                {estimated > 0 && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card p-4 bg-brand/5 border-brand/20">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Estimated total</span>
                      <span className="text-2xl font-bold text-gradient">₹{estimated}</span>
                    </div>
                    <p className="text-white/30 text-xs mt-1">No payment required to confirm</p>
                  </motion.div>
                )}
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                  Continue <FiArrowRight />
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 1: Docs */}
          {currentStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="space-y-5">
              <h2 className="text-xl font-bold">Upload your documents</h2>
              <p className="text-white/40 text-sm">Required for identity verification.</p>
              {[
                { key: 'licenseUploaded', id: 'doc-license', label: 'Driving License' },
                { key: 'idProofUploaded', id: 'doc-id', label: 'Government ID (Aadhaar / Voter ID)' },
              ].map(({ key, id, label }) => (
                <div key={key}>
                  <label className="label" htmlFor={id}>{label}</label>
                  <label htmlFor={id} className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 cursor-pointer transition text-center ${
                    documents[key] ? 'border-brand/50 bg-brand/5' : 'border-white/10 hover:border-white/20 bg-surface-2'
                  }`}>
                    {documents[key] ? (
                      <><FiCheck className="text-brand text-2xl" /><span className="text-sm text-brand">Uploaded ✓</span></>
                    ) : (
                      <><FiUpload className="text-white/30 text-2xl" /><span className="text-sm text-white/40">Click to upload</span></>
                    )}
                    <input id={id} type="file" accept="image/*,.pdf" className="hidden" onChange={() => setDocumentUploaded(key, true)} />
                  </label>
                </div>
              ))}
              <button onClick={nextStep} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                Continue <FiArrowRight />
              </button>
              <button onClick={nextStep} className="btn-ghost w-full text-white/30 text-sm">Skip for now</button>
            </motion.div>
          )}

          {/* Step 2: Rental Agreement */}
          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="space-y-5">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FiShield className="text-brand" /> Rental Agreement
              </h2>
              <div className="card p-6 border border-white/10">
                <h3 className="text-lg font-bold text-center mb-4 text-brand">
                  User Responsibility & Rental Agreement
                </h3>
                <p className="text-white/50 text-sm mb-5 text-center">
                  By proceeding with the booking on the URENT platform, you agree to the following:
                </p>
                <div className="space-y-4">
                  {AGREEMENT_TEXT.map((clause) => (
                    <div key={clause.title} className="bg-surface-2 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-white/80 mb-1">{clause.title}</h4>
                      <p className="text-xs text-white/40">{clause.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer card p-4 border-2 transition group" style={{
                borderColor: agreementChecked ? 'var(--color-brand)' : 'transparent',
                background: agreementChecked ? 'rgba(255,107,0,0.05)' : undefined,
              }}>
                <input
                  type="checkbox"
                  checked={agreementChecked}
                  onChange={(e) => setAgreementChecked(e.target.checked)}
                  className="mt-0.5 w-5 h-5 accent-brand rounded"
                />
                <span className="text-sm text-white/70 leading-relaxed">
                  I have read and agree to the <strong className="text-white">User Responsibility & Rental Agreement</strong>.
                  I accept full responsibility during the rental period.
                </span>
              </label>

              <button
                onClick={nextStep}
                disabled={!agreementChecked}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Accept & Continue <FiArrowRight />
              </button>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {currentStep === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="space-y-5">
              <h2 className="text-xl font-bold">Confirm your booking</h2>
              <div className="card divide-y divide-white/5">
                {[
                  { label: 'Vehicle', value: vehicle?.name },
                  { label: 'Location', value: vehicle?.location },
                  { label: 'Start', value: bookingDetails.startTime ? new Date(bookingDetails.startTime).toLocaleString('en-IN') : '—' },
                  { label: 'End', value: bookingDetails.endTime ? new Date(bookingDetails.endTime).toLocaleString('en-IN') : '—' },
                  { label: 'Rate', value: `₹${vehicle?.pricePerHour}/hr` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center px-5 py-3.5 text-sm">
                    <span className="text-white/40">{label}</span>
                    <span className="font-medium text-right max-w-[60%]">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center px-5 py-3.5 text-sm">
                  <span className="text-white/40">Agreement</span>
                  <span className="text-green-400 font-medium flex items-center gap-1"><FiCheck size={14} /> Accepted</span>
                </div>
                <div className="flex justify-between items-center px-5 py-4">
                  <span className="font-semibold">Estimated Total</span>
                  <span className="text-xl font-bold text-gradient">
                    {bookingDetails.estimatedTotal ? `₹${bookingDetails.estimatedTotal}` : '—'}
                  </span>
                </div>
              </div>
              <div className="card p-4 bg-green-500/5 border-green-500/20 text-sm text-green-300">
                ✅ No payment required. Pay the owner directly when you pick up the vehicle.
              </div>
              <motion.button
                onClick={handleConfirm}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full py-4 text-base"
              >
                Confirm Booking
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  )
}
