const express = require('express')
const maker = require('./controllers/maker')

const routes = express.Router()

routes.get("/", function(req, res){
    return res.render("index")
})
routes.get("/ready", maker.ready)
routes.post("/maker", maker.post)

module.exports = routes