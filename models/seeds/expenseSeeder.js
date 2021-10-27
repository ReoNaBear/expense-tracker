const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const Expense = require('../expense')
const User = require('../user')
const Category = require('../category')
const userSeeds = require('./seed.json').userSeeds
const expenseSeeds = require('./seed.json').expenseSeeds

db.once('open', () => {
  Promise.all(
    Array.from(userSeeds, async (seedUser) => {
      try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(seedUser.password, salt)
        const user = await User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        })
        const userId = user._id
        for (let expense of expenseSeeds) {
          const category = await Category.findOne({ name: expense.category }).lean()
          const categoryId = category._id
          await Expense.create({
            name: expense.name,
            date: expense.date,
            amount: expense.amount,
            userId: userId,
            categoryId: categoryId
          })
        }
      } catch (err) {
        console.log(err)
      }
    }))
    .then(() => {
      console.log('create Seeder success!')
      process.exit()
    })
    .catch(err => console.log(err))
})