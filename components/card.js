// Imports
import * as constants from "./constants.js";
import * as modal from "./modal.js";

export function toggleLike(button) {
  button.classList.toggle("elements__like-button_active");
}

export function showImage(name, link) {
  constants.popupImage.src = link;
  constants.popupImage.alt = name;
  constants.popupImageCaption.textContent = name;
  modal.openPopup(constants.imagePopup);
}

export function deleteElement(elem) {
  elem.remove();
}

export function createCard(name, link) {
  const newCard = constants.cardTemplate.content.cloneNode(true);
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
