import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text } from 'react-native';

import SplashScreen from '../screens/splash/SplashScreen';
import Login from '../screens/auth/Login';
import DashBoard from '../screens/dashboard/DashBoard';
import Payouts from '../screens/payout/Payout';
import PayoutsDetails from '../screens/payout/PayoutsDetails';
import ApproveComplete from '../screens/payout/ApproveComplete';
import RejectComplete from '../screens/payout/RejectComplete';
import More from '../screens/more/More';
import Users from '../screens/more/Users';
import UserDetails from '../screens/more/UserDetails';
import Company from '../screens/more/Company';
import CaseDetails from '../screens/more/CaseDetails';

import BottomNavBar from '../components/BottomNavBar';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DealsPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
    <Text style={{ fontSize: 18, color: '#666' }}>Deals - Coming Soon</Text>
  </View>
);

const MorePlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
    <Text style={{ fontSize: 18, color: '#666' }}>More</Text>
  </View>
);

const MainTabNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <BottomNavBar {...props} />}
    screenOptions={{ headerShown: false }}
    initialRouteName="DashBoard">
    <Tab.Screen name="Deals" component={DealsPlaceholder} />
    <Tab.Screen name="Payouts" component={Payouts} />
    <Tab.Screen name="DashBoard" component={DashBoard} />
    <Tab.Screen name="More" component={More} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="PayoutsDetails" component={PayoutsDetails} />
      <Stack.Screen name='ApproveComplete' component={ApproveComplete}/>
      <Stack.Screen name='RejectComplete' component={RejectComplete}/>
      <Stack.Screen name='DashBoard' component={DashBoard}/>
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="Company" component={Company} />
      <Stack.Screen name="CaseDetails" component={CaseDetails} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;