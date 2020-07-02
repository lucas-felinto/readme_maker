const initialBox = document.querySelector('.initial-box')
const logoTitle = document.querySelector('.logo-title')
const imagesGif = document.querySelector('.images-gif')
const about = document.querySelector('.about')
const lastInformations = document.querySelector('.last-informations')
const backButtons = document.querySelectorAll(".label > img")

function removeField(event) {
    const divUrl = event.target.parentNode

    divUrl.remove()
}

function createRemoveButton(className, textContent) {
    const pRemoveButton = document.createElement("p")
    pRemoveButton.classList.add(className)
    pRemoveButton.innerHTML = textContent
    pRemoveButton.onclick = removeField

    return pRemoveButton
}

const addImage = document.querySelector('#add-image')
const addTec = document.querySelector('#add-tec')

if(addImage && addTec) {
    addImage.addEventListener("click", event => {
        const divInput = document.querySelector('#url-img')
        const inputUrl = document.querySelectorAll('.input-url')

        const newField = inputUrl[inputUrl.length - 1].cloneNode(true)

        if (newField.children[0].value == "") return false

        if(inputUrl.length < 2) {
            const pRemoveImage = createRemoveButton("remove-image", "- Remover Arquivo")

            newField.appendChild(pRemoveImage)
        } else {
            newField.children[1].onclick = removeField
        }

        newField.children[0].value = ""
        divInput.appendChild(newField)
    })

    addTec.addEventListener("click", event => {
        const divInput = document.querySelector('#features')
        const inputFeature = document.querySelectorAll('.features-input')

        const newField = inputFeature[inputFeature.length - 1].cloneNode(true)

        if (newField.children[0].value == "") return false

        if(inputFeature.length < 2) {
            const pRemoveTecnology = createRemoveButton("remove-tec", "- Remover Tecnologia")

            newField.appendChild(pRemoveTecnology)
        } else {
            newField.children[1].onclick = removeField
        }

        newField.children[0].value = ""
        divInput.appendChild(newField)
    })
}

const buttonStart = document.querySelector('#button-start')
const buttonNext = document.querySelector('#button-next')
const buttonNext2 = document.querySelector('#button-next2')
const buttonNext3 = document.querySelector('#button-next3')

if (buttonStart && buttonNext && buttonNext2 && buttonNext3) {
    buttonStart.addEventListener("click", function() {
        initialBox.classList.add('hidden')
        setTimeout(function() {
            logoTitle.classList.add('show')
        }, 200)
    })

    buttonNext.addEventListener("click", () => {
        event.preventDefault()
        logoTitle.classList.remove('show')
        setTimeout(() => {
            imagesGif.classList.add('show')
        }, 200)
    })

    buttonNext2.addEventListener("click", () => {
        event.preventDefault()
        imagesGif.classList.remove('show')
        setTimeout(() => {
            about.classList.add('show')
            about.querySelectorAll("textarea").forEach(textarea => textarea.style.display = "initial")
        }, 200)
    })

    buttonNext3.addEventListener("click", () => {
        event.preventDefault()
        about.classList.remove('show')
        setTimeout(() => {
            lastInformations.classList.add('show')
        }, 200)
    })
}

// backward button
if (backButtons) {
    backButtons.forEach(button => {
        button.addEventListener("click", () => {
            const isBeingShowed = button
            .parentElement
            .parentElement

            isBeingShowed.classList.remove("show")

            setTimeout(() => {
                isBeingShowed.previousElementSibling.classList.add("show")
            }, 200)
        })
    })
}

// upload images

const PhotosUpload = {
    uploadLimit: 5,
    input: "",
    logoFiles: [],
    projectFiles: [],
    apply(func, params) {
        if (func.includes('Logo')) PhotosUpload.uploadLimit = 1
        if (func.includes('Project')) PhotosUpload.uploadLimit = 5

        PhotosUpload[func](params)
    },
    handleFileInputLogo(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event)) {
            PhotosUpload.updateInputFiles()
            return
        }

        Array.from(fileList).forEach(file => {
            PhotosUpload.logoFiles.push(file)
        })

        PhotosUpload.updateInputFiles()
    },
    hasLimit(event) {
        const { input, uploadLimit, logoFiles, projectFiles } = PhotosUpload
        const { files: fileList } = input
        
        if (fileList.length > uploadLimit) {
            (uploadLimit > 1) ? alert(`Envie no máximo ${uploadLimit} fotos!`) : alert(`Envie no máximo 1 foto!`)
            event.preventDefault()
            return true
        }

        const totalPhotos = (uploadLimit === 1) ? fileList.length + logoFiles.length : fileList.length + projectFiles.length
        if (totalPhotos > uploadLimit) {
            (uploadLimit > 1) ? alert(`Envie no máximo ${uploadLimit} fotos!`) : alert(`Envie no máximo 1 foto!`)
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles() {
        const { uploadLimit, logoFiles, projectFiles } = PhotosUpload
        const datatransfer = new DataTransfer() || new ClipboardEvent("").clipboardData

        if (uploadLimit === 1) {
            logoFiles.forEach(file => datatransfer.items.add(file))  
        } else {
            projectFiles.forEach(file => datatransfer.items.add(file))
        }

        return datatransfer.files
    },
    updateInputFiles() {
        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    handleFileInputProject(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event)) {
            PhotosUpload.updateInputFiles()
            return
        }

        Array.from(fileList).forEach(file => {
            PhotosUpload.projectFiles.push(file)
        })

        PhotosUpload.updateInputFiles()
    }
}

const inputsFile = document.querySelectorAll(".input-file > input")

inputsFile.forEach(input => {
    const buttonFile = input.nextElementSibling
    buttonFile.onclick = () => input.click()
})
}
