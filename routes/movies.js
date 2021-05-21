"use strict";

// Setup
const ROUTER = require("express").Router();
const MOVIE = require("../models/movie");
const { NotFound } = require("../errors");

// Post Requests
ROUTER.post("/create", async(req, res, next) => {
    const NEW_OBJ = {
        title: req.body.title,
        year_released: req.body.year_released,
        actors: req.body.actors,
        reviews: req.body.reviews
    };
    const DOC = new MOVIE (NEW_OBJ); // New document using model
    try {
        await DOC.save();
        res.status(201).send(NEW_OBJ)
    } catch(err) {
        const ERR = new Error(err.message); // Validation from schema provides the appropriate error messages here
        next(ERR);
    }
});

// Get Requests (200 is default HTTP status code)
ROUTER.get("/getAll", async(req, res, next) => {
    try {
        const MOVIES = await MOVIE.find();
        res.send(MOVIES);
    } catch(err) {
        const ERR = new Error("ERROR: Could not retrieve movies!");
        next(ERR);
    }
});

ROUTER.get("/get/:id", async(req, res, next) => {
    try {
        const FOUND = await MOVIE.findById(req.params.id);
        res.send(FOUND);
    } catch(err) {
        const ERR = new NotFound("ERROR: Could not find a movie with that ID");
        next(ERR);
    }
});

// Put Requests
ROUTER.put("/update/:id", async(req, res, next) => {
    try{
        const UPDATED = await MOVIE.findByIdAndUpdate(
            {_id: req.params.id}, 
            {title: req.query.title},
            {new: true}
        );
        res.status(202).send(UPDATED);
    } catch(err) {
        const ERR = new NotFound("ERROR: Could not find a movie with that ID");
        next(ERR);
    }
});

// Delete Requests
ROUTER.delete("/delete/:id", async(req, res, next) => {
    try {
        await MOVIE.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch(err) {
        const ERR = new NotFound("ERROR: Could not find a movie with that ID");
        next(ERR);
    }
});

// Export
module.exports = ROUTER;
