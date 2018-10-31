import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
	static navigationOptions = ({ navigation }) => {
	    const { name } = navigation.state.params

	    return {
	      title: name
	    }
  	}
	render(){
		return (
			<View>
				<Text>DECK!</Text>
			</View>
		)
	}

}

function mapStateToProps({ decks }, { navigation }){
	let name = navigation.state.params.name
	return {
		title: decks[name].title,
		questions: decks[name].questions
	}
}

export default connect(mapStateToProps)(Deck)