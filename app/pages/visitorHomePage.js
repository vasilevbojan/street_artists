import { items } from "../../data/data.js";
import { clearCurrentArtist } from "../globals.js";

export function initVisitorHomePage() {
  clearCurrentArtist()
  localStorage.setItem("selectedArtist", "")
  let sliderDiv1 = document.querySelector(".imagegroup1");
  let sliderDiv2 = document.querySelector(".imagegroup2");
  sliderDiv1.innerHTML = "";
  sliderDiv2.innerHTML = "";

  items.forEach(({ image }) => {
    sliderDiv1.innerHTML += `<img src="${image}"  class="m-3" alt="...">`;

    sliderDiv2.innerHTML += `<img src="${image}" class="m-3" alt="..." >`;
  });
}
