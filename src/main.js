const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const { routes } = require('./routes')
const basicAuth = require('express-basic-auth')

const app = express()

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(methodOverride('X-HTTP-Method-Override'))

// //CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// Routes
routes.map(item =>
  app.use(
    `/api/v1/${item}`, 
    require(`./routes/${item}.js`)
  )
)

module.exports = app
