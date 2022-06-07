import * as constants from "./constants";
import * as cardjs from "./card.js";

let userId;

export function setUser() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-10/users/me", {
    method: "GET",
    headers: {
      authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((user) => {
      console.log(user);
      constants.profileTitle.textContent = user.name;
      constants.profileSubtitle.textContent = user.about;
      constants.profileAvatar.src = user.avatar;
      userId = user._id;
      console.log("Id = " + userId);
    });
}

export function setCards() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-10/cards", {
    headers: {
      authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((cards) => {
      cards.forEach((card) => {
        const cardId = card._id;
        const cardName = card.name;
        const cardLink = card.link;
        const cardLikeCount = card.likes.length;
        console.log(card);

        let cardView;

        if (card.owner._id === userId) {
          console.log("My cards");
          cardView = cardjs.createCard(cardName, cardLink, cardLikeCount, true);
        } else {
          cardView = cardjs.createCard(
            cardName,
            cardLink,
            cardLikeCount,
            false
          );
        }

        constants.elementsSection.append(cardView);
      });
    });
}

export function updateProfile(name, about) {
  console.log(name);
  console.log(about);
  fetch("https://nomoreparties.co/v1/plus-cohort-10/users/me", {
    method: "PATCH",
    headers: {
      authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
}

export function sentCard(name, link) {
  console.log(name);
  console.log(link);
  fetch("https://nomoreparties.co/v1/plus-cohort-10/cards", {
    method: "POST",
    headers: {
      authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
}
