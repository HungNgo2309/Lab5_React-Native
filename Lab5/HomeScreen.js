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
    // Lặp qua mảng myBooksData để thêm sách vào cơ sở dữ liệu Firebase
    myBooksData.forEach(b => {
      const path = "bookstore/" + b.bookCover;
  
      // Lấy đường dẫn URL từ Firebase Storage cho hình ảnh sách
      storage().ref(path).getDownloadURL()
        .then(url => {
          // Cập nhật trường bookCover của đối tượng sách (b) thành URL mới
          b.bookCover = url;
  
          // Thêm đối tượng sách vào cơ sở dữ liệu Firebase
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