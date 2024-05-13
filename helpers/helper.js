import prisma from '../config/db.config.js'

export function createError(status, message) {
	const error = new Error(message)
	error.status = status
	return error
}

export async function emailExists(email) {
	const user = await prisma.user.findFirst({ where: { email } })
	return !!user
}
