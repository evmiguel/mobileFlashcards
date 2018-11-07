import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

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
		const { questions, title } = this.props.navigation.state.params

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
			// If we get here, the quiz has been completed
			// 1. Remove local notification for today
			clearLocalNotification().then(setLocalNotification)

			// 2. Show the score
			this.props.navigation.navigate('Score', { score: `${((this.state.numCorrect / this.state.numQuestions) * 100).toFixed(0)}%` })
			this.reset()
		}
	}

	render() {
		const { questions } = this.props.navigation.state.params
		return (
				(questions.length > 0) ?
					<View style={styles.quiz}>
						<View style={styles.questions}>
							<Text style={styles.questionTracker}>{this.state.currentQuestionIndex + 1} / {this.state.numQuestions}</Text>
							{
								this.state.showQuestion &&
								<View>
									<Text style={[styles.questionText, styles.text, {marginBottom:20}]}>{this.state.currentQuestion.question}</Text>
								</View>
							}
							{
								this.state.showAnswer &&
								<View>
									<Text style={[styles.text, {marginBottom:20}]}>{this.state.currentQuestion.answer}</Text>
								</View>
							}
							<View style={styles.showAnswer}>
								<TextButton
									style={styles.button}
									textStyle={[styles.text, styles.buttonText]}
									children={this.state.showQuestion ? 'Answer' : 'Question'}
									onPress={this.show} />
							</View>
						</View>
						<View style={styles.buttonContainer}>
							<TextButton
								style={[styles.button, {backgroundColor: '#146800'}]}
								textStyle={[styles.text, styles.buttonText, { color: '#fff', fontWeight: 'bold'}]}
								children='Correct'
								onPress={() => this.updateScore('correct')} />
							<TextButton
								style={[styles.button, {backgroundColor: '#ce0808'}]}
								textStyle={[styles.text, styles.buttonText, { color: '#fff', fontWeight: 'bold'}]}
								children='Incorrect'
								onPress={() => this.updateScore('incorrect')} />
						</View>
					</View>
					:
					<View style={styles.noQuestionsContainer}>
						<Text style={styles.noQuestionsText}>
							Sorry, you cannot take the quiz because there are no cards in the deck.
						</Text>
					</View>
		)
	}
}

const styles = StyleSheet.create({
	quiz: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 100,
		marginBottom: 100
	},
	questions: {
		alignItems: 'center',
		marginBottom: 50,

	},
	questionTracker: {
		fontSize: 15,
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#204060',
		marginBottom: 15
	},
	questionText: {
		fontWeight: '700'
	},
	text: {
		fontSize: 25,
		textAlign: 'center',
	},
	noQuestionsContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	noQuestionsText: {
		fontSize: 25,
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	showAnswer: {
		flexDirection: 'row'
	},
	buttonText: {
		fontSize: 20,
	},
	button: {
		padding: 10,
	    borderRadius: 5,
	    borderColor: '#000',
	    borderWidth: 1.5,
	    height: 45,
	    width: '40%',
	    marginBottom: 20,
	    backgroundColor: '#fff'
	},
	buttonContainer: {
		flex: 1,
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center'
	}

})

export default Quiz