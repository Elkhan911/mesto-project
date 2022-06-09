export const elementsSection = document.querySelector(".elements");
export const cardTemplate = document.querySelector("#card");

/* profile */
export const editBtn = document.querySelector(".profile__edit-button");
export const addCardBtn = document.querySelector(".profile__add-button");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const profileAvatar = document.querySelector(".profile__avatar");
export const profileAvatarEdit = document.querySelector(
  ".profile__avatar-edit"
);

/* popups */
export const editPopup = document.querySelector(".popup_edit");
export const addCardPopup = document.querySelector(".popup_card");
export const imagePopup = document.querySelector(".popup_image");
export const avatarPopup = document.querySelector(".popup_avatar");

// переменная для всех попапов
export const popups = Array.from(document.querySelectorAll(".popup"));
export const editPopupClsBtn = editPopup.querySelector(".popup__close-button");
export const addCardPopupClsBtn = addCardPopup.querySelector(
  ".popup__close-button"
);
export const imagePopupClsBtn = imagePopup.querySelector(
  ".popup__close-button"
);

export const popupImage = imagePopup.querySelector(".popup__image");
export const popupImageCaption = imagePopup.querySelector(".popup__caption");

/* forms */
export const addCardForm = addCardPopup.querySelector(".popup__form");
export const addFormName = addCardForm.querySelector(".popup__item-name");
export const addFormlink = addCardForm.querySelector(".popup__item-descrption");
export const formList = Array.from(document.querySelectorAll(".form"));

export const editForm = editPopup.querySelector(".popup__form");
export const editFormName = editForm.querySelector(".popup__item-name");
export const editFormDescription = editForm.querySelector(
  ".popup__item-descrption"
);

export const editFormAvatar = avatarPopup.querySelector(".popup__form");
export const editFormAvatarUrl = editFormAvatar.querySelector(
  ".popup__item-avatar"
);

export const profileSaveButton = document.querySelector("#profileSaveButton");
export const cardSaveButton = document.querySelector("#cardSaveButton");

export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-10/",
  headers: {
    authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
    "Content-Type": "application/json",
  },
};
