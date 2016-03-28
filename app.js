var port = 4000;

var express = require('express');
var templateEngine = require('ejs-locals');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

var nav = [{
    Link: '/todoList',
    Text: "Todo List"
}];
//Views set up
app.set('views', 'src/views');
app.engine('ejs', templateEngine);
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello',
        nav: nav
    });
});

//Routers
var todoRouter = require('./src/routes/todoRoute')(nav);

app.use('/todoList', todoRouter);

app.listen(port, function (err) {
    console.log('running server on port:' + port);
});