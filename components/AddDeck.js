import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import TextButton from './TextButton'

class AddDeck extends Component {
	state = {
		deckName: ''
	}

	handleInput = (text) => {
		this.setState({
			deckName: text
		})
	}

	submit = () => {
		console.log('submit')
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>What is the title of your new deck?</Text>
				<TextInput placeholder="DeckTitle"
					onChangeText={(text) => this.handleInput(text)}/>
				<TextButton
					onPress={this.submit}
					children='Create Deck'/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default AddDeck