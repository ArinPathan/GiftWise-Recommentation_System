# GiftWise: Customer features (HTML + CSS + JS)

A multi-page front-end project. Every feature has its own `.html`, `.css` and `.js` file.

## How to run
1. Extract the zip.
2. Start a tiny local web server inside the folder (recommended, works in every browser):
   - Python: `python -m http.server 8000`  then open http://localhost:8000
   - or VS Code: install "Live Server", right-click `index.html` > Open with Live Server
   - or Node: `npx serve`
3. Opening `index.html` by double-click also works in Chrome/Edge, but Firefox may not share saved data between pages when using `file://`, so use a server.

Needs internet only for the Google Fonts (a serif fallback is used offline).
Demo account: username `demo`, password `demo` (or register a new one).

## Features -> files
| Feature | Page | Style | Script |
|---|---|---|---|
| Get Started (entry) | index.html | css/index.css | js/index.js |
| Register | register.html | css/register.css | js/register.js |
| Login | login.html | css/login.css | js/login.js |
| Logout | logout.html | css/logout.css | js/logout.js |
| View profile | profile.html | css/profile.css | js/profile.js |
| Edit profile | edit-profile.html | css/edit-profile.css | js/edit-profile.js |
| Enter recipient details (step 1) | recipient.html | css/recipient.css | js/recipient.js |
| Select relationship (step 2) | relationship.html | css/relationship.css | js/relationship.js |
| Select occasion (step 3) | occasion.html | css/occasion.css | js/occasion.js |
| Select budget (step 4) | budget.html | css/budget.css | js/budget.js |
| Select interests (step 5) | interests.html | css/interests.css | js/interests.js |
| Get gift recommendations | recommendations.html | css/recommendations.css | js/recommendations.js |
| View gift details | gift-details.html | css/gift-details.css | js/gift-details.js |
| Save gifts to favorites | favorites.html (+ heart buttons) | css/favorites.css | js/favorites.js |
| Rate & review | review.html | css/review.css | js/review.js |

Shared: `css/common.css`, `js/common.js` (storage, login session, nav, wizard steps, helpers), `js/data.js` (99-product catalogue + recommendation engine).

## Flow
Get Started > Register/Login > Recipient > Relationship > Occasion > Budget > Interests > Recommendations > Gift details > (Save / Review) > Favorites.

## How recommendations are generated
`js/data.js` > `sc()` scores each product: +3 per matching interest, +3 matching occasion, +2 matching relationship, +2 / -5 for gender fit, +1 / -4 for age fit. The budget tier (Budget under 500 tk, Mid-range 500-2,000 tk, Premium 2,000-6,000 tk, 33 products each) is a hard filter. Add or edit products in the `RAW` list.

## Adding real product photos
Put a JPG in `images/products/` named with the product number, e.g. `12.jpg`. The number is shown on the gift details page and listed in `images/products/README.txt`. No code changes needed.

## Notes
- Data (accounts, favourites, reviews) is stored in the browser's localStorage, so it is a front-end prototype. For production, move `Auth`, `Rec`, `Favs`, `Rev` in `js/common.js` to a real backend and hash passwords.
- Prices are approximate BDT estimates.
