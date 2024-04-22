import cookieParser from 'cookie-parser'
import express from 'express'
import { ROUTES } from './constants/routes.js'
import { rootErrorMiddleware } from './middleware/error.middleware.js'
import { authRoutes } from './routes/auth.routes.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(ROUTES.AUTH.ROOT, authRoutes) //initialize routes

//? Root Error Middleware
app.use(rootErrorMiddleware)

export { app }
