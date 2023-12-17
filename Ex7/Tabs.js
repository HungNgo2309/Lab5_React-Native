import React, { useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home";
import UpdateService from "./UpdateService";
import Service from "./Service";
import ServiceDetail from "./ServiceDetail";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";

const Tab = createStackNavigator();

const Tabs =()=>{
    return(
        <Tab.Navigator initialRouteName="Login"  >
            <Tab.Screen name="Home" component={Home} options={{
        
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="home" color='blue' size={size}/>
        ),
      }}/>
                <Tab.Screen name="Update" component={UpdateService} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="address-book" color='blue' size={size}/>
        ),
      }} />
                <Tab.Screen name="Service" component={Service}/>
                <Tab.Screen name="ServiceDetail" component={ServiceDetail}/>
        </Tab.Navigator>
    )
}
export default Tabs;