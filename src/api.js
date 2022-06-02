const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-10",
  headers: {
    authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
    "Content-Type": "application/json",
  },
};

function getCards() {
  fetch("https://nomoreparties.co/v1/plus-cohort-10/cards"),
    {
      headers: {
        authorization: "9f894776-164e-4b06-b8e7-68af2373c7d3",
        "Content-Type": "application/json",
      },
    }
      .then((res) => res.json())
      .then((cards) => {
        cards.forEach((card) => {
          console.log(card);
          //   addPostToDOM(
          //     document.querySelector(".container"),
          //     createPostMarkup(post)
          //   );
        });
      });
}
