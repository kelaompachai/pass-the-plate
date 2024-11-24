const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController');
const listingsController = require('./controllers/listingsController');
const cookieController = require('./controllers/cookieController');

const app = express();

// parse the req.body, the cookies, and urlencoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('/', cookieController.checkForCookie, (req, res) => {
  // if browser has session cookie, send homepage
  if (res.locals.authenticated) res.sendFile(path.join(__dirname, '..', 'dist', 'home.html'));
  // otherwise send authentication page
  else res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.get('/login.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'login.bundle.js'));
});

app.get('/home.bundle.js', cookieController.checkForCookie, (req, res) => {
  if (res.locals.authenticated) res.sendFile(path.join(__dirname, '..', 'dist', 'home.bundle.js'));
  else res.status(403).send();
});

app.post('/signup', userController.createUser, cookieController.addCookie, (req, res) => {
  res.redirect('/');
});


app.post('/login', userController.verifyUser, cookieController.addCookie, (req, res) => {
  res.redirect('/');
});


app.get('/listings', userController.findListings, (req, res) => {
  console.log('made it to redirect');
  console.log(res.locals.listings);
  res.cookie('listing', res.locals.listings);
  // console.log('this is the find listing controller function:', req.body);
  // console.log('listings data made it to the server: ', res.locals.listings)
  res.status(200).json(res.locals.listings);
});

app.post('/postlisting', userController.postListing, (req, res) => {
  console.log('successfully posted listing in database');
  res.send(200);
});

app.post('/postcomment', userController.postComment, (req, res) => {
  res.send(200);
});

app.get('/comments', userController.getComments, (req, res) => {
  res.send(200).json(res.locals.comments);
});

app.listen(1234, () => {
  console.log('Listening on port 1234');
});
