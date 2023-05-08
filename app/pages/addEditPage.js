import { getCurrentArtist, updateItems } from "../globals.js";
import { editmode } from "../pages/artistListingPage.js";
import { items } from "../../data/data.js";
import {
  addTitleInput,
  addDescriptionInput,
  addTypeInput,
  addPriceInput,
  addUrlInput,
  checkIsPublsihed,
  dataindex,
  itemid,
} from "../pages/artistListingPage.js";

export function initAddEditItem() {
  const currentArtist = getCurrentArtist();

  const artistOnAddNew = document.getElementById("artistOnAddItem");
  artistOnAddNew.innerText = currentArtist;

  const addEditBtn = document.getElementById("addEditBtn");
  const addEditTitle = document.getElementById("addEditTitle");

  addEditTitle.innerText = editmode ? "Edit item" : "Add new Item";
  addEditBtn.innerText = editmode ? "Apply" : "Add new item";

  addEditBtn.addEventListener("click", function (event) {
    if (editmode) {
      (items[dataindex].id = itemid),
        (items[dataindex].description = addDescriptionInput.value),
        (items[dataindex].image = addUrlInput.value),
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
        image: addUrlInput.value,
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
  });
}
