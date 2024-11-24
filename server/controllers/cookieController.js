const db = require('../models/foodbankModel');

const cookieController = {};

cookieController.addCookie = (req, res, next) => {
  console.log('entered addCookie');

  // only add the cookie if the user was verified or just created a new account
  if ('zipcode' in res.locals) {
    res.cookie('zipcode', res.locals.zipcode);
  }

  return next();
};

cookieController.checkForCookie = (req, res, next) => {
  console.log('entered checkForCookie');
  console.log(req.cookies);


  res.locals.authenticated = 'zipcode' in req.cookies;

  next();
};


module.exports = cookieController;
