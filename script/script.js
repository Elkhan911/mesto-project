/**********************************************************
 * VARIABLES
 **********************************************************/

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

// geting edit-button and getting add-button
const editBtn = document.querySelector(".profile__edit-button");
const addCardBtn = document.querySelector(".profile__add-button");

// getting popups
const editPopup = document.querySelector(".popup_edit");
const addCardPopup = document.querySelector(".popup_card");
const imagePopup = document.querySelector(".popup_image");

// getting close buttons
const editPopupClsBtn = editPopup.querySelector(".popup__close-button");
const addCardPopupClsBtn = addCardPopup.querySelector(".popup__close-button");
const imagePopupClsBtn = imagePopup.querySelector(".popup__close-button");

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
 * FUNCTIONS
 **********************************************************/

function createCard(name, link) {
  const newCard = cardTemplate.content.cloneNode(true);
  const newCardImage = newCard.querySelector(".elements__image");
  const newCardTitle = newCard.querySelector(".elements__title");
  // getting like button
  const newCardLikeBtn = newCard.querySelector(".elements__like-button");
  // getting trash button
  const newCardTrashBtn = newCard.querySelector(".elements__trash");

  newCardImage.src = link;
  newCardImage.alt = name;
  newCardTitle.textContent = name;

  /**********************************************************
   * ADDING LISTENERS
   **********************************************************/

  // adding event listener for like button
  newCardLikeBtn.addEventListener("click", function () {
    toggleLike(newCardLikeBtn);
  });

  //adding event listener for trash button
  newCardTrashBtn.addEventListener("click", function () {
    DeleteElement(newCardTrashBtn.closest(".elements__item"));
  });

  //adding event listeners for edit-popup and for add-popup
  editBtn.addEventListener("click", function () {
    togglePopup(editPopup);
  });

  addCardBtn.addEventListener("click", function () {
    togglePopup(addCardPopup);
  });

  //adding event listeners for popup-close buttons
  editPopupClsBtn.addEventListener("click", function () {
    togglePopup(editPopup);
  });
  
  addCardPopupClsBtn.addEventListener("click", function () {
    togglePopup(addCardPopup);
  });

  return newCard;
}

// function for like buttons
function toggleLike(button) {
  button.classList.toggle("elements__like-button_active");
}

//function for delete DOM-elements
function DeleteElement(elem) {
  elem.remove();
}

// function for open/close a popup
function togglePopup(popup) {
  popup.toggle.classList("popup__opened");
}
