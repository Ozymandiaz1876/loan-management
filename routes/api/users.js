const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/user");
const Loan = require("../../models/loan");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// add new loan application
router.post("/addloan", (req, res) => {
  const loan = new Loan({
    user: req.body.user,
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact,
    email: req.body.email,
    loanamount: req.body.loanamount,
    loanstartdate: req.body.loanstartdate,
    loanexpirydate: req.body.loanexpirydate,
    monthlyinstallments: req.body.monthlyinstallments,
    fixed: req.body.fixed,
    floating: req.body.floating,
  });
  loan
    .save()
    .then((loan) => {
      if (loan) {
        res.status(201).json({
          message: "Application added successfully",
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

router.get("/myapplication", (req, res, next) => {
  Loan.find({ user: req.headers.user })
    .then((loan) => {
      if (loan) {
        res.status(200).json({
          message: "loans fetched successfully!",
          posts: loan,
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
