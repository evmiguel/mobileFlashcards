import React, { Component } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { handleAddCard } from '../actions/decks'

class AddCard extends Component {
	static navigationOptions = ({ navigation }) => {
	    return {
	      title: 'Add Card'
	    }
  	}

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
				<View style={styles.inputContainer}>
					<TextInput style={styles.input} placeholder="Type a question here!"
					onChangeText={(text) => this.handleInput(text, 'question')}/>
					<TextInput style={styles.input} placeholder="Type the answer here!"
						onChangeText={(text) => this.handleInput(text, 'answer')}/>
				</View>
				<View style={styles.submitContainer}>
					<TextButton style={styles.submit} textStyle={styles.submitText} onPress={this.submit} children='Submit'/>
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

export default connect()(AddCard)