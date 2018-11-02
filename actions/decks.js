import { getDecks, addCardBackend } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'

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