"use strict";

const { GenericError } = require("../errors");

// Custom middleware
let middleware = {
    logError: (err, req, res, next) => {
        console.log(err.stack);
        next(err);
    },
    sendError: (err, req, res, next) => {
        (err instanceof GenericError)? res.status(err.getStatusCode()).send(err.message): res.status(500).send(err.message);
        // if (err instanceof GenericError) {
        //     res.status(err.getStatusCode()).send(err.message);
        // }
        // res.status(500).send(err.message);
    }
}

module.exports = middleware;
