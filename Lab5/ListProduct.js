import React, { useState, useEffect } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
const ListProduct = () => {
    const navigation = useNavigation();
    const Books = firestore().collection('Books');
    const[booksData,setBooksData]= useState([]);
    Books.onSnapshot((lstbook)=>{
        const result=[];
        lstbook.forEach(b=>result.push(b.data()));
        setBooksData(result);
    })
    // useEffect(() => {
    //     // Lấy URL của hình ảnh từ Firebase Storage
    //     const getImageUrl = async () => {
    //         try {
    //             const url = await storage().ref('35398627.jpg').getDownloadURL();
    //             setImageUrl(url);
    //         } catch (error) {
    //             console.error('Error getting image URL: ', error);
    //         }
    //     };

    //     getImageUrl();
    // }, []); // Chạy useEffect một lần khi component được mount
    const renderbook=({item})=>{
        return(
            <TouchableOpacity style={{marginRight:5,}} onPress={()=>navigation.navigate("BookDetail",{book:item})}>
                {/* Sử dụng imageUrl làm nguồn (source) cho Image */}
                <Image style={style.img} source={ { uri: item.bookCover }} />
                <View style={style.time}>
                    <FontAwesome name='clock' />
                    <Text>{item.lastRead}  </Text>
                    <FontAwesome name='copy' />
                    <Text> {item.completion} %</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={style.container}>
            <FlatList
                horizontal 
                data={booksData}
                renderItem={renderbook}  
                keyExtractor={item=>item.id.toString()}
               
            />
        </View>
    );
};

export default ListProduct;

const style = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 10,
        marginLeft: 10,
        justifyContent: 'center',
    },
    img: {
        height: 250,
        width: 180,
        borderRadius: 20,
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
