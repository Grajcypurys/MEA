var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: '' });
// });

router.get('/', function (req, res) {
    res.render('index', {
        title: "JQuery AJAX",
        partials: {head: 'head', orders: 'orders', scripts: 'scripts'}
    })
})


module.exports = router;
