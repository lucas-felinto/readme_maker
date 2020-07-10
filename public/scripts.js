const initialBox = document.querySelector(".initial-box");
const logoTitle = document.querySelector(".logo-title");
const imagesGif = document.querySelector(".images-gif");
const about = document.querySelector(".about");
const lastInformations = document.querySelector(".last-informations");
const backButtons = document.querySelectorAll(".label > img");
const copyReadmeButton = document.querySelector(".copy-readme");

function removeField(event) {
  const divUrl = event.target.parentNode;

  divUrl.remove();
}

function createRemoveButton(className, textContent) {
  const pRemoveButton = document.createElement("p");
  pRemoveButton.classList.add(className);
  pRemoveButton.innerHTML = textContent;
  pRemoveButton.onclick = removeField;

  return pRemoveButton;
}

const addImage = document.querySelector("#add-image");
const addTec = document.querySelector("#add-tec");

if (addImage && addTec) {
  addImage.addEventListener("click", () => {
    const divInput = document.querySelector("#url-img");
    const inputUrl = document.querySelectorAll(".input-url");

    const newField = inputUrl[inputUrl.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    if (inputUrl.length < 2) {
      const pRemoveImage = createRemoveButton(
        "remove-image",
        "- Remover Arquivo"
      );

      newField.appendChild(pRemoveImage);
    } else {
      newField.children[1].onclick = removeField;
    }

    newField.children[0].value = "";
    divInput.appendChild(newField);
  });

  addTec.addEventListener("click", () => {
    const divInput = document.querySelector("#features");
    const inputFeature = document.querySelectorAll(".features-input");

    const newField = inputFeature[inputFeature.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    if (inputFeature.length < 2) {
      const pRemoveTecnology = createRemoveButton(
        "remove-tec",
        "- Remover Tecnologia"
      );

      newField.appendChild(pRemoveTecnology);
    } else {
      newField.children[1].onclick = removeField;
    }

    newField.children[0].value = "";
    divInput.appendChild(newField);
  });
}

const buttonStart = document.querySelector("#button-start");
const buttonNext = document.querySelector("#button-next");
const buttonNext2 = document.querySelector("#button-next2");
const buttonNext3 = document.querySelector("#button-next3");

if (buttonStart && buttonNext && buttonNext2 && buttonNext3) {
  buttonStart.addEventListener("click", function () {
    initialBox.classList.add("hidden");
    setTimeout(function () {
      logoTitle.classList.add("show");
    }, 200);
  });

  buttonNext.addEventListener("click", () => {
    event.preventDefault();
    logoTitle.classList.remove("show");
    setTimeout(() => {
      imagesGif.classList.add("show");
    }, 200);
  });

  buttonNext2.addEventListener("click", () => {
    event.preventDefault();
    imagesGif.classList.remove("show");
    setTimeout(() => {
      about.classList.add("show");
      about
        .querySelectorAll("textarea")
        .forEach((textarea) => (textarea.style.display = "initial"));
    }, 200);
  });

  buttonNext3.addEventListener("click", () => {
    event.preventDefault();
    about.classList.remove("show");
    setTimeout(() => {
      lastInformations.classList.add("show");
    }, 200);
  });
}

// backward button
if (backButtons) {
  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isBeingShowed = button.parentElement.parentElement;

      isBeingShowed.classList.remove("show");

      setTimeout(() => {
        isBeingShowed.previousElementSibling.classList.add("show");
      }, 200);
    });
  });
}

// upload images

