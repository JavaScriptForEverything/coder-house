require('dotenv').config()
const dbConnect = require('./models/dbConnect')
const app = require('./app')

const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {

	await dbConnect()
	console.log(`server listen on: http://localhost:${PORT}`)
})