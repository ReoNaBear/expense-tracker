const mongoose = require('mongoose')
const Expense = require('../expense.js')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')



})