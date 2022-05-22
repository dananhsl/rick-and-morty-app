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
  renderHome(allCards);
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
        bookmarkElement.addEventListener('click', () => {
          card.isBookmarked = !card.isBookmarked
          bookmarkElement.classList.toggle('card__bookmark--active')
        })
      })  
  }

/* ------------------------------------Render bookmarked cards----------------------------------------------- */
  function renderFavorites(bookmarkedCards, allCards) {
    favoritesContainer.innerHTML = ''
    console.log(allCards);
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
          //changeIsBookmarked(bookmarkedCard)
          
          allCards = allCards.map((allCard => {
            if (allCard.id === bookmarkedCard.id){
              return {...allCard, isBookmarked: !allCard.isBookmarked};
            }else {
              return allCard;
            }
            console.log(allCard.isBookmarked)
          }))
          
        })
      })  
      
  }