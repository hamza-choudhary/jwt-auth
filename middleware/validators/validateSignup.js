import { checkSchema } from 'express-validator'
// import prisma from '../../config/db.config.js'
import { USER_ROLES } from '../../constants/global-constant.js'
import { MESSAGES } from '../../constants/messages.js'
// import { STATUS } from '../../constants/status.js'
// import { createError } from '../../helpers/helper.js'

export const validateSignup = () => {
	return checkSchema({
		email: {
			in: ['body'],
			isEmail: {
				errorMessage: MESSAGES.INVALID_EMAIL,
			},
			// custom: {
			// 	options: async (email) => {
			// 		if (await emailExists(email)) {
			// 			const error = createError(STATUS.BAD_REQUEST, MESSAGES.EMAIL_EXIST)
			// 			throw error
			// 		}
			// 	},
			// },
		},
		password: {
			in: ['body'],
			isLength: {
				options: { min: 3 },
				errorMessage: MESSAGES.INVALID_PASSWORD,
			},
		},
		role: {
			in: ['body'],
			customSanitizer: {
				options: (value) => value.toUpperCase(),
			},
			isIn: {
				options: [[USER_ROLES.CASHIER, USER_ROLES.CUSTOMER]],
				errorMessage: MESSAGES.INVALID_USER_ROLE,
			},
		},
	})
}

// async function emailExists(email) {
// 	const user = await prisma.user.findUnique({ where: email })
// 	return !!user
// }
