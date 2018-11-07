import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import TextButton from './TextButton'

const Score = (props) => {
	const { navigation } = props
	const { score, deck } = navigation.state.params
	return(
		<View style={styles.container}>
			<Text style={styles.text}>You scored:</Text>
			<Text style={[styles.text, { fontWeight: 'bold'}]}>{score}</Text>
			<View style={styles.buttonContainer}>
				<TextButton
					style={styles.button}
					textStyle={styles.buttonText}
					children='Restart Quiz'
					onPress={() => navigation.goBack()}
				/>
				<TextButton
					style={[styles.button, { backgroundColor: '#000' }]}
					textStyle={[styles.buttonText, { color: '#fff' }]}
					children='Back To Deck'
					onPress={() => navigation.navigate('Deck', { name: deck } )}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 100,
		marginBottom: 100
	},
	text: {
		fontSize: 45,
		textAlign: 'center'
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%'
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
	buttonText: {
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 'bold'
	}
})

export default Score