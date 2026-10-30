const cards = document.querySelectorAll(".service-card");

cards.forEach(function (card) {
  card.addEventListener("click", function () {
    card.classList.toggle("active");
  });
});