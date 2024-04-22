export const ACCESS_TOKEN = 'access-token'
export const REFRESH_TOKEN = 'refresh-token'
//if values of user roles is changed make sure to change in schema.prisma UserRoles enum as well
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  CASHIER: 'CASHIER',
  CUSTOMER: 'CUSTOMER',
}
//errors thrown by libraries
export const ERRORS = {
  JWT_EXPIRED: 'TokenExpiredError',
  JWT_INVALID: 'JsonWebTokenError',
}
