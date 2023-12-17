/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import TabNavigator from './component/TabNavigator';
import Login from './component/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modal from './component/Modal';
import SignupScreen from './lab3/SignupScreen';
import LoginScreen from './lab3/LoginScreen';
import ResetScreen from './lab3/ResetPassword';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthenticatedUserProvider } from './providers';
import { RootNavigator } from './lab3/RootNavigator';
import Home from './Lab5/HomeScreen';
import Header from './Lab5/Header';
import ListButton from './Lab5/ListButton';
import firestore from '@react-native-firebase/firestore';
import { MyContextControllerProvider } from './Ex7/context';
import Route from './Ex7/Route';

function App() {
  //const Stack = createNativeStackNavigator(); 
   return (
  //  <SafeAreaProvider>
  //      <NavigationContainer>  
  //     <Stack.Navigator initialRouteName="Login">
  //        <Stack.Screen name='PhoneLogin' component={PhoneNumberLogin}/>
  //       <Stack.Screen name="Login" component={LoginScreen} />
  //       <Stack.Screen name="Signup" component={SignupScreen} />
  //       <Stack.Screen name="Reset" component={ResetScreen} />
  //       <Stack.Screen name="TabNavigator" component={TabNavigator} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  //  </SafeAreaProvider>

  
    <MyContextControllerProvider>
      <NavigationContainer>
      <SafeAreaProvider>
         {/* <RootNavigator/> */}
         <Route/>
      </SafeAreaProvider>
      </NavigationContainer>
    </MyContextControllerProvider>
     
   ) 
}


export default App;
