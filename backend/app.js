const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const blogRouter = require("./controller/blog");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
require("express-async-errors");

const app = express();

// ESTABLISH CONNECTION MONGODB DATABASE

mongoose.set("strictQuery", false);

mongoose
	.connect(config.MONGODB_URI)
	.then((result) => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.error(`error connecting to MongoDB`, error.message);
	});

// MIDDLEWARES

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// ROUTER

app.use("/api/blogs", blogRouter);

// ERROR HANDLING MIDDLEWARES

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
