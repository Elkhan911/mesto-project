import * as constants from "./constants";
import * as cardjs from "./card.js";

const baseUrl = constants.config.baseUrl;
const headers = constants.config.headers;

export function setUser() {
  return fetch(baseUrl + "users/me", {
    method: "GET",
    headers,
  });
}

export function setCards() {
  return fetch(baseUrl + "cards", {
    headers,
  });
}

export function updateProfile(name, about) {
  console.log(name);
  console.log(about);
  return fetch(baseUrl + "users/me", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
}

export function sentCard(name, link) {
  console.log(name);
  console.log(link);
  return fetch(baseUrl + "cards", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
}

export function deleteCard(cardId) {
  return fetch(baseUrl + `cards/${cardId}`, {
    method: "DELETE",
    headers,
  });
}

export function addLike(cardId, likeCountElement) {
  return fetch(baseUrl + `cards/likes/${cardId}`, {
    method: "PUT",
    headers,
  });
}

export function removeLike(cardId, likeCountElement) {
  return fetch(baseUrl + `cards/likes/${cardId}`, {
    method: "DELETE",
    headers,
  });
}

export function changeAvatar(newLink) {
  return fetch(baseUrl + "users/me/avatar", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      avatar: newLink,
    }),
  });
}

export function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}
