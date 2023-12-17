import React, { useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from '../component/TabNavigator';
import AuthenticatedUserContext  from '../providers';
import BookDetail from "../Lab5/BookDetail";
import Tabs from "../Lab5/Tab";
import Service from "../Ex7/Service";
import Home from "../Ex7/Home";
import ServiceDetail from "../Ex7/ServiceDetail";
import UpdateService from "../Ex7/UpdateService";
import Tabst from "../Ex7/Tab";
import Tab from "../Lab5/Tab";
 const Stack = createStackNavigator();
 export const AppStack = () => {
        console.log("App nè")
        return (
        <Stack.Navigator initialRouteName="Home" screenOptions={()=>({headerShown:false,} )}>
                {/* <Stack.Screen name="Home" component={Tabst} />
                <Stack.Screen name="Update" component={UpdateService} />
                <Stack.Screen name="Service" component={Service}/>
                <Stack.Screen name="ServiceDetail" component={ServiceDetail}/>
                <Stack.Screen name="Hometab" component={Tabs}/> */}
                 <Stack.Screen name='BookDetail' component={BookDetail} />
                <Stack.Screen name="Home" component={Tab} />
        </Stack.Navigator>
        );
        };