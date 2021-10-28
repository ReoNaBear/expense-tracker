const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

router.get('/', (req, res) => {
  const userId = req.user._id
  Expense.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(expense => res.render('home', { expense }))
    .catch(error => console.error(error))
})


module.exports = router