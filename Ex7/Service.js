import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { IconButton, TextInput, TouchableOpacity, Button } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Image } from "react-native";

const Service = () => {
    const navigation = useNavigation();
    const Service = firestore().collection('service');
    console.log(Service);
    const [imageUri, setImageUri] = useState(null);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');

  const pickImage = () => {
    let options={
        storageOptions:{
            path:'image'
        },
    };
    launchImageLibrary(options,response=>{
      if (response.assets[0].uri) {
        setImageUri(response.assets[0].uri);
        console.log(imageUri);
      } else if (response.error) {
        // Xử lý lỗi khi người dùng không chọn ảnh
        Alert.alert('Lỗi', 'Không có ảnh được chọn.');
      }
    });
  };
  
  const uploadImageAndAddService = async () => {
    if (!imageUri || !serviceName || !servicePrice) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const response = await fetch(imageUri);
    const blob = await response.blob();

    const storageRef = storage().ref().child('images/' + new Date().getTime());

    const uploadTask = storageRef.put(blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Theo dõi tiến trình upload nếu cần
        // snapshot.totalBytes và snapshot.bytesTransferred
      },
      (error) => {
        console.error('Error uploading image:', error);
      },
      () => {
        // Lấy URL của ảnh sau khi upload thành công
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);

          // Sau khi có URL ảnh, thêm dịch vụ vào Firestore
          firestore().collection('service').add({
            name: serviceName,
            price: servicePrice,
            imageUrl: downloadURL,
          });

          // Đặt lại trạng thái sau khi hoàn thành
          setImageUri(null);
          setServiceName('');
          setServicePrice('');

          // Hiển thị thông báo hoặc chuyển hướng người dùng nếu cần
          alert('Dịch vụ đã được thêm thành công!');
        });
      }
    );
  };

  return (
    <View>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Chọn ảnh"  />
      <Button onPress={pickImage}>Chọn ảnh</Button>
      <TextInput
        placeholder="Tên dịch vụ"
        value={serviceName}
        onChangeText={(text) => setServiceName(text)}
      />
      <TextInput
        placeholder="Giá dịch vụ"
        value={servicePrice}
        onChangeText={(text) => setServicePrice(text)}
      />
      <Button  onPress={uploadImageAndAddService}>Thêm dịch vụ</Button>
    </View>
  );
};

export default Service;
