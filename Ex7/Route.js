import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../lab3/LoginScreen";
import SignupScreen from "../lab3/SignupScreen";
import HomeScreen from "./Home";
import { Stacks } from "./Stack";
import Login from "./Login";
import Home from "./Home";
import Tabst from "./Tab";
import CustomerTab from "./CustomerTab";
const Stack = createStackNavigator();
const Route=()=>{
    console.log("hi");
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Admin" component={Tabst}/>
            <Stack.Screen name="Customer" component={CustomerTab}/>
            <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
    )
}
export default Route;