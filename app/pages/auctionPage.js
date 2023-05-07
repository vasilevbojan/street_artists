import { items } from "../../data/data.js";
import { updateItems } from "../globals.js";
import { getCurrentArtist } from "../globals.js";
import { publishedItems } from "../globals.js";

export function initAuctionPage() {
  const curAucItems = publishedItems.filter((item) => item.isAuctioning);
  const auctionListing = document.getElementById("auctionListing");
  auctionListing.innerHTML = "";
  console.log(curAucItems);
  const auctionArtist = document.getElementById("auctionArtist");
  const navIcon = document.getElementById("navIcon");
  navIcon.classList.remove("d-none");

  if (getCurrentArtist()) {
    auctionArtist.innerText = getCurrentArtist();
  } else {
    auctionArtist.innerText = "Auction";
    navIcon.classList.add("d-none");
  }

  if (curAucItems.length > 0) {
    curAucItems.forEach((item) => {
      console.log(getCurrentArtist(), item.artist);

      auctionListing.innerHTML += `<div class="card my-4 ${
        getCurrentArtist() !== item.artist && getCurrentArtist() ? "d-none" : ""
      }">
  
  <img src="${item.image}" class="card-img-top" alt="..." >
  <div class="card-body">
  <p class="text-muted">${item.artist}<p>
  <h5 class="card-title">${item.title}</h5>
    <div class="text-center position-relative"> 
    <div class="position-absolute won d-none" id="wondiv${item.id}">
    <p>You've purchased this peace of art for:</p> 
          <p id="won${item.id}"></p>
    </div>
    <p>Remaining time:</p>
    <p id="timer${item.id}" class="fontSizeBig"></p>
  <hr>
  <p>Highest bid:</p>
  <p id="highestBid${item.id}" class="fontSizeBig">${item.price}</p>

  <input id="biddingInput${item.id}" min=${
        item.price
      } type="number" step="10" class=" my-2 text-center border-0" value=${
        item.price
      } ${getCurrentArtist() ? "disabled" : ""}/>
  
  <br>
  <div class="${getCurrentArtist() ? "d-none" : ""}">
  <button id="min${item.id}"  value="${item.id}" disabled >-</button>
  <button id="plus${item.id}"  value="${item.id}" ${
        getCurrentArtist() ? "disabled" : ""
      }>+</button>
  <button id="bid${item.id}" class="bid" disabled>Bid</button>
  </div>
  </div>
  <div class="card-footer" id="bidingHistory${item.id}">
  </div>
  </div>`;
    });

    curAucItems.forEach((item) => {
      const minusBtn = document.getElementById(`min${item.id}`);
      const index = items.findIndex((object) => {
        return object.id === item.id;
      });
      if (minusBtn) {
        minusBtn.addEventListener("click", function (event) {
          const biddingInput = document.querySelector(
            `#biddingInput${item.id}`
          );
          biddingInput.value = biddingInput.value - 10;
          biddingInput.dispatchEvent(new Event("input"));
        });
      }
      const plusBtn = document.getElementById(`plus${item.id}`);

      if (plusBtn) {
        plusBtn.addEventListener("click", function (event) {
          const biddingInput = document.querySelector(
            `#biddingInput${item.id}`
          );
          biddingInput.value = +biddingInput.value + 10;
          biddingInput.dispatchEvent(new Event("input"));
        });
      }

      const biddingBtn = document.getElementById(`bid${item.id}`);
      const highestBid = document.querySelector(`#highestBid${item.id}`);
      if (biddingBtn) {
        biddingBtn.addEventListener("click", function () {
          const formData = new FormData();
          clearInt();
          const biddingInput = document.querySelector(
            `#biddingInput${item.id}`
          );
          formData.set("amount", biddingInput.value);

          fetch("https://projects.brainster.tech/bidding/api", {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              const biddingHistory = document.querySelector(
                `#bidingHistory${item.id}`
              );
              highestBid.textContent = +biddingInput.value;
              item.priceSold = +biddingInput.value;
              biddingHistory.innerHTML += `<li>${biddingInput.value}</li>`;

              if (data.isBidding) {
                highestBid.textContent = data.bidAmount;
                item.priceSold = data.bidAmount;
                biddingInput.min = data.bidAmount;
                biddingInput.value = data.bidAmount;
                biddingInput.dispatchEvent(new Event("input"));
                biddingHistory.innerHTML += `<li style="margin-left: 150px;">${data.bidAmount}</li>`;
                ;
                
              } else {
                biddingHistory.innerHTML += `<li style="margin-left: 150px;">I give up!</li>`;
                biddingBtn.disabled = "true";
                minusBtn.disabled = "true";
                plusBtn.disabled = "true";
                gewonen();
              }
            });
        });
      }
      const biddingInput = document.querySelector(`#biddingInput${item.id}`);
      biddingInput.addEventListener("input", function () {
        const highestBid = document.querySelector(`#highestBid${item.id}`);
        biddingBtn.disabled = biddingInput.value <= +highestBid.textContent;
        minusBtn.disabled = biddingInput.value <= biddingInput.min;
      });
      let timer = null;
      function clearInt() {
        clearInterval(timer);
        localStorage.removeItem(`time${item.id}`);
      }

      function initTimer() {
        const timerContent = document.querySelector(`#timer${item.id}`);
        const biddingInput = document.querySelector(`#biddingInput${item.id}`);
        let time;

        

        timer = setInterval(function () {
          time = localStorage.getItem(`time${item.id}`) || "2:00";
          time = time.split(":");
          let minutes = time[0];
          let seconds = time[1];
          seconds -= 1;
          if (minutes < 0) return;
          else if (seconds < 0 && minutes != 0) {
            minutes -= 1;
            seconds = 59;
          } else if (seconds < 10 && length.seconds != 2)
            seconds = "0" + seconds;

          timerContent.textContent = minutes + ":" + seconds;

          localStorage.setItem(`time${item.id}`, minutes + ":" + seconds);
          if (minutes == 0 && seconds == 0) {
            clearInterval(timer);
            localStorage.removeItem(`time${item.id}`);
            biddingBtn.disabled = "true";
            biddingInput.disabled = "true";
            minusBtn.disabled = "true";
            plusBtn.disabled = "true";
            gewonen();
            // clear global variable
            // set priceSold to curAucItem to be highestBid.textContent
            // set dateSold to curAucItem to be new Date()
            // update items with the changes in curAucItem
          }
        }, 1000);

      }
      function gewonen() {
        const wonDiv = document.getElementById(`wondiv${item.id}`);
        wonDiv.classList.remove("d-none");
        const wonPrice = document.getElementById(`won${item.id}`);
        wonPrice.innerText = +highestBid.textContent;

        items[index].isAuctioning = false;
        items[index].priceSold = +highestBid.textContent;
        items[index].dateSold = new Date().toISOString();
        console.log(items);
        updateItems();
      }
      initTimer()
    });
  } else {
    auctionListing.innerHTML = `<p class="h2 text-center my-5 textColor">There is nothing for auctioning</p>`;
  }

  // const minusBtn = document.querySelectorAll(".minus");
  // minusBtn.forEach((btn) => {
  //   btn.addEventListener("click", function (event) {
  //     let btnNum = event.currentTarget.value;
  //     const biddingInput = document.querySelector(`#biddingInput${btnNum}`);
  //     biddingInput.value = biddingInput.value - 10;
  //     event.currentTarget.disabled = biddingInput.value <= biddingInput.min;
  //   });
  // });

  //   img.src = curAucItem.image;
  //   title.textContent = curAucItem.title;

  //   https://projects.brainster.tech/bidding/api

  // //   validate input
  // biddingBtn.disabled = !(biddingInput.value > curAucItem.price);
  // biddingInput.addEventListener("input", function () {
  //   biddingBtn.disabled = !(biddingInput.value > curAucItem.price);
  // });

  // biddingBtn.addEventListener("click", function () {
  //   const formData = new FormData();
  //   formData.set("amount", biddingInput.value);

  //   fetch("https://projects.brainster.tech/bidding/api", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       highestBid.textContent = biddingInput.value;
  //       biddingHistory.innerHTML += `<li>${biddingInput.value}</li>`;

  //       if (data.isBidding) {
  //         highestBid.textContent = data.bidAmount;
  //         biddingInput.min = data.bidAmount;
  //         biddingInput.value = data.bidAmount;

  //         biddingHistory.innerHTML += `<li style="margin-left: 150px;">${data.bidAmount}</li>`;
  //       } else {
  //         biddingHistory.innerHTML += `<li style="margin-left: 150px;">I give up!</li>`;
  //       }
  //     });
  // });

  // initTimer();

  // function createItem(item) {
  //   items.push({
  //     item,
  //   });

  //   updateItems();
}
