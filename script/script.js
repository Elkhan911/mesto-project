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
/*
import jordanImage from "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg";
import jamesImage from "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg";
import bryantImages from "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg";
import jordanImages from "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg";
import jamesImages from "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg";
import jasjas from "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg";
*/
const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: "Michael Jordan", image: jordanImage },
  { name: "Lebron James", link: jamesImage },
  { name: "Kobe Bryant", link: bryantImage },
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

const editPopupClsBtn = editPopup.querySelector(".popup__close-button");
const addCardPopupClsBtn = addCardPopup.querySelector(".popup__close-button");
const imagePopupClsBtn = imagePopup.querySelector(".popup__close-button");

const popupImage = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__caption");

/* forms */
const addCardForm = addCardPopup.querySelector(".popup__form");
const addFormName = addCardForm.querySelector(".popup__item-name");
const addFormlink = addCardForm.querySelector(".popup__item-descrption");

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
  togglePopup(editPopup);
});

addCardBtn.addEventListener("click", function () {
  togglePopup(addCardPopup);
});

addCardForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newCard = createCard(addFormName.value, addFormlink.value);

  elementsSection.prepend(newCard);
  togglePopup(addCardPopup);
  addCardForm.reset();
});

editForm.addEventListener("submit", function (event) {
  event.preventDefault();

  profileTitle.textContent = editFormName.value;
  profileSubtitle.textContent = editFormDescription.value;

  togglePopup(editPopup);
});

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

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

function showImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  togglePopup(imagePopup);
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

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add("form__submit_inactive");
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove("form__submit_inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".popup__submit-button");

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

  formElement.addEventListener("keydown", function (evt) {
    const formList = Array.from(document.querySelectorAll(".form"));
    const popup = document.querySelector(".popup");
    formList.forEach((formElement) => {
      if (evt.key === "Escape") {
        console.log(evt.key);
        togglePopup(popup);
      }
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

const closePopup = () => {
  const popups = Array.from(document.querySelectorAll(".popup"));
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (
        evt.target.className === "popup__title" ||
        evt.target.className === "popup__image"
      ) {
        evt.stopPropagation();
      } else if (!evt.target.className.includes("form")) {
        //popup.classList.toggle("popup_opened");
        togglePopup(popup);
      }
    });
  });

  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      console.log("esc");
      popups.forEach((popup) => {
        popup.classList.remove("popup_opened");
      });
    }
  });
};

enableValidation();
closePopup();
