import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import TextButton from './TextButton'
import { handleDeleteDeck } from '../actions/decks'

class Deck extends Component {
	static navigationOptions = ({ navigation }) => {
	    const { name } = navigation.state.params

	    return {
	      title: name
	    }
  	}

  	deleteDeck = () => {
  		const { dispatch, title } = this.props
  		dispatch(handleDeleteDeck(title))
  		this.props.navigation.goBack()
  	}

	render(){
		const { title, questions, navigation } = this.props
		return (
			<View style={styles.container}>
				<View style={styles.info}>
					<Text style={styles.deckText}>{title}</Text>
					<Text style={styles.cardText}>{questions.length} { questions.length === 1 ? 'card' : 'cards'}</Text>
				</View>
				<View style={styles.buttonContainer}>
					<TextButton
						onPress={() => navigation.navigate('AddCard', { deck: navigation.state.params.name })}
						children='Add Card'
						style={[styles.button, styles.addButton]}
						textStyle={styles.btnText}
					/>
					<TextButton
						onPress={() => navigation.navigate('Quiz', { questions: questions, title: navigation.state.params.name })}
						children='Start Quiz'
						style={[styles.button, styles.quizButton]}
						textStyle={[styles.btnText, styles.quizBtnText]}
					/>
					<TextButton
						onPress={this.deleteDeck}
						children='Delete Deck'
						textStyle={[styles.btnText, styles.deleteButtonText]}
					/>
				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	deckText: {
		fontSize: 30
	},
	cardText: {
		fontSize: 20
	},
	info: {
		alignItems: 'center',
		marginBottom: 100
	},
	buttonContainer: {
		alignItems: 'center'
	},
	button: {
		padding: 10,
	    borderRadius: 5,
	    borderColor: '#000',
	    borderWidth: 1.5,
	    height: 50,
	    paddingLeft: 60,
	    paddingRight: 60,
	    marginBottom: 20
	},
	addButton: {
	    backgroundColor: '#fff',
	},
	btnText: {
		fontSize: 22,
    	textAlign: 'center'
	},
	quizButton: {
		backgroundColor: '#000',
	},
	quizBtnText: {
		color: "#fff"
	},
	deleteButtonText: {
		color: "#ce0808"
	}

})

function mapStateToProps({ decks }, { navigation }){
	let name = navigation.state.params.name
	return {
		title: decks[name].title,
		questions: decks[name].questions
	}
}

export default connect(mapStateToProps)(Deck)