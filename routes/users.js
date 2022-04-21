var express = require('express');
var router = express.Router();
var validator = require('../lib/validator.js');
var template = require('../lib/template.js');
var app = express();
var fs = require('fs');

app.use(express.json());
/* GET users listing. */

router.get('/', function(req, res) {
  fs.readFile('data/userdata.json', 'utf8', function(err, data){
    console.log(data);
    var title = ' - users';
    var html = template.HTML(title,
      `
      <form action="/users/process" method="post">
        <p>
          <textarea name="data">${data}</textarea>
        </p>
        <p>
          <input type="submit" name="post">
        </p>
      </form>
    `
      );
    res.send(html);
  });
});


router.post('/process', function(req, res) {
  var joons = JSON.parse(req.body.users1);
  for (var name in req.body)
  {
    console.log('key', name, 'value', typeof(req.body[name]))
  }
  //console.log(req.body.length);
  //console.log("bbb", joons, typeof(joons), joons.user);
    try
    {
      
        var user_data = validator.validUser(joons.user, joons.key);

        //err throw
        //에러 발생 함수
        //const user_data2 = validator.validUser2(req.body.user, req.body.key);
        //throw "error";

        //모듈에 없는 함수
        //const user_data3 = validator.validUser3(req.body.user, req.body.key);

        res.json(user_data);
        console.log(user_data);
    }
    catch(e)
    {
        res.json({user:req.body.user, status:"FAILED", reason:""});
    }
});

module.exports = router;
