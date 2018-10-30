import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/decks'


class Decks extends Component {
	componentDidMount(){
		this.props.dispatch(handleInitialData())
	}
	render() {
		const { decks } = this.props
		return(
			<View>
				{
					Object.keys(decks).map(deck => (
						<Text key={deck}>{deck}</Text>
					))
				}
			</View>
		)
	}
}

function mapStateToProps({decks}){
	return {
		decks
	}
}
export default connect(mapStateToProps)(Decks)