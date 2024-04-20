import { Router } from 'express'
import { postSignup } from '../controllers/auth.controller.js'
import { handleValidationErrors } from '../middleware/validators/handleValidationErrors.js'
import { validateSignup } from '../middleware/validators/validateSignup.js'

const router = Router()

router.post('/signup', validateSignup(), handleValidationErrors, postSignup)

export { router as authRoutes }
