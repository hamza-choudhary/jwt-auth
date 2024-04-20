export const MESSAGES = {
	SUCCESS: {
		AUTH: {
			SIGNUP: 'SIGN UP: SUCCESS',
		},
	},
	ERROR: {
		AUTH: {
			SIGNUP: 'SIGN UP: ERROR ->',
		},
	},
	USER_NOT_FOUND: 'USER not found',
	VALIDATION_ERROR: 'VALIDATION is failed ->',
	INVALID_EMAIL: 'INVALID: email',
	INVALID_PASSWORD: 'INVALID: email',
	INVALID_USER_ROLE: 'INVALID: user role must be in [customer, cashier]',
	EMAIL_EXIST: 'ERROR: email already exist',
	AUTH_HEADER_MISSING: 'ERROR: Authorization header is missing',
	ACCESS_TOKEN_MISSING: 'ERROR: access token is missing',
	INVALID_ACCESS_TOKEN: 'INVALID: access token',
	ACCESS_TOKEN_EXPIRED: 'FORBIDDEN: access token is expired',
  FORBIDDEN: 'FORBIDDEN: you are not Authorized for this resource'
}
