const { url }= require("../config/website")

const Readme = {
    init(data) {
        this.data = data

        this.getTitle()
        this.getAbout()
        this.getReason()
        this.getLogo()
        this.getLicense()
        this.getLinks()
        this.getImagesUrl()
        this.getImages()
        this.getTecnologies()
        this.getContribution()

        return this
    },
    getTitle() {
        this.title = `<h2 align="center">${this.data.title}</h2>`
    },
    getAbout() {
        this.about = this.data.about
    },
    getReason() {
        this.reason = this.data.reason
    },
    getLogo() {
        if(this.data.logo) {
            this.logo = `<p align="center">\n  <img src="${this.data.logo}" width="300" heigth="300">\n</p>`
        } else {
            this.logo = ''
        }
    },
    getLicense() {
        const licenses = {
            MIT: `\n    <img alt="License" src="https://img.shields.io/badge/license-MIT-%23F8952D">`,
            APACHE: `\n    <img alt="License" src="https://img.shields.io/badge/license-APACHE-%23F8952D">`,
            GLP: `\n    <img alt="License" src="https://img.shields.io/badge/license-GLP-%23F8952D">`
        }

        this.licenseCode = this.data.license
        this.license = 
        `<p align="center">\n  <a href="LICENSE">${licenses[this.licenseCode]}\n  </a>\n</p>`
    },
    getLinks() {
        let links = `<a href="#information_source-sobre">Sobre</a>&nbsp;|&nbsp;\n  <a href="#interrobang-motivo">Motivo</a>&nbsp;|&nbsp;\n  <a href="#rocket-tecnologias-utilizadas">Tecnologias</a>&nbsp;|&nbsp;`
        if (this.data.contribution == "sim") {
            links += `\n  <a href="#link-como-contribuir">Como Contribuir</a>&nbsp;|&nbsp;`
        }

        links += `\n  <a href="#licença">Licença</a>`
        
        const headerLinks = `<h3 align="center">\n  ${links}\n</h3>`
        this.headerLinks = headerLinks
    },
    getImagesUrl() {
        this.images = ''
        if(this.data.images && this.data.images.length > 0) {
            for (const image of this.data.images) {
                this.images += `<img src="${image}" width="1200">\n`
            }
        }
    },
    getImages() {
        if(this.data.filesImages && this.data.filesImages.length > 0) {
            for (const image of this.data.filesImages) {
                if(image.fieldname === 'logo_file') {
                    this.logo += `\n<p align="center">\n  <img src="${url}/uploads/${image.filename}" width="300" heigth="300">\n</p>`
                }

                if(image.fieldname === 'images_file') {
                    this.images += `<img src="${url}/uploads/${image.filename}" width="1200">\n`
                }
            }
        }
    },
    getTecnologies() {
        this.tecnologies = ''
        for (const tecnology of this.data.features) {
            this.tecnologies += `\n- ${tecnology}`
        }
    },
    getContribution() {
        this.contribution = ''
        if (this.data.contribution == "sim") {
            this.contribution = `- Faça um Fork do repositório\n- Clone o seu repositório\n- Crie uma branch com a sua feature\n- Faça um commit com suas mudanças\n- 'Push' a sua branch\n- Ir em Pull Requests do projeto original e criar uma pull request com o seu commit`
        }
    }
}

module.exports = Readme