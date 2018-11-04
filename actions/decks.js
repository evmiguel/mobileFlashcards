import { getDecks, addCardBackend, deleteDeckBackend } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_DECK = 'DELETE_DECK'

function receiveDecks(decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	}
}

function addCard(deck, card) {
	return {
		type: ADD_CARD,
		deck,
		card
	}
}

function deleteDeck(deck) {
	return {
		type: DELETE_DECK,
		deck
	}
}

export function handleInitialData() {
	return (dispatch) => {
		return getDecks().then(decks => {
			dispatch(receiveDecks(decks))
		})
	}
}

export function handleAddCard(deck, card) {
	return (dispatch) => {
		return addCardBackend(deck, card).then(res => {
			dispatch(addCard(deck, card))
		})
	}
}

export function handleDeleteDeck(deck) {
	return (dispatch) => {
		return deleteDeckBackend(deck).then(res => {
			dispatch(deleteDeck(deck))
		})
	}
}