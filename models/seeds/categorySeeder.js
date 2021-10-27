const db = require('../../config/mongoose')
const Category = require('../category')
const categorySeeds = require('./seed.json').categorySeeds

db.once('open', () => {
  return Category.create(categorySeeds)
    .then(() => {
      console.log('Category Create Success!')
      process.exit()
    })
    .catch((err) => console.log(err))
})