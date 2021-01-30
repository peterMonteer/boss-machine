const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const ideasRouter = express.Router();
const modelName = 'ideas';
const db = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = db.getFromDatabaseById(modelName, id);
    if(idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
})

ideasRouter.get('/', (req,res,next) => {
    const ideas = db.getAllFromDatabase(modelName);
    if(ideas) {
        res.send(ideas);
    } else {
        res.status(404).send('There are no ideas')
    }
})

ideasRouter.get('/:ideaId', (req,res,next) => {
    if(req.idea){
        res.send(req.idea)
    } else {
        res.status(404).send('no')
    }
})

ideasRouter.put('/:ideaId',checkMillionDollarIdea, (req,res,next) => {
    const updatedIdea = db.updateInstanceInDatabase(modelName, req.body);
    res.send(updatedIdea);
})

ideasRouter.delete('/:ideaId', (req,res,next) => {
    if(req.idea.id) {
        const deleted = db.deleteFromDatabasebyId(modelName, req.idea.id)
        if(deleted) {
            res.status(204).send();
        } else {
            res.status(500).send();
        }
    } else {
        res.status(500).send();
    }
})


ideasRouter.post('/', checkMillionDollarIdea, (req,res,next) => {
    const idea = req.body;
    if(idea){
        const ideaAdded = db.addToDatabase(modelName, idea)
        res.status(201).send(ideaAdded);
    }
})


module.exports = ideasRouter;
