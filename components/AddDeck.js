import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { handleAddDeck } from '../actions/decks'
import { connect } from 'react-redux'

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
		const { dispatch, navigation } = this.props
		dispatch(handleAddDeck(this.state.deckName))
		navigation.navigate('Decks')
		this.handleInput('')
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>What is the title of your new deck?</Text>
				<TextInput placeholder="Deck Title"
					onChangeText={(text) => this.handleInput(text)}
					value={this.state.deckName }/>
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

export default connect()(AddDeck)