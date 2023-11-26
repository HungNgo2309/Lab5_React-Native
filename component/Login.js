import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from "@react-navigation/native";

const Login=()=>{
    //const navigation = useNavigation();
    const[username,setUsername]= useState("");
    const[password,setPassword]=useState("");
    const[id,setid]=useState("");
    // useEffect(() => {
    //     // Xử lý thay đổi giá trị của id sau khi nó đã được cập nhật
    //     if (id) {
    //       console.log("id là: " + id);
    //       navigation.navigate('TabNavigator', { id: id, username: username });
    //     }
    //   }, [id]);
      const checkLogin = () => {
        const ref = firestore().collection('LoginContact');
        ref.where('Username', '==', username)
            .where('Password', '==', password)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    // Lấy tài liệu đầu tiên trong kết quả
                    const documentSnapshot = querySnapshot.docs[0];
                    const data = documentSnapshot.data();
                    const id = documentSnapshot.id;
                    
                    // Có sự khớp với tên người dùng và mật khẩu
                    
                    setid(id);
                    console.log('Đăng nhập thành công'+id);
                   // navigation.navigate('TabNavigator', { id, username });
                } else {
                    // Không có sự khớp với tên người dùng và mật khẩu
                
                    console.log('Tên người dùng hoặc mật khẩu không đúng');
                }
            })
            .catch((error) => {
                console.error("Lỗi khi truy vấn:", error);
            });
    }
    
    
    return(
        
        <View style={styles.container}>
            <ImageBackground source={{uri:'https://i.pinimg.com/originals/0b/7a/c2/0b7ac22e4e856979255dd38a558d56bd.jpg'}}
            resizeMode="cover" style={styles.image}>
                <View style={styles.textinput}>
                    <TextInput
                        style={{marginTop:10}}
                        label="Username"
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                    <TextInput 
                        style={{marginTop:10}}  
                        label="Password" 
                        secureTextEntry
                        right={<TextInput.Icon icon="eye"/>}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <View style={{flexDirection:"row", justifyContent:'space-around',marginTop:10}}>
                        <Button  mode="contained" onPress={checkLogin}>
                            Login
                        </Button>
                        <Button mode="contained">
                            Register
                        </Button>
                    </View>
                </View>   
            </ImageBackground>
        </View>
    )
}
export default Login;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    textinput:{
        marginLeft:30,
        marginRight:30,
    }
})