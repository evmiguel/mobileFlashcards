import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import middleware from './middleware'
import { createStackNavigator } from 'react-navigation'
import Decks from './components/Decks'
import Deck from './components/Deck'
import Quiz from './components/Quiz'

const MainNavigator = createStackNavigator({
  Decks: {
    screen: Decks,
  },
  Deck: {
    screen: Deck
  },
  Quiz: {
    screen: Quiz
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