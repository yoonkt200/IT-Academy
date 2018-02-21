var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/hello', function (req, res) {
    res.send('Hello')
});

app.post('/user', function (req, res) {
    res.send({state: 'OK', data: req.body});
});

app.get('/user/search', function (req, res) {
    var user = {
        userId: req.query.id,
        name: req.query.name,
        email: 'yohany_AT_gmail.com',
        company: 'KossLAB'
    };
    res.send(user);
});

app.put('/user/:userId', function (req, res) {
    res.send('PUT (Update) ');
});

app.delete('/user/:userId', function (req, res) {
    res.send('DELETE (Delete) ');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});