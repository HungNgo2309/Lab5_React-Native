import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {  Button,Text } from "react-native-paper";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import categoriesData from'./categoriesData';
import { useNavigation } from "@react-navigation/native";

const ListCategory=()=>{
    const navigation = useNavigation();
    const Categories = firestore().collection('Categories');
    const Books = firestore().collection('Books');
    const[bookData,setBookData]= useState([]);
    const[categories,setCategories]=useState([]);
    const[selected,setSelected]= useState(1);
    var books=[];
    useEffect(()=>{
        Books.onSnapshot((lstbook)=>{
            const result=[];
            lstbook.forEach(b=>result.push(b.data()));
            setBookData(result);
        })
        Categories.get()
        .then(lst=>{
            const result=[];
            lst.forEach(c=>result.push(c.data()));
            setCategories(result);
    })},[])

    //console.log(categories);
    const  renderCategories=({item})=>{
        
        return(
                <Button labelStyle={{color:(selected==item.id)?'red':'black',}} onPress={()=>setSelected(item.id)}>
                    {item.name}
                </Button>
        )
    };
    let selectedCategoriesBook=categories.filter(a=>a.id==selected);
    console.log(selectedCategoriesBook);
    if(selectedCategoriesBook.length>0)
        {
            selectedCategoriesBook[0].books.forEach(id=>{
                books.push(bookData.filter(a=>a.id==id)[0])
            })
        }

    
    const renderselecedCategories=({item})=>
    {
        return (
            <TouchableOpacity style={{flex:1,flexDirection:'row',marginTop:10,marginLeft:10}}
                onPress={()=>navigation.navigate("BookDetail",{book:item})}
                >
                    <Image
                       source={{uri:item.bookCover}}
                       style={{width:100,height:150,borderRadius:10}}
                    />
                    <View style={{flex:1}}>
                        <View>
                            <Text>{item.bookname}</Text>
                            <Text>{item.author}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Button>
                                {item.pageNo}
                            </Button>
                            <Button>
                                {item.reader}
                            </Button>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text>
                            {
                                item.ID_category
                            }
                            </Text>
                            
                        </View>
                    </View>
                </TouchableOpacity>
        )
    }
    return(
        <View style={{ flex: 1,marginBottom:10 }}>
            <View style={style.container}>
                <FlatList
                    horizontal
                    data={categories}
                    renderItem={renderCategories}
                    keyExtractor={item => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View>
                    <FlatList
                        data={books}
                        renderItem={renderselecedCategories}
                        keyExtractor={item => item.id.toString()}
                    />
            </View>
        </View>
    )
}
export default ListCategory;
const style= StyleSheet.create({
    container:{
        marginLeft:10,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    Button:{
        marginRight:10,
        borderRadius:20,
        color:'white',
    }
})