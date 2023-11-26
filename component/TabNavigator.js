// TabNavigator.js
import React, { useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactsScreens from './ContactScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Favorites from './Favorite';
import  {AuthenticatedUserContext}  from '../providers';


const Tab = createBottomTabNavigator();

const TabNavigator=()=> {
  const { user } = useContext(AuthenticatedUserContext);
  console.log(AuthenticatedUserContext);
  const id = user.uid;
  console.log("tab"+id);
  const username = "hihi"; 
  return (
    <Tab.Navigator initialRouteName="Contacts">
      <Tab.Screen name="Contacts" component={ContactsScreens} initialParams={{id,username}}
       options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="address-book" color='blue' size={size}/>
        ),
      }}
      />
      <Tab.Screen name="Favorites" component={Favorites} initialParams={{id}}
       options={{
        tabBarIcon: ({ size }) => (
          <FontAwesome name="heart" color='red' size={size}/>
        ),
      }}

      />
    </Tab.Navigator>
  );
}
    

export default TabNavigator;
