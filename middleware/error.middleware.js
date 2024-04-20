import { validationResult } from 'express-validator'
import { MESSAGES } from '../constants/messages.js'
import { STATUS } from '../constants/status.js'
import { createError } from '../helpers/helper.js'

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
			MESSAGES.VALIDATION_ERROR + errorMessages
		)

		return next(error)
	}
	next()
}

export function rootErrorMiddleware(error, req, res, _next) {
	const status = error.status || 500
	const message = error.message || 'Server internal error'
	res.status(status).json({ status: 'error', message })
}
