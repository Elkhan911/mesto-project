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
  // adding event listener for like button
  newCardLikeBtn.addEventListener("click", function () {
    toggleLike(newCardLikeBtn);
  });

  //adding event listener for trash button
  newCardTrashBtn.addEventListener("click", function () {
    DeleteElement(newCardTrashBtn.closest(".elements__item"));
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
