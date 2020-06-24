const createReadme = require('../utils/createReadme')
let readme = null

module.exports = {
    post (req, res) {
        let features = req.body.features
        let images = req.body.images

        features = features.filter(feature => feature)
        images = images.filter(image => image)

        readme = createReadme.init({
            ...req.body,
            features,
            images
        })
        
        return res.redirect("/ready")
    },
    ready (req, res) {
        return res.render("ready", {data: readme})
    }
}