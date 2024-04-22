import { Router } from 'express'
import { USER_ROLES } from '../constants/global-constant.js'
import { ROUTES } from '../constants/routes.js'
import {
  postLogout,
  postRefreshToken,
  postSignup,
} from '../controllers/auth.controller.js'
import {
  authentication,
  authorization,
  verifyRefresh,
} from '../middleware/auth.middleware.js'
import { handleValidationErrors } from '../middleware/error.middleware.js'
import { validateSignup } from '../middleware/validators/validateSignup.js'

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
    postSignup,
  )

router.route(ROUTES.AUTH.LOGOUT).post(postLogout)

router.route(ROUTES.AUTH.REFRESH_TOKEN).post(verifyRefresh, postRefreshToken)

export { router as authRoutes }
