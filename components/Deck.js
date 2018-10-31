import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
	static navigationOptions = ({ navigation }) => {
	    const { name } = navigation.state.params

	    return {
	      title: name
	    }
  	}
	render(){
		const { title, questions } = this.props
		return (
			<View style={styles.container}>
				<View style={styles.info}>
					<Text>{title}</Text>
					<Text>{questions.length} { questions.length === 1 ? 'card' : 'cards'}</Text>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity>
						<Text>Add Question</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>Start Quiz</Text>
					</TouchableOpacity>
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
	info: {
		alignItems: 'center',
		marginBottom: 100
	},
	buttonContainer: {
		alignItems: 'center'
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