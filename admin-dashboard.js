const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");
const dashboardSection = document.getElementById("dashboardSection");
const profileSection = document.getElementById("profileSection");
const profileImageBtn = document.getElementById("profileImageBtn");
const backBtn = document.getElementById("backBtn");
const logoutBtn = document.getElementById("logoutBtn");
const form = document.getElementById("profileForm");
const adminEmail = "admin12@gmail.com";
const adminPassword = "admin@12";

menuBtn.addEventListener("click", function () {

    sidebar.classList.toggle("active");

    mainContent.classList.toggle("shifted");

    menuBtn.classList.toggle("moved");

});

function closeSidebar() {

    sidebar.classList.remove("active");

    mainContent.classList.remove("shifted");

    menuBtn.classList.remove("moved");

}

profileImageBtn.addEventListener("click", function () {

    dashboardSection.classList.add("hidden");

    profileSection.classList.remove("hidden");

    closeSidebar();

});

backBtn.addEventListener("click", function () {

    profileSection.classList.add("hidden");

    dashboardSection.classList.remove("hidden");

    closeSidebar();

});

logoutBtn.addEventListener("click", function (event) {

    event.preventDefault();

    let answer = confirm("Are you sure you want to logout?");

    if (answer) {

        window.location.href = "login.html";

    }

});

form.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    let fullName = document.getElementById("fullName");
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");

    let valid = true;

    if (fullName.value.trim() === "") {

        showError(fullName, "fullNameError",
            "Full name is required.");

        valid = false;

    }
    else if (!/^[A-Za-z ]+$/.test(fullName.value.trim())) {

        showError(fullName, "fullNameError",
            "Only letters and spaces are allowed.");

        valid = false;

    }
    else if (fullName.value.trim().length < 3) {

        showError(fullName, "fullNameError",
            "Name must be at least 3 characters.");

        valid = false;

    }
    else {

        showSuccess(fullName);

    }

    if (username.value.trim() === "") {

        showError(username, "usernameError",
            "Username is required.");

        valid = false;

    }
    else if (!/^[A-Za-z0-9_]{3,20}$/.test(username.value.trim())) {

        showError(username, "usernameError",
            "Use 3-20 letters, numbers or underscores.");

        valid = false;

    }
    else {

        showSuccess(username);

    }

    if (email.value.trim() !== adminEmail) {

        showError(email, "emailError",
            "Admin email cannot be changed.");

        valid = false;

    }
    else {

        showSuccess(email);

    }

    if (password.value === "") {

        showError(password, "passwordError",
            "Password is required.");

        valid = false;

    }
    else if (password.value !== adminPassword) {

        showError(password, "passwordError",
            "Incorrect admin password.");

        valid = false;

    }
    else {

        showSuccess(password);

    }

    if (confirmPassword.value === "") {

        showError(confirmPassword, "confirmPasswordError",
            "Please confirm your password.");

        valid = false;

    }
    else if (confirmPassword.value !== password.value) {

        showError(confirmPassword, "confirmPasswordError",
            "Passwords do not match.");

        valid = false;

    }
    else {

        showSuccess(confirmPassword);

    }

    if (valid) {

        let firstName = fullName.value.trim().split(" ")[0];

        document.getElementById("greeting").textContent =
            "Hello, " + firstName;

        clearErrors();

        document.getElementById("result").textContent =
            "Profile details updated successfully!";

        password.value = "";
        confirmPassword.value = "";

        password.type = "password";
        confirmPassword.type = "password";

    }

});

function showError(input, errorId, message) {

    document.getElementById(errorId).textContent = message;

    input.classList.add("errorBorder");

    input.classList.remove("successBorder");

}

function showSuccess(input) {

    input.classList.add("successBorder");

    input.classList.remove("errorBorder");

}

function clearErrors() {

    let errors = document.querySelectorAll(".error");

    errors.forEach(function (item) {

        item.textContent = "";

    });


    let inputs = document.querySelectorAll("#profileForm input");

    inputs.forEach(function (item) {

        item.classList.remove("errorBorder");

        item.classList.remove("successBorder");

    });


    document.getElementById("result").textContent = "";

}

document.getElementById("showPassword").addEventListener("click", function () {

    let password = document.getElementById("password");

    if (password.type === "password") {

        password.type = "text";

    }
    else {

        password.type = "password";

    }

});

document.getElementById("showConfirmPassword").addEventListener("click", function () {

    let confirmPassword = document.getElementById("confirmPassword");

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";

    }
    else {

        confirmPassword.type = "password";

    }

});