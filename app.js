require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/error')
const authRoute = require('./routes/auth-route')
const billRoute = require('./routes/bill-route')
const fishRoute = require('./routes/fish-route')
const memberRoute = require('./routes/member-route')


const app = express()

app.use(cors())
app.use(express.json())

// service
app.use('/auth', authRoute)
app.use('/bill', billRoute)
app.use('/fish', fishRoute)
app.use('/member', memberRoute)

// notFound
app.use( notFound )

// error
app.use(errorMiddleware)

let port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on Port :', port))