// Imports
import * as constants from "./constants";

export function setKeyListener(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", setKeyListener);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", setKeyListener);
}

export function сlosePopupOnOverloy() {
  constants.popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popup);
      } else if (evt.target.classList.contains("popup__close-button")) {
        closePopup(popup);
      }
    });
  });
}
