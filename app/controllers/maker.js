const createReadme = require('../utils/createReadme')
let readme = null

module.exports = {
    post (req, res) {
        const __1MegaByte = 1048576
        const maxOfImagesIncludingLogo = 5

        let filesImages = req.files.map((file, index) => {
            if(index <= maxOfImagesIncludingLogo && file.size <= __1MegaByte) return file
        })

        let features = req.body.features
        let images = req.body.images

        readme = {
            ...req.body,
            filesImages
        }

        if(features && images) {
            features = features.filter(feature => feature)
            images = images.filter(image => image)
            readme = {
                ...req.body,
                filesImages,
                features,
                images
            }
        }

        readme = createReadme.init(readme)
        
        return res.redirect("/ready")
    },
    ready (req, res) {
        return res.render("ready", {data: readme})
    }
}