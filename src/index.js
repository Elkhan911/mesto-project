import "../index.css"; // добавьте импорт главного файла стилей

import {
  setKeyListener,
  openPopup,
  closePopup,
  сlosePopupOnOverloy,
} from "./modal";
import { createCard } from "./card.js";
import * as validate from "./validate.js";
import {
  initialCards,
  elementsSection,
  cardTemplate,
  editBtn,
  addCardBtn,
  profileTitle,
  profileSubtitle,
  editPopup,
  addCardPopup,
  imagePopup,
  popups,
  editPopupClsBtn,
  addCardPopupClsBtn,
  imagePopupClsBtn,
  popupImage,
  popupImageCaption,
  addCardForm,
  addFormName,
  addFormlink,
  formList,
  editForm,
  editFormName,
  editFormDescription,
  submitButton,
} from "./constants.js";

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

  validate.disabledSaveButton(submitButton);

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

//добавил функцию из модал, чтоб закрывалось при клике на оверлей
сlosePopupOnOverloy();

validate.enableValidation(formList);
