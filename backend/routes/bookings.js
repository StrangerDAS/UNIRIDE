/**
 * Booking routes
 *
 * POST   /api/bookings        — Create a booking (auth)
 * GET    /api/bookings/my     — User's bookings (auth)
 * GET    /api/bookings        — All bookings (auth: admin/owner)
 * GET    /api/bookings/:id    — Single booking (auth)
 * PATCH  /api/bookings/:id/cancel — Cancel a booking (auth)
 */
import { Router } from 'express'

const router = Router()

router.post('/', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.get('/my', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.get('/', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.get('/:id', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.patch('/:id/cancel', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

export default router
