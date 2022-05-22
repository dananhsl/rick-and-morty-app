//import { renderCards } from './renderCards'
//import 'fetchData.js'
const cardsContainer = document.querySelector('[data-js="cards"]') //section, die die cards beinhaltet
const form = document.querySelector('[data-js="form"]')
const favoritesContainer = document.querySelector('[data-js="favoriteCards"]') //Formular
/*const filterForm = document.querySelector('[data-js=filter-form]')
 ^ WE NEED TO WORK ON THIS */

/*let currentFilter = 'all';*/
let allCards = [] //leere Liste

/*filterForm.addEventListener('change', () => {
  currentFilter = filterForm.elements['tag-filter'].value;
  renderCards();
})*/

const baseUrl = 'https://rickandmortyapi.com/api/character?page='
const numPages = 5

const urls = Array(numPages)
  .fill() // [undefined, undefined, ...]
  .map((_, index) => baseUrl + (index + 1))

const promises = urls.map((url) => fetch(url).then((res) => res.json()))

Promise.all(promises).then((pages) => {
  allCards = pages.flatMap((page) => page.results)
  allCards.forEach((card) => {
    card.isBookmarked = false
  })
  renderHome(allCards)
})

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const fighterNameElement = form.elements.name
  const statusElement = form.elements.status
  const speciesElement = form.elements.species
  const locationElement = form.elements.location
  const imageElement = url.createObjectURL(form.elements.image[0])

  const newCard = {
    name: fighterNameElement.value,
    status: statusElement.value,
    species: speciesElement.value,
    location: locationElement.value,
    image: imageElement.value,
    isBookmarked: false,
  }

  allCards = [newCard, ...allCards] //leere Liste wird mit neuen Objekten und vorhandenen Objekten befüllt
  form.reset()
  fighterNameElement.focus()
  renderCards(allCards)
})

/* -----------------------------------Single Page Application---------------------------------------------- */
document.querySelector('[data-js="homebtn"]').addEventListener('click', () => {
  document.querySelector('[data-js="cards"]').classList.remove('hidden')
  document.querySelector('[data-js="favoriteCards"]').classList.add('hidden')
  document.querySelector('[data-js="createCards"]').classList.add('hidden')
  renderHome(allCards)
})

document
  .querySelector('[data-js="bookmarkbtn"]')
  .addEventListener('click', () => {
    document.querySelector('[data-js="cards"]').classList.add('hidden')
    document
      .querySelector('[data-js="favoriteCards"]')
      .classList.remove('hidden')
    document.querySelector('[data-js="createCards"]').classList.add('hidden')
    const bookmarkedCards = allCards.filter((card) => {
      return card.isBookmarked === true
    })
    renderFavorites(bookmarkedCards)
  })

document
  .querySelector('[data-js="createBtn"]')
  .addEventListener('click', () => {
    document.querySelector('[data-js="cards"]').classList.add('hidden')
    document.querySelector('[data-js="favoriteCards"]').classList.add('hidden')
    document.querySelector('[data-js="createCards"]').classList.remove('hidden')
  })

/* ------------------------------------Render all cards on homepage------------------------------------------------*/
function renderHome(allCards) {
  cardsContainer.innerHTML = ''

  allCards
    //.filter(card => card.tags.includes(currentFilter) || currentFilter === 'all')
    .forEach((card) => {
      const cardElement = document.createElement('li')
      cardElement.className = 'card'
      cardElement.innerHTML = `
      <section class="characterCard" data-js="epicFighterCard">
      <img class="card__image"src="${card.image}" />
  
      <button class="card__bookmark" data-js="bookmark"></button>
      <div class="card__text">
      <label class="nameLabel">Name: ${card.name}</label>
      <div class="card__flex"
      <label class="statusLabel"> ${card.status} &#183; </label>
  
      <label class="speciesLabel">${card.species}</label>
      </div>
      <label class="locationLabel">Last seen Location: ${card.location.name}</label>
      </div>
    </section>
      `
      cardsContainer.append(cardElement)

      const bookmarkElement = cardElement.querySelector('[data-js="bookmark"]')
      if (card.isBookmarked)
        bookmarkElement.classList.toggle('card__bookmark--active')

      bookmarkElement.addEventListener('click', () => {
        card.isBookmarked = !card.isBookmarked
        bookmarkElement.classList.toggle('card__bookmark--active')
      })
    })
}

/* ------------------------------------Render bookmarked cards----------------------------------------------- */
function renderFavorites(bookmarkedCards) {
  favoritesContainer.innerHTML = ''
  bookmarkedCards
    //.filter(card => card.tags.includes(currentFilter) || currentFilter === 'all')
    .forEach((bookmarkedCard) => {
      const cardElement = document.createElement('li')
      cardElement.className = 'card'
      cardElement.innerHTML = `
      <section class="characterCard" data-js="epicFighterCard">
      
      <img class="card__image"src="${bookmarkedCard.image}" />
  
      <button class="card__bookmark card__bookmark--active" data-js="bookmark"></button>
      <div class="card__text">
      <label class="nameLabel">Name: ${bookmarkedCard.name}</label>
      <div class="card__flex"
      <label class="statusLabel"> ${bookmarkedCard.status} &#183; </label>
  
      <label class="speciesLabel">${bookmarkedCard.species}</label>
      </div>
      <label class="locationLabel">Last seen Location: ${bookmarkedCard.location.name}</label>
      </div>
    </section>
      `
      favoritesContainer.append(cardElement)

      const bookmarkElement = cardElement.querySelector('[data-js="bookmark"]')
      bookmarkElement.addEventListener('click', () => {
        bookmarkElement.classList.toggle('card__bookmark--active')

        allCards = allCards.map((allCard) => {
          if (allCard.id === bookmarkedCard.id) {
            return { ...allCard, isBookmarked: !allCard.isBookmarked }
          } else {
            return allCard
          }
        })
      })
    })
}
