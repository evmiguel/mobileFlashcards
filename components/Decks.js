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
					Object.keys(decks).map(deck => (
						<TouchableOpacity key={deck} style={styles.deckItem} onPress={() => this.selectDeck(deck)}>
							<Text style={styles.text}>{deck}</Text>
							<Text>{decks[deck].questions.length} { decks[deck].questions.length === 1 ? 'card' : 'cards' }</Text>
						</TouchableOpacity>
					))
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
		borderColor: '#000',
		borderWidth: StyleSheet.hairlineWidth
	},
	text: {
		textAlign: 'center',
		fontSize: 30
	}
})

function mapStateToProps({decks}){
	return {
		decks
	}
}
export default connect(mapStateToProps)(Decks)