import { initCaptureImage, stopStream } from "./pages/artistCaptureImage.js"
import { initArtistHomePage } from "./pages/artistHomePage.js"
import { initLandingPage } from "./pages/landingPage.js"
import { initVisitorListingPage } from "./pages/visitorListingPage.js"

// routing

// handle route


function handleRoute() {
    const hash = location.hash === '' ? '#landingPage' : location.hash

    const allPages = document.querySelectorAll('.page')
    allPages.forEach(page => page.style.display = 'none')
    document.querySelector(hash).style.display = 'block'


    if(hash !== '#artistCaptureImage'){
        stopStream()
    }

    switch (hash) {
        case '#landingPage':
            initLandingPage()
            break;

        case '#artistHomePage':
            initArtistHomePage()
            break;

        case '#visitorListing':
            initVisitorListingPage()
            break;

        case '#artistCaptureImage':
            initCaptureImage()
            break;

        default:
            break;
    }

}

// attach event listeners
window.addEventListener('hashchange', handleRoute)
window.addEventListener('load', handleRoute)