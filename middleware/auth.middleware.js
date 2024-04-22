import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN } from '../constants/global-constant.js'
import { MESSAGES } from '../constants/messages.js'
import { STATUS } from '../constants/status.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
import { createError } from '../helpers/helper.js'

/**
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */

export const authentication = asyncHandler(async (req, res, next) => {
  const access_token = req.cookies[ACCESS_TOKEN]

  if (!access_token) {
    const error = createError(STATUS.BAD_REQUEST, MESSAGES.ACCESS_TOKEN_MISSING)
    return next(error)
  }

  const { id, email, role } = jwt.verify(
    access_token,
    process.env.ACCESS_TOKEN_SECRET,
  )
  req.user = { id, email, role }
  next()
})

export function authorization(requiredRole) {
  return (req, res, next) => {
    const role = req.user.role

    if (role !== requiredRole) {
      const error = createError(STATUS.FORBIDDEN, MESSAGES.FORBIDDEN)
      return next(error)
    }

    next()
  }
}

export const verifyRefresh = asyncHandler(async (req, res, next) => {
  const refreshToken = req.body.refreshToken

  if (!refreshToken) {
    const error = createError(
      STATUS.BAD_REQUEST,
      MESSAGES.REFRESH_TOKEN_MISSING,
    )
    return next(error)
  }

  const { id, email, role } = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  )

  req.user = { id, email, role }
  next()
})
