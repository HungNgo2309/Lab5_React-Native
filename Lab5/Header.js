import React, { useContext, useEffect, useState } from "react";
import {StyleSheet, View} from "react-native";
import { IconButton, Text } from "react-native-paper";
import  {AuthenticatedUserContext}  from '../providers';
import firestore from '@react-native-firebase/firestore';

const Header =()=>{
    const Users = firestore().collection('User');
    const { user } = useContext(AuthenticatedUserContext);
    
    const [Profile, setProfile] = useState({});
     useEffect(()=>{
         Users.doc(user.email).onSnapshot((u)=>setProfile(u.data()))
     }
    )
    return(
        <View style={style.container}>
            <View style={style.good}>
                <Text>
                    Good Morning                
                </Text>
                <Text>{user.email}</Text>
            </View>
            <View style={style.point}>
                <IconButton icon='plus' size={20}/>
                <Text style={{alignSelf:'center',}}>{Profile.point} point</Text>
            </View>
        </View>
    )
}
export default Header;
const style= StyleSheet.create({
    good:{
        marginLeft:10,
        flexDirection:"column",
    },
    container:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    point:{
        borderRadius:20 ,
        backgroundColor:'#ff6600',
        flexDirection:'row',
        paddingRight:10,
        marginRight:20,
    }
})