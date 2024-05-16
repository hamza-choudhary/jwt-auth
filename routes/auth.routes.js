import { Router } from 'express'
import { ROUTES, USER_ROLES } from '../constants/index.js'
import {
	postLogin,
	postLogout,
	postRefreshToken,
	postSignup,
} from '../controllers/auth.controller.js'
import {
	authentication,
	authorization,
	handleValidationErrors,
	validateLogin,
	validateSignup,
	verifyRefresh,
} from '../middleware/index.js'

const router = Router()

router
	.route(ROUTES.AUTH.CUSTOMER_SIGNUP)
	.post(validateSignup(), handleValidationErrors, postSignup)

router
	.route(ROUTES.AUTH.CASHIER_SIGNUP)
	.post(
		authentication,
		authorization(USER_ROLES.ADMIN),
		validateSignup(),
		handleValidationErrors,
		postSignup
	)

router
	.route(ROUTES.AUTH.LOGIN)
	.post(validateLogin(), handleValidationErrors, postLogin)

router.route(ROUTES.AUTH.LOGOUT).post(authentication, postLogout)

router.route(ROUTES.AUTH.REFRESH_TOKEN).post(verifyRefresh, postRefreshToken)

export { router as authRoutes }
