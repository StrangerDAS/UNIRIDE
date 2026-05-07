/**
 * User routes
 *
 * GET    /api/users/profile    — Get own profile (auth)
 * PUT    /api/users/profile    — Update own profile (auth)
 * GET    /api/users            — List all users (auth: admin)
 * PATCH  /api/users/:id/role   — Change user role (auth: admin)
 * DELETE /api/users/:id        — Delete user (auth: admin)
 */
import { Router } from 'express'

const router = Router()

router.get('/profile', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.put('/profile', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.get('/', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.patch('/:id/role', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.delete('/:id', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

export default router
