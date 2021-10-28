const express = require('express')
const exphbs = require('express-handlebars');
const session = require('express-session')
const app = express()
const routes = require('./routes')
const flash = require('connect-flash')

const usePassport = require('./config/passport')
require('./config/mongoose')






app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})