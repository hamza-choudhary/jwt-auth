import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../config/db.config.js'
import { ACCESS_TOKEN, USER_ROLES } from '../constants/global-constant.js'
import { MESSAGES } from '../constants/messages.js'
import { STATUS } from '../constants/status.js'
import { asyncHandler } from '../helpers/asyncHandler.js'

/**
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
export const postSignup = asyncHandler(async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body
	const role = req?.user?.role ? USER_ROLES.CASHIER : USER_ROLES.CUSTOMER

	const hashedPassword = await bcrypt.hash(password, 10)

	const result = await prisma.user.create({
		data: { firstName, lastName, email, password: hashedPassword, role },
		select: { id: true, email: true, role: true },
	})

	const accessToken = jwt.sign(result, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
	})
	const refreshToken = jwt.sign(result, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
	})

	await prisma.user.update({
		where: { id: result.id },
		data: { refreshToken },
	})

	res.cookie(ACCESS_TOKEN, accessToken, { httpOnly: false })
	//FIXME: in production add this line { httpOnly: true, secure: true }
	res.status(201).json({
		refreshToken,
		data: result,
		message: MESSAGES.SUCCESS.AUTH.SIGNUP,
	})
})

export const postLogin = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body

	const result = await prisma.user.findUnique({ where: { email } })

	const match = await bcrypt.compare(password, result.password)

	if (!match) {
		throw new Error(MESSAGES.WRONG_PASSWORD)
	}

	const accessToken = jwt.sign(result, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
	})
	const refreshToken = jwt.sign(result, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
	})

	res.cookie(ACCESS_TOKEN, accessToken, { httpOnly: false })
	//FIXME: in production add this line { httpOnly: true, secure: true }
	res.status(201).json({
		refreshToken,
		data: result,
		message: MESSAGES.SUCCESS.AUTH.SIGNUP,
	})
})

export const postLogout = asyncHandler(async (req, res, next) => {
	await prisma.user.update({
		where: { id: req.user.id },
		data: { refreshToken: '' },
	})

	res.clearCookie(ACCESS_TOKEN)
	res.status(STATUS.OK).json({ message: MESSAGES.SUCCESS.AUTH.LOGOUT })
})

export const postRefreshToken = asyncHandler(async (req, res, next) => {
	const user = req.user

	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
	})

	res.cookie(ACCESS_TOKEN, accessToken, {
		// httpOnly: true,
		// secure: true,
		overwrite: true,
	})

	res
		.status(STATUS.OK)
		.json({ message: MESSAGES.SUCCESS.ACCESS_TOKEN_REFRESHED })
})
