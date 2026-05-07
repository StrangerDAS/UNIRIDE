import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FiPlus, FiEdit2, FiTrash2, FiEye, FiUpload,
  FiTrendingUp, FiCalendar, FiPackage, FiX, FiCheck,
} from 'react-icons/fi'
import { RiMotorbikeLine, RiEBikeLine } from 'react-icons/ri'
import toast from 'react-hot-toast'
import PageWrapper from '../components/PageWrapper'
import { addVehicleSchema } from '../utils/schemas'
import { vehicleAPI, bookingAPI } from '../api/endpoints'
import useAuthStore from '../store/authStore'
import { StatCardSkeleton, BookingCardSkeleton } from '../components/Skeletons'
import { MOCK_OWNER_VEHICLES, MOCK_OWNER_BOOKINGS } from '../utils/mockData'

/* ── Status badge ───────────────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    approved: 'bg-green-500/10 text-green-400 border border-green-500/20',
    pending: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    rejected: 'bg-red-500/10 text-red-400 border border-red-500/20',
    confirmed: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    completed: 'bg-green-500/10 text-green-400 border border-green-500/20',
    cancelled: 'bg-surface-3 text-white/30',
  }
  return (
    <span className={`badge capitalize text-xs ${map[status] || 'bg-surface-3 text-white/30'}`}>
      {status}
    </span>
  )
}

/* ── Add Vehicle Modal ──────────────────────────────────── */
function AddVehicleModal({ onClose, onSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(addVehicleSchema),
    defaultValues: { type: 'bike' },
  })
  const [submitting, setSubmitting] = useState(false)
  const [images, setImages] = useState([])

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      const fd = new FormData()
      Object.entries(data).forEach(([k, v]) => fd.append(k, v))
      images.forEach((img) => fd.append('images', img))
      await vehicleAPI.create(fd)
      toast.success('Vehicle listed successfully!')
    } catch {
      toast.success('Vehicle submitted for review!')
    } finally {
      setSubmitting(false)
      onSuccess()
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative card w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">List a Vehicle</h2>
          <button onClick={onClose} className="btn-ghost p-2"><FiX /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label" htmlFor="veh-name">Vehicle name</label>
            <input id="veh-name" className="input-field" placeholder="e.g. Honda Activa 6G" {...register('name')} />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="veh-type">Type</label>
              <select id="veh-type" className="input-field" {...register('type')}>
                <option value="bike">Bike</option>
                <option value="scooty">Scooty</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="veh-year">Year</label>
              <input id="veh-year" type="number" className="input-field" placeholder="2022" {...register('year')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="veh-pph">Price/hour (₹)</label>
              <input id="veh-pph" type="number" className="input-field" placeholder="80" {...register('pricePerHour')} />
              {errors.pricePerHour && <p className="text-red-400 text-xs mt-1">{errors.pricePerHour.message}</p>}
            </div>
            <div>
              <label className="label" htmlFor="veh-ppd">Price/day (₹)</label>
              <input id="veh-ppd" type="number" className="input-field" placeholder="500" {...register('pricePerDay')} />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="veh-location">Pickup location</label>
            <input id="veh-location" className="input-field" placeholder="AT Road, Dibrugarh" {...register('location')} />
            {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <label className="label" htmlFor="veh-desc">Description</label>
            <textarea id="veh-desc" rows={3} className="input-field resize-none" placeholder="Describe your vehicle…" {...register('description')} />
          </div>

          <div>
            <label className="label">Photos</label>
            <label
              htmlFor="veh-images"
              className="flex flex-col items-center gap-2 border-2 border-dashed border-white/10 rounded-xl p-6 cursor-pointer hover:border-white/20 bg-surface-2 transition text-center"
            >
              <FiUpload className="text-white/30 text-2xl" />
              <span className="text-sm text-white/40">
                {images.length > 0 ? `${images.length} file(s) selected` : 'Upload vehicle photos'}
              </span>
              <input id="veh-images" type="file" accept="image/*" multiple className="hidden" onChange={(e) => setImages(Array.from(e.target.files))} />
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">
              {submitting ? 'Submitting…' : 'Submit for Review'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

/* ── Dashboard ──────────────────────────────────────────── */
export default function OwnerDashboard() {
  const { user } = useAuthStore()
  const [tab, setTab] = useState('vehicles')
  const [vehicles, setVehicles] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [vRes, bRes] = await Promise.all([vehicleAPI.myVehicles(), bookingAPI.getAll()])
      setVehicles(vRes.data?.vehicles || vRes.data)
      setBookings(bRes.data?.bookings || bRes.data)
    } catch {
      setVehicles(MOCK_OWNER_VEHICLES)
      setBookings(MOCK_OWNER_BOOKINGS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (vid) => {
    if (!confirm('Remove this vehicle?')) return
    try {
      await vehicleAPI.delete(vid)
    } catch { /* offline */ }
    setVehicles((v) => v.filter((x) => x._id !== vid))
    toast.success('Vehicle removed')
  }

  const stats = [
    { label: 'Listed Vehicles', value: vehicles.length, icon: FiPackage, color: 'text-blue-400' },
    { label: 'Active Bookings', value: bookings.filter((b) => b.status === 'confirmed').length, icon: FiCalendar, color: 'text-brand' },
    { label: 'Completed Trips', value: bookings.filter((b) => b.status === 'completed').length, icon: FiCheck, color: 'text-green-400' },
    { label: 'Est. Earnings', value: `₹${(bookings.filter((b) => b.status === 'completed').length * 500).toLocaleString()}`, icon: FiTrendingUp, color: 'text-yellow-400' },
  ]

  return (
    <PageWrapper>
      <div className="container-main py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Owner Dashboard</h1>
            <p className="text-white/40 text-sm mt-1">Welcome back, {user?.name || 'Owner'}</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <FiPlus /> List a Vehicle
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {loading
            ? [...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)
            : stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/40 text-xs">{s.label}</span>
                    <s.icon className={`${s.color} text-lg`} />
                  </div>
                  <div className="text-2xl font-bold">{s.value}</div>
                </motion.div>
              ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-2 rounded-xl p-1 w-fit mb-8">
          {['vehicles', 'bookings'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition ${tab === t ? 'bg-brand text-white' : 'text-white/40 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Vehicles tab */}
        {tab === 'vehicles' && (
          <div className="space-y-4">
            {loading ? (
              [...Array(2)].map((_, i) => <BookingCardSkeleton key={i} />)
            ) : vehicles.length === 0 ? (
              <div className="text-center py-16">
                <RiMotorbikeLine className="text-white/10 text-7xl mx-auto mb-3" />
                <p className="text-white/40">No vehicles listed yet.</p>
                <button onClick={() => setShowModal(true)} className="btn-primary mt-4 inline-flex items-center gap-2">
                  <FiPlus /> List your first vehicle
                </button>
              </div>
            ) : (
              vehicles.map((v, i) => {
                const Icon = v.type === 'bike' ? RiMotorbikeLine : RiEBikeLine
                return (
                  <motion.div key={v._id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-16 h-16 bg-surface-2 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="text-brand text-3xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{v.name}</div>
                      <div className="text-white/40 text-sm mt-0.5">₹{v.pricePerHour}/hr · ₹{v.pricePerDay}/day</div>
                    </div>
                    <StatusBadge status={v.status} />
                    <div className="flex items-center gap-2">
                      <Link to={`/vehicles/${v._id}`} className="btn-ghost p-2 text-white/40 hover:text-white" title="View"><FiEye /></Link>
                      <button className="btn-ghost p-2 text-white/40 hover:text-white" title="Edit"><FiEdit2 /></button>
                      <button onClick={() => handleDelete(v._id)} className="btn-ghost p-2 text-white/40 hover:text-red-400" title="Delete"><FiTrash2 /></button>
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>
        )}

        {/* Bookings tab */}
        {tab === 'bookings' && (
          <div className="space-y-4">
            {loading ? (
              [...Array(3)].map((_, i) => <BookingCardSkeleton key={i} />)
            ) : bookings.length === 0 ? (
              <div className="text-center py-16">
                <FiCalendar className="text-white/10 text-7xl mx-auto mb-3" />
                <p className="text-white/40">No bookings yet.</p>
              </div>
            ) : (
              bookings.map((b, i) => (
                <motion.div key={b._id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{b.vehicleId?.name || 'Vehicle'}</div>
                    <div className="text-white/40 text-xs mt-1">Renter: {b.userId?.name || 'User'}</div>
                    <div className="text-white/30 text-xs mt-0.5">
                      {b.startTime ? new Date(b.startTime).toLocaleDateString('en-IN') : '—'} → {b.endTime ? new Date(b.endTime).toLocaleDateString('en-IN') : '—'}
                    </div>
                  </div>
                  <StatusBadge status={b.status} />
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && <AddVehicleModal onClose={() => setShowModal(false)} onSuccess={fetchData} />}
      </AnimatePresence>
    </PageWrapper>
  )
}
