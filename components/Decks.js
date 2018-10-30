import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/decks'


class Decks extends Component {
	componentDidMount(){
		this.props.dispatch(handleInitialData())
	}
	render() {
		const { decks } = this.props
		return(
			<View style={styles.container}>
				{
					Object.keys(decks).map(deck => (
						<View key={deck} style={styles.deckItem}>
							<Text style={styles.text}>{deck}</Text>
						</View>
					))
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	text: {
		fontSize: 30
	}
})

function mapStateToProps({decks}){
	return {
		decks
	}
}
export default connect(mapStateToProps)(Decks)