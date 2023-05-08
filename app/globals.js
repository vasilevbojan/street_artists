import { items } from "../data/data.js";
let currentArtist;


export function getCurrentArtist() {
  return localStorage.getItem("selectedArtist") || currentArtist;
  }

  export function clearCurrentArtist() {
    currentArtist = null
  }
  

export function updateItems() {
  localStorage.setItem('items', JSON.stringify(items))
}

export function createItem(item) {
  items.push(item);
  updateItems();
}


export const publishedItems = items.filter((item) => item.isPublished);

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    const artistsSelect = document.querySelector("#artists");
    const artistsFilter = document.querySelector("#artistFilter");

    artistsSelect.innerHTML = "";
    artistsSelect.innerHTML = '<option value="">Select Artist</option>';
    artistsFilter.innerHTML = "";
    artistsFilter.innerHTML += '<option value="" selected>Choose</option>';

    data.forEach((user) => {
      artistsSelect.innerHTML += `<option value="${user.name}">${user.name}</option>`;
      artistsFilter.innerHTML += `<option value="${user.name}">${user.name}</option>`;
    });

    artistsSelect.addEventListener("change", function (event) {
      currentArtist = event.currentTarget.value;
      localStorage.setItem("selectedArtist", event.currentTarget.value)
      location.hash = "#artistHomePage";
      artistsSelect.selectedIndex = 0
    });
    const typeFilter = document.querySelector("#typeFilter");
    const typesArr = [...new Set(items.reduce((a, c) => [...a, c.type], []))];
    typeFilter.innerHTML += '<option value="" selected>Choose</option>';
    typesArr.forEach((type) => {
      typeFilter.innerHTML += `<option value="${type}">${type}</option>`;
    });
  });

