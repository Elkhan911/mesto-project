import * as constants from "./constants.js";
import * as modal from "./modal.js";
// Imports

// Функция принимает массив полей
export const hasInvalidInput = (inputList) => {
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
export const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
  }
};

export const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    modal.showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    modal.hideInputError(formElement, inputElement);
  }
};

export const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".popup__submit-button");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = (formLists) => {
  constants.editFormName.value = constants.profileTitle.textContent;
  constants.editFormDescription.value = constants.profileSubtitle.textContent;

  formLists.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

// ""