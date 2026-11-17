const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");

const categoriesList = document.getElementById("categoriesList");

const search = document.getElementById("search");
const searchMessage = document.getElementById("searchMessage");

const mainEditBtn = document.getElementById("mainEditBtn");
const editMenu = document.getElementById("editMenu");
const categorySelect = document.getElementById("categorySelect");

const deleteBtn = document.getElementById("deleteBtn");
const updateBtn = document.getElementById("updateBtn");
const addBtn = document.getElementById("addBtn");
const renameBtn = document.getElementById("renameBtn");
const closeBtn = document.getElementById("closeBtn");

let selectedCategory = null;

menuBtn.addEventListener("click", function () {

    sidebar.classList.toggle("active");

    mainContent.classList.toggle("shifted");

    menuBtn.classList.toggle("moved");

});
search.addEventListener("input", searchCategories);
function searchCategories() {

    let searchValue = search.value.trim().toLowerCase();

    let categories = document.querySelectorAll(".category");

    let found = false;

    categories.forEach(function (item) {

        if (item.textContent.toLowerCase().includes(searchValue)) {

            item.classList.remove("hidden");

            found = true;

        }
        else {

            item.classList.add("hidden");

        }

    });


    if (found) {

        searchMessage.textContent = "";

    }
    else {

        searchMessage.textContent = "No categories found.";

    }

}
function updateDropdown() {

    categorySelect.innerHTML =
        '<option value="">Select Category</option>';

    let categories = document.querySelectorAll(".category");

    categories.forEach(function (item, index) {

        let option = document.createElement("option");

        option.value = index;

        option.textContent = item.textContent.trim();

        categorySelect.appendChild(option);

    });

}
mainEditBtn.addEventListener("click", function () {

    selectedCategory = null;

    updateDropdown();

    editMenu.classList.remove("hidden");

});
categorySelect.addEventListener("change", function () {

    let categories = document.querySelectorAll(".category");

    if (categorySelect.value === "") {

        selectedCategory = null;

    }
    else {

        selectedCategory =
            categories[Number(categorySelect.value)];

    }

});
closeBtn.addEventListener("click", function () {

    editMenu.classList.add("hidden");

});
deleteBtn.addEventListener("click", function () {

    if (selectedCategory === null) {

        alert("Please select a category.");

        return;

    }

    let answer = confirm("Delete this category?");

    if (answer) {

        selectedCategory.remove();

        selectedCategory = null;

        editMenu.classList.add("hidden");

        searchCategories();

        alert("Category deleted successfully!");

    }

});
function changeCategory(message) {

    if (selectedCategory === null) {

        alert("Please select a category.");

        return;

    }

    let newName = prompt(
        message,
        selectedCategory.textContent.trim()
    );

    if (newName === null) {

        return;

    }

    if (newName.trim() === "") {

        alert("Category name cannot be empty.");

    }
    else {

        selectedCategory.textContent = newName.trim();

        editMenu.classList.add("hidden");

        searchCategories();

        alert("Category changed successfully!");

    }

}
updateBtn.addEventListener("click", function () {

    changeCategory("Update the category name:");

});
renameBtn.addEventListener("click", function () {

    changeCategory("Enter the new category name:");

});
addBtn.addEventListener("click", function () {

    let name = prompt("Enter the new category name:");

    if (name === null) {

        return;

    }

    if (name.trim() === "") {

        alert("Category name cannot be empty.");

    }
    else {

        let category = document.createElement("div");

        category.classList.add("category");

        category.textContent = name.trim();

        categoriesList.appendChild(category);

        search.value = "";

        searchCategories();

        editMenu.classList.add("hidden");

        alert("New category added successfully!");

    }

});