import { checkSchema } from 'express-validator'
import { MESSAGES } from '../../constants/messages.js'
import { STATUS } from '../../constants/status.js'
import { createError, emailExists } from '../../helpers/helper.js'

export const validateLogin = () => {
	return checkSchema({
		email: {
			in: ['body'],
			trim: true,
			isEmail: {
				errorMessage: MESSAGES.INVALID_EMAIL,
			},
			custom: {
				options: async (email) => {
					if (!(await emailExists(email))) {
						const error = createError(
							STATUS.BAD_REQUEST,
							MESSAGES.USER_NOT_FOUND
						)
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
			customSanitizer: { options: (value) => String(value) },
		},
	})
}
