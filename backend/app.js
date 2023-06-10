const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const blogRouter = require("./controller/blog");
const config = require("./utils/config");

const app = express();

// CONNECT MONGODB

mongoose.set("strictQuery", false);

mongoose
	.connect(config.MONGODB_URI)
	.then((result) => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.error(`error connecting to MongoDB`, error.message);
	});

// MIDDLEWARE

app.use(cors());
app.use(express.json());

// ROUTER

app.use("/api/blog", blogRouter);

module.exports = app;
