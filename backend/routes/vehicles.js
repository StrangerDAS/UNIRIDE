/**
 * Vehicle routes
 *
 * GET    /api/vehicles       — List all approved vehicles (public)
 * GET    /api/vehicles/:id   — Get vehicle by ID (public)
 * GET    /api/vehicles/my    — Owner's vehicles (auth)
 * POST   /api/vehicles       — Create vehicle listing (auth: owner)
 * PUT    /api/vehicles/:id   — Update vehicle (auth: owner)
 * DELETE /api/vehicles/:id   — Delete vehicle (auth: owner)
 */
import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.get('/my', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.get('/:id', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.post('/', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.put('/:id', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.delete('/:id', async (req, res) => {
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

export default router
