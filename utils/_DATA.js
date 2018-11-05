import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const DECK_STORAGE_KEY = 'MobileCards:decks'
const NOTIFICATION_KEY = 'MobileCards:notifications'

let decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function setDummyData() {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  return decks
}

function getDecks(results) {
  const data = JSON.parse(results)
  return (Object.keys(data).length === 0 || data === null)
          ? setDummyData()
          : data
}

function addCard(results, deck, card) {
  let decks = JSON.parse(results)
  decks[deck].questions.push(card)
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  return { deck, card }
}

// initialize an empty deck
function addDeck(title) {
  const deckObj = {
    title: title,
    questions: []
  }

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: deckObj
  }))
}

function deleteDeck(results, deck) {
  let decks = JSON.parse(results)
  delete decks[deck]
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  return decks
}

export function _getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(getDecks)
}

export function _addCard(deck, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => addCard(results, deck, card))
}

export function _deleteDeck(deck) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => deleteDeck(results, deck))
}

export function _addDeck(title) {
  return addDeck(title).then(() => { return title })
}

function createNotification () {
  return {
    title: 'Reminder to study!',
    body: "👋 Don't forget to take a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function _completeQuiz(title) {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              // Remind the user to complete a quiz if they don't do one today
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(17)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}