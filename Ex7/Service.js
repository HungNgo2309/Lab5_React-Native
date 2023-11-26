import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { IconButton, TextInput, TouchableOpacity, Button } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Service = () => {
    const navigation = useNavigation();
    const Service = firestore().collection('service');
    console.log(Service);
    const [nameService, setNameService] = useState("");
    const [price, setPrice] = useState(0);
    const jfhsj=()=>{
        addService();
    }
    async function addService () {
        await Service.add({
            name: nameService,
            price: price,
        });
        setNameService('');
        setPrice(0);
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={{marginLeft:10,fontWeight:'bold',marginTop:20}}>Tên dịch vụ</Text>
            <TextInput
                style={{marginRight:10,marginLeft:10}}
                placeholder="Vui lòng nhập tên dịch vụ"
                value={nameService}
                onChangeText={setNameService}
            />
            <Text style={{marginLeft:10,fontWeight:'bold',marginTop:20}}>Giá</Text>
            <TextInput
                style={{marginRight:10,marginLeft:10}}
                placeholder="Vui lòng nhập giá dịch vụ"
                value={price.toString()}
                onChangeText={(text) => setPrice(text)}   
            />
            <Button style={{backgroundColor:'pink',marginTop:20}} onPress={()=>addService()}>
                Thêm dịch vụ
            </Button>
        </View>
    );
};

export default Service;
