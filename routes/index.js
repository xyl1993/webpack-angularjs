var express = require('express');
var fs=require('fs');
var router = express.Router();
//var userDao = require('../dao/userDao');
var log = require('log4js').getLogger("index");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. end*/

/* POST method */
router.post('/getMainWraper', function(req, res, next) {
	    // 设置编码格式  
   
});
/* POST method end*/
module.exports = router;
