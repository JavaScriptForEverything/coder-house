const express = require('express')
const errorController = require('./controllers/errorController')

const userRouter = require('./routes/userRoutes')
const otherRouter = require('./routes/otherRoutes')

const app = express()
app.use(express.json()) 	// req.body json parse

app.use('/api/users', userRouter)
app.use('/api', otherRouter)

app.use(errorController.errorHandler)
app.all('*', errorController.pageNotFound)


module.exports = app