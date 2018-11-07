import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'MobileCards:decks'


function getDecks(results) {
  const data = JSON.parse(results)
  return data
}

function addCard(results, deck, card) {
  let decks = JSON.parse(results)
  decks[deck].questions.push(card)
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  return { deck, card }
}

// initialize an empty deck
function addDeck(title) {
  const deckObj = {
    title: title,
    questions: []
  }

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: deckObj
  }))
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

export function _addDeck(title) {
  return addDeck(title).then(() => { return title })
}