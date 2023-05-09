import { getCurrentArtist, updateItems } from "../globals.js";
import { items } from "../../data/data.js";
import { capturedPicture } from "./artistCaptureImage.js";

import {
  addTitleInput,
  addDescriptionInput,
  addTypeInput,
  addPriceInput,
  addUrlInput,
  checkIsPublsihed,
  dataindex,
  itemid,
  editmode,
} from "../pages/artistListingPage.js";

export function initAddEditItem() {
  const currentArtist = getCurrentArtist();

  const artistOnAddNew = document.getElementById("artistOnAddItem");
  artistOnAddNew.innerText = currentArtist;

  const addEditBtn = document.getElementById("addEditBtn");
  const addEditTitle = document.getElementById("addEditTitle");
  const cancelBtn = document.getElementById("cancelBtn");
  const form = document.getElementById("form");

  cancelBtn.addEventListener("click", function () {
    location.hash = "#artistListingPage";
    form.reset()
  });
  addEditTitle.innerText = editmode ? "Edit item" : "Add new Item";
  addEditBtn.innerText = editmode ? "Apply" : "Add new item";

  form.addEventListener("submit", function (event) {
    console.log("cacko");
    event.preventDefault();
    if (editmode) {
      (items[dataindex].id = itemid),
        (items[dataindex].description = addDescriptionInput.value),
        (items[dataindex].image = capturedPicture || addUrlInput.value),
        (items[dataindex].price = addPriceInput.value),
        (items[dataindex].artist = currentArtist),
        (items[dataindex].dateCreated = new Date().toISOString()),
        (items[dataindex].isPublished = false),
        (items[dataindex].isAuctioning = false),
        (items[dataindex].dateSold = ""),
        (items[dataindex].priceSold = 0),
        (items[dataindex].title = addTitleInput.value),
        (items[dataindex].type = addTypeInput.value),
        updateItems();
    } else {
      items.push({
        id: items[items.length - 1].id + 1,
        description: addDescriptionInput.value,
        image: capturedPicture || addUrlInput.value,
        price: addPriceInput.value,
        artist: currentArtist,
        dateCreated: new Date().toISOString(),
        isPublished: checkIsPublsihed.checked,
        isAuctioning: false,
        dateSold: "",
        priceSold: 0,
        title: addTitleInput.value,
        type: addTypeInput.value,
      });
      updateItems();
    }
    (addTitleInput.value = null),
      (addDescriptionInput.value = null),
      (addTypeInput.value = null),
      (addPriceInput.value = null),
      (addUrlInput.value = null),
      (checkIsPublsihed.checked = false),
      (location.hash = "#artistListingPage");
      form.reset()
  });
}

function resetForm() {

}
