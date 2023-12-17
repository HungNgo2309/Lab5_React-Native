import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image } from "react-native";
import { create } from "react-test-renderer";
import Home from "./Tabs";
import Tabs from "./Tabs";
import Setting from "./Setting";

const Tab = createBottomTabNavigator();
const Tabst=()=>{
    return(
        <Tab.Navigator
            screenOptions={({route})=>({
                showLabel:false,
                headerShown:false,
                style:{
                    height:"10%",
                    backgroundColor:'black'
                },
                tabBarIcon:({focused})=>{
                    const tintColor=focused?'white':'gray';
                    switch(route.name){
                        case "Home":
                            return(
                                <Image
                                source={require('../img/dashboard_icon.png')}
                                resizeMode="contain"
                                style={{
                                    tintColor:tintColor,
                                    width:25,
                                    height:25
                                }}/>
                            )
                        case "Search":
                            return(
                                <Image
                                source={require('../img/dashboard_icon.png')}
                                resizeMode="contain"
                                style={{
                                    tintColor:tintColor,
                                    width:25,
                                    height:25
                                }}/>
                            )
                        case "Notification":
                            return(
                                <Image
                                source={require('../img/notification_icon.png')}
                                resizeMode="contain"
                                style={{
                                    tintColor:tintColor,
                                    width:25,
                                    height:25
                                }}/>
                            )
                        case "Setting":
                            return(
                                <Image
                                source={require('../img/menu_icon.png')}
                                resizeMode="contain"
                                style={{
                                    tintColor:tintColor,
                                    width:25,
                                    height:25
                                }}/>
                            )
                    }
                }
            })}>
                <Tab.Screen name="Home" component={Tabs}/>
                <Tab.Screen name="Search" component={Home}/>
                <Tab.Screen name="Notification" component={Home}/>
                <Tab.Screen name="Setting" component={Setting}/>
        </Tab.Navigator>
    )
}
export default Tabst;