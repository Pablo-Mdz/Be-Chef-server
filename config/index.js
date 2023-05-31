
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";
const FRONTEND_URL2 = process.env.ORIGIN || "http://localhost:5005";


module.exports = (app) => {

    app.set("trust proxy", 1);

    app.use(
        cors({
            // origin: "https://be-chef.netlify.app",
            // origin: "https://be-chef.netlify.app",

            origin: FRONTEND_URL,
            credentials: true,
        })
    );

    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
};
