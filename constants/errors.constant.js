//errors thrown by libraries
export const LIB_ERRORS = {
	JWT_EXPIRED: 'TokenExpiredError',
	JWT_INVALID: 'JsonWebTokenError',
}

export const ERRORS = {
	WRONG_PASSWORD: {
		message: 'Wrong Password',
		code: 'AUTH_WRONG_PASSWORD',
	},
	USER_NOT_FOUND: {
		message: 'USER not found',
		code: 'AUTH_USER_NOT_FOUND',
	},
	VALIDATION_ERROR: {
		message: 'VALIDATION is failed ->',
		code: 'VALIDATION_FAILED',
	},
	INVALID_EMAIL: {
		message: 'INVALID: email',
		code: 'VALIDATION_INVALID_EMAIL',
	},
	INVALID_PASSWORD: {
		message: 'INVALID: password',
		code: 'VALIDATION_INVALID_PASSWORD',
	},
	INVALID_FIRST_NAME: {
		message: 'INVALID: first name',
		code: 'VALIDATION_INVALID_FIRST_NAME',
	},
	INVALID_LAST_NAME: {
		message: 'INVALID: last name',
		code: 'VALIDATION_INVALID_LAST_NAME',
	},
	INVALID_USER_ROLE: {
		message: 'INVALID: user role must be in [customer, cashier]',
		code: 'VALIDATION_INVALID_USER_ROLE',
	},
	EMAIL_EXIST: {
		message: 'ERROR: email already exist',
		code: 'AUTH_EMAIL_EXIST',
	},
	ACCESS_TOKEN_MISSING: {
		message: 'ERROR: access token is missing',
		code: 'AUTH_ACCESS_TOKEN_MISSING',
	},
	ACCESS_TOKEN_EXPIRED: {
		message: 'ERROR: access token is expired',
		code: 'AUTH_ACCESS_TOKEN_EXPIRED',
	},
	REFRESH_TOKEN_MISSING: {
		message: 'ERROR: refreshToken field is missing',
		code: 'AUTH_REFRESH_TOKEN_MISSING',
	},
	INVALID_TOKEN: {
		message: 'INVALID: token',
		code: 'AUTH_INVALID_TOKEN',
	},
	TOKEN_EXPIRED: {
		message: 'FORBIDDEN: token is expired',
		code: 'AUTH_TOKEN_EXPIRED',
	},
	FORBIDDEN: {
		message: 'FORBIDDEN: you are not Authorized for this resource',
		code: 'AUTH_FORBIDDEN',
	},
}
