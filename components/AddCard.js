import React, { Component } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { handleAddCard } from '../actions/decks'

class AddCard extends Component {
	state = {
		question: '',
		answer: ''
	}

	handleInput = (text, type) => {
		switch(type) {
			case 'question':
				return this.setState({
					question: text
				})
			case 'answer':
				return this.setState({
					answer: text
				})
			default:
				return
		}
	}

	submit = () => {
		let deck = this.props.navigation.state.params.deck
		let card = this.state
		this.props.dispatch(handleAddCard(deck, card))
		this.props.navigation.goBack()
	}

	render() {
		return(
			<View style={styles.container}>
				<TextInput placeholder="Type a question here!"
					onChangeText={(text) => this.handleInput(text, 'question')}/>
				<TextInput placeholder="Type the answer here!"
					onChangeText={(text) => this.handleInput(text, 'answer')}/>
				<TextButton onPress={this.submit} children='Submit'/>
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

export default connect()(AddCard)