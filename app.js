const express = require('express')
const exphbs = require('express-handlebars');
const app = express()
const routes = require('./routes')
const flash = require('connect-flash')
const session = require('express-session')
const usePassport = require('./config/passport')
require('./config/mongoose')




app.use(routes)

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})