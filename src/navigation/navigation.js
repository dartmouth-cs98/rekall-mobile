import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogoScreen from '../components/logoscreen.js';
import WelcomeScreen from '../components/welcomescreen.js';
import ExploreScreen from '../components/explorescreen.js';



const Stack = createStackNavigator()

function MainStackNav() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Welcome' component={WelcomeScreen} />
          <Stack.Screen name='Explore' component={ExploreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
export default MainStackNav;