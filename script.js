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

// Requirement: Function - show an error message under a field and make its border red
function showError(input, errorId, text) {
    document.getElementById(errorId).innerHTML = text;
    input.style.border = "2px solid #c0392b";
}

// Requirement: Function - remove the error message and the red border
function clearError(input, errorId) {
    document.getElementById(errorId).innerHTML = "";
    input.style.border = "";
}

// ===== Sign-up page =====

// Requirement: while loop - count capital letters and numbers in the password
function countPasswordParts(password) {
    var upper = 0;
    var numbers = 0;
    var i = 0;

    while (i < password.length) {
        var ch = password[i];

        if (ch >= "A" && ch <= "Z") {
            upper++;
        } else if (ch >= "0" && ch <= "9") {
            numbers++;
        }

        i++;
    }

    return { upper: upper, numbers: numbers };
}

// Requirement: Event (oninput) + change CSS style with JavaScript (strength bar)
function checkPasswordStrength() {
    var password = document.getElementById("signupPassword").value;
    var fill = document.getElementById("strengthFill");
    var text = document.getElementById("strengthText");
    var parts = countPasswordParts(password);

    // Give 1 point for each rule
    var score = 0;
    if (password.length >= 8) score++;
    if (parts.upper >= 1) score++;
    if (parts.numbers >= 1) score++;

    if (password == "") {
        fill.style.width = "0%";
        text.innerHTML = "";
    } else if (score <= 1) {
        fill.style.width = "33%";
        fill.style.backgroundColor = "#c0392b";
        text.innerHTML = "Weak: use 8+ characters, a capital letter and a number";
        text.style.color = "#c0392b";
    } else if (score == 2) {
        fill.style.width = "66%";
        fill.style.backgroundColor = "#e67e22";
        text.innerHTML = "Medium: almost there!";
        text.style.color = "#e67e22";
    } else {
        fill.style.width = "100%";
        fill.style.backgroundColor = "#2e7d32";
        text.innerHTML = "Strong password";
        text.style.color = "#2e7d32";
    }
}

// Requirement: Form Validation (runs when the sign-up form is submitted)
function validateSignup() {
    var name = document.getElementById("fullName");
    var email = document.getElementById("signupEmail");
    var phone = document.getElementById("phone");
    var password = document.getElementById("signupPassword");
    var confirm = document.getElementById("confirmPassword");
    var terms = document.getElementById("terms");
    var isValid = true;

    // Clear old errors
    clearError(name, "nameError");
    clearError(email, "signupEmailError");
    clearError(phone, "phoneError");
    clearError(password, "signupPasswordError");
    clearError(confirm, "confirmError");
    document.getElementById("termsError").innerHTML = "";

    // Name: at least 3 letters
    if (name.value.trim().length < 3) {
        showError(name, "nameError", "Name must be at least 3 letters");
        isValid = false;
    }

    // Email: name @ site . ending, no spaces
    var emailText = email.value.trim();
    var atPosition = emailText.indexOf("@");
    var dotPosition = emailText.lastIndexOf(".");

    if (emailText == "") {
        showError(email, "signupEmailError", "Please enter your email");
        isValid = false;
    } else if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition == emailText.length - 1 || emailText.includes(" ")) {
        showError(email, "signupEmailError", "Email is not valid");
        isValid = false;
    }

    // Requirement: for loop - check that the phone has numbers only
    var phoneValue = phone.value.trim();
    var onlyNumbers = true;
    for (var i = 0; i < phoneValue.length; i++) {
        if (phoneValue[i] < "0" || phoneValue[i] > "9") {
            onlyNumbers = false;
        }
    }

    if (phoneValue.length != 10 || !phoneValue.startsWith("05") || !onlyNumbers) {
        showError(phone, "phoneError", "Phone must be 10 numbers and start with 05");
        isValid = false;
    }

    // Password: same 3 rules as the strength bar
    var parts = countPasswordParts(password.value);
    if (password.value.length < 8 || parts.upper < 1 || parts.numbers < 1) {
        showError(password, "signupPasswordError", "Password must have 8+ characters, a capital letter and a number");
        isValid = false;
    }

    // Confirm password must be the same
    if (confirm.value == "" || confirm.value != password.value) {
        showError(confirm, "confirmError", "Passwords do not match");
        isValid = false;
    }

    // Terms checkbox must be checked
    if (!terms.checked) {
        document.getElementById("termsError").innerHTML = "You must agree to the terms";
        isValid = false;
    }

    if (isValid) {
        showWelcome(name.value.trim(), email.value.trim());
    }

    return false; // stop the page from reloading (static site)
}

// Requirement: Dynamic elements - create a new welcome card with JavaScript
function showWelcome(name, email) {
    var box = document.getElementById("welcomeBox");
    box.innerHTML = "";

    var card = document.createElement("div");
    card.className = "welcome-card";

    var title = document.createElement("h3");
    title.textContent = "Welcome, " + name + "!"; // textContent: safe for text typed by the user

    var text = document.createElement("p");
    text.textContent = "Your account was created with " + email + ".";

    card.appendChild(title);
    card.appendChild(text);
    box.appendChild(card);

    document.getElementById("signupForm").reset();
    checkPasswordStrength();
}
