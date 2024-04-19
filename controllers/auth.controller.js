import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../config/db.config'
import { USER_ROLES } from '../constants/global-constant'
import { createError } from '../helpers/helper'

/**
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
export async function postSignup(req, res, next) {
	try {
		const { email, password, role } = req.body
		//validation logic should be added for email and password
		const userRole = USER_ROLES[role.lowerCase()]
		if (!userRole) throw createError(500, 'user role not found')

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

		res.cookie(name, val, options)
		res
			.status(201)
			.json({
				accessToken,
				refreshToken,
				data: result,
				message: 'User created successfully',
			})
	} catch (error) {
		next(error)
	}
}
