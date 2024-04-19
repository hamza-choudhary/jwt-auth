import { Router } from 'express'
import { authRoutes } from './auth.routes.js'

const router = Router()

router.use('/auth', authRoutes)

export { router as routes }
