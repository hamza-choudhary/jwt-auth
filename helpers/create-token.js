import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN } from '../constants/global-constant.js'

export function createToken(payload, expiryTime, type = ACCESS_TOKEN) {
  jwt.sign(payload, ACCESS_TOKEN, )
}
