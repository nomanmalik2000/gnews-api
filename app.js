const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router")

const app = express();

app.use(cors())

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(router);

module.exports = app;