const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')
const moment = require('moment')



router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const expenses = await Expense.find({ userId })
      .populate('categoryId', 'icon')
      .sort({ _id: 'asc' })
      .lean()
    let totalAmount = 0
    for (let expense of expenses) {
      expense.date = moment(expense.date).format('YYYY-MM-DD')
      expense.icon = expense.categoryId.icon
      totalAmount += expense.amount
    }
    return res.render('home', { expenses, totalAmount })
  } catch (err) {
    console.log("error")
  }
})

router.put('/', (req, res) => {
  const userId = req.user._id
  const { category, month } = req.body
  const filter = { userId }
})

router.get('/new', (req, res) => {
  res.render('new')
})

module.exports = router