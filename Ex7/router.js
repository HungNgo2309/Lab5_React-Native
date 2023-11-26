import React from "react";
import {View, Text, StyleSheet} from "react-native"
import { useMyContextController } from "./context"
import {NavigationContainer} from "@react-navigation/native"

export default Router = () =>{
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    console.log(userLogin)
    return (
        <View style={{...styles.container}}>
            <Text>app </Text>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1
        }
    }
)