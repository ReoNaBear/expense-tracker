const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

router.get('/', (req, res) => {
  res.send('Hello world')
})


module.exports = router