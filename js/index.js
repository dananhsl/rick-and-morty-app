/* -----------------------------------Global Variables----------------------------------------------------- */
const cardsContainer = document.querySelector('[data-js="cards"]');
const favoritesContainer = document.querySelector('[data-js="favoriteCards"]');


/* -----------------------------------Fetch objects, save in list and render------------------------------- */
const baseUrl = 'https://rickandmortyapi.com/api/character?page='
const numPages = 5

const urls = Array(numPages)
  .fill() // [undefined, undefined, ...]
  .map((_, index) => baseUrl + (index + 1))

const promises = urls.map((url) => fetch(url).then((res) => res.json()))
let allCards = [];

Promise.all(promises).then((pages) => {
  allCards = pages.flatMap((page) => page.results)
  allCards = allCards.map((card) => {
      return {...card, isBookmarked: false};
  })
  allCards.forEach((card) => {
      cardsContainer.append(renderCard(card));
  })
})


/* -----------------------------------Single Page Application---------------------------------------------- */
document.querySelector('[data-js="homebtn"]').addEventListener('click', () => {
    document.querySelector('[data-js="cards"]').classList.remove('hidden');
    document.querySelector('[data-js="favoriteCards"]').classList.add('hidden');
    document.querySelector('[data-js="createCards"]').classList.add('hidden');
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


/* ------------------------------------Render homepage cards------------------------------------------------*/
function renderCard(card) {
    cardsContainer.innerHTML = ''
      //.filter(card => card.tags.includes(currentFilter) || currentFilter === 'all')
      
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

        const bookmarkElement = cardElement.querySelector('[data-js="bookmark"]')
        bookmarkElement.addEventListener('click', () => {
          card.isBookmarked = !card.isBookmarked
          console.log(card.isBookmarked);
          bookmarkElement.classList.toggle('card__bookmark--active')
        })  
  }


/* ------------------------------------Render bookmark cards----------------------------------------------- */
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
    
        <button class="bookmarkBtn" data-js="bookmark">Click me</button>
    
        <label class="nameLabel">${bookmarkedCard.name}</label>
    
        <label class="statusLabel">${bookmarkedCard.status}</label>
    
        <label class="speciesLabel">${bookmarkedCard.species}</label>
    
        <label class="locationLabel">${bookmarkedCard.location.name}</label>
      </section>
        `
        favoritesContainer.append(cardElement)

        const bookmarkElement = cardElement.querySelector('[data-js="bookmark"]')
        bookmarkElement.addEventListener('click', () => {
            bookmarkedCard.isBookmarked = !bookmarkedCard.isBookmarked;
            bookmarkElement.classList.toggle('card__bookmark--active')
            console.log(bookmarkedCard.isBookmarked);
          })
          
      })  
      
  }