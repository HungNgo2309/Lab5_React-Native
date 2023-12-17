import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import { IconButton, Text } from "react-native-paper";
import Header from "./Header";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ListButton from "./ListButton";
import ListProduct from "./ListProduct";
import ListCategory from "./ListCategory";
import myBooksData from'./myBooksData';
import categoriesData from'./categoriesData';

const initial = () => {
    
    const Books = firestore().collection('Books');
    const Categories = firestore().collection('Categories');
    myBooksData.forEach(b => {
      const path = "bookstore/" + b.bookCover;
  
      storage().ref(path).getDownloadURL()
        .then(url => {
          b.bookCover = url;
  
          Books.doc(b.id + '').set(b)
            .then(() => console.log("Add new books!"))
            .catch((e) => console.log("Error: " + e));
        })
        .catch(e => console.log("Error: " + e));
    });
  
    // Thêm các đối tượng danh mục vào cơ sở dữ liệu Firebase
    categoriesData.map(c => {
      Categories.doc(c.id + "").set(c)
        .then(() => console.log("Add new Categories!"));
    });
  };
  

const Home =()=>{
    //initial();
    return(
        <View style={{flex:1}}>
            <Header/>
            <ListButton/>
            <ScrollView>
              <ListProduct/>
              <ListCategory/>
            </ScrollView>
        </View>
    )
}
export default Home;