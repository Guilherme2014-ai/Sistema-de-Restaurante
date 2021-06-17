const express = require('express')
const session = require('express-session')
const flash = require('flash')
const PORT = process.env.PORT || 80

const app = express()

//===========Config============================
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './views')

//===========Session============================
app.use(session({
    secret: 'gabrielViado2014',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // || secure: true
}))
app.use(flash())

//===========Routes============================
app.use('/', require('./routers/public'))
app.use('/admin', require('./routers/admin'))

//===========Listen============================
app.listen(PORT,(err) => {err ? console.error(err) : console.log(`Server is Running at: ${PORT}`)})

// Context: Session Already Created...