"use strict";

const Jobs = require('./models/jobs');
const delay = 3000;
const doCycle = () => {
    console.log('starting work cycle....');
    setTimeout(() => {
        console.log('finding job');
        Jobs.findOne({status: 'new'}).sort({created_unixtime: 1}).exec()
            .then(job => {
                if (job) {
                    console.log('working job', job.toJSON());
                    job.work()
                        .then((result) => {
                            console.log('DONE working job', result);
                            doCycle();
                        }, (err) => {
                            console.log('error working job', job, err);
                            doCycle();
                        });
                } else {
                    console.log('no job found');
                    doCycle();
                }
            }, err => {
                console.log('error working jobs: ', err);
                doCycle();
            });
    }, delay);
};

module.exports = doCycle;
