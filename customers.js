let customers = [
    {
        fullName: "Monaiza Shahzadi Rahman",
        username: "__mono05__",
        email: "monaiza12@gmail.com",
        gender: "Female"
    },

    {
        fullName: "Amit Saha",
        username: "saha22__",
        email: "amitsaha22@gmail.com",
        gender: "Male"
    },

    {
        fullName: "Khadiza Akter Maria",
        username: "__maru21__",
        email: "khadizamaria21@gmail.com",
        gender: "Female"
    },

    {
        fullName: "Shoriful Islam Opu",
        username: "opumiro03",
        email: "opumiro@gmail.com",
        gender: "Male"
    },

    {
        fullName: "Amirah Maisha",
        username: "__maisha21__",
        email: "amirah21@gmail.com",
        gender: "Female"
    }

];
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");

const customersList = document.getElementById("customersList");

const search = document.getElementById("search");
const searchMessage = document.getElementById("searchMessage");

const mainEditBtn = document.getElementById("mainEditBtn");

const editMenu = document.getElementById("editMenu");
const viewMenu = document.getElementById("viewMenu");
const formMenu = document.getElementById("formMenu");

const customerSelect = document.getElementById("customerSelect");

const renameBtn = document.getElementById("renameBtn");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const updateBtn = document.getElementById("updateBtn");

const form = document.getElementById("customerForm");
let selectedIndex = -1;

let action = "";
menuBtn.addEventListener("click", function () {

    sidebar.classList.toggle("active");

    mainContent.classList.toggle("shifted");

    menuBtn.classList.toggle("moved");

});
function displayCustomers() {

    customersList.innerHTML = "";

    let searchValue = search.value.trim().toLowerCase();

    let found = false;

    customers.forEach(function (customer, index) {

        if (customer.fullName.toLowerCase().includes(searchValue)) {
            found = true;
            let row = document.createElement("div");
            row.classList.add("customer");
            let name = document.createElement("span");
            name.classList.add("customer-name");
            name.textContent = customer.fullName;
            let button = document.createElement("button");
            button.classList.add("viewBtn");
            button.textContent = "View";
            button.addEventListener("click", function () {

                viewCustomer(index);

            });
            row.appendChild(name);
            row.appendChild(button);
            customersList.appendChild(row);
        }
    });
    if (found === false) {
        searchMessage.textContent = "No customers found.";
    }
    else {
        searchMessage.textContent = "";
    }

}
search.addEventListener("input", function () {
    displayCustomers();
});
function closeMenus() {
    viewMenu.classList.add("hidden");
    editMenu.classList.add("hidden");
    formMenu.classList.add("hidden");
}
function viewCustomer(index) {
    let customer = customers[index];
    document.getElementById("viewName").textContent =
        customer.fullName;
    document.getElementById("viewUsername").textContent =
        customer.username;
    document.getElementById("viewEmail").textContent =
        customer.email;
    document.getElementById("viewGender").textContent =
        customer.gender;
    closeMenus();
    viewMenu.classList.remove("hidden");
}
document.getElementById("closeViewBtn").addEventListener("click", function () {
    viewMenu.classList.add("hidden");
});
function updateDropdown() {
    customerSelect.innerHTML =
        '<option value="">Select Customer</option>';
    customers.forEach(function (customer, index) {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = customer.fullName;
        customerSelect.appendChild(option);
    });
}
mainEditBtn.addEventListener("click", function () {
    selectedIndex = -1;
    updateDropdown();
    closeMenus();
    editMenu.classList.remove("hidden");
});
customerSelect.addEventListener("change", function () {
    if (customerSelect.value === "") {
        selectedIndex = -1;
    }
    else {
        selectedIndex = Number(customerSelect.value);
    }
});
document.getElementById("closeEditBtn").addEventListener("click", function () {
    editMenu.classList.add("hidden");
});
renameBtn.addEventListener("click", function () {
    if (selectedIndex === -1) {
        alert("Please select a customer.");
        return;
    }
    let newName = prompt(
        "Enter the new customer name:",
        customers[selectedIndex].fullName
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
        customers[selectedIndex].fullName = newName.trim();
        search.value = "";
        displayCustomers();
        closeMenus();
        alert("Customer renamed successfully!");
    }
});
deleteBtn.addEventListener("click", function () {

    if (selectedIndex === -1) {
        alert("Please select a customer.");
        return;
    }
    let answer = confirm(
        "Do you want to delete this customer?"
    );
    if (answer) {
        customers.splice(selectedIndex, 1);
        selectedIndex = -1;
        displayCustomers();
        closeMenus();
        alert("Customer deleted successfully!");
    }
});
addBtn.addEventListener("click", function () {
    action = "add";
    form.reset();
    clearErrors();
    document.getElementById("formTitle").textContent =
        "Add Customer";
    closeMenus();
    formMenu.classList.remove("hidden");
});
updateBtn.addEventListener("click", function () {
    if (selectedIndex === -1) {
        alert("Please select a customer.");
        return;
    }
    action = "update";
    form.reset();
    clearErrors();
    let customer = customers[selectedIndex];
    document.getElementById("formTitle").textContent =
        "Update Customer";
    document.getElementById("fullName").value =
        customer.fullName;
    document.getElementById("username").value =
        customer.username;
    document.getElementById("email").value =
        customer.email;
    let genders = document.querySelectorAll('input[name="gender"]');
    genders.forEach(function (item) {
        if (item.value === customer.gender) {
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
    customers.forEach(function (customer, index) {

        if (action === "add" || index !== selectedIndex) {

            if (customer.username.toLowerCase() ===
                username.value.trim().toLowerCase()) {

                showError(username, "usernameError",
                    "Username already exists.");

                valid = false;

            }

            if (customer.email.toLowerCase() ===
                email.value.trim().toLowerCase()) {

                showError(email, "emailError",
                    "Email already exists.");

                valid = false;

            }

        }

    });
    if (valid) {

        let customer = {

            fullName: fullName.value.trim(),

            username: username.value.trim(),

            email: email.value.trim(),

            gender: gender.value

        };
        if (action === "add") {

            customers.push(customer);

            alert("Customer added successfully!");

        }
        else if (action === "update") {

            customers[selectedIndex] = customer;

            alert("Customer details updated successfully!");

        }
        form.reset();
        clearErrors();
        search.value = "";
        displayCustomers();
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
    let inputs = document.querySelectorAll("#customerForm input");
    inputs.forEach(function (item) {
        item.classList.remove("errorBorder");
        item.classList.remove("successBorder");
    });
}
displayCustomers();