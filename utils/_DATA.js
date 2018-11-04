import { AsyncStorage } from 'react-native'
export const DECK_STORAGE_KEY = 'MobileCards:decks'

let decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function setDummyData() {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  return decks
}

function getDecks(results) {
  const data = JSON.parse(results)
  return (Object.keys(data).length === 0 || data === null)
          ? setDummyData()
          : data
}

function addCard(results, deck, card) {
  let decks = JSON.parse(results)
  decks[deck].questions.push(card)
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  return { deck, card }
}

function deleteDeck(results, deck) {
  let decks = JSON.parse(results)
  delete decks[deck]
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  return decks
}

export function _getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(getDecks)
}

export function _addCard(deck, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => addCard(results, deck, card))
}

export function _deleteDeck(deck) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => deleteDeck(results, deck))
}