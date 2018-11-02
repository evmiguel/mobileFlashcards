import React, { Component } from 'react'
import { TextInput, View } from 'react-native'

class AddCard extends Component {
	render() {
		return(
			<View>
				<TextInput placeholder="Type a question here!"/>
				<TextInput placeholder="Type the answer here!"/>
			</View>
		)
	}
}

export default AddCard