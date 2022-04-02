/**********************************************************
 * VARIABLES
 **********************************************************/

/* cards */
const initialCards = [
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
const elementsSection = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card");

/* profile */
const editBtn = document.querySelector(".profile__edit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

/* popups */
const editPopup = document.querySelector(".popup_edit");
const addCardPopup = document.querySelector(".popup_card");
const imagePopup = document.querySelector(".popup_image");

const editPopupClsBtn = editPopup.querySelector(".popup__close-button");
const addCardPopupClsBtn = addCardPopup.querySelector(".popup__close-button");
const imagePopupClsBtn = imagePopup.querySelector(".popup__close-button");

const popupImage = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__caption");

/* forms */
const addCardForm = addCardPopup.querySelector(".popup__form");
const addFormName = addCardForm.querySelector(".popup__item-name");
const addFormlink = addCardForm.querySelector(".popup__item-descrption");

const editForm = editPopup.querySelector(".popup__form");
const editFormName = editForm.querySelector(".popup__item-name");
const editFormDescription = editForm.querySelector(".popup__item-descrption");

/**********************************************************
 * MAIN CODE
 **********************************************************/

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
  togglePopup(editPopup);
});

addCardBtn.addEventListener("click", function () {
  togglePopup(addCardPopup);
});

editPopupClsBtn.addEventListener("click", function () {
  togglePopup(editPopup);
});

addCardPopupClsBtn.addEventListener("click", function () {
  togglePopup(addCardPopup);
});

imagePopupClsBtn.addEventListener("click", function () {
  togglePopup(imagePopup);
});

addCardForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newCard = createCard(addFormName.value, addFormlink.value);

  elementsSection.prepend(newCard);
  togglePopup(addCardPopup);
  addCardForm.reset();
});

editForm.addEventListener("submit", function (event) {
  event.preventDefault();

  profileTitle.textContent = editFormName.value;
  profileSubtitle.textContent = editFormDescription.value;

  togglePopup(editPopup);
});

/**********************************************************
 * FUNCTIONS
 **********************************************************/

function createCard(name, link) {
  const newCard = cardTemplate.content.cloneNode(true);
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

function toggleLike(button) {
  button.classList.toggle("elements__like-button_active");
}

function deleteElement(elem) {
  elem.remove();
}

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

function showImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;

  togglePopup(imagePopup);
}
