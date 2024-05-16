import { checkSchema } from 'express-validator'
import { MESSAGES, STATUS } from '../../constants/index.js'
import { createError, emailExists } from '../../helpers/index.js'

export const validateSignup = () => {
	return checkSchema({
		firstName: {
			in: ['body'],
			trim: true,
			isLength: {
				options: { min: 2 },
				errorMessage: MESSAGES.INVALID_FIRST_NAME,
			},
		},
		lastName: {
			in: ['body'],
			trim: true,
			isLength: {
				options: { min: 2 },
				errorMessage: MESSAGES.INVALID_LAST_NAME,
			},
		},
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
