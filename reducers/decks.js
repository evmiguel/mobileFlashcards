import { RECEIVE_DECKS, ADD_CARD } from '../actions/decks.js'

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
		default:
			return state
	}
}