import { items } from "../../data/data.js";


export function initVisitorListingPage() {


    const publishedItems = items.filter(item => item.isPublished)
    const itemsContainer = document.querySelector('#visitorListingContainer')


    // filtering

    const title = ''
    const artist = ''
    const minPrice = 0
    const maxPrice = 0
    const type = ''


    const filtered = publishedItems.filter(
        (item) =>
            (title ? item.title.includes(title) : true) &&
            (artist ? item.artist === artist : true) &&
            (minPrice ? item.price >= minPrice : true) &&
            (maxPrice ? item.price <= maxPrice : true) &&
            (type ? item.type === type : true)
    )

    itemsContainer.innerHTML = ''
    filtered.forEach(({ image, title, description, price, artist }) => {

        itemsContainer.innerHTML += `<div class="card">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text">${artist}</p>
          <a href="#" class="btn btn-primary">$${price}</a>
        </div>
      </div>`
    })
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