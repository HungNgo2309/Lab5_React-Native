import React,{ useEffect,useState} from "react";
import {View, Text, FlatList,TouchableOpacity, Image} from "react-native"
import { Button, IconButton } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const CustomerHome =()=>{
    const navigation = useNavigation();
    const Services = firestore().collection('service')
    const [lstService,setLstService]= useState([]);
    useEffect(()=>{
        Services.onSnapshot((lst)=>{
                const list=[];
                lst.forEach(doc=>list.push(doc.data()));
                setLstService(list);
        }
        )
    },[]);
    // useEffect(() => {
    //     navigation.setOptions({
    //       headerRight: () => (
    //         <IconButton icon="logout"  onPress={handleLogout} />
    //       ),
    //     });
    //   }, [navigation]);
    const  renderService=({item})=>{
        console.log(item.imageUrl);
        return(
            <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', 
            marginLeft:10,marginRight:10,borderRadius:10,borderWidth:1,padding:10,marginBottom:10}}
            onPress={()=>navigation.navigate("Service",{ service: item })}>
                <Text style={{alignSelf:'center',fontWeight:'bold'}}>{item.name}</Text>
                <Text>{item.price} VND</Text>
            </TouchableOpacity>
        )
    };
    
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
            <Image
                source={require('../img/logoheader03-1769.png')}
                style={{
                    justifyContent:'center',
                    alignSelf:'center',
                    marginTop:20,
                    marginBottom:20,
                }}
            />
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{alignSelf:'center',marginLeft:20,fontWeight:'bold'}}>Danh sách dịch vụ</Text>
            </View>
            <FlatList
                data={lstService}
                renderItem={renderService}
            />
        </View>
    )
}
export default CustomerHome;