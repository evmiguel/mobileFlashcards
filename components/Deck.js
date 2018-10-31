import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

const Deck = (props) => {
	console.log(props)
	return (
		<View>
			<Text>DECK!</Text>
		</View>
	)
}

function mapStateToProps({ decks }, { navigation }){
	let name = navigation.state.params
	return {
		title: decks[name].title,
		questions: decks[name].questions
	}
}

export default connect(mapStateToProps)(Deck)