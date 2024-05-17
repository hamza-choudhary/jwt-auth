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
	.route(ROUTES.TEST.TEST)
	.get(
		authentication,
		authorization(USER_ROLES.ADMIN),
		handleValidationErrors,
		(req, res, next) => {
			res.json({ hello: 'world' })
		}
	)

export { router as testRoutes }
