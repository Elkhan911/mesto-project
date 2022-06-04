import "../index.css"; // добавьте импорт главного файла стилей

import { setKeyListener, openPopup, closePopup } from "./modal";
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

// imagePopup.addEventListener;

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

validate.enableValidation(formList);
