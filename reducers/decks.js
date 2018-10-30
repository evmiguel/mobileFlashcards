import { RECEIVE_DECKS } from '../actions/decks.js'

export default function decks(state = {}, action) {
	switch(action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			}
		default:
			return state
	}
}