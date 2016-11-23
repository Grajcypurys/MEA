var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public'), {
  render: {
    compress:true
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);
mongoose.connect('mongodb://localhost/test');

// LOAD ALL FILES IN MODELS DIR
fs.readdirSync(__dirname + '/models').forEach(function(filename){
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

// mongoose.model('users', {name: String});
// mongoose.model('posts', {content: String});

// app.get('/', function(req, res){
//     res.send('ok');
// })
app.get('/users', function(req, res){
    mongoose.model('users').find(function(err, users){
        res.send(users);
    })
})
app.get('/orders', function(req, res){
    mongoose.model('orders').find(function(err, orders){
        res.send(orders);
    })
})
app.get('/posts', function(req, res){
    mongoose.model('posts').find(function(err, posts){
        res.send(posts);
    })
})
app.post('/orders', function (req, res) {
    var Order = mongoose.model('orders');
    var order1 = new Order(req.body);
    order1.save(function(err) {
        res.json(req.body);
        if (err) throw err;
    });
})
//app.post('/orders', function (req, res, next) {
//    var order = res.json(req.body);
//    order.save(function(err){
//    })
//})
app.get('/posts/:userId', function(req, res){
    mongoose.model('posts').find({user: req.params.userId}, function(err, posts){
        mongoose.model('posts').populate(posts, {path: 'user'}, function(err, posts){
            res.send(posts);
        })
    })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
