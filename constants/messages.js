export const MESSAGES = {
  SUCCESS: {
    AUTH: {
      SIGNUP: 'SIGN UP: SUCCESS',
      LOGOUT: 'LOGOUT: SUCCESS',
    },
    ACCESS_TOKEN_REFRESHED: 'SUCCESS: access tokens is refreshed',
    ACCESS_TOKEN_VALID: 'SUCCESS: access tokens is valid',
  },
  ERROR: {
    AUTH: {
      SIGNUP: 'SIGN UP: ERROR ->',
    },
  },
  USER_NOT_FOUND: 'USER not found',
  VALIDATION_ERROR: 'VALIDATION is failed ->',
  INVALID_EMAIL: 'INVALID: email',
  INVALID_PASSWORD: 'INVALID: password',
  INVALID_FIRST_NAME: 'INVALID: first name',
  INVALID_LAST_NAME: 'INVALID: last name',
  INVALID_USER_ROLE: 'INVALID: user role must be in [customer, cashier]',
  EMAIL_EXIST: 'ERROR: email already exist',
  ACCESS_TOKEN_MISSING: 'ERROR: access token is missing',
  REFRESH_TOKEN_MISSING: 'ERROR: refreshToken field is missing',
  INVALID_TOKEN: 'INVALID: token',
  TOKEN_EXPIRED: 'FORBIDDEN: token is expired',
  FORBIDDEN: 'FORBIDDEN: you are not Authorized for this resource',
}
