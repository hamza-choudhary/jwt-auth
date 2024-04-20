import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../config/db.config.js'
import { ACCESS_TOKEN, USER_ROLES } from '../constants/global-constant.js'
import { MESSAGES } from '../constants/messages.js'
// import { createError } from '../helpers/helper'
// import { STATUS } from '../constants/status'

/**
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
export async function postSignup(req, res, next) {
	try {
		const { email, password, role } = req.body

		const hashedPassword = await bcrypt.hash(password, 10)
		const result = await prisma.user.create({
			data: { email, password: hashedPassword, role },
			select: { id: true, email: true, role: true },
		})
		const accessToken = jwt.sign(result, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		})
		const refreshToken = jwt.sign(result, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		})

		res.cookie(ACCESS_TOKEN, accessToken, { httpOnly: true, secure: true })
		res.status(201).json({
			refreshToken,
			data: result,
			message: MESSAGES.SUCCESS.AUTH.SIGNUP,
		})
	} catch (error) {
		error.message =
			MESSAGES.ERROR.AUTH.SIGNUP +
			(error.message.includes('Unique') ? MESSAGES.EMAIL_EXIST : error.message)
		next(error)
	}
}
