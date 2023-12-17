import React, { useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import BookDetail from "../Lab5/BookDetail";
import Home from "./HomeScreen";
 const Stack = createStackNavigator();
 export const HomeStack = () => {
        return (
        <Stack.Navigator initialRouteName="Home" screenOptions={()=>({headerShown:false,} )}>
                 <Stack.Screen name='BookDetail' component={BookDetail} />
                <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
        );
        };