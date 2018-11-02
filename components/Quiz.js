import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import TextButton from './TextButton'

class Quiz extends Component {
	static navigationOptions = ({ navigation }) => {
	    return {
	      title: `${navigation.state.params.title} Quiz`
	    }
  	}

	state = {
		numQuestions: 0,
		currentQuestion: '',
		showAnswer: false,
		showQuestion: true,
		numCorrect: 0,
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

	updateScore = (correct) => {
		if (correct === 'correct') {
			// update the score
			let currNumCorrect = this.state.numCorrect
			this.setState({
				numCorrect: currNumCorrect + 1
			}, this.showNextQuestion)
		} else {
			this.showNextQuestion()
		}
	}

	reset = () => {
		const { questions } = this.props.navigation.state.params
		this.setState({
			numQuestions: questions.length,
			currentQuestion: questions[0],
			currentQuestionIndex: 0,
			showAnswer: false,
			showQuestion: true,
			numCorrect: 0,
		})
	}

	showNextQuestion = () => {
		const { questions } = this.props.navigation.state.params

		// Only go to next question if there is a next question in the array
		// i.e. haven't hit the last index, which is equal to this.state.numQuestions - 1
		if (this.state.currentQuestionIndex < this.state.numQuestions - 1){
			this.setState(currentState => ({
				currentQuestion: questions[currentState.currentQuestionIndex + 1],
				currentQuestionIndex: currentState.currentQuestionIndex + 1
			}))

			// Put the question back into view if the state is showing the answer
			if (this.state.showAnswer) { this.show() }
		} else {
			this.props.navigation.navigate('Score', { score: this.state.numCorrect / this.state.numQuestions })
			this.reset()
		}
	}

	render() {
		return (
			<View style={styles.quiz}>
				<View style={styles.questions}>
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
					<TextButton
						children={this.state.showQuestion ? 'Answer' : 'Question'}
						onPress={this.show} />
				</View>
				<View>
					<TextButton
						children={'Correct'}
						onPress={() => this.updateScore('correct')} />
					<TextButton
						children={'Incorrect'}
						onPress={() => this.updateScore('incorrect')} />
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	quiz: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	questions: {
		alignItems: 'center',
		marginBottom: 50
	}
})

export default Quiz