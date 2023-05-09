import { items } from "../../data/data.js";
import { getCurrentArtist } from "../globals.js";
import { publishedItems } from "../globals.js";

let myChart = undefined;

export function initArtistHomePage() {
  const currentArtist = getCurrentArtist();

  document.querySelector("#artistHome").textContent = currentArtist;

  const itemsByArtist = items.filter((item) => item.artist === currentArtist);

  const soldItems = itemsByArtist.filter((item) => Boolean(item.dateSold));

  const numberSoldItems = document.getElementById("soldItems");
  const totalItems = document.querySelector("#totalItems");
  numberSoldItems.textContent = soldItems.length;
  totalItems.innerText = itemsByArtist.length;

  const sum = soldItems.reduce((acc, item) => acc + +item.priceSold, 0);

  let result = Intl.NumberFormat("de-DE").format(sum);
  const totalIncome = document.querySelector("#totalIncome");
  totalIncome.innerText = `$${result}`;
  let auctionedItems = publishedItems.filter((item) => item.isAuctioning);
  let sumAuctioned = 0;
  auctionedItems.forEach((item) => (sumAuctioned = sumAuctioned + item.priceSold));
  const sumAuctionedItems = document.getElementById("sumAuctionedItems")
  sumAuctionedItems.innerText = "$"+Intl.NumberFormat("de-DE").format(sumAuctioned)
  const last7 = document.querySelector("#last7");
  const last14 = document.querySelector("#last14");
  const last30 = document.querySelector("#last30");

  if (!myChart) {
    const ctx = document.getElementById("myChart");
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: 0,
        datasets: [
          {
            label: "amount",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ["rgb(161, 106, 94)"],
            borderWidth: 1,
            color: "#a16a5e",
          },
        ],
      },
      options: {
        indexAxis: "y",
        barPercentage: 0.5,
        responsive: true,
        maintainAspectRatio: false,
        hoverBackgroundColor: [`#D44C2E`],

        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
    addData(7);
  } else {
    addData(7);
  }

  const daysArr = [last7, last14, last30];

  daysArr.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      addData(event.currentTarget.value);
    });
    window.addEventListener("hashchange", function () {
      btn.parentElement.classList.remove("active");
      last7.parentElement.classList.add("active");
    });
  });

  function addData(num) {
    const labels = generateLabels(num);
    myChart.data.labels = labels;
    const newDate = labels.map((label) => {
      let sum = 0;
      soldItems.forEach((item) => {
        if (label === formatDate(item.dateSold)) {
          sum = sum + item.priceSold;
        }
      });
      return sum;
    });
    myChart.data.datasets[0].data = newDate;
    myChart.update();
  }
}

function generateLabels(daysAgo) {
  const arr = [];

  for (let i = 0; i < daysAgo; i++) {
    const start = new Date();

    const startDate = start.getDate();

    const currentDate = start.setDate(startDate - i);

    const formattedDate = formatDate(currentDate);

    arr.push(formattedDate);
  }

  return arr;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-gb");
}
