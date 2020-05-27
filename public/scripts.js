const initialBox = document.querySelector('.initial-box')
const logoTitle = document.querySelector('.logo-title')
const imagesGif = document.querySelector('.images-gif')
const about = document.querySelector('.about')

document.querySelector('#button-start').addEventListener("click", function() {
    initialBox.classList.add('hidden')
    setTimeout(function() {
        logoTitle.classList.add('show')
    }, 200)
})

document.querySelector('#button-next').addEventListener("click", () => {
    event.preventDefault()
    logoTitle.classList.remove('show')
    setTimeout(() => {
        imagesGif.classList.add('show')
    }, 200)
})

document.querySelector('#add-image').addEventListener("click", addUrlInput => {
    const divInput = document.querySelector('#url-img')
    const inputUrl = document.querySelector('.input-url')

    const newField = inputUrl.cloneNode(true)

    if (newField.children[0].value == "") return false

    newField.children[0].value = ""
    divInput.appendChild(newField)
})

document.querySelector('#button-next2').addEventListener("click", () => {
    event.preventDefault()
    imagesGif.classList.remove('show')
    setTimeout(() => {
        about.classList.add('show')
    }, 200)
})

document.querySelector('#button-next3').addEventListener("click", () => {
    event.preventDefault()
    about.classList.remove('show')
    setTimeout(() => {
        document.querySelector('.last-informations').classList.add('show')
    }, 200)
})

document.querySelector('#add-tec').addEventListener("click", addUrlInput => {
    const divInput = document.querySelector('#features')
    const inputUrl = document.querySelector('.features-input')

    const newField = inputUrl.cloneNode(true)

    if (newField.children[0].value == "") return false

    newField.children[0].value = ""
    divInput.appendChild(newField)
})