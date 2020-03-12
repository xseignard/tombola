import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/screens/Home'
import Question from './src/screens/Question'
import Answer from './src/screens/Answer'
import End from './src/screens/End'

const Stack = createStackNavigator()

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Answer" component={Answer} />
        <Stack.Screen name="End" component={End} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
