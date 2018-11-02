import { _getDecks, _addCard } from './_DATA.js'

export function getDecks() {
	return _getDecks()
}

export function addCardBackend(deck, card) {
	return _addCard(deck, card)
}