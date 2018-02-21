var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// [configure body parser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [router]
app.get('/', function (req, res) {
    res.send('Hello World!')
}); // default page

app.get('/user/:userId', function(req, res){
    var User = mongoose.model('User', userSchema)
    var query = User.find({id: req.params.userId}, 'id password name');
    query.exec(function (err, docs) {
        res.send(docs);
        return;
    });
});

app.post('/user', function (req, res) {
    const user = new User(
        { id: req.body.id, password: req.body.password, name: req.body.name }
    );
    user.save();
    res.send('user created');
}); // create user

app.put('/user/:userId', function (req, res) {
    res.send('PUT (Update) ');
}); // edit user

app.delete('/user/', function (req, res) {
    var User = mongoose.model('User', userSchema)
    User.deleteOne({id: req.body.id}, function (err, docs) {
        res.send(docs);
        return;
    });
}); // delete user


// [run server]
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

// [connect db]
const mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/test');

// [models]
var userSchema = mongoose.Schema({
    id: String, password: String, name:String
});

var User = mongoose.model('User', userSchema);