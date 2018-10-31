import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class Quiz extends Component {
	static navigationOptions = ({ navigation }) => {
	    return {
	      title: 'Quiz'
	    }
  	}

	state = {
		numQuestions: 0,
		currentQuestion: '',
		currentQuestionNumber: 0,
		showAnswer: false
	}

	componentDidMount() {
		const { questions } = this.props.navigation.state.params
		this.setState({
			numQuestions: questions.length,
			currentQuestion: questions[0],
			currentQuestionIndex: 0
		})
	}

	showAnswer = () => {
		this.setState(currentState => (
			{
				showAnswer: !currentState.showAnswer
			}
		))
	}

	render() {
		return (
			<View>
				<Text>{this.state.currentQuestionIndex + 1} / {this.state.numQuestions}</Text>

				{
					// TODO: Prepping for animation. This will become an Animated.View
				}
				<View>
					<Text>{this.state.currentQuestion.question}</Text>
				</View>
				{
					this.state.showAnswer &&
					<View>
						<Text>{this.state.currentQuestion.answer}</Text>
					</View>
				}

				<TouchableOpacity onPress={this.showAnswer}>
					<Text>Answer</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

export default Quiz