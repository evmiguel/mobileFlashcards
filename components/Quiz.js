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
		showAnswer: false,
		showQuestion: true
	}

	componentDidMount() {
		const { questions } = this.props.navigation.state.params
		this.setState({
			numQuestions: questions.length,
			currentQuestion: questions[0],
			currentQuestionIndex: 0
		})
	}

	show = () => {
		this.setState(currentState => (
			{
				showAnswer: !currentState.showAnswer,
				showQuestion: !currentState.showQuestion
			}
		))
	}

	render() {
		return (
			<View>
				<View>
					<Text>{this.state.currentQuestionIndex + 1} / {this.state.numQuestions}</Text>
					{
						// TODO: Prepping for animation. This will become an Animated.View
					}
					{
						this.state.showQuestion &&
						<View>
							<Text>{this.state.currentQuestion.question}</Text>
						</View>
					}
					{
						this.state.showAnswer &&
						<View>
							<Text>{this.state.currentQuestion.answer}</Text>
						</View>
					}

					<TouchableOpacity onPress={this.show}>
						<Text>{this.state.showQuestion ? 'Answer' : 'Question'}</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity>
						<Text>Correct</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>Incorrect</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export default Quiz