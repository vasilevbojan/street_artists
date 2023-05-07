import { items } from "../../data/data.js";
import { publishedItems } from "../globals.js";
export let filtered;

export function initVisitorFilterPage() {
  const visitorFilter = document.getElementById("visitorFilters");
  visitorFilter.classList.add("filterPageTrans");

  const typeFilter = document.querySelector("#typeFilter");
  const typesArr = [...new Set(items.reduce((a, c) => [...a, c.type], []))];
  typeFilter.innerHTML = "";
  typeFilter.innerHTML += '<option value="" selected>Choose</option>';
  typesArr.forEach((type) => {
    typeFilter.innerHTML += `<option value="${type}">${type}</option>`;
  });

}

const applyBtn = document.getElementById("applyFilter");
applyBtn.addEventListener("click", function () {
  let title = document.querySelector("#title").value;
  let artist = document.querySelector("#artistFilter").value;
  let minPrice = document.querySelector("#min").value;
  let maxPrice = document.querySelector("#max").value;
  let type = document.querySelector("#typeFilter").value;

  filtered = publishedItems.filter(
    (item) =>
      (title ? item.title.includes(title) : true) &&
      (artist ? item.artist === artist : true) &&
      (minPrice ? item.price >= minPrice : true) &&
      (maxPrice ? item.price <= maxPrice : true) &&
      (type ? item.type === type : true)
  );
  title = "";
  document.querySelector("#artistFilter").selectedIndex = 0;
  minPrice = 0;
  maxPrice = 0;
  document.querySelector("#typeFilter").selectedIndex = 0;
});
