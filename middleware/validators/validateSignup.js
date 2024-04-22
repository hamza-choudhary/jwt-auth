import { checkSchema } from 'express-validator'
import prisma from '../../config/db.config.js'
import { MESSAGES } from '../../constants/messages.js'
import { STATUS } from '../../constants/status.js'
import { createError } from '../../helpers/helper.js'

export const validateSignup = () => {
  return checkSchema({
    email: {
      in: ['body'],
      trim: true,
      isEmail: {
        errorMessage: MESSAGES.INVALID_EMAIL,
      },
      custom: {
        options: async (email) => {
          if (await emailExists(email)) {
            const error = createError(STATUS.BAD_REQUEST, MESSAGES.EMAIL_EXIST)
            throw error
          }
        },
      },
    },
    password: {
      in: ['body'],
      isLength: {
        options: { min: 3 },
        errorMessage: MESSAGES.INVALID_PASSWORD,
      },
    },
  })
}

async function emailExists(email) {
  const user = await prisma.user.findFirst({ where: { email } })
  return !!user
}
