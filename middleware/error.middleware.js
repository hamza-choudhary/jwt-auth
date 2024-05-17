import { validationResult } from 'express-validator'
import {
	ACCESS_TOKEN,
	ERRORS,
	LIB_ERRORS,
	MESSAGES,
	REFRESH_TOKEN,
	STATUS,
} from '../constants/index.js'
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
			MESSAGES.VALIDATION_ERROR + errorMessages
		)

		return next(error)
	}
	next()
}

export function rootErrorMiddleware(error, req, res, _next) {
	let status = error.status || 500
	let message = error.message || 'Server internal error'
	let code
	if (
		error?.name === LIB_ERRORS.JWT_EXPIRED ||
		error?.name === LIB_ERRORS.JWT_INVALID
	) {
		if (req.errorFlag === ACCESS_TOKEN) {
			code =
				error?.name === LIB_ERRORS.JWT_EXPIRED
					? ERRORS.ACCESS_TOKEN_EXPIRED.code
					: ERRORS.ACCESS_TOKEN_INVALID.code
			message =
				error?.name === LIB_ERRORS.JWT_EXPIRED
					? ERRORS.ACCESS_TOKEN_EXPIRED.message
					: ERRORS.ACCESS_TOKEN_INVALID.message
		}
		if (req.errorFlag === REFRESH_TOKEN) {
			code =
				error?.name === LIB_ERRORS.JWT_EXPIRED
					? ERRORS.REFRESH_TOKEN_EXPIRED.code
					: ERRORS.REFRESH_TOKEN_INVALID.code
			message =
				error?.name === LIB_ERRORS.JWT_EXPIRED
					? ERRORS.REFRESH_TOKEN_EXPIRED.message
					: ERRORS.REFRESH_TOKEN_INVALID.message
		}
		status = STATUS.UNAUTHENTICATED
	}

	console.log(error)
	res.status(status).json({ status: 'error', code, message })
}
