import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Decks from './components/Decks'
import Deck from './components/Deck'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import middleware from './middleware'
import { createStackNavigator } from 'react-navigation'

const MainNavigator = createStackNavigator({
  Decks: {
    screen: Decks,
  },
  Deck: {
    screen: Deck
  }
})


export default class App extends React.Component {
  render() {
    return (
    <Provider store={createStore(reducers, middleware)}>
      <View style={{flex: 1}}>
      	<MainNavigator />
      </View>
    </Provider>
    );
  }
}