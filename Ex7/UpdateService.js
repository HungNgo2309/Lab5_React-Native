import React,{useContext,useState,useEffect} from "react";
import { Button, Text, TextInput } from "react-native-paper";
import {View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UpdateService=({route})=>{
    const {service}=route.params;
    const {name,price}=service;
    const[namenew,setNamenew]= useState(name);
    const[prices,setPrices]= useState(price);
    const updateDocument = async () => {
        const collectionRef = firestore().collection('service');
      
        try {
          const querySnapshot = await collectionRef.where('name', '==',name ).get();
      
          if (!querySnapshot.empty) {
            // Lặp qua tất cả các document thỏa mãn điều kiện
            querySnapshot.forEach(async (doc) => {
                await collectionRef.doc(doc.id).update({
                name: namenew,
                price: prices,
                //Thêm các trường và giá trị cần cập nhật
              });
              console.log(`Document with id ${doc.id} successfully updated!`);
            });
          } else {
            console.log('No documents found that match the query.');
          }
        } catch (error) {
          console.error('Error updating documents: ', error);
        }
      };
    return(
        <View style={{ flex: 1 }}>
        <Text style={{marginLeft:10,fontWeight:'bold',marginTop:20}}>Tên dịch vụ</Text>
        <TextInput
            style={{marginRight:10,marginLeft:10}}
            placeholder="Vui lòng nhập tên dịch vụ"
            value={namenew}
            onChangeText={setNamenew}
        />
        <Text style={{marginLeft:10,fontWeight:'bold',marginTop:20}}>Giá</Text>
        <TextInput
            style={{marginRight:10,marginLeft:10}}
            placeholder="Vui lòng nhập giá dịch vụ"
            value={prices.toString()}
            onChangeText={(text) => setPrices(text)}   
        />
        <Button style={{backgroundColor:'pink',marginTop:20}} onPress={updateDocument}>
            Update
        </Button>
    </View>
    )
}
export default UpdateService;