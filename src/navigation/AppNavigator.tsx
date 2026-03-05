
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import SplashScreen from '../screens/SplashScreen';
import DashBoard from '../screens/DashBoard';
import Login from '../screens/Login';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:(false)}}>
          <Stack.Screen name='Splash' component={SplashScreen}/> 
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='DashBoard' component={DashBoard}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default  AppNavigator ;