const db = require('../models/foodbankModel');

const cookieController = {};

cookieController.addCookie = (req, res, next) => {
  console.log('entered addCookie');
  res.cookie('username', res.locals.username);
  return next();
};

cookieController.checkForCookie = (req, res, next) => {
  console.log('entered checkForCookie');
};


module.exports = cookieController;
