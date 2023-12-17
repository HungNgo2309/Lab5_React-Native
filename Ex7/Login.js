import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet} from "react-native"
import { Button, HelperText, TextInput } from "react-native-paper";
import { login, useMyContextController } from "./context";
const Login =({navigation})=>{
    const[controller,dispatch]= useMyContextController();
    const {userLogin}=controller;
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[hidepass,sethidepass]=useState(true);
    useEffect(()=>{
      if(userLogin!=null)
      {
        if(userLogin.role=="admin")
            navigation.navigate("Admin")
        else if(userLogin.role=="customer")
            navigation.navigate("Customer")
      }
    },[userLogin])
    
    const hasErrors = () => {
        return !email.includes('@');
      };
    const handleLogin = () => {
        login(dispatch,email,password)
      };      
    return(
        <View>
            <Text>Login</Text>
             <TextInput
                    placeholder='Enter Your Email'
                    value={email}
                    onChangeText={setEmail}
                    left={<TextInput.Icon icon="email" />}
                />
                <HelperText type="error" visible={hasErrors()}>
                    Địa chỉ Email không hợp lệ !
                </HelperText>
                <TextInput
                    placeholder='Enter Password'
                    secureTextEntry={hidepass}
                    value={password}
                    onChangeText={setPassword}
                    left={<TextInput.Icon icon="key" />}
                    right={<TextInput.Icon icon="eye" onPress={()=>sethidepass(!hidepass)}/>}
                />
                
                <Button  onPress={()=>handleLogin()}>
                    Login
                </Button>
        </View>
    )
}
export default Login;