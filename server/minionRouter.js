const express = require('express');
const minionRouter = express.Router();
const modelName = 'minions';
const db = require('./db');


minionRouter.param('minionId', (req, res, next, id) => {
    const minion = db.getFromDatabaseById(modelName, id);
    if(minion){
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
    
})

minionRouter.get('/', (req,res,next) => {
    const minions = db.getAllFromDatabase('minions');
    if(minions) {
        res.send(minions);
    } else {
        res.status(404).send('There are no minions')
    }
})

minionRouter.get('/:minionId', (req,res,next) => {
    if(req.minion){
        res.send(req.minion);
    } else {
        res.status(404).send('no')
    }
})

minionRouter.put('/:minionId', (req,res,next) => {
    const updatedMinion = db.updateInstanceInDatabase(modelName, req.body);
    res.send(updatedMinion);
})

minionRouter.delete('/:minionId', (req,res,next) => {
    if(req.minion.id) {
        const deleted = db.deleteFromDatabasebyId(modelName, req.minion.id)
        if(deleted) {
            res.status(204).send();
        }
    } else {
        res.status(500).send();
    }
})


minionRouter.post('/', (req,res,next) => {
    const minion = req.body;
    if(minion){
        const minionAdded = db.addToDatabase(modelName, minion)
        res.status(201).send(minionAdded);
    }
})


module.exports = minionRouter;
