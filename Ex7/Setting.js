import React, { useEffect } from "react";
import { View } from "react-native";
import { logout, useMyContextController } from "./context";
import { Button } from "react-native-paper";

const Setting =({navigation})=>{
    const[controller,dispatch]= useMyContextController();
    const {userLogin}=controller;
    useEffect(()=>{
        if(userLogin==null)
        {
              navigation.navigate("Login")
        }
      },[userLogin])
    const HandleLogout=()=>{
        logout(dispatch);
    };
    return(
        <View>
                <Button onPress={HandleLogout}>logout</Button>
        </View>
    )
}
export default Setting;