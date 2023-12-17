import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import CustomerHome from "./CustomerHome";
import DatetimePicker from "./Datetimepicker";

const Stack = createStackNavigator();
const CustomerStack=()=>{
    return(
        <Stack.Navigator
            screenOptions={({route})=>({
                showLabel:false,
                headerShown:false,
                style:{
                    height:"10%",
                    backgroundColor:'black'
                },
                StackBarIcon:({focused})=>{
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
                <Stack.Screen name="Home" component={CustomerHome}/>
                <Stack.Screen name="Service" component={DatetimePicker}/>
        </Stack.Navigator>
    )
}
export default CustomerStack;