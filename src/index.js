const express = require('express')
const knex = require('./database/index')
const PORT = process.env.PORT || 80

const public = require('./controllers/public')

const app = express()

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './views')


app.use('/', public)


app.listen(PORT,(err) => {err ? console.error(err) : console.log(`Server is Running at: ${PORT}`)})