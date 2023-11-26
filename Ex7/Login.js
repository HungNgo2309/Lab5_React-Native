import React from "react";
import {View, Text, StyleSheet} from "react-native"
import { Button, HelperText, TextInput } from "react-native-paper";
const Login =()=>{
    const hasErrors = () => {
        return !email.includes('@');
      };
    const handleLogin = () => {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(({ user }) => {
            console.log(user);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
    return(
        <View>
            <Text>Login</Text>
             <TextInput
                    placeholder='Enter Your Email'
                    style={styles.ti}
                    value={email}
                    onChangeText={setEmail}
                    left={<TextInput.Icon icon="email" />}
                />
                <HelperText type="error" visible={hasErrors()}>
                    Địa chỉ Email không hợp lệ !
                </HelperText>
                <TextInput
                    placeholder='Enter Password'
                    style={styles.ti}
                    secureTextEntry={hidepass}
                    value={password}
                    onChangeText={setPassword}
                    left={<TextInput.Icon icon="key" />}
                    right={<TextInput.Icon icon="eye" onPress={()=>sethidepass(!hidepass)}/>}
                />
                
                <Button style={styles.login} onPress={()=>handleLogin()}>
                    Login
                </Button>
        </View>
    )
}
export default Login;