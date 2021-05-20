"use strict";

// Setup
const ROUTER = require("express").Router();
const MOVIE = require("./models/movie");

// Post Requests
ROUTER.post("/create", async(req, res) => {
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
        console.log(err.stack);
        res.status(500).send(err.message);
    }
});

// Get Requests (200 is default HTTP status code)
ROUTER.get("/getAll", async(req, res) => {
    try {
        const MOVIES = await MOVIE.find();
        res.send(MOVIES);
    } catch(err) {
        console.log(err.stack);
        res.status(500).send(err.message);
    }
});

ROUTER.get("/get/:id", async(req, res) => {
    try {
        const FOUND = await MOVIE.findById(req.params.id);
        res.send(FOUND);
    } catch(err) {
        console.log(err.stack);
        res.status(404).send(err.message);
    }
});

// Put Requests
ROUTER.put("/update/:id", async(req, res) => {
    try{
        const UPDATED = await MOVIE.findByIdAndUpdate(
            {_id: req.params.id}, 
            {title: req.query.title},
            {new: true}
        )
        res.status(202).send(UPDATED);
    } catch(err) {
        console.log(err.stack);
        res.status(404).send(err.message);
    }
});

// Delete Requests
ROUTER.delete("/delete/:id", async(req, res) => {
    try {
        await MOVIE.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch(err) {
        console.log(err.stack);
        res.status(404).send(err.message);
    }
});

// Export
module.exports = ROUTER;
