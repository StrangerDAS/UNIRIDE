/**
 * Admin routes
 *
 * GET   /api/admin/stats               — Dashboard stats (auth: admin)
 * PATCH /api/admin/vehicles/:id/approve — Approve a vehicle listing
 * PATCH /api/admin/vehicles/:id/reject  — Reject a vehicle listing
 */
import { Router } from 'express'

const router = Router()

router.get('/stats', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.patch('/vehicles/:id/approve', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.patch('/vehicles/:id/reject', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

export default router
