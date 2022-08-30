import React from 'react'
import {LogBox} from 'react-native'
import {Provider} from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import store from './store';

LogBox.ignoreAllLogs()

const App = () => {
  return <Provider store={store}>
    <HomeScreen/>
  </Provider>
}

export default App
