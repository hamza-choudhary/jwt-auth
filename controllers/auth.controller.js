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
  const { email, password } = req.body
  const role = req?.user?.role ? USER_ROLES.CASHIER : USER_ROLES.CUSTOMER

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

  await prisma.user.update({
    where: { id: result.id },
    data: { refreshToken },
  })

  res.cookie(ACCESS_TOKEN, accessToken, { httpOnly: true, secure: true })
  res.status(201).json({
    refreshToken,
    data: result,
    message: MESSAGES.SUCCESS.AUTH.SIGNUP,
  })
})

export const postLogout = (req, res, next) => {
  // FIXME: delete refresh token from db as well 
  // and we have to make logout route authenticated then we will get users user.id
  res.clearCookie(ACCESS_TOKEN)
  res.status(STATUS.OK).json({ message: MESSAGES.SUCCESS.AUTH.LOGOUT })
}

export const postRefreshToken = asyncHandler(async (req, res, next) => {
  const user = req.user

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  })

  res.cookie(ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: true,
    overwrite: true,
  })

  res
    .status(STATUS.OK)
    .json({ message: MESSAGES.SUCCESS.ACCESS_TOKEN_REFRESHED })
})
