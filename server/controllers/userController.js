const db = require('../models/foodbankModel');


const userController = {};

let userReqBod;
// let newUserReqBod;

userController.verifyUser = (req, res, next) => {
  console.log('entered userController.verifyUser');
  console.log('req.body in verifyUser: ', req.body);

  const params = [req.body.username, req.body.password];
  const query = 'SELECT username, password, zipcode FROM "users" WHERE username = $1 AND password = $2;';


  // find user in database
  db.query(query, params)
    .then((data) => {
      if (data.rows.length === 1) {
        console.log('user found!', data.rows);
        res.locals.zipcode = data.rows[0].zipcode;
      }
      return next();
    })
    .catch((err) => {
      console.error('Error in verifyUser middleware: ', err);
    });
};

let recentData;

userController.findListings = (req, res, next) => {
  console.log('made it to findListings controller');
  const queryString = `SELECT l.*, u.username FROM listing l inner join "user" u on u.id = l.user_id WHERE l.zipcode = ${req.cookies.zipcode}`;
  // testing route handler for finding listing based on zipcode

  db.query(queryString)
    .then((data) => {
      console.log('data from listings', data.rows);
      res.locals.listings = data.rows;
      return next();
    })
    .catch((err) => console.error('Error in findListings middleware: ', err));

  // Query SQL DB for SELECT * WHERE userReqBody === zipcode_id
  // res.locals.listings = 'database response';
};

let listingReqBod;

userController.postListing = (req, res, next) => {
  listingReqBod = req.body;
  console.log('posting a listing thru postman: ', listingReqBod);
  const queryString = `INSERT INTO listing (title, listing_body, zipcode, user_id) VALUES ('${listingReqBod.title}', '${listingReqBod.listingBody}', ${req.cookies.zipcode}, ${req.cookies.userID})`;
  db.query(queryString)
    .then((data) => next())
    .catch((err) => console.error('Error in postListing middleware: ', err));
};

let commentReqBod;

userController.postComment = (req, res, next) => {
  commentReqBod = req.body;
  console.log('posting a comment thru postman: ', commentReqBod);
  const queryString = 'INSERT INTO comment (comment_body)';
};

userController.getComments = (req, res, next) => {
  console.log('made it to getComments controller');
  const queryString = `SELECT comment_body FROM comment WHERE listing_id = ${req.cookies.id}`; // testing route handler for finding listing based on zipcode

  db.query(queryString)
    .then((data) => {
      // console.log('data from listings', data.rows)

      res.locals.comments = data.rows;
      return next();
    })
    .catch((err) => console.error('Error in findListings middleware: ', err));
};


userController.createUser = (req, res, next) => {
  console.log('entered createUser');
  console.log(req.body);

  // create user in database
  const params = [req.body.username, req.body.password, req.body.zipcode];
  const query = 'INSERT INTO users VALUES ($1, $2, $3);';

  db.query(query, params)
    // if user is created successfully, go to set cookie middleware
    .then((response) => {
      res.locals.zipcode = req.body.zipcode;
      next();
    })
    // otherwise go to universal error handler
    .catch((err) => next(err.error));
};


module.exports = userController;
