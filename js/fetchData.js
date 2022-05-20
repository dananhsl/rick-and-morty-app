import { renderCards } from './renderCards'

const baseUrl = 'https://rickandmortyapi.com/api/character?page='
const numPages = 5

const urls = Array(numPages)
  .fill() // [undefined, undefined, ...]
  .map((_, index) => baseUrl + (index + 1))

const promises = urls.map((url) => fetch(url).then((res) => res.json()))

Promise.all(promises).then((pages) => {
  const characters = pages.flatMap((page) => page.results)
  renderCards(characters)
  console.log(characters)
})
