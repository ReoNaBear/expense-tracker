const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')


router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  Category.findOne({ name: category })
    .lean()
    .then((categoryItem) => {
      const categoryId = categoryItem._id
      console.log(categoryId)
      return categoryId
    })
    .then((categoryId) => Expense.create({ name, date, amount, categoryId, userId }))
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(categoryId)
    })
})










module.exports = router