const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LoanSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  loanamount: {
    type: Number,
    required: true,
  },
  loanstartdate: {
    type: String,
    required: true,
  },
  loanexpirydate: {
    type: String,
    required: true,
  },
  monthlyinstallments: {
    type: Number,
    required: true,
  },
  fixed: {
    type: Boolean,
    required: true,
  },
  floating: {
    type: Boolean,
    required: true,
  },
});
module.exports = Loan = mongoose.model("loan", LoanSchema);
