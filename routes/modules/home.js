const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')


// router.get('/', (req, res) => {
//   const userId = req.user._id
//   Expense.find({ userId })
//     .populate('categoryId', 'icon')
//     .lean()
//     .sort({ _id: 'asc' })
//     .then(expenses => res.render('home', { expenses }))

//     .catch(error => console.error(error))
// })

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const expenses = await Expense.find({ userId })
      .populate('categoryId', 'icon')
      .sort({ _id: 'asc' })
      .lean()
    // let totalAmount = 0
    for (let expense of expenses) {
      expense.icon = expense.categoryId.icon
      // totalAmount += expense.amount
    }
    return res.render('home', { expenses })
  } catch (err) {
    console.log("error")
  }
})

router.get('/new', (req, res) => {
  res.render('new')
})

module.exports = router