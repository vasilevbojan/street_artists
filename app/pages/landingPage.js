import { setCurrentArtist } from "../globals.js"


export function initLandingPage() {
    console.log('landing page loaded')


    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {

            const artistsSelect = document.querySelector('#artists')

            artistsSelect.innerHTML = ''
            artistsSelect.innerHTML = '<option value="">Select Artist</option>'

            data.forEach(user => {
                artistsSelect.innerHTML += `<option value="${user.name}">${user.name}</option>`
            })

            artistsSelect.addEventListener('change', function (event) {
                console.log(event.currentTarget.value)

                setCurrentArtist(event.currentTarget.value)
                location.hash = '#artistHomePage'
            })
        })


    const joinAsVisitor = document.querySelector('#joinAsVisitor')

    joinAsVisitor.addEventListener('click', function () {
        location.hash = '#visitorHomePage'
    })

}