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


// ===== Hanging sprigs under the header =====
const headerEl = document.querySelector("header");

if (headerEl) {
  const garland = document.createElement("div");
  garland.className = "garland";

  const count = Math.max(6, Math.round(window.innerWidth / 85));

  for (let i = 0; i < count; i++) {
    const pos = i / (count - 1);
    const edge = Math.abs(pos - 0.5) * 2;

    let length = 85 + edge * edge * 95;
    if (i % 2 === 1) {
      length -= 18;
    }
    length = Math.round(Math.max(80, length));

    const sprig = document.createElement("div");
    sprig.className = "sprig";
    sprig.style.left = (3 + pos * 94) + "%";
    sprig.style.height = length + "px";

    garland.appendChild(sprig);
  }

  headerEl.appendChild(garland);
}