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
        console.log(err.message);
    }
});

// Get Requests (200 is default HTTP status code)
ROUTER.get("/getAll", async(req, res) => {
    try {
        const MOVIES = await MOVIE.find();
        res.send(MOVIES);
    } catch(err) {
        console.log(err.message);
    }
});

ROUTER.get("/get/:id", async(req, res) => {
    try {
        const MOVIES = await MOVIE.find();
        res.send(MOVIES);
    } catch(err) {
        console.log(err.message);
    }
});

ROUTER.get("/get/:id", (req, res) => res.send(PPL[req.params.id]));

// Put Requests
// ROUTER.put("/update/:index", (req, res) => {
//     res.status(202).send(;
// });

// Delete Requests
// ROUTER.delete("/delete/:id", (req, res) => {
//     res.status(202).send();
// });

// Export
module.exports = ROUTER;
