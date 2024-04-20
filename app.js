import 'dotenv/config'
import express from 'express'
import { routes } from './routes/index.routes.js'
import { rootErrorMiddleware } from './middleware/error.middleware.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(routes) //initialize routes

//? Root Error Middleware
app.use(rootErrorMiddleware)

//start server
app.listen(process.env.PORT, () => {
	console.log(`server is running on port ${process.env.PORT}`)
})
