let curators = [

    {
        fullName: "Imran Mahmud",
        username: "imran05__",
        email: "imran05@example.com",
        gender: "Male"
    },

    {
        fullName: "Ammatul Ayesha",
        username: "__ayesha21__",
        email: "ayesha21@example.com",
        gender: "Female"
    },

    {
        fullName: "Rifat Hasan Rubel",
        username: "rifat22__",
        email: "rifat22@example.com",
        gender: "Male"
    }

];
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");

const curatorsList = document.getElementById("curatorsList");

const search = document.getElementById("search");
const searchMessage = document.getElementById("searchMessage");

const mainEditBtn = document.getElementById("mainEditBtn");

const editMenu = document.getElementById("editMenu");
const viewMenu = document.getElementById("viewMenu");
const formMenu = document.getElementById("formMenu");

const curatorSelect = document.getElementById("curatorSelect");

const renameBtn = document.getElementById("renameBtn");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const updateBtn = document.getElementById("updateBtn");

const form = document.getElementById("curatorForm");
let selectedIndex = -1;

let action = "";

menuBtn.addEventListener("click", function () {

    sidebar.classList.toggle("active");

    mainContent.classList.toggle("shifted");

    menuBtn.classList.toggle("moved");

});

function displayCurators() {

    curatorsList.innerHTML = "";

    let searchValue = search.value.trim().toLowerCase();

    let found = false;

    curators.forEach(function (curator, index) {

        if (curator.fullName.toLowerCase().includes(searchValue)) {

            found = true;
            let row = document.createElement("div");

            row.classList.add("curator");
            let name = document.createElement("span");

            name.classList.add("curator-name");

            name.textContent = curator.fullName;
            let button = document.createElement("button");

            button.classList.add("viewBtn");

            button.textContent = "View";
            button.addEventListener("click", function () {

                viewCurator(index);

            });
            row.appendChild(name);

            row.appendChild(button);

            curatorsList.appendChild(row);

        }

    });

    if (found === false) {

        searchMessage.textContent = "No curators found.";

    }
    else {

        searchMessage.textContent = "";

    }

}
search.addEventListener("input", function () {

    displayCurators();

});
function closeMenus() {

    viewMenu.classList.add("hidden");

    editMenu.classList.add("hidden");

    formMenu.classList.add("hidden");

}
function viewCurator(index) {

    let curator = curators[index];

    document.getElementById("viewName").textContent =
        curator.fullName;

    document.getElementById("viewUsername").textContent =
        curator.username;

    document.getElementById("viewEmail").textContent =
        curator.email;

    document.getElementById("viewGender").textContent =
        curator.gender;

    closeMenus();

    viewMenu.classList.remove("hidden");

}
document.getElementById("closeViewBtn").addEventListener("click", function () {

    viewMenu.classList.add("hidden");

});
function updateDropdown() {

    curatorSelect.innerHTML =
        '<option value="">Select Curator</option>';

    curators.forEach(function (curator, index) {

        let option = document.createElement("option");

        option.value = index;

        option.textContent = curator.fullName;

        curatorSelect.appendChild(option);

    });

}
mainEditBtn.addEventListener("click", function () {

    selectedIndex = -1;

    updateDropdown();

    closeMenus();

    editMenu.classList.remove("hidden");

});
curatorSelect.addEventListener("change", function () {

    if (curatorSelect.value === "") {

        selectedIndex = -1;

    }
    else {

        selectedIndex = Number(curatorSelect.value);

    }

});
document.getElementById("closeEditBtn").addEventListener("click", function () {

    editMenu.classList.add("hidden");

});
renameBtn.addEventListener("click", function () {

    if (selectedIndex === -1) {

        alert("Please select a curator.");

        return;

    }

    let newName = prompt(
        "Enter the new curator name:",
        curators[selectedIndex].fullName
    );

    if (newName === null) {

        return;

    }

    if (newName.trim().length < 3) {

        alert("Name must be at least 3 characters.");

    }
    else if (!/^[A-Za-z ]+$/.test(newName.trim())) {

        alert("Only letters and spaces are allowed.");

    }
    else {

        curators[selectedIndex].fullName = newName.trim();

        search.value = "";

        displayCurators();

        closeMenus();

        alert("Curator renamed successfully!");

    }

});
deleteBtn.addEventListener("click", function () {

    if (selectedIndex === -1) {

        alert("Please select a curator.");

        return;

    }

    let answer = confirm(
        "Do you want to delete this curator?"
    );

    if (answer) {

        curators.splice(selectedIndex, 1);

        selectedIndex = -1;

        displayCurators();

        closeMenus();

        alert("Curator deleted successfully!");

    }

});
addBtn.addEventListener("click", function () {

    action = "add";

    form.reset();

    clearErrors();

    document.getElementById("formTitle").textContent =
        "Add Curator";

    closeMenus();

    formMenu.classList.remove("hidden");

});
updateBtn.addEventListener("click", function () {

    if (selectedIndex === -1) {

        alert("Please select a curator.");

        return;

    }

    action = "update";

    form.reset();

    clearErrors();

    let curator = curators[selectedIndex];

    document.getElementById("formTitle").textContent =
        "Update Curator";

    document.getElementById("fullName").value =
        curator.fullName;

    document.getElementById("username").value =
        curator.username;

    document.getElementById("email").value =
        curator.email;
    let genders = document.querySelectorAll('input[name="gender"]');

    genders.forEach(function (item) {

        if (item.value === curator.gender) {

            item.checked = true;

        }

    });

    closeMenus();

    formMenu.classList.remove("hidden");

});
document.getElementById("closeFormBtn").addEventListener("click", function () {

    form.reset();

    clearErrors();

    formMenu.classList.add("hidden");

});
form.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    let fullName = document.getElementById("fullName");

    let username = document.getElementById("username");

    let email = document.getElementById("email");

    let gender = document.querySelector('input[name="gender"]:checked');

    let valid = true;


    // Full Name Validation

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

    if (email.value.trim() === "") {

        showError(email, "emailError",
            "Email is required.");

        valid = false;

    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {

        showError(email, "emailError",
            "Enter a valid email address.");

        valid = false;

    }
    else {

        showSuccess(email);

    }

    if (!gender) {

        document.getElementById("genderError").textContent =
            "Please select a gender.";

        valid = false;

    }
    curators.forEach(function (curator, index) {

        if (action === "add" || index !== selectedIndex) {

            if (curator.username.toLowerCase() ===
                username.value.trim().toLowerCase()) {

                showError(username, "usernameError",
                    "Username already exists.");

                valid = false;

            }

            if (curator.email.toLowerCase() ===
                email.value.trim().toLowerCase()) {

                showError(email, "emailError",
                    "Email already exists.");

                valid = false;

            }

        }

    });
    if (valid) {

        let curator = {

            fullName: fullName.value.trim(),

            username: username.value.trim(),

            email: email.value.trim(),

            gender: gender.value

        };
        if (action === "add") {

            curators.push(curator);

            alert("Curator added successfully!");

        }
        else if (action === "update") {

            curators[selectedIndex] = curator;

            alert("Curator details updated successfully!");

        }

        form.reset();

        clearErrors();

        search.value = "";

        displayCurators();

        closeMenus();

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

    let inputs = document.querySelectorAll("#curatorForm input");

    inputs.forEach(function (item) {

        item.classList.remove("errorBorder");

        item.classList.remove("successBorder");

    });

}
displayCurators();