import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import middleware from './middleware'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Decks from './components/Decks'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import Score from './components/Score'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'

const DeckNavigator = createStackNavigator({
  Decks: {
    screen: Decks,
  },
  Deck: {
    screen: Deck
  },
  Quiz: {
    screen: Quiz
  },
  Score: {
    screen: Score
  },
  AddCard: {
    screen: AddCard
  }
})

const MainNavigator = createBottomTabNavigator({
  DeckView: {
    screen: DeckNavigator
  },
  AddDeck: {
    screen: AddDeck
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