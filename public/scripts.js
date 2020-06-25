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

if(buttonStart && buttonNext && buttonNext2 && buttonNext3) {
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
if(backButtons) {
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