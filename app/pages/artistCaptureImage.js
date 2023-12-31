const liveStream = document.querySelector('#liveStream')
import { getCurrentArtist } from "../globals.js";
import { addUrlInput} from "../pages/artistListingPage.js";
export let capturedPicture

export function initCaptureImage() {
  const artistOnCapture = document.getElementById("artistOnCapture")
  artistOnCapture.innerText = getCurrentArtist();


  const liveCaptureCanvas = document.querySelector('#liveCapture')
  const captureImageBtn = document.querySelector('#captureImage')

  const capturedImageImg = document.querySelector('#takeSnapshot')



  navigator
    .mediaDevices
    .getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
      },
    })
    .then(stream => {
      liveStream.srcObject = stream
    })

  liveStream.addEventListener('canplay', function () {
    liveCaptureCanvas.width = liveStream.videoWidth
    liveCaptureCanvas.height = liveStream.videoHeight
  })

  captureImageBtn.addEventListener('click', function () {
    const ctx = liveCaptureCanvas.getContext('2d')
    ctx.drawImage(liveStream, 0, 0)
    const imageDataUrl = liveCaptureCanvas.toDataURL('image/png')
    capturedPicture = imageDataUrl
    capturedImageImg.innerHTML = `<img src = "${imageDataUrl}" >`
    addUrlInput.disabled = true
    location.hash = "#addEditPage"
stopStream()
  })

}


export function stopStream() {
  const stream = liveStream.srcObject
  const allTracks = stream?.getTracks()
  allTracks?.forEach((track) => {
    track.stop()
  })
}
