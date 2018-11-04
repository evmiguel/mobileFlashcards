import { RECEIVE_DECKS, ADD_CARD, DELETE_DECK, ADD_DECK } from '../actions/decks.js'

export default function decks(state = {}, action) {
	switch(action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			}
		case ADD_CARD:
			return {
				...state,
				[action.deck] : {
					...state[action.deck],
					questions: state[action.deck].questions.concat([action.card])
				}
			}
		case DELETE_DECK:
			const newState = Object.assign({}, state)
			delete newState[action.deck]
			return {
				...newState
			}
		case ADD_DECK:
			return {
				...state,
				[action.title]: {
					title: action.title,
					questions: []
				}
			}
		default:
			return state
	}
}