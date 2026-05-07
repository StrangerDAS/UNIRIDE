/**
 * Auth routes — handles registration, login, and profile retrieval.
 *
 * POST /api/auth/signup   — Register a new user
 * POST /api/auth/login    — Login and receive JWT
 * GET  /api/auth/me       — Get current user (requires auth)
 */
import { Router } from 'express'

const router = Router()

// Placeholder — full implementation when backend is connected
router.post('/signup', async (req, res) => {
  // TODO: validate body, create user, return token
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.post('/login', async (req, res) => {
  // TODO: validate credentials, return token
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

router.get('/me', async (req, res) => {
  // TODO: decode JWT, return user
  res.status(501).json({ message: 'Not implemented — use mock server' })
})

export default router
