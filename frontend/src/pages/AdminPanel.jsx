import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiPackage, FiCalendar, FiTrendingUp, FiCheck, FiX, FiSearch, FiTrash2 } from 'react-icons/fi'
import { RiMotorbikeLine, RiEBikeLine } from 'react-icons/ri'
import toast from 'react-hot-toast'
import PageWrapper from '../components/PageWrapper'
import { userAPI, vehicleAPI, adminAPI } from '../api/endpoints'
import { StatCardSkeleton } from '../components/Skeletons'
import { MOCK_ADMIN_STATS, MOCK_ADMIN_VEHICLES, MOCK_USERS } from '../utils/mockData'

function StatusBadge({ status }) {
  const map = {
    approved: 'bg-green-500/10 text-green-400 border border-green-500/20',
    pending: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    rejected: 'bg-red-500/10 text-red-400 border border-red-500/20',
    user: 'bg-blue-500/10 text-blue-400',
    owner: 'bg-brand/10 text-brand',
    admin: 'bg-purple-500/10 text-purple-400',
  }
  return <span className={`badge capitalize text-xs ${map[status] || 'bg-surface-3 text-white/30'}`}>{status}</span>
}

const TABS = ['overview', 'listings', 'users']

export default function AdminPanel() {
  const [tab, setTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const [sRes, vRes, uRes] = await Promise.all([
          adminAPI.getDashboardStats(),
          vehicleAPI.getAll(),
          userAPI.getAll(),
        ])
        setStats(sRes.data)
        setVehicles(vRes.data?.vehicles || vRes.data)
        setUsers(uRes.data?.users || uRes.data)
      } catch {
        setStats(MOCK_ADMIN_STATS)
        setVehicles(MOCK_ADMIN_VEHICLES)
        setUsers(MOCK_USERS)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const handleApprove = async (id) => {
    try { await adminAPI.approveVehicle(id) } catch { /* offline */ }
    setVehicles((v) => v.map((x) => x._id === id ? { ...x, status: 'approved' } : x))
    toast.success('Vehicle approved ✓')
  }

  const handleReject = async (id) => {
    try { await adminAPI.rejectVehicle(id) } catch { /* offline */ }
    setVehicles((v) => v.map((x) => x._id === id ? { ...x, status: 'rejected' } : x))
    toast.success('Vehicle rejected')
  }

  const handleDeleteUser = async (id) => {
    if (!confirm('Delete this user permanently?')) return
    try { await userAPI.deleteUser(id) } catch { /* offline */ }
    setUsers((u) => u.filter((x) => x._id !== id))
    toast.success('User removed')
  }

  const statCards = stats ? [
    { label: 'Total Users', value: stats.users, icon: FiUsers, color: 'text-blue-400' },
    { label: 'Vehicles Listed', value: stats.vehicles, icon: FiPackage, color: 'text-brand' },
    { label: 'Total Bookings', value: stats.bookings, icon: FiCalendar, color: 'text-green-400' },
    { label: 'Pending Approvals', value: stats.pendingListings, icon: FiTrendingUp, color: 'text-yellow-400' },
  ] : []

  const filteredVehicles = vehicles.filter((v) =>
    v.name?.toLowerCase().includes(search.toLowerCase()) ||
    v.ownerId?.name?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const pendingVehicles = vehicles.filter((v) => v.status === 'pending')

  return (
    <PageWrapper>
      <div className="container-main py-10">
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Panel</h1>
          <p className="text-white/40 text-sm mt-1">Manage the UNIRIDE platform</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-2 rounded-xl p-1 w-fit mb-8">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${tab === t ? 'bg-brand text-white' : 'text-white/40 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {loading
                ? [...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)
                : statCards.map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="card p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/40 text-xs">{s.label}</span>
                        <s.icon className={`${s.color} text-xl`} />
                      </div>
                      <div className="text-3xl font-bold">{s.value}</div>
                    </motion.div>
                  ))}
            </div>

            <div>
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                Pending Approvals
                {pendingVehicles.length > 0 && (
                  <span className="w-5 h-5 bg-yellow-500 text-black text-xs rounded-full flex items-center justify-center font-bold">
                    {pendingVehicles.length}
                  </span>
                )}
              </h2>
              {pendingVehicles.length === 0 ? (
                <p className="text-white/30 text-sm">No pending listings 🎉</p>
              ) : (
                <div className="space-y-3">
                  {pendingVehicles.map((v) => {
                    const Icon = v.type === 'bike' ? RiMotorbikeLine : RiEBikeLine
                    return (
                      <div key={v._id} className="card p-4 flex items-center gap-4">
                        <Icon className="text-brand text-2xl shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{v.name}</div>
                          <div className="text-white/40 text-xs">by {v.ownerId?.name || 'Owner'} · ₹{v.pricePerHour}/hr</div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => handleApprove(v._id)} className="btn-ghost p-2 text-green-400 hover:bg-green-500/10 rounded-xl" title="Approve"><FiCheck /></button>
                          <button onClick={() => handleReject(v._id)} className="btn-ghost p-2 text-red-400 hover:bg-red-500/10 rounded-xl" title="Reject"><FiX /></button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Listings */}
        {tab === 'listings' && (
          <div>
            <div className="relative mb-5">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="text" placeholder="Search vehicles or owner…" value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
            </div>
            <div className="space-y-3">
              {filteredVehicles.map((v, i) => {
                const Icon = v.type === 'bike' ? RiMotorbikeLine : RiEBikeLine
                return (
                  <motion.div key={v._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <Icon className="text-brand text-2xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{v.name}</div>
                      <div className="text-white/40 text-xs mt-0.5">{v.ownerId?.name || 'Owner'} · ₹{v.pricePerHour}/hr</div>
                    </div>
                    <StatusBadge status={v.status} />
                    {v.status === 'pending' && (
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => handleApprove(v._id)} className="btn-ghost p-1.5 text-green-400 hover:bg-green-500/10 rounded-lg"><FiCheck size={15} /></button>
                        <button onClick={() => handleReject(v._id)} className="btn-ghost p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"><FiX size={15} /></button>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Users */}
        {tab === 'users' && (
          <div>
            <div className="relative mb-5">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="text" placeholder="Search users…" value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
            </div>
            <div className="space-y-3">
              {filteredUsers.map((u, i) => (
                <motion.div key={u._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-3 flex items-center justify-center font-bold text-brand shrink-0">
                    {u.name?.[0] || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{u.name}</div>
                    <div className="text-white/40 text-xs">{u.email}</div>
                  </div>
                  <StatusBadge status={u.role} />
                  <button onClick={() => handleDeleteUser(u._id)} className="btn-ghost p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg shrink-0" title="Delete user">
                    <FiTrash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
