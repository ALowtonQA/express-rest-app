"use strict";

// Setup
const ROUTER = require("express").Router();
const MOVIE = require("../models/movie");
const { NotFound } = require("../errors");

// Post Requests
ROUTER.post("/create", async(req, res, next) => {
    const DOC = new MOVIE (req.body); // New document using model
    try {
        const CREATED = await DOC.save();
        res.status(201).send(CREATED);
    } catch(err) {
        next(new Error(err.message)); // Validation from schema provides the appropriate error messages here
    }
});

// Get Requests (200 is default HTTP status code)
ROUTER.get("/getAll", async(req, res, next) => {
    try {
        const MOVIES = await MOVIE.find();
        (MOVIES.length)? res.send(MOVIES) : next(new Error("ERROR: There are no movies to retrieve"));
    } catch(err) {
        next(new Error(err.message));
    }
});

ROUTER.get("/get/:id", async(req, res, next) => {
    try {
        const FOUND = await MOVIE.findById(req.params.id);
        (FOUND)? res.send(FOUND) : next(new NotFound("ERROR: Could not find a movie with that ID"));
    } catch(err) {
        next(new Error(err.message));
    }
});

// Put Requests
ROUTER.put("/update/:id", async(req, res, next) => {
    try{
        const UPDATED = await MOVIE.findByIdAndUpdate(
            {_id: req.params.id}, 
            req.body,
            {new: true}
        );
        (UPDATED)? res.status(202).send(UPDATED) : next(new NotFound("ERROR: Could not find a movie with that ID"));
    } catch(err) {
        next(new Error(err.message));
    }
});

// Delete Requests
ROUTER.delete("/delete/:id", async(req, res, next) => {
    try {
        const DELETED = await MOVIE.findByIdAndDelete(req.params.id);
        (DELETED)? res.status(204).send() : next(new NotFound("ERROR: Could not find a movie with that ID"));
    } catch(err) {
        next(new Error(err.message));
    }
});

// Export
module.exports = ROUTER;
