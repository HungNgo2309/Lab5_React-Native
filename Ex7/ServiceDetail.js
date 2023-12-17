import React,{useContext,useState,useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native"
import { AuthenticatedUserContext } from "../providers";
import firestore from '@react-native-firebase/firestore';
import { Appbar, Button, Dialog, Modal, Paragraph, Portal,Provider as PaperProvider, IconButton  } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useMyContextController } from "./context";

const ServiceDetail =({route})=>{
    const {service}=route.params;
    const {name,price,imageUrl}=service;
    const Services = firestore().collection('User')
    const[controller,dispatch]= useMyContextController();
    const {userLogin}=controller;
    const[info,setInfo]=useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigation = useNavigation();
    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <IconButton icon="settings-helper" style={{transform: [{ rotate: '90deg' }],}} onPress={showModal} />
        ),
      });
    }, [navigation]);
    useEffect(()=>{
        const intervalId = setInterval(() => {
        setCurrentTime(new Date());
        }, 1000);
        // Thiết lập sự kiện lắng nghe sự thay đổi trong collection
        return  Services.where('email', '==', userLogin.email).onSnapshot(querySnapshot=>{
          const list =[];
          // Lặp qua từng tài liệu trong collection
          querySnapshot.forEach(doc=>{  // Trích xuất dữ liệu từ tài liệu
            list.push(doc.data());
          });
          setInfo(list[0]);
        })},[]);

        const showModal = () => {
          setIsModalVisible(true);
        };
      
        const hideModal = () => {
          setIsModalVisible(false);
        };
      
      
        
      /// Delete
      const [isDialogVisible, setDialogVisible] = useState(false);

      const deleteDocument = async () => {
        const collectionRef = firestore().collection('service');
      
        try {
          const querySnapshot = await collectionRef.where('name', '==',name ).get();
      
          if (!querySnapshot.empty) {
            // Lặp qua tất cả các document thỏa mãn điều kiện
            querySnapshot.forEach(async (doc) => {
                await collectionRef.doc(doc.id).delete();
              console.log(`Delete document ${doc.id} successfully !`);
            });
          } else {
            console.log('No documents found that match the query.');
          }
        } catch (error) {
          console.error('Error delete documents: ', error);
        }
      };
    
      const showDeleteDialog = () => {
        setDialogVisible(true);
      };
    
      const hideDeleteDialog = () => {
        setDialogVisible(false);
      };
    
      const handleDelete = () => {
        deleteDocument();
        hideDeleteDialog();
      };
    
      //console.log(imageUrl);
    return(
      <PaperProvider>
        <View style={{flex:1,backgroundColor:'white'}}>
            {/* <View>
                  <Appbar.Header>
                      <Appbar.Action style={{transform: [{ rotate: '90deg' }],}} icon="settings-helper" onPress={showModal}/>
                  </Appbar.Header>
            </View> */}
            <View>
                <Text style={{fontWeight:'bold'}}>Service name: {name}</Text>
                <Text style={{fontWeight:'bold'}}>Price: {price}</Text>
                <Text style={{fontWeight:'bold'}}>Customer Name: {info.UserName}</Text>
                <Text style={{fontWeight:'bold'}}>Phone: {info.phone}</Text>
                <Text style={{fontWeight:'bold'}}>Date : {currentTime.toLocaleTimeString()}</Text>
            </View>
            {imageUrl!=null&&(
                <Image style={{height:100,width:100}} source={{uri:imageUrl}} />
            )}
            {/* Modal */}
            <Modal visible={isModalVisible} >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {/* Tùy chọn "Edit" */}
                  <TouchableOpacity onPress={()=>navigation.navigate("Update",{ service: service })}>
                    <Text style={{color:'black'}}>Edit</Text>
                  </TouchableOpacity>

                  {/* Tùy chọn "Delete" */}
                  <TouchableOpacity onPress={showDeleteDialog}>
                    <Text>Delete</Text>
                  </TouchableOpacity>

                  {/* Nút để đóng modal */}
                  <TouchableOpacity onPress={hideModal}>
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View>
              <Portal>
                <Dialog visible={isDialogVisible} onDismiss={hideDeleteDialog}>
                  <Dialog.Title>Confirmation</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>Are you sure you want to delete this document?</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={hideDeleteDialog}>Cancel</Button>
                    <Button onPress={handleDelete}>Delete</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
        </View>
        </PaperProvider>
    )
}
export default ServiceDetail;


const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center', // Màu nền với độ mờ 50%
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});