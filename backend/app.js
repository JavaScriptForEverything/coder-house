const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorController = require('./controllers/errorController')

const authRouter = require('./routes/authRoutes')
const fileRouter = require('./routes/fileRoutes')
const roomRouter = require('./routes/roomRoutes')

const app = express()
app.use(cookieParser())
app.use(cors({ 
	origin: ['http://localhost:3000'],
	credentials: true, 			// if fetch(url, { ... credentials: 'include' })
}))
app.use(express.json()) 	// req.body json parse

app.use('/api/auth', authRouter)
app.use('/api/rooms', roomRouter)
app.use('/upload/*', fileRouter)

app.use(errorController.errorHandler)
app.all('*', errorController.pageNotFound)


module.exports = app