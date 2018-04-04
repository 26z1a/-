var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {

  fs.readFile('./public/data/type/types.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      var types = JSON.parse(data);
      console.log('types load success');
      res.render('index', {active:'index',types:types});
    }
  });
});

module.exports = router;