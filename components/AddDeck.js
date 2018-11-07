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
		dispatch(handleAddDeck(this.state.deckName)).then(() => {
			navigation.navigate('Deck', { name: this.state.deckName })
			this.handleInput('')
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<Text style={styles.prompt}>What is the title of your new deck?</Text>
					<TextInput
						style={styles.input}
						placeholder="Deck Title"
						onChangeText={(text) => this.handleInput(text)}
						value={this.state.deckName }/>
				</View>
				<View style={styles.submitContainer}>
					<TextButton
						style={styles.submit}
						textStyle={styles.submitText}
						onPress={this.submit}
						children='Create Deck'/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingBottom: 50
	},
	inputContainer: {
		width: '100%',
		marginTop: 100,
		alignItems: 'center'
	},
	prompt: {
		fontSize: 30,
		textAlign: 'center',
		marginBottom: 20
	},
	input: {
		padding: 10,
	    borderRadius: 5,
	    borderColor: '#000',
	    borderWidth: 1.5,
	    height: 50,
	    width: '90%',
	    marginBottom: 20,
	    textAlign: 'left',
	    backgroundColor: '#fff'
	},
	submitContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	submit: {
		alignSelf: 'flex-end',
		padding: 10,
	    borderRadius: 5,
	    borderColor: '#000',
	    borderWidth: 1.5,
	    height: 50,
	    paddingLeft: 60,
	    paddingRight: 60,
	    marginBottom: 20,
	    backgroundColor: "#000"
	},
	submitText: {
		color: "#fff",
		fontSize: 22,
    	textAlign: 'center'
	}
})

export default connect()(AddDeck)