const PhotosUpload = {
  uploadLimit: 5,
  inputLogo: "",
  inputProject: "",
  preview: document.querySelector("#images-preview"),
  logoFiles: [],
  projectFiles: [],
  apply(func, params) {
    if (func.includes("Logo")) PhotosUpload.uploadLimit = 1;
    if (func.includes("Project")) PhotosUpload.uploadLimit = 5;

    PhotosUpload[func](params);
  },
  handleFileInputLogo(event) {
    const { files: fileList } = event.target;
    PhotosUpload.inputLogo = event.target;

    if (PhotosUpload.hasLimit(event, PhotosUpload.inputLogo)) {
      PhotosUpload.updateInputFiles(PhotosUpload.inputLogo);
      return;
    }

    Array.from(fileList).forEach((file) => {
      PhotosUpload.logoFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const div = PhotosUpload.getContainer(image);
        div.classList.add("logo-preview");

        PhotosUpload.preview.appendChild(div);
      };

      reader.readAsDataURL(file);
    });

    PhotosUpload.updateInputFiles(PhotosUpload.inputLogo);
  },
  hasLimit(event, input) {
    const { uploadLimit, logoFiles, projectFiles } = PhotosUpload;
    const { files: fileList } = input;

    if (fileList.length > uploadLimit) {
      uploadLimit > 1
        ? alert(`Envie no máximo ${uploadLimit} fotos!`)
        : alert("Envie no máximo 1 foto!");
      event.preventDefault();
      return true;
    }

    const totalPhotos =
      uploadLimit === 1
        ? fileList.length + logoFiles.length
        : fileList.length + projectFiles.length;
    if (totalPhotos > uploadLimit) {
      uploadLimit > 1
        ? alert(`Envie no máximo ${uploadLimit} fotos!`)
        : alert("Envie no máximo 1 foto!");
      event.preventDefault();
      return true;
    }

    return false;
  },
  getAllFiles(input) {
    const { logoFiles, projectFiles } = PhotosUpload;
    const logoInputName = "logo_file";
    const datatransfer =
      new DataTransfer() || new ClipboardEvent("").clipboardData;

    if (input.name === logoInputName) {
      logoFiles.forEach((file) => datatransfer.items.add(file));
    } else {
      projectFiles.forEach((file) => datatransfer.items.add(file));
    }

    return datatransfer.files;
  },
  updateInputFiles(input) {
    input.files = PhotosUpload.getAllFiles(input);
  },
  handleFileInputProject(event) {
    const { files: fileList } = event.target;
    PhotosUpload.inputProject = event.target;

    if (PhotosUpload.hasLimit(event, PhotosUpload.inputProject)) {
      PhotosUpload.updateInputFiles(PhotosUpload.inputProject);
      return;
    }

    Array.from(fileList).forEach((file) => {
      PhotosUpload.projectFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const div = PhotosUpload.getContainer(image);

        PhotosUpload.preview.appendChild(div);
      };

      reader.readAsDataURL(file);
    });

    PhotosUpload.updateInputFiles(PhotosUpload.inputProject);
  },
  getContainer(image) {
    const div = document.createElement("div");
    div.classList.add("image");
    div.appendChild(image);
    div.appendChild(PhotosUpload.getRemoveButton());

    return div;
  },
  getRemoveButton() {
    const button = document.createElement("img");
    button.src = "/close-24px.svg";
    setHover(button);
    button.onclick = PhotosUpload.removePhoto;

    return button;
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode;
    const newFiles = Array.from(PhotosUpload.preview.children).filter(
      (file) =>
        file.classList.contains("image") &&
        !file.classList.contains("logo-preview")
    );

    const index = newFiles.indexOf(photoDiv);
    if (index < 0) {
      PhotosUpload.logoFiles.splice(0, 1);
      PhotosUpload.updateInputFiles(PhotosUpload.inputLogo);
    } else {
      PhotosUpload.projectFiles.splice(index, 1);
      PhotosUpload.updateInputFiles(PhotosUpload.inputProject);
    }

    photoDiv.remove();
  },
};

// gallery and image input
const inputsFile = document.querySelectorAll(".input-file > input");
const fileViewerButtons = document.querySelectorAll(
  "#file-viewer1, #file-viewer2"
);
const modal = document.querySelector("#modal");
const buttonHideModal = document.querySelector("#modal div.header > button");
const main = document.querySelector("main");

if (inputsFile && fileViewerButtons && modal && buttonHideModal && main) {
  // eslint-disable-next-line no-inner-declarations
  function showHideModal({ target }) {
    modal.classList.toggle("hide");
    main.classList.toggle("hide", target.id);
  }

  fileViewerButtons.forEach((button) => {
    button.addEventListener("click", showHideModal);
  });
  buttonHideModal.addEventListener("click", showHideModal);

  inputsFile.forEach((input) => {
    const buttonFile = input.nextElementSibling;
    buttonFile.onclick = () => input.click();
  });
}

// button remove image on hover
function setHover(element) {
  element.addEventListener("mouseover", setImageHover);
  element.addEventListener("touchstart", setImageHover);
}

function setImageHover(event) {
  const image = event.target.previousElementSibling;

  image.addEventListener("mouseout", removeImageHover);
  image.addEventListener("touchend", removeImageHover);

  image.style.background = "#ffffffe8";
  image.style.opacity = "0.4";
}

function removeImageHover(event) {
  const image = event.target;

  image.style.background = "none";
  image.style.opacity = "1";
}

// Copy ReadMe Text

if (copyReadmeButton) {
  copyReadmeButton.addEventListener("click", () => {
    const readmeCopy = document.querySelector("#readme-ready");
    readmeCopy.select();
    document.execCommand("Copy");
  });
}
