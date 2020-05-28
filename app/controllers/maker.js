const fs = require('fs')
const data = require('../../data.json')

module.exports = {
    post (req, res) {
        data.readme.push(req.body)

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if (err) return res.send("error")

            return res.redirect("/ready")
        })
    },
    ready (req, res) {
        let lastElement = data.readme.pop()
        return res.render("ready", {data: lastElement})
    }
}