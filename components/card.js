// Imports
import * as constants from "./constants.js";
import * as modal from "./modal.js";
import * as api from "./api.js";

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

export function createCard(cardId, name, link, likeCount, isMyCard) {
  const newCard = constants.cardTemplate.content.cloneNode(true);
  const newCardImage = newCard.querySelector(".elements__image");
  const newCardTitle = newCard.querySelector(".elements__title");
  const newCardLikeBtn = newCard.querySelector(".elements__like-button");
  const newCardTrashBtn = newCard.querySelector(".elements__trash");
  const newCardLikeCount = newCard.querySelector(".elements_like-counter");

  newCardImage.src = link;
  newCardImage.alt = name;
  newCardTitle.textContent = name;
  newCardLikeCount.textContent = likeCount;

  if (!isMyCard) {
    newCardTrashBtn.src = "#";
  }
  newCardImage.alt = `картинка ` + name;
  newCardLikeBtn.addEventListener("click", function () {
    toggleLike(newCardLikeBtn);
  });

  newCardTrashBtn.addEventListener("click", function () {
    api
      .deleteCard(cardId)
      .then((user) => {
        deleteElement(newCardTrashBtn.closest(".elements__item"));
      })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
      })
      .finally(() => {});
  });

  newCardImage.addEventListener("click", function () {
    showImage(name, link);
  });

  return newCard;
}
