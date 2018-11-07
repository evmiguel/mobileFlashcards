import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/decks'


class Decks extends Component {
	componentDidMount(){
		this.props.dispatch(handleInitialData())
	}

	selectDeck = (deck) => {
		//pass a name
		this.props.navigation.navigate('Deck', { name: deck } )
	}

	render() {
		const { decks } = this.props
		return(
			<View style={styles.container}>
				{
					(Object.keys(decks).length > 0) ?
					Object.keys(decks).map(deck => (
						<TouchableOpacity key={deck} style={styles.deckItem} onPress={() => this.selectDeck(deck)}>
							<Text style={styles.text}>{deck}</Text>
							<Text style={styles.cardsText}>{decks[deck].questions.length} { decks[deck].questions.length === 1 ? 'card' : 'cards' }</Text>
						</TouchableOpacity>
					)) :
					<View style={styles.noDecksContainer}>
						<Text style={styles.noDecksText}>
							There are no study decks to choose from! Please add a deck to start your quizzing journey.
						</Text>
					</View>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	deckItem : {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 30,
		paddingBottom: 5
	},
	cardsText: {
		fontSize: 20
	},
	noDecksContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	noDecksText: {
		fontSize: 25,
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20
	}
})

function mapStateToProps({decks}){
	return {
		decks
	}
}
export default connect(mapStateToProps)(Decks)