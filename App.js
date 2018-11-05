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
import { MaterialCommunityIcons} from '@expo/vector-icons'

const DeckNavigator = createStackNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: 'Quiz Decks'
    }
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
    screen: DeckNavigator,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='plus-box' size={30} color={tintColor} />
    }
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