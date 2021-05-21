"use strict";

// Setup
const MONGOOSE = require("mongoose");
const EXPRESS = require("express");
const CORS = require("cors");
const ROUTES = require("./routes/movies");
const ERROR_HANDLERS = require("./middleware/errorHandlers");
const APP = EXPRESS();
const PORT = 3000;
// Middleware & Routes
APP.use(CORS());                       // Disable Cross Origin Resource Sharing Restrictions
APP.use(EXPRESS.json());              // JSON Body Parser
APP.use(ROUTES);                     // Add routes to app
APP.use(ERROR_HANDLERS.logError);   // Log error to console
APP.use(ERROR_HANDLERS.sendError); // Send error response

// Connect to MongoDB
MONGOOSE
    .connect("mongodb://localhost:27017/mongoose_example", {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
    }).then(() => {
        console.log("MongoDB Connection Succesful");
        // Listen for traffic on PORT
        APP.listen(PORT, (err) => {
            if (err) console.log(err);
            console.log(`App listening at http://localhost:${PORT}`);
        });
    }).catch((err) => { 
        console.log("MongoDB Connection Failed!!!");
    });
