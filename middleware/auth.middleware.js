import jwt from 'jsonwebtoken'
import { MESSAGES } from '../constants/messages.js'
import { STATUS } from '../constants/status.js'
import { createError } from '../helpers/helper.js'
import { ACCESS_TOKEN } from '../constants/global-constant.js'

/**
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */

export function authenticateAndAuthorize(requiredRole) {
	return (req, res, next) => {
		const access_token = req.cookies[ACCESS_TOKEN]

		if (!access_token) {
			const error = createError(
				STATUS.BAD_REQUEST,
				MESSAGES.ACCESS_TOKEN_MISSING
			)
			return next(error)
		}

		// Verify the token
		jwt.verify(
			access_token,
			process.env.ACCESS_TOKEN_SECRET,
			(err, decoded) => {
				if (err) {
					const error = createError(
						STATUS.UNAUTHENTICATED,
						MESSAGES.INVALID_ACCESS_TOKEN
					)
					return next(error)
				}
				// Check if token is expired
				if (Date.now() >= decoded.exp * 1000) {
					const error = createError(
						STATUS.UNAUTHENTICATED,
						MESSAGES.ACCESS_TOKEN_EXPIRED
					)
					return next(error)
				}

				// AUTHORIZATION
				if (decoded.role !== requiredRole) {
					const error = createError(STATUS.FORBIDDEN, MESSAGES.FORBIDDEN)
					return next(error)
				}

				// set user in req
				req.user = decoded
			}
		)

		next()
	}
}
