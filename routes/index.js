var express = require('express');
var app = express();
var router = express.Router();
var validator = require('../lib/validator.js');
var template = require('../lib/template.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

var users = [
  { "user": "mopic1", "key": "test_key1", "expiration_date": "20220615" },
  { "user": "mopic2", "key": "test_key2", "expiration_date": "20210615" },
  { "user": "mopic3", "key": "test_key3", "expiration_date": "20230615" }
];

router.get('/', function (req, res) {
  var title = ' users';
  //console.log(users[0]);
  var user1 = JSON.stringify(users[0]);
  var user2 = JSON.stringify(users[1]);
  var user3 = JSON.stringify(users[2]);
    var html = template.HTML(title,
      `
      <form action="/process" method="post">
        <p>
          <textarea name="users1">${user1}</textarea>
          <textarea name="users2">${user2}</textarea>
          <textarea name="users3">${user3}</textarea>
        </p>
        <p>
          <input type="submit" >
        </p>
      </form>
    `
      );
    res.send(html);
});

router.post('/process', function(req, res) {
  var datas;
  var user_data = [];
  for (var name in req.body)
  {
    //console.log('key', name, 'value', req.body[name])
    datas = JSON.parse(req.body[name]);
    user_data.push(validator.validUser(datas.user, datas.key));
  }

  try
  {
      res.json(user_data);
      //console.log(user_data);
  }
  catch(e)
  {
      res.json({user:"", status:"FAILED", reason:""});
  }
});

module.exports = router;
