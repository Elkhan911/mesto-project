import "../src/index.css"; // добавьте импорт главного файла стилей

import * as api from "./api.js";

import {
  setKeyListener,
  openPopup,
  closePopup,
  сlosePopupOnOverloy,
  renderLoading,
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
  avatarPopup,
  editFormAvatar,
  editFormAvatarUrl,
  config,
  profileAvatarEdit,
  avatarSaveButton,
} from "./constants.js";

/**********************************************************
 * ADDING LISTENERS
 **********************************************************/
profileAvatarEdit.addEventListener("click", function () {
  openPopup(avatarPopup);
});

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
  renderLoading(true, cardSaveButton);

  api
    .sentCard(addFormName.value, addFormlink.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((card) => {
      const newCard = createCard(
        card._id,
        addFormName.value,
        addFormlink.value,
        card.likes.length,
        true,
        false
      );
      elementsSection.prepend(newCard);
      closePopup(addCardPopup);
      addCardForm.reset();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      renderLoading(false, cardSaveButton);
    });
});

editFormAvatar.addEventListener("submit", function (event) {
  event.preventDefault();
  renderLoading(true, avatarSaveButton);
  api
    .changeAvatar(editFormAvatarUrl.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(() => {
      profileAvatar.src = editFormAvatarUrl.value;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      renderLoading(false, avatarSaveButton);
    });
});

editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  renderLoading(true, profileSaveButton);

  api
    .updateProfile(profileTitle.textContent, profileSubtitle.textContent)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(() => {
      profileTitle.textContent = editFormName.value;
      profileSubtitle.textContent = editFormDescription.value;
      profileSaveButton.classList.add("button__inactive");
      profileSaveButton.disabled = true;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      renderLoading(false, profileSaveButton);
    });
});

let userId = "";

/*
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
      const likes = card.likes;
      const cardLikeCount = card.likes.length;
      console.log(card);

      let cardView;
      let isMyCard = false;
      let hasMyLike = false;
      hasMyLike = isCardHasMyLike(likes);

      if (card.owner._id === userId) {
        isMyCard = true;
      }

      cardView = createCard(
        cardId,
        cardName,
        cardLink,
        cardLikeCount,
        isMyCard,
        hasMyLike
      );

      elementsSection.append(cardView);
    });
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
  .finally(() => {});
*/
function isCardHasMyLike(likes) {
  console.log(likes);
  let hasMyLike = false;

  likes.forEach((like) => {
    if (like._id === userId) {
      console.log("This card has my like");
      hasMyLike = true;
    }
  });
  return hasMyLike;
}

Promise.all([api.setUser(), api.setCards()])
  .then(([userResponse, cardsResponse]) => {
    return Promise.all([userResponse.json(), cardsResponse.json()]);
  })
  .then(([user, cards]) => {
    // тут установка данных пользователя
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    profileAvatar.src = user.avatar;
    userId = user._id;
    console.log("Id = " + userId);

    const initialCards = [];
    // и тут отрисовка карточек
    cards.forEach((card) => {
      const cardId = card._id;
      const cardName = card.name;
      const cardLink = card.link;
      const cardLikeCount = card.likes.length;
      console.log(card);

      let cardView;
      if (card.owner._id != userId) {
        console.log("My card");
        cardView = createCard(cardId, cardName, cardLink, cardLikeCount, true);
      } else {
        cardView = createCard(cardId, cardName, cardLink, cardLikeCount, false);
      }

      elementsSection.append(cardView);
      initialCards.push(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//добавил функцию из модал, чтоб закрывалось при клике на оверлей
сlosePopupOnOverloy();

validate.enableValidation(formList);
