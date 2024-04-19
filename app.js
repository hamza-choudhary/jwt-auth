import 'dotenv/config'
import express from 'express'
import { routes } from './routes/index.routes.js'

const app = express()

app.use(routes)

app.use((error, req, res, _next) => {
	const status = error.status || 500
	const message = error.message || 'Server internal error'
	res.status(status).json({ status: 'error', message })
})

app.listen(process.env.PORT, () => {
	console.log(`server is running on port ${process.env.PORT}`)
})
