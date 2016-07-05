"use strict";
const mongoose = require('./mongoose');
const request = require('request');

let JobsModel;
const schema = new mongoose.Schema(require('./jobs.json'), {collection: 'Jobs'});
const FAILSAFE_TIME = 10 * 1000;

schema.methods.work = function () {
    console.log('record ', this._id, 'working');
    this.status = 'working';
    let failsafe = setTimeout(() => {
        this.makeError('timeout');
        console.log('timeing out for ', this.url);
    }, FAILSAFE_TIME);
    return this.save()
        .then(() => this.load())
        .then(() => {
            console.log('after load:', this);
            clearTimeout(failsafe);
            if (!(this.status === 'error')) {
                this.status = 'done';
                return this.save();
            }
        }, (err) => {
            if (err && err.message) {
                this.makeError(err.message);
            }
        });
};

schema.methods.makeError = function(msg) {
    this.status = "error";
    this.error = msg;
    return this.save();
};

schema.methods.load = function () {
    console.log('loading', this.url);
    return new Promise((respond, reject) => {
        let content = '';
        request.get(this.url)
            .on('data', (buffer) => {
                content += buffer.toString();
            })
            .on('end', () => {
                console.log('end with ', this.url);
                this.content = content;
                this.status = "done";
                respond(this);
            })
            .on('error', (err) => {
                console.log('load error: ', load);
                this.makeError(err.message);
                reject(err);
            });
    });
};

schema.pre('save', function (next) {
    const now = Math.floor(new Date().getTime() / 1000);
    if (!this.created_unixtime) {
        this.created_unixtime = now;
    }
    this.updated_unixtime = now;
    next();
});

JobsModel = mongoose.model('Jobs', schema);
module.exports = JobsModel;
