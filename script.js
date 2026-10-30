// ===== Image slider =====
const innercontainer = document.querySelector(".inner-container");

if (innercontainer) {
  const total = innercontainer.children.length;
  let current = 0;
  let timer;

  function showSlide(index) {
    if (index >= total) {
      current = 0;
    } else if (index < 0) {
      current = total - 1;
    } else {
      current = index;
    }

    innercontainer.style.transform =
      "translateX(-" + current * 700 + "px)";
  }

  function startAuto() {
    clearInterval(timer);

    timer = setInterval(function () {
      showSlide(current + 1);
    }, 4000);
  }

  document.querySelector(".next").addEventListener("click", function () {
    showSlide(current + 1);
    startAuto();
  });

  document.querySelector(".prev").addEventListener("click", function () {
    showSlide(current - 1);
    startAuto();
  });

  startAuto();
}