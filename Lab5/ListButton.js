import React from "react";
import {StyleSheet, View} from "react-native";
import { Button, IconButton, Text } from "react-native-paper";

const LineDriver=()=>{
    return(
        <View style={{width:1,paddingVertical:5}}>
                <View style={{flex:1,borderLeftColor:'gray', borderLeftWidth:1}}>
                </View>
        </View>
    )
}
const ListButton =()=>{
    return (
        <View style={style.container}>
            <View style={style.list}>
                <IconButton
                icon='border-outside'
                />
                <Text style={{ alignSelf:'center',}}>Claim </Text>
            </View>
            <LineDriver/>
            <View style={style.list}>
                <IconButton
                icon='border-outside'
                />
                <Text style={{ alignSelf:'center',}}>Get Point</Text>
            </View>
            <LineDriver/>
            <View style={style.list}>
                <IconButton
                icon='credit-card-outline'
                />
                <Text style={{ alignSelf:'center',}}>My Card</Text>
            </View>
        </View>
    )
}
export default ListButton;
const style= StyleSheet.create({
    container:{
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        backgroundColor:'gray',
        flexDirection:'row',
        justifyContent:'space-around',
        borderRadius:5,
    },
    list:{
        flexDirection:'row',       
    }
})