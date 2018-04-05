var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    

        if(fs.existsSync('./public/data/type/types.json')){
        var types = JSON.parse(fs.readFileSync('./public/data/type/types.json', 'utf8'));      
        console.log('types loaded');
        }
        else{
          res.end('./public/data/type/types.json 不存在');
          console.log('failed load exos');  
        }
   
        if(fs.existsSync('./public/data/exo/exos.json')){
        var exos = JSON.parse(fs.readFileSync('./public/data/exo/exos.json', 'utf8'));
        console.log('exos loaded');
        }
        else{
          res.end('./public/data/exo/exos.json 不存在');  
          console.log('failed load exos');         
        }
    res.render('exo',{
      acitve : 'exos',
      types : types,
      exos : exos
    });
});

router.post('/mod', function (req, res, next) {

  if(fs.existsSync('./public/data/exo/exos.json')){
    fs.readFile('./public/data/exo/exos.json','utf8',function(err,data){
      if(err){
        console.log(err);
        res.sendStatus(500);
        res.end(err);
      }
      else{
        exos = JSON.parse(data);
        //console.log(exo);

        mod = req.body;
        mod.typeId = parseInt(mod.typeId);

        var pos = exos.exos.map(function(e){return e.id}).indexOf(mod.id);

        // console.log(mod);
        // console.log(exos.exos[pos]);
        // exos.exos[pos] = mod;

        exos.exos[pos].typeId = mod.typeId;
        exos.exos[pos].question = mod.question;
        exos.exos[pos].answer = mod.answer;
        //console.log(pos);

        json = JSON.stringify(exos);
        fs.writeFile('./public/data/exo/exos.json',json,function(err){
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
  })
}

});





router.post('/add',function(req,res,next){
  var obj = req.body;
  //console.log(obj);

  fs.readFile('./public/data/exo/exos.json','utf8',function(err,data){
      if(err){
        console.log(err);
        res.sendStatus(500);
        res.end(err);
      }
      else{
        exos = JSON.parse(data);
        //console.log(exos);
        exos.countExos++;
        exos.exos.push({
          "id":exos.countExos,
          "typeId":parseInt(obj.typeId),
          "question":obj.question,
          "answer":obj.answer
        });

        json = JSON.stringify(exos);
        fs.writeFile('./public/data/exo/exos.json',json,function(err){
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
  })

});

router.get('/get',function(req,res,next){
  var typeId = req.param('typeId');

  fs.readFile('./public/data/exo/exos.json','utf8',function(err,data){
    if(err){
      console.log(err);
      res.sendStatus(500);
      res.end(err);
    }
    else{
      exos = JSON.parse(data);
      var count = 0;
      var q = [];
      for(var i=0;i<exos.countExos;i++){
        if(exos.exos[i].typeId==typeId){
          count++;
          q.push(exos.exos[i]);
        }
      }
      var output = JSON.stringify(q[Math.floor(Math.random()*count)]);
      //console.log(output);
    }
  res.json(output);
  });

  
});

module.exports = router;