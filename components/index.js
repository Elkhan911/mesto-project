import "../src/index.css"; // добавьте импорт главного файла стилей

import * as api from "./api.js";

import {
  setKeyListener,
  openPopup,
  closePopup,
  сlosePopupOnOverloy,
} from "./modal";

import { createCard } from "./card.js";

import * as validate from "./validate.js";

import {
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
  profileSaveButton,
  cardSaveButton,
  profileAvatar,
  // userId,
} from "./constants.js";

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

  api
    .sentCard(addFormName.value, addFormlink.value)
    .then(() => {
      elementsSection.prepend(newCard);
      closePopup(addCardPopup);
      addCardForm.reset();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    });
});

editForm.addEventListener("submit", function (event) {
  event.preventDefault();

  profileTitle.textContent = editFormName.value;
  profileSubtitle.textContent = editFormDescription.value;

  api
    .updateProfile(profileTitle.textContent, profileSubtitle.textContent)
    .then(() => {
      profileSaveButton.classList.add("button__inactive");
      profileSaveButton.disabled = true;

      closePopup(editPopup);
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    });
});

let userId = "";

api
  .setUser()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
  .then((user) => {
    console.log(user);
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    profileAvatar.src = user.avatar;
    userId = user._id;
    console.log(user._id);
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
  .finally(() => {});

api
  .setCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
  .then((cards) => {
    cards.forEach((card) => {
      const cardId = card._id;
      const cardName = card.name;
      const cardLink = card.link;
      const cardLikeCount = card.likes.length;
      console.log(card);

      let cardView;
      let isMyCard = false;
      if (card.owner._id === userId) {
        isMyCard = true;
      }

      cardView = createCard(cardId, cardName, cardLink, cardLikeCount, isMyCard);

      elementsSection.append(cardView);
    });
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
  .finally(() => {});

/*
Promise.all([api.setUser(), api.setCards()])
  .then(([user, cards]) => {
    // тут установка данных пользователя
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    profileAvatar.src = user.avatar;
    userId = user._id;
    // и тут отрисовка карточек
    cards.forEach((card) => {
      const cardId = card._id;
      const cardName = card.name;
      const cardLink = card.link;
      const cardLikeCount = card.likes.length;
      console.log(card);
      let cardView;
      let isMyCard = false;
      if (card.owner._id === userId) {
        isMyCard = true;
      }

      cardView = createCard(cardName, cardLink, cardLikeCount, isMyCard);

      elementsSection.append(cardView);
    });
  })
  .catch((err) => {
    // тут ловим ошибку
  });
  */

//добавил функцию из модал, чтоб закрывалось при клике на оверлей
сlosePopupOnOverloy();

validate.enableValidation(formList);
