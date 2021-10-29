const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')
const moment = require('moment')

router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  Category.findOne({ name: category })
    .lean()
    .then((categoryItem) => {
      const categoryId = categoryItem._id
      return categoryId
    })
    .then((categoryId) => Expense.create({ name, date, amount, categoryId, userId }))
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
    })
})

router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Expense.findOne({ _id, userId })
    .populate('categoryId', 'name')
    .lean((expense) => {
      expense.category = record.categoryId.name
      expense.date = moment(expense.date).format('YYYY/MM/DD')
      return expense
    })
    .then(expense => res.render('edit', { expense }))
    .catch(error => {
      console.log(error)
    })
})


router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, amount, category } = req.body

  Category.findOne({ name: category })
    .lean()
    .then((categoryItem) => {
      const categoryId = categoryItem._id
      return categoryId
    })
    .then((categoryId) => {
      Expense.findOne({ _id, userId })
        .then(Expense => {
          Expense.name = name
          Expense.categoryId = categoryId
          Expense.date = date
          Expense.amount = amount
          return Expense.save()
        })

    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expense.findOne({ _id, userId })
    .then((expense) => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})








module.exports = router