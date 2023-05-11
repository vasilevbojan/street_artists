import { items } from "../../data/data.js";
import { getCurrentArtist, updateItems } from "../globals.js";
import { formatDate } from "../pages/artistHomePage.js";
import { initAuctionPage } from "./auctionPage.js";

export let editmode = false;
const addTitleInput = document.getElementById("addTitle");
const addDescriptionInput = document.getElementById("addDescription");
const addTypeInput = document.getElementById("addType");
const addPriceInput = document.getElementById("addPrice");
const addUrlInput = document.getElementById("addUrl");
const checkIsPublsihed = document.getElementById("isPublished");
const addNewItem = document.getElementById("addNewItem");
let dataindex;
let itemid;
export {
  addTitleInput,
  addDescriptionInput,
  addTypeInput,
  addPriceInput,
  addUrlInput,
  checkIsPublsihed,
  dataindex,
  itemid,
};

let auctionShow = false;

export function auctionShowSetTrue() {
  auctionShow = false;
}
export function initArtistListingPage() {
  const currentArtist = getCurrentArtist();
  document.querySelector("#artistOnListing").textContent = currentArtist;
  const artistItems = items.filter((item) => item.artist === currentArtist);
  const captureContainer = document.getElementById("takeSnapshot");
  captureContainer.innerHTML = ` <a class="textColor3" href="#artistCaptureImage">
  <img src="./Images/Snapshot.svg" alt="" />
  <p>Take a snapshot</p>
</a>`;

  const artistContainer = document.getElementById("artistListingContainer");
  artistContainer.innerHTML = "";

  addNewItem.addEventListener("click", function () {
    editmode = false;
    location.hash = "#addEditPage";
  });
  render();
  function render() {
    artistItems.forEach(
      ({
        id,
        image,
        title,
        description,
        price,
        isPublished,
        dateCreated,
        isAuctioning,
      }) => {
        artistContainer.innerHTML += `<div class="card mb-4 w-100">
      <img src="${image}" class="card-img-top img-fluid" alt="..." width="425" height="200"/>
      <div class="card-body colorLighter py-1 px-3">
        <div class="d-flex justify-content-between align-items-center mb-2">
        <div><p class="card-title  font-weight-bold">${title}</p>
          <p class="date">${formatDate(dateCreated)}</p></div>
          <span class="badge bg-primary">$${price}</span>
        </div>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer colorDarker d-flex justify-content-between">

      <button type="button" id="sendToAuc${id}" class=" btn btn-primary font-weight-boldtext-muted px-1" ${
          auctionShow ? "disabled" : ""
        }>Send to Auction</button>
      <button type="button" id="publish${id}" class="${
          isPublished ? "unpublish" : "publish"
        } btn btn-success px-1" value="${isPublished}">${
          isPublished ? "Unpublish" : "Publish"
        }</button>
      <button type="button" id="removeBtn${id}" class=" btn btn-danger px-1">Remove</button>
      <button type="button" id="editBtn${id}" class=" btn px-1 colorLighter textColor" >Edit</button>

      </div>
    </div>`;
      }
    );
  }

  if (artistItems.length > 0) {
    artistItems.forEach((item) => {
      const sendToAucBtn = document.getElementById(`sendToAuc${item.id}`);
      const publishBtn = document.getElementById(`publish${item.id}`);
      const removeBtn = document.getElementById(`removeBtn${item.id}`);
      const editBtn = document.getElementById(`editBtn${item.id}`);
      const index = items.findIndex((object) => {
        return object.id === item.id;
      });

      sendToAucBtn.addEventListener("click", function (event) {
        items[index].isAuctioning = true;
        items[index].priceSold = 0;
        updateItems();
        initAuctionPage();
        auctionShow = true;
        initArtistListingPage();
      });

      publishBtn.addEventListener("click", function (event) {
        if (items[index].isPublished === true) {
          items[index].isPublished = false;
        } else {
          items[index].isPublished = true;
        }
        updateItems();
        initArtistListingPage();
      });

      removeBtn.addEventListener("click", function () {
        items.splice(index, 1);
        updateItems();
        initArtistListingPage();
      });

      const typesArr = [...new Set(items.reduce((a, c) => [...a, c.type], []))];
      addTypeInput.innerHTML = "";
      addTypeInput.innerHTML += '<option value="" selected>Choose</option>';
      typesArr.forEach((type) => {
        addTypeInput.innerHTML += `<option value="${type}">${type}</option>`;
      });

      editBtn.addEventListener("click", function () {
        editmode = true;
        dataindex = index;

        itemid = item.id;
        addTitleInput.value = item.title;
        addDescriptionInput.value = item.description;
        addTypeInput.value = item.type;
        checkIsPublsihed.checked = item.isPublished;
        addPriceInput.value = item.price;
        addUrlInput.value = item.image;
        location.hash = "#addEditPage";
      });
    });
  }
}
