import { _getDecks, _addCard, _deleteDeck } from './_DATA.js'

export function getDecks() {
	return _getDecks()
}

export function addCardBackend(deck, card) {
	return _addCard(deck, card)
}

export function deleteDeckBackend(deck) {
	return _deleteDeck(deck)
}