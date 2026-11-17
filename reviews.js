let reviews = [
    {
        name: "Monaiza Shahzadi Rahman",
        image: "customer1.jpeg",
        rating: 5,
        review: "Perfect when you have no idea what to buy. I'm usually terrible at choosing gifts. This gave me several relevant ideas in seconds and saved me a lot of searching."
    },
    {
        name: "Amit Saha",
        image: "customer2.jpeg",
        rating: 4,
        review: "Very useful and easy to use. The recommendations were good, especially after I added more details about the recipient. I'd love to see even more filtering options."
    },
    {
        name: "Khadiza Akter Maria",
        image: "customer3.jpeg",
        rating: 3,
        review: "Helped me stay within my budget."
    },
    {
        name: "Shoriful Islam Apu",
        image: "customer4.jpeg",
        rating: 2,
        review: "Not every recommendation was perfect, but it gave me ideas I wouldn't have thought of myself."
    },
    {
        name: "Amirah Maisha",
        image: "customer6.jpeg",
        rating: 4,
        review: "Lots of useful options and filters. Would love to see more customization features though."
    }
];
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");
const reviewsList = document.getElementById("reviewsList");
const sortReviews = document.getElementById("sortReviews");
const reviewCount = document.getElementById("reviewCount");
const viewMenu = document.getElementById("viewMenu");
const closeViewBtn = document.getElementById("closeViewBtn");
menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    mainContent.classList.toggle("shifted");
    menuBtn.classList.toggle("moved");
});
function generateStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars = stars + "★";
        }
        else {
            stars = stars + "☆";
        }
    }
    return stars;
}
function displayReviews(reviewArray) {
    reviewsList.innerHTML = "";
    reviewArray.forEach(function (customer) {
        let row = document.createElement("div");
        row.classList.add("review");
        let image = document.createElement("img");
        image.classList.add("customer-image");
        image.src = customer.image;
        image.alt = customer.name;
        let details = document.createElement("div");
        details.classList.add("review-details");
        let name = document.createElement("h3");
        name.classList.add("customer-name");
        name.textContent = customer.name;
        let rating = document.createElement("p");
        rating.classList.add("rating");
        rating.textContent = generateStars(customer.rating);
        let description = document.createElement("p");
        description.classList.add("review-text");
        if (customer.review.length > 120) {
            description.textContent =
                customer.review.substring(0, 120) + "...";
        }
        else {
            description.textContent = customer.review;
        }
        let button = document.createElement("button");
        button.classList.add("viewBtn");
        button.textContent = "View";
        button.addEventListener("click", function () {
            viewReview(customer);
        });
        details.appendChild(name);
        details.appendChild(rating);
        details.appendChild(description);
        row.appendChild(image);
        row.appendChild(details);
        row.appendChild(button);
        reviewsList.appendChild(row);
    });
    reviewCount.textContent =
        "Showing " + reviewArray.length +
        " of " + reviews.length + " reviews";
}
function viewReview(customer) {
    document.getElementById("viewImage").src =
        customer.image;
    document.getElementById("viewImage").alt =
        customer.name;
    document.getElementById("viewName").textContent =
        customer.name;
    document.getElementById("viewRating").textContent =
        generateStars(customer.rating);
    document.getElementById("ratingNumber").textContent =
        customer.rating + " out of 5";
    document.getElementById("viewReview").textContent =
        customer.review;
    viewMenu.classList.remove("hidden");
}
closeViewBtn.addEventListener("click", function () {
    viewMenu.classList.add("hidden");
});
function findHighestRating() {
    let highest = 0;
    reviews.forEach(function (customer) {
        if (customer.rating > highest) {
            highest = customer.rating;
        }
    });
    return highest;
}
function findLowestRating() {
    let lowest = 5;
    reviews.forEach(function (customer) {
        if (customer.rating < lowest) {
            lowest = customer.rating;
        }
    });
    return lowest;
}
sortReviews.addEventListener("change", function () {
    let selectedOption = sortReviews.value;
    let filteredReviews = [];
    if (selectedOption === "highest") {
        let highest = findHighestRating();
        filteredReviews = reviews.filter(function (customer) {
            return customer.rating === highest;
        });
    }
    else if (selectedOption === "lowest") {
        let lowest = findLowestRating();
        filteredReviews = reviews.filter(function (customer) {
            return customer.rating === lowest;
        });
    }
    else {
        filteredReviews = reviews;
    }
    viewMenu.classList.add("hidden");
    displayReviews(filteredReviews);
});
displayReviews(reviews);