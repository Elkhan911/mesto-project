import * as constants from "./constants";
import * as cardjs from "./card.js";

export function setUser() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-10/users/me", {
    method: "GET",
    headers: {
      authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
      "Content-Type": "application/json",
    },
  });
}

export function setCards() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-10/cards", {
    headers: {
      authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
      "Content-Type": "application/json",
    },
  });
}

export function updateProfile(name, about) {
  console.log(name);
  console.log(about);
  return fetch("https://nomoreparties.co/v1/plus-cohort-10/users/me", {
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
  return fetch("https://nomoreparties.co/v1/plus-cohort-10/cards", {
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

export function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-10/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
      "Content-Type": "application/json",
    },
  });
}

export function addLike(cardId, likeCountElement) {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-10/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
        "Content-Type": "application/json",
      },
    }
  );
}

export function removeLike(cardId, likeCountElement) {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-10/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
        "Content-Type": "application/json",
      },
    }
  );
}

export function changeAvatar(newLink) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-10/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: newLink,
    }),
  });
}
