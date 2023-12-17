import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image } from "react-native";
import Setting from "./Setting";
import CustomerStack from "./CustomerStack";
import History from "./History";

const Tab = createBottomTabNavigator();
const CustomerTab=()=>{
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
                <Tab.Screen name="Home" component={CustomerStack}/>
                <Tab.Screen name="Search" component={CustomerStack}/>
                <Tab.Screen name="History" component={History}/>
                <Tab.Screen name="Setting" component={Setting}/>
        </Tab.Navigator>
    )
}
export default CustomerTab;