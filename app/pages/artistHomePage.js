import { items } from "../../data/data.js";
import { getCurrentArtist } from "../globals.js";


export function initArtistHomePage() {
   // const currentArtist = getCurrentArtist()
   const currentArtist = 'Leanne Graham'
   document.querySelector('#artist').textContent = currentArtist



   const itemsByArtist = items.filter(item => item.artist === currentArtist)

   const soldItems = itemsByArtist.filter(item => Boolean(item.dateSold))
   console.log(`${soldItems.length}/${itemsByArtist.length}`)


   // let sum = 0

   // soldItems.forEach(item => {
   //    sum = sum + item.priceSold
   // })

   const sum = soldItems.reduce((acc, item) => acc + item.priceSold, 0)

   console.log(sum)




   const ctx = document.getElementById('myChart');

   const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
         labels: generateLabels(7),
         datasets: [{
            label: 'amount',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['rgba(100, 0, 0, 1)',],
            borderWidth: 1
         }]
      },
      options: {
         indexAxis: 'y',
      }
   });

   const last7 = document.querySelector('#last7')
   const last14 = document.querySelector('#last14')
   const last30 = document.querySelector('#last30')

   last7.addEventListener('click', function () {
      const labels = generateLabels(7)

      myChart.data.labels = labels

      const newDate = labels.map(label => {
         let sum = 0

         soldItems.forEach(item => {
            if (label === formatDate(item.dateSold)) {
               sum = sum + item.priceSold
            }
         })

         return sum
      })

      myChart.data.datasets[0].data = newDate

      myChart.update()

   })

   last14.addEventListener('click', function () {
      const labels = generateLabels(14)

      myChart.data.labels = labels

      const newDate = labels.map(label => {
         let sum = 0

         soldItems.forEach(item => {
            if (label === formatDate(item.dateSold)) {
               sum = sum + item.priceSold
            }
         })

         return sum
      })

      myChart.data.datasets[0].data = newDate

      myChart.update()

   })

   last30.addEventListener('click', function () {
      const labels = generateLabels(30)

      myChart.data.labels = labels

      const newDate = labels.map(label => {
         let sum = 0

         soldItems.forEach(item => {
            if (label === formatDate(item.dateSold)) {
               sum = sum + item.priceSold
            }
         })

         return sum
      })

      myChart.data.datasets[0].data = newDate

      myChart.update()

   })
}


function generateLabels(daysAgo) {


   const arr = []

   for (let i = 0; i < daysAgo; i++) {
      const start = new Date()

      const startDate = start.getDate()

      const currentDate = start.setDate(startDate - i)

      const formattedDate = formatDate(currentDate)

      arr.push(formattedDate)

   }

   return arr
}

function formatDate(date) {
   return new Date(date).toLocaleDateString('en-gb')
}