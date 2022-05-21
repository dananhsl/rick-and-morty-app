//import { renderCards } from './renderCards'
//import 'fetchData.js'
const cardsContainer = document.querySelector('[data-js="cards"]')
const form = document.querySelector('[data-js="form"]')
/*const filterForm = document.querySelector('[data-js=filter-form]')
 ^ WE NEED TO WORK ON THIS */

/*let currentFilter = 'all';*/
let allCards = []

/*filterForm.addEventListener('change', () => {
  currentFilter = filterForm.elements['tag-filter'].value;
  renderCards();
})*/

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

  allCards = [newCard, ...allCards]
  form.reset()
  fighterNameElement.focus()
  renderCards(allCards)
})

function renderCards(allCards) {
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
      bookmarkElement.addEventListener('click', () => {
        card.isBookmarked = !card.isBookmarked
        bookmarkElement.classList.toggle('card__bookmark--active')
      })
    })
}

const baseUrl = 'https://rickandmortyapi.com/api/character?page='
const numPages = 5

const urls = Array(numPages)
  .fill() // [undefined, undefined, ...]
  .map((_, index) => baseUrl + (index + 1))

const promises = urls.map((url) => fetch(url).then((res) => res.json()))

Promise.all(promises).then((pages) => {
  allCards = pages.flatMap((page) => page.results)
  renderCards(allCards)
  console.log(allCards)
})
