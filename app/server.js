const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(routes);

server.set("view engine", "njk");

nunjucks.configure("app/views", {
  express: server,
  noCache: true,
  autoescape: true,
});

// eslint-disable-next-line no-undef
server.listen(process.env.PORT || 5000);
