import * as constants from "./constants.js";
// Imports

export function setKeyListener() {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      constants.popups.forEach((popup) => {
        if (popup.className.includes("popup_opened")) {
          closePopup(popup);
        }
      });
    }
  });
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", setKeyListener());
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", setKeyListener());
}

export function showImage(name, link) {
  constants.popupImage.src = link;
  constants.popupImage.alt = name;
  constants.popupImageCaption.textContent = name;
  openPopup(constants.imagePopup);
}

export const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

export const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

export function toggleLike(button) {
  button.classList.toggle("elements__like-button_active");
}

export function deleteElement(elem) {
  elem.remove();
}
