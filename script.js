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

// ===== Form helpers (used by Login & Sign-up) =====
function showError(input, errorId, text) {
  document.getElementById(errorId).textContent = text;
  input.classList.add("input-error");
}

function clearError(input, errorId) {
  document.getElementById(errorId).textContent = "";
  input.classList.remove("input-error");
}

// ===== Sign-up page =====

// Count capital letters and numbers using a while loop
function countPasswordParts(password) {
  let upper = 0;
  let numbers = 0;
  let i = 0;

  while (i < password.length) {
    const ch = password[i];

    if (ch >= "A" && ch <= "Z") {
      upper++;
    } else if (ch >= "0" && ch <= "9") {
      numbers++;
    }

    i++;
  }

  return { upper: upper, numbers: numbers };
}

// Show password strength while typing (changes text and CSS)
function checkPasswordStrength() {
  const password = document.getElementById("signupPassword").value;
  const fill = document.getElementById("strengthFill");
  const text = document.getElementById("strengthText");
  const parts = countPasswordParts(password);

  // Give 1 point for each rule
  let score = 0;
  if (password.length >= 8) score++;
  if (parts.upper >= 1) score++;
  if (parts.numbers >= 1) score++;

  if (password === "") {
    fill.style.width = "0%";
    text.textContent = "";
  } else if (score === 1) {
    fill.style.width = "33%";
    fill.style.backgroundColor = "#c0392b";
    text.textContent = "Weak: use 8+ characters, a capital letter and a number";
    text.style.color = "#c0392b";
  } else if (score === 2) {
    fill.style.width = "66%";
    fill.style.backgroundColor = "#e67e22";
    text.textContent = "Medium: almost there!";
    text.style.color = "#e67e22";
  } else {
    fill.style.width = "100%";
    fill.style.backgroundColor = "#2e7d32";
    text.textContent = "Strong password";
    text.style.color = "#2e7d32";
  }
}

// Check the whole sign-up form
function validateSignup() {
  const name = document.getElementById("fullName");
  const email = document.getElementById("signupEmail");
  const phone = document.getElementById("phone");
  const password = document.getElementById("signupPassword");
  const confirm = document.getElementById("confirmPassword");
  const terms = document.getElementById("terms");
  let isValid = true;

  // Clear old errors
  clearError(name, "nameError");
  clearError(email, "signupEmailError");
  clearError(phone, "phoneError");
  clearError(password, "signupPasswordError");
  clearError(confirm, "confirmError");
  document.getElementById("termsError").textContent = "";

  // Name
  if (name.value.trim().length < 3) {
    showError(name, "nameError", "Name must be at least 3 letters");
    isValid = false;
  }

  // Email
  if (email.value.trim() === "") {
    showError(email, "signupEmailError", "Please enter your email");
    isValid = false;
  } else if (!email.value.includes("@") || !email.value.includes(".")) {
    showError(email, "signupEmailError", "Email is not valid");
    isValid = false;
  }

  // Phone: 10 numbers starting with 05
  const phoneValue = phone.value.trim();
  let onlyNumbers = true;
  for (let i = 0; i < phoneValue.length; i++) {
    if (phoneValue[i] < "0" || phoneValue[i] > "9") {
      onlyNumbers = false;
    }
  }

  if (phoneValue.length !== 10 || !phoneValue.startsWith("05") || !onlyNumbers) {
    showError(phone, "phoneError", "Phone must be 10 numbers and start with 05");
    isValid = false;
  }

  // Password
  const parts = countPasswordParts(password.value);
  if (password.value.length < 8 || parts.upper < 1 || parts.numbers < 1) {
    showError(password, "signupPasswordError", "Password does not match the rules");
    isValid = false;
  }

  // Confirm password
  if (confirm.value === "" || confirm.value !== password.value) {
    showError(confirm, "confirmError", "Passwords do not match");
    isValid = false;
  }

  // Terms
  if (!terms.checked) {
    document.getElementById("termsError").textContent = "You must agree to the terms";
    isValid = false;
  }

  if (isValid) {
    showWelcome(name.value.trim(), email.value.trim());
  }

  return false; // stop the page from reloading (static site)
}

// Create a new welcome card with JavaScript (dynamic element)
function showWelcome(name, email) {
  const box = document.getElementById("welcomeBox");
  box.innerHTML = "";

  const card = document.createElement("div");
  card.className = "welcome-card";

  const title = document.createElement("h3");
  title.textContent = "Welcome, " + name + "!";

  const text = document.createElement("p");
  text.textContent = "Your account was created with " + email + ".";

  card.appendChild(title);
  card.appendChild(text);
  box.appendChild(card);

  document.getElementById("signupForm").reset();
  checkPasswordStrength();
}
