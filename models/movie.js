"use strict";

// Setup
const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

// Create Schemas
const ACTOR_SCHEMA = new SCHEMA ({
    name: {
        type: String,
        required: [true, "Actor must have a name"],
        minlength: 2
    },
    age: {
        type: Number,
        min: [1, "Age must be above 1"],
        max: [120, "Age must be below 120"]
    }
});

const REVIEW_SCHEMA = new SCHEMA ({
    rating: {
        type: Number,
        required: [true, "Review must have a rating"],
        min: [1, "Rating must be between 1 - 5"],
        max: [5, "Rating must be between 1 - 5"]
    },
    publisher: {
        type: String,
        required: [true, "Review must have a publisher"],
        minlength: 2
    }
});

const MOVIE_SCHEMA = new SCHEMA({
    title: String,
    year_released: {
        type: Number,
        min: [1900, "minimum year is 1900"],
        max: [2021, "maximum year is 2021"]
    },
    actors: [ACTOR_SCHEMA],   // Can use single nested subdocuments if ver >= 4.2.0
    reviews: [REVIEW_SCHEMA] // E.g. reviews: REVIEW_SCHEMA 
});

module.exports = MONGOOSE.model("Movie", MOVIE_SCHEMA);
