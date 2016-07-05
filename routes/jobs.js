"use strict";

var express = require('express');
var router = express.Router();
var JobsModel = require('./../models/jobs');

/* GET home page. */
router.get('/', function (req, res, next) {
    JobsModel.find({}, {content: 0}).sort({created_unixtime: -1}).exec()
        .then((jobs) => res.send(jobs));
});

router.post('/', (req, res, next) => {
    new JobsModel(req.body).save().then((result) => {
        if (req.body['redirect-to-view']){
            res.redirect('/');
        } else {
            res.send(result);
        }
    });
});

router.get('/reset', function (req, res, next) {
    JobsModel.find({}).remove().exec().then(() => {
        res.send({message: 'documents deleted'});
    });
});

router.get('/seed', function (req, res, next) {
    var now = Math.floor(new Date().getTime() / 1000);
    JobsModel.create([
        {
            "url": "http://www.google.com"
        },
        {
            "url": "http://www.gamespot.com",
            "created_unixtime": now - 1000,
            "updated_unixTime": now - 1000
        }
    ], (err, jobs) => {
        if (err) {
            next(err)
        } else {
            res.send(jobs);
        }
    });
});

module.exports = router;
