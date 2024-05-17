import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { ROUTES } from './constants/index.js'
import { rootErrorMiddleware } from './middleware/index.js'
import { authRoutes, testRoutes } from './routes/index.js'

const app = express()

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
)
app.use(express.json())
app.use(cookieParser())

app.use(ROUTES.AUTH.ROOT, authRoutes) //initialize routes
app.use(ROUTES.TEST.ROOT, testRoutes) //initialize routes

//? Root Error Middleware
app.use(rootErrorMiddleware)

export { app }
