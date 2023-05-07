import { publishedItems } from "../globals.js";

import { filtered } from "./visitorFilterPage.js";

let isFilteredShown = false;
export function initVisitorListingPage() {
  const itemsContainer = document.querySelector("#visitorListingContainer");

  function printer(target) {
    itemsContainer.innerHTML = "";
    target.forEach(({ image, title, description, price, artist }) => {
      itemsContainer.innerHTML += `<div class="card mb-4">
          <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body py-1 px-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
          <h2 class="card-text ">${artist}</h2>
          <span href="#" class="badge bg-primary ">$${price}</span>
          </div>
            <h6 class="card-title">${title}</h6>
            <p class="card-text">${description}</p>
          </div>
        </div>`;
    });
  }

  if (isFilteredShown) {
    printer(filtered);
  } else {
    printer(publishedItems);
    isFilteredShown = true;
  }
}
// // destructuring

// const obj = {
//     name: 'Riste',
//     age: 35,
//     address: {
//         st: 'Prashka',
//         no: 11
//     }
// }

// console.log(obj.name) // Riste

// const { name, age, address } = obj

// const { st, no } = address

// console.log(name, age) // Riste 35

// someFn(obj)

// function someFn({ name, age, address }) {

// }
