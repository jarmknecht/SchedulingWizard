var express = require('express');
var router = express.Router();

const CLASSES = 'classes';

const MongoClient = require('mongodb').MongoClient

var db;

MongoClient.connect('mongodb://jbhodges:1admin1@ds261917.mlab.com:61917/classes', (err, client) => {
  if (err) return console.log(err);
  db = client.db('classes'); // whatever your database name is
  console.log('connected to db');
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/classes/add', function (req, res, next) {
  let classes = req.body.value;

  // console.log(classes[10], classes[10].classes.thursday, classes[10].classes.tuesday);

  // res.json('good');
  // return;

  db.collection(CLASSES).insertMany(classes, (err, result) => {
    if (err) reject(err);

    console.log('saved to database');
    res.json('sucess!');
  });
});

router.get('/classes/all', function (req, res, next) {
  db.collection(CLASSES).find().toArray((err, result) => {
    if (err) return console.log(err);

    res.json(result);
  });
});

module.exports = router;