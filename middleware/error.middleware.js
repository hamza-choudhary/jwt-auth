import { validationResult } from 'express-validator'
import { ACCESS_TOKEN, ERRORS, LIB_ERRORS, MESSAGES, STATUS } from '../constants/index.js'
import { createError } from '../helpers/index.js'

/**
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => error.msg)
      .join(', ')

    const error = createError(
      STATUS.BAD_REQUEST,
      MESSAGES.VALIDATION_ERROR + errorMessages,
    )

    return next(error)
  }
  next()
}

export function rootErrorMiddleware(error, req, res, _next) {
  let status = error.status || 500
  let message = error.message || 'Server internal error'
  let code
  if (error?.name === LIB_ERRORS.JWT_EXPIRED) {
    message = MESSAGES.TOKEN_EXPIRED  
    status = STATUS.FORBIDDEN
    if (req.errorFlag === ACCESS_TOKEN) {
      code = ERRORS
    }
  } else if (error?.name === LIB_ERRORS.JWT_INVALID) {
    message = MESSAGES.INVALID_TOKEN
    status = STATUS.UNAUTHENTICATED
  }
  console.log(error)
  res.status(status).json({ status: 'error', code: 1, message })
}
