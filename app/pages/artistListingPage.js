import { items } from "../../data/data.js";
import { getCurrentArtist, updateItems } from "../globals.js";
import { formatDate } from "../pages/artistHomePage.js";
import { initAuctionPage } from "./auctionPage.js";

export function initArtistListingPage() {
  const currentArtist = getCurrentArtist();
  document.querySelector("#artistOnListing").textContent = currentArtist;
  const artistItems = items.filter((item) => item.artist === currentArtist);

  const artistContainer = document.getElementById("artistListingContainer");
  artistContainer.innerHTML = "";
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
        artistContainer.innerHTML += `<div class="card mb-4">
      <img src="${image}" class="card-img-top" alt="..." />
      <div class="card-body colorLighter py-1 px-3">
        <div class="d-flex justify-content-between align-items-center mb-2">
        <div><p class="card-title  font-weight-bold">${title}</p>
          <p class="date">${formatDate(dateCreated)}</p></div>
          <span href="#" class="badge bg-primary">$${price}</span>
        </div>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer colorDarker d-flex justify-content-between">

      <button type="button" id="sendToAuc${id}" class=" btn btn-primary font-weight-boldtext-muted px-1" ${
          isAuctioning ? "disabled" : ""
        }>Send to Auction</button>
      <button type="button" id="publish${id}" class="${
          isPublished ? "unpublish" : "publish"
        } btn btn-success px-1" value="${isPublished}">${
          isPublished ? "Unpublish" : "Publish"
        }</button>
      <button type="button" id="removeBtn${id}" class=" btn btn-danger px-1">Remove</button>
      <button type="button" id="editBtn${id}" class=" btn px-1" href="#addEditPage">Edit</button>

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
        console.log(event);
        items[index].isAuctioning = true;
        items[index].priceSold = 0
        updateItems();
        initArtistListingPage();
       
      });

      publishBtn.addEventListener("click", function (event) {
        console.log(event);
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
    });
  }
}
