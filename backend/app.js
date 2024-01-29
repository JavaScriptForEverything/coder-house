const express = require('express')
const cors = require('cors')
const errorController = require('./controllers/errorController')

const userRouter = require('./routes/userRoutes')
const otherRouter = require('./routes/otherRoutes')

const app = express()
app.use(cors({ 
	origin: ['http://localhost:3000'],
	credentials: true, 			// if fetch(url, { ... credentials: 'include' })
}))
app.use(express.json()) 	// req.body json parse

app.use('/api/users', userRouter)
app.use('/api', otherRouter)

app.use(errorController.errorHandler)
app.all('*', errorController.pageNotFound)


module.exports = app