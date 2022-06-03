import "../index.css"; // добавьте импорт главного файла стилей
//include("api.js");
/**********************************************************
 * VARIABLES
 **********************************************************/

/* cards */
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const elementsSection = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card");

/* profile */
const editBtn = document.querySelector(".profile__edit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

/* popups */
const editPopup = document.querySelector(".popup_edit");
const addCardPopup = document.querySelector(".popup_card");
const imagePopup = document.querySelector(".popup_image");
// переменная для всех попапов
const popups = Array.from(document.querySelectorAll(".popup"));

const editPopupClsBtn = editPopup.querySelector(".popup__close-button");
const addCardPopupClsBtn = addCardPopup.querySelector(".popup__close-button");
const imagePopupClsBtn = imagePopup.querySelector(".popup__close-button");

const popupImage = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__caption");

/* forms */
const addCardForm = addCardPopup.querySelector(".popup__form");
const addFormName = addCardForm.querySelector(".popup__item-name");
const addFormlink = addCardForm.querySelector(".popup__item-descrption");
const formList = Array.from(document.querySelectorAll(".form"));

const editForm = editPopup.querySelector(".popup__form");
const editFormName = editForm.querySelector(".popup__item-name");
const editFormDescription = editForm.querySelector(".popup__item-descrption");

/**********************************************************
 * MAIN CODE
 **********************************************************/

// adding cards from initialCards array:
for (let i = 0; i < initialCards.length; i = i + 1) {
  const cardName = initialCards[i].name;
  const cardLink = initialCards[i].link;
  const card = createCard(cardName, cardLink);
  elementsSection.append(card);
}

/**********************************************************
 * ADDING LISTENERS
 **********************************************************/

editBtn.addEventListener("click", function () {
  editFormName.value = profileTitle.textContent;
  editFormDescription.value = profileSubtitle.textContent;
  openPopup(editPopup);
});

addCardBtn.addEventListener("click", function () {
  openPopup(addCardPopup);
});

addCardForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newCard = createCard(addFormName.value, addFormlink.value);

  elementsSection.prepend(newCard);
  closePopup(addCardPopup);
  addCardForm.reset();
});

editForm.addEventListener("submit", function (event) {
  event.preventDefault();

  profileTitle.textContent = editFormName.value;
  profileSubtitle.textContent = editFormDescription.value;

  closePopup(editPopup);
});

editPopupClsBtn.addEventListener("click", function () {
  closePopup(editPopup);
});

addCardPopupClsBtn.addEventListener("click", function () {
  closePopup(addCardPopup);
});

imagePopupClsBtn.addEventListener("click", function () {
  closePopup(imagePopup);
});

imagePopup.addEventListener;
/**********************************************************
 * FUNCTIONS
 **********************************************************/

function createCard(name, link) {
  const newCard = cardTemplate.content.cloneNode(true);
  const newCardImage = newCard.querySelector(".elements__image");
  const newCardTitle = newCard.querySelector(".elements__title");
  const newCardLikeBtn = newCard.querySelector(".elements__like-button");
  const newCardTrashBtn = newCard.querySelector(".elements__trash");

  newCardImage.src = link;
  newCardImage.alt = name;
  newCardTitle.textContent = name;

  newCardLikeBtn.addEventListener("click", function () {
    toggleLike(newCardLikeBtn);
  });

  newCardTrashBtn.addEventListener("click", function () {
    deleteElement(newCardTrashBtn.closest(".elements__item"));
  });

  newCardImage.addEventListener("click", function () {
    showImage(name, link);
  });

  return newCard;
}

function toggleLike(button) {
  button.classList.toggle("elements__like-button_active");
}

function deleteElement(elem) {
  elem.remove();
}

// function togglePopup(popup) {
//   popup.classList.add("popup_opened");
// }

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function showImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(imagePopup);
}

/**********************************************************
 * Вторая проектная работа
 **********************************************************/
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

// ПРОБЛЕМА
// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute("disabled", true);
    console.log("set disabled");
  } else {
    // иначе сделай кнопку активной
    console.log("set enabled");
    buttonElement.setAttribute("disabled", false);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".popup__submit-button");
  console.log(inputList);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formLists) => {
  editFormName.value = profileTitle.textContent;
  editFormDescription.value = profileSubtitle.textContent;

  formLists.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

// const closePopup = () => {
//   const popups = Array.from(document.querySelectorAll(".popup"));
//
// };

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.className === "popup__title" ||
      evt.target.className === "popup__image"
    ) {
      evt.stopPropagation();
    } else if (!evt.target.className.includes("form")) {
      closePopup(popup);
    }
  });
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
});

enableValidation(formList);

// closePopup();
