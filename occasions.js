const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");
const occasionsList = document.getElementById("occasionsList");
const search = document.getElementById("search");
const searchMessage = document.getElementById("searchMessage");
const mainEditBtn = document.getElementById("mainEditBtn");
const editMenu = document.getElementById("editMenu");
const occasionSelect = document.getElementById("occasionSelect");
const deleteBtn = document.getElementById("deleteBtn");
const updateBtn = document.getElementById("updateBtn");
const addBtn = document.getElementById("addBtn");
const renameBtn = document.getElementById("renameBtn");
const closeBtn = document.getElementById("closeBtn");
const imageInput = document.getElementById("imageInput");
let selectedOccasion = null;
let action = "";
let newOccasionName = "";
menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    mainContent.classList.toggle("shifted");
    menuBtn.classList.toggle("moved");
});
search.addEventListener("input", searchOccasions);
function searchOccasions() {
    let searchValue = search.value.trim().toLowerCase();
    let occasions = document.querySelectorAll(".occasion");
    let found = false;
    occasions.forEach(function (item) {
        let name = item.querySelector(".occasion-name");
        if (name.textContent.toLowerCase().includes(searchValue)) {
            item.classList.remove("hidden");
            found = true;
        }
        else {
            item.classList.add("hidden");
        }
    });
    if (found === false) {
        searchMessage.textContent = "No occasions found.";
    }
    else {
        searchMessage.textContent = "";
    }
}
function updateDropdown() {
    occasionSelect.innerHTML =
        '<option value="">Select Occasion</option>';
    let occasions = document.querySelectorAll(".occasion");
    occasions.forEach(function (item, index) {
        let name = item.querySelector(".occasion-name");
        let option = document.createElement("option");
        option.value = index;
        option.textContent = name.textContent;
        occasionSelect.appendChild(option);
    });
}
mainEditBtn.addEventListener("click", function () {
    selectedOccasion = null;
    updateDropdown();
    editMenu.classList.remove("hidden");
});
occasionSelect.addEventListener("change", function () {
    let occasions = document.querySelectorAll(".occasion");
    if (occasionSelect.value === "") {
        selectedOccasion = null;
    }
    else {
        selectedOccasion = occasions[Number(occasionSelect.value)];
    }
});
closeBtn.addEventListener("click", function () {
    editMenu.classList.add("hidden");
});
deleteBtn.addEventListener("click", function () {
    if (selectedOccasion === null) {
        alert("Please select an occasion.");
        return;
    }
    let answer = confirm("Do you want to delete this occasion?");
    if (answer === true) {
        selectedOccasion.remove();
        selectedOccasion = null;
        editMenu.classList.add("hidden");
        searchOccasions();
        alert("Occasion deleted successfully!");
    }
});
renameBtn.addEventListener("click", function () {
    if (selectedOccasion === null) {
        alert("Please select an occasion.");
        return;
    }
    let name = selectedOccasion.querySelector(".occasion-name");
    let newName = prompt("Enter the new occasion name:",
                         name.textContent);
    if (newName !== null) {
        if (newName.trim() === "") {
            alert("Occasion name cannot be empty.");
        }
        else {
            name.textContent = newName.trim();
            selectedOccasion.querySelector("img").alt =
                newName.trim();
            editMenu.classList.add("hidden");
            searchOccasions();
            alert("Occasion renamed successfully!");
        }
    }
});
updateBtn.addEventListener("click", function () {
    if (selectedOccasion === null) {
        alert("Please select an occasion.");
        return;
    }
    action = "update";
    imageInput.value = "";
    imageInput.click();
});
addBtn.addEventListener("click", function () {
    let name = prompt("Enter the new occasion name:");
    if (name !== null) {
        if (name.trim() === "") {
            alert("Occasion name cannot be empty.");
        }
        else {
            newOccasionName = name.trim();
            action = "add";
            imageInput.value = "";
            imageInput.click();
        }
    }
});
imageInput.addEventListener("change", function () {
    let file = imageInput.files[0];
    if (!file) {
        return;
    }
    if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
    }
    let reader = new FileReader();
    let currentAction = action;
    let currentOccasion = selectedOccasion;
    let currentName = newOccasionName;
    reader.onload = function () {
        if (currentAction === "update" && currentOccasion !== null) {
            let image = currentOccasion.querySelector("img");
            image.src = reader.result;
            alert("Occasion image updated successfully!");
        }
        else if (currentAction === "add") {
            createOccasion(currentName, reader.result);
            alert("New occasion added successfully!");
        }
        editMenu.classList.add("hidden");
        searchOccasions();
    };
    reader.readAsDataURL(file);
});
function createOccasion(name, imageSource) {
    let occasion = document.createElement("div");
    occasion.classList.add("occasion");
    let heading = document.createElement("h3");
    heading.classList.add("occasion-name");
    heading.textContent = name;
    let image = document.createElement("img");
    image.classList.add("occasion-image");
    image.src = imageSource;
    image.alt = name;
    occasion.appendChild(heading);
    occasion.appendChild(image);
    occasionsList.appendChild(occasion);
}