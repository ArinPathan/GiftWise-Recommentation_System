const form = document.getElementById("loginForm");

// Fixed Admin Account

const adminEmail = "admin12@gmail.com";
const adminPassword = "admin@12";


form.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    let identity = document.getElementById("identity");
    let password = document.getElementById("password");

    let valid = true;


    // Email or Username Validation

    if (identity.value.trim() === "") {
        showError(identity, "identityError",
            "Email or username is required.");

        valid = false;
    }
    else {
        showSuccess(identity);
    }


    // Password Validation

    if (password.value === "") {
        showError(password, "passwordError",
            "Password is required.");

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


    // Login Checking

    if (valid) {

        // Admin Login

        if (identity.value.trim().toLowerCase() === adminEmail) {

            if (password.value === adminPassword) {

                alert("Admin Login Successful!");

                window.location.href = "admin-dashboard.html";

            }
            else {

                showError(password, "passwordError",
                    "Incorrect admin password.");

            }

        }

        // Regular User Login

        else {

            document.getElementById("result").textContent =
                "Validation successful. User authentication is required.";

            // Connect to the user database in the future.

        }

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