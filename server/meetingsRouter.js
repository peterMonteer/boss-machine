const express = require('express');
const db = require('./db');
const meetingsRouter = express.Router();
const modelName = 'meetings';

meetingsRouter.get('/', (req,res,next) => {
    const meetings = db.getAllFromDatabase(modelName);
    if(meetings) {
        res.status(200).send(meetings);
    } else {
        res.status(404).send('There are no meetings')
    }
})

meetingsRouter.delete('/', (req,res,next) => {
    res.status(204).send(db.deleteAllFromDatabase(modelName));
})


meetingsRouter.post('/', (req,res,next) => {
    const newMeeting = db.addToDatabase(modelName, db.createMeeting())
    res.status(201).send(newMeeting);
})



module.exports = meetingsRouter;