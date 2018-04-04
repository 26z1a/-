var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('./public/data/type/types.json','utf8',function(err,data){
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      var types = JSON.parse(data);
      console.log('types load success');
      res.render('types', types);
    }
  });
});

router.post('/add',function(req,res,next){
  var obj = req.body;

  fs.readFile('./public/data/type/types.json','utf8',function(err,data){
    if(err){
      console.log(err);
      res.sendStatus(500);
      res.end(err);
    }
    else{
      types = JSON.parse(data);
      //console.log(types);
      types.countTypes++;
      types.types.push({
        "id":types.countTypes,
        "name":obj.name
      });
      

      json = JSON.stringify(types);
      fs.writeFile('./public/data/type/types.json',json,function(err){
        if(err){
          console.log(err);
          res.sendStatus(500);
          res.end(err);
        }
        else{
          res.sendStatus(200);
          res.end();
        }
      });
    }
  });



});

module.exports = router;
