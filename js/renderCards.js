const cardsContainer = document.querySelector('[data-js=cards]')
function renderCards(cards) {
  cardsContainer.innerHTML = ''

  cards
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
  
      <label class="locationLabel">${card.location}</label>
    </section>
      `
      cardsContainer.append(cardElement)
      const bookmarkElement = cardElement.querySelector('[data-js=bookmark]')
      bookmarkElement.addEventListener('click', () => {
        card.isBookmarked = !card.isBookmarked
        bookmarkElement.classList.toggle('card__bookmark--active')
      })

      const answerButton = cardElement.querySelector('[data-js=card-button]')
      const answerElement = cardElement.querySelector('[data-js=answer]')

      answerButton.addEventListener('click', () => {
        answerElement.toggleAttribute('hidden')
      })
    })
}

export { renderCards }
