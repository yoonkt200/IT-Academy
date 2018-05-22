var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var bijective = require('./bijective.js');
var Urls = require('./models');

// success code
var SUCCESS = 1;
var ALREADY_HAS = 2;

mongoose.connect('mongodb://localhost/url-shortener');

app.use(cors());
app.use(express.static('public'));


app.get('/url/:longUrl', function(req, res){

    Urls.findOne({url: req.params.longUrl}, function (err, doc){
        if (doc){
            res.send({'success': ALREADY_HAS, 'key': bijective.encode(doc._id)});
        } else {

            var newUrl = Urls({
                url: req.params.longUrl
            });

            newUrl.save(function(err) {
                if (err) console.log(err);
                res.send({'success': SUCCESS, 'originalURL': newUrl.url, 'shortURL': bijective.encode(newUrl._id),
                    '_id': newUrl._id, 'created': newUrl.created_at});
            });
        }

    });

});


app.get('/api/getList', function(req, res){

    Urls.find({}, function(err, docs) {
        if (!err){
            res.send(docs);
        } else {throw err;}
    });

});


app.get('/:key', function(req, res){

    var id = bijective.decode(req.params.key);

    Urls.findOne({_id: id}, function (err, doc){
        if (doc) {
            res.redirect(doc.url);
        } else {
            res.redirect("/");
        }
    });

});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});