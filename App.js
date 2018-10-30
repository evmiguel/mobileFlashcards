import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Decks from './components/Decks'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import middleware from './middleware'

export default class App extends React.Component {
  render() {
    return (
    <Provider store={createStore(reducers, middleware)}>
      <View>
      	<Decks />
      </View>
    </Provider>
    );
  }
}