var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var bijective = require('./bijective.js');
var Urls = require('./models');

mongoose.connect('mongodb://localhost/url-shortener');

app.use(cors());
app.use(express.static('public'));

app.get('/url/:longUrl', function(req, res){

    var shortUrl = '';

    Urls.findOne({url: req.params.longUrl}, function (err, doc){
        if (doc){
            res.send({'key': bijective.encode(doc._id)});
        } else {

            var newUrl = Urls({
                url: req.params.longUrl
            });

            newUrl.save(function(err) {
                if (err) console.log(err);
                res.send({'success': 1, 'key': bijective.encode(newUrl._id)});
            });
        }

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