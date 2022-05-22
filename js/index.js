//import { renderCards } from './renderCards'
//import 'fetchData.js'
const cardsContainer = document.querySelector('[data-js="cards"]') //section, die die cards beinhaltet
const form = document.querySelector('[data-js="form"]') //Formular
/*const filterForm = document.querySelector('[data-js=filter-form]')
 ^ WE NEED TO WORK ON THIS */

/*let currentFilter = 'all';*/
let allCards = [] //leere Liste


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
  const imageElement = form.elements.image

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
  document.querySelector('[data-js="cards"]').classList.remove('hidden');
  document.querySelector('[data-js="favoriteCards"]').classList.add('hidden');
  document.querySelector('[data-js="createCards"]').classList.add('hidden');
  renderHome(allCards);
});

document.querySelector('[data-js="bookmarkbtn"]').addEventListener('click', () => {
  document.querySelector('[data-js="cards"]').classList.add('hidden');
  document.querySelector('[data-js="favoriteCards"]').classList.remove('hidden');
  document.querySelector('[data-js="createCards"]').classList.add('hidden');
  const bookmarkedCards = allCards.filter(card => {
    return card.isBookmarked === true;
  });
  renderFavorites(bookmarkedCards);
});

document.querySelector('[data-js="createBtn"]').addEventListener('click', () => {
  document.querySelector('[data-js="cards"]').classList.add('hidden');
  document.querySelector('[data-js="favoriteCards"]').classList.add('hidden');
  document.querySelector('[data-js="createCards"]').classList.remove('hidden');
});


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
      <img src="${card.image}" />
  
      <button class="bookmarkBtn" data-js="bookmark">Click me</button>
  
      <label class="nameLabel">${card.name}</label>
  
      <label class="statusLabel">${card.status}</label>
  
      <label class="speciesLabel">${card.species}</label>
  
      <label class="locationLabel">${card.location.name}</label>
    </section>
      `
      cardsContainer.append(cardElement)

      const bookmarkElement = cardElement.querySelector('[data-js="bookmark"]')
      if (card.isBookmarked )
        bookmarkElement.classList.toggle('card__bookmark--active');
      
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
      <img src="${bookmarkedCard.image}" />
  
      <button class="bookmarkBtn card__bookmark--active" data-js="bookmark">Click me</button>
  
      <label class="nameLabel">${bookmarkedCard.name}</label>
  
      <label class="statusLabel">${bookmarkedCard.status}</label>
  
      <label class="speciesLabel">${bookmarkedCard.species}</label>
  
      <label class="locationLabel">${bookmarkedCard.location.name}</label>
    </section>
      `
      favoritesContainer.append(cardElement)
      
      const bookmarkElement = cardElement.querySelector('[data-js="bookmark"]')
      bookmarkElement.addEventListener('click', () => {
        bookmarkElement.classList.toggle('card__bookmark--active')
        
        allCards = allCards.map((allCard => {
          if (allCard.id === bookmarkedCard.id){
            return {...allCard, isBookmarked: !allCard.isBookmarked};
          }else {
            return allCard;
          }
        }))
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
  allCards.forEach(card => {
    card.isBookmarked = false;
  })
  renderCards(allCards)
  console.log(allCards)
})
