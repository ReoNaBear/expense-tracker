const express = require('express')
const exphbs = require('express-handlebars');
const app = express()
const routes = require('./routes')
require('./config/mongoose')




app.use(routes)

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})