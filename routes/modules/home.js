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




router.put('/', async (req, res) => {
  const userId = req.user._id
  const { category, month } = req.body
  const filter = { userId }
  const categoryType = category ? await Category.findOne({ name_tw: category }).lean() : ''
  categoryType ? filter.categoryId = categoryType._id : ''
  const categoryName = categoryType ? categoryType.name_en : ''
  month ? filter.date = { $gte: month, $lt: moment(month).add('1', 'M') } : ''
  console.log(categoryType)
  console.log(categoryName)
  let totalAmount = 0


  await Expense.find(filter)
    .populate('categoryId', 'icon')
    .sort({ date: -1 })
    .lean()
    .then((expenses) => {
      for (let expense of expenses) {
        expense.date = moment(expense.date).format('YYYY-MM-DD')
        expense.icon = expense.categoryId.icon
        totalAmount += expense.amount
      }
      if (categoryName === '') {
        return res.render('home', { expenses, totalAmount, month })
      } else {
        return res.render('home', { expenses, totalAmount, month, categoryName })
      }
    })
    .catch((error) => console.log(error))
})



router.get('/new', (req, res) => {
  res.render('new')
})

module.exports = router