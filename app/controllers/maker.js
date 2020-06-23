const fs = require('fs')
const path = require("path")
const createReadme = require('../utils/createReadme')
let readme = null
module.exports = {
    post (req, res) {
        readme = createReadme.init(req.body)
        return res.redirect("/ready")
    },
    ready (req, res) {
        return res.render("ready", {data: readme})
    }
}