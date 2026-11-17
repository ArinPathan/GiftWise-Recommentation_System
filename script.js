const form = document.getElementById("registerForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    let fullName = document.getElementById("fullName");
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let gender = document.querySelector('input[name="gender"]:checked');
    let terms = document.getElementById("terms");

    let valid = true;


    // Full Name Validation

    if (fullName.value.trim() === "") {
        showError(fullName, "fullNameError", "Full name is required.");
        valid = false;
    }
    else if (fullName.value.trim().length < 2) {
        showError(fullName, "fullNameError", "Enter at least 2 characters.");
        valid = false;
    }
    else {
        showSuccess(fullName);
    }


    // Username Validation

    if (username.value.trim() === "") {
        showError(username, "usernameError", "Username is required.");
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


    // Email Validation

    if (email.value.trim() === "") {
        showError(email, "emailError", "Email is required.");
        valid = false;
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, "emailError", "Enter a valid email address.");
        valid = false;
    }
    else {
        showSuccess(email);
    }


    // Password Validation

    if (password.value === "") {
        showError(password, "passwordError", "Password is required.");
        valid = false;
    }
    else if (password.value.length < 6) {
        showError(password, "passwordError",
            "Password must be at least 6 characters.");
        valid = false;
    }
    else {
        showSuccess(password);
    }


    // Confirm Password Validation

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


    // Gender Validation

    if (!gender) {
        document.getElementById("genderError").textContent =
            "Please select your gender.";

        valid = false;
    }


    // Terms and Conditions Validation

    if (!terms.checked) {
        document.getElementById("termsError").textContent =
            "Please agree to the Terms & Conditions.";

        valid = false;
    }


    // Successful Validation

    if (valid) {

        document.getElementById("result").textContent =
            "Registration form validated successfully, " +
            fullName.value.trim() + "!";

        form.reset();
    }

});


// Show Error Function

function showError(input, errorId, message) {

    document.getElementById(errorId).textContent = message;

    input.classList.add("errorBorder");
    input.classList.remove("successBorder");
}


// Show Success Function

function showSuccess(input) {

    input.classList.add("successBorder");
    input.classList.remove("errorBorder");
}


// Clear Errors Function

function clearErrors() {

    let errors = document.querySelectorAll(".error");

    errors.forEach(function (item) {
        item.textContent = "";
    });

    let inputs = document.querySelectorAll("input");

    inputs.forEach(function (item) {
        item.classList.remove("errorBorder");
        item.classList.remove("successBorder");
    });

    document.getElementById("result").textContent = "";
}


// Show and Hide Password

document.getElementById("showPassword").addEventListener("click", function () {

    let password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
        this.setAttribute("aria-label", "Hide password");
    }
    else {
        password.type = "password";
        this.setAttribute("aria-label", "Show password");
    }

});


// Show and Hide Confirm Password

document.getElementById("showConfirmPassword").addEventListener("click", function () {

    let confirmPassword = document.getElementById("confirmPassword");

    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
        this.setAttribute("aria-label", "Hide confirm password");
    }
    else {
        confirmPassword.type = "password";
        this.setAttribute("aria-label", "Show confirm password");
    }

});