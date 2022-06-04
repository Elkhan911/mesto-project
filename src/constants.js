/* cards */
export const initialCards = [
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

export const elementsSection = document.querySelector(".elements");
export const cardTemplate = document.querySelector("#card");

/* profile */
export const editBtn = document.querySelector(".profile__edit-button");
export const addCardBtn = document.querySelector(".profile__add-button");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

/* popups */
export const editPopup = document.querySelector(".popup_edit");
export const addCardPopup = document.querySelector(".popup_card");
export const imagePopup = document.querySelector(".popup_image");
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
