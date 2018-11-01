import React from 'react'
import { Text, View } from 'react-native'

const Score = (props) => {
	const { score } = props.navigation.state.params
	return(
		<View>
			<Text>SCORE: {score}</Text>
		</View>
	)
}

export default Score