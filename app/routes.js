const express = require("express");
const maker = require("./controllers/maker");
const multer = require("./config/multer");

const routes = express.Router();

routes.get("/", function (req, res) {
  return res.render("index");
});
routes.get("/ready", maker.ready);
routes.post("/maker", multer.any(), maker.post);

module.exports = routes;
