const express = require('express');
const hbs = require('express-handlebars');

const app = express();
const jsonBodyParser = express.json();
const urlencodedBodyParser = express.urlencoded({extended: true});

const users = [
    {name: "Ivan", age: 29},
    {name: "Peter", age: 23}
];

function logRequestDate(req, res, next) {
    console.log(new Date());
    console.log(users);

    next()

}

app.engine('.hbs', hbs({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(logRequestDate);

app.use(jsonBodyParser);
app.use(urlencodedBodyParser);

app.use('/static', express.static('./static'));

app.get('/', function (req, res) {
    res.render('home', {users})
    //res.sendFile(path.resolve('./index.html'))
});

app.get('/about', function (req, res) {
    res.render('about', {text: 'This is about!'})
    //res.sendFile(path.resolve('./index.html'))
});

app.get('/user/:idx', function (req, res) {
    const selectedUser = users[req.params.idx];
    res.render('home', {users, selectedUser, selectedUserIndex: req.params.idx})
});

app.post('/user/:idx', function (req, res) {
    console.log(req.body);
    const {name, age} = req.body;
    users[req.params.idx] = {name, age:+age};
    res.redirect('/')
});

app.post('/user', function (req, res) {
    const {name, age} = req.body;
    users.push({name, age: +age});
    res.redirect('/')
});
app.post('/', jsonBodyParser, function (req, res) {
    console.log(req.body);
    res.send(req.body)
});

app.listen(3000, function () {
    console.log('App listening to port 3000')
});
