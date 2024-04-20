import { Router } from 'express'
import { USER_ROLES } from '../constants/global-constant.js'
import { postSignup } from '../controllers/auth.controller.js'
import { authenticateAndAuthorize } from '../middleware/auth.middleware.js'
import { handleValidationErrors } from '../middleware/error.middleware.js'
import { validateSignup } from '../middleware/validators/validateSignup.js'

const router = Router()

router.post('/signup', validateSignup(), handleValidationErrors, postSignup)
router.post(
	'/cashier/signup',
	authenticateAndAuthorize(USER_ROLES.ADMIN),
	validateSignup(),
	handleValidationErrors,
	postSignup
)

export { router as authRoutes }
