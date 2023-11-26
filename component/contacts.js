import React, { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import ContactListItem from "./ContactDetail";
import {View,FlatList, Alert, StyleSheet,Button} from 'react-native';
import {Appbar,  TextInput} from 'react-native-paper';
import Modal from 'react-native-modal';
import { useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';


const Contacts=({ navigation})=>{
    const route = useRoute();
    const { id, username } = route.params;
    const [loading,setLoading]= useState(true);
    const [contacts,setContacts]= useState([]);
    const ref = firestore().collection('contacts');
    const [isModalVisible, setModalVisible] = useState(false);
    const [User, setUser] = useState('');
    const [Phone, setPhoneIn] = useState('');
    const id_main= id;
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const handleSave = () => {
        // Xử lý dữ liệu từ TextInput và thực hiện các tác vụ cần thiết ở đây
        console.log('TextInput 1:', User);
        console.log('TextInput 2:', Phone);
        addContact();
        // Sau khi xử lý xong, đóng modal
        toggleModal();
      };
    async function addContact() {
        await ref.add({
          name:User,
          phone:Phone,
          id_user:id,
          complete:false,
        });
        setUser('');
        setPhoneIn('');// Xóa nội dung ô nhập liệu sau khi thêm công việc
     }
     useEffect(()=>{
        // Thiết lập sự kiện lắng nghe sự thay đổi trong collection
        return  ref.where('id_user', '==', id).onSnapshot(querySnapshot=>{
          const list =[];
          // Lặp qua từng tài liệu trong collection
          querySnapshot.forEach(doc=>{
            const{name,phone,complete}=doc.data();  // Trích xuất dữ liệu từ tài liệu
            list.push({// Thêm tài liệu vào danh sách công việc
              id:doc.id,
              name,
              phone,
              complete,
              id_main,
            });
          });
          setContacts(list);// Cập nhật danh sách công việc trong trạng thái
          if(loading){ // Nếu đang trong quá trình tải dữ liệu, đặt trạng thái loading thành false
            setLoading(false)
          }
        });
       });
       if(loading){// Nếu đang trong quá trình tải dữ liệu, trả về null
        return null;
       };
    const renderContact = ({ item }) => {
        const{name,phone,id} = item;
        return (
          <ContactListItem
            name={name}
            phone={phone}
            id_main={id_main}
            onPress={() => navigation.navigate("Profile", { contact: item })}
          />
        );
      };
      const handleLogout = () => {
        auth().signOut().catch(error => console.log('Error logging out: ', error));
        };
    return(
    <View style={{flex:1}}>
            <Appbar.Header>
                <Appbar.Content title="Danh bạ "/>
                <Appbar.Action icon="account-plus" onPress={toggleModal}/>
                <Appbar.Action icon="logout" onPress={handleLogout}/>
            </Appbar.Header>
            
            <FlatList
            style={{flex:1}}
            data={contacts} 
            keyExtractor={(item)=>item.id}
            renderItem={renderContact}// Render từng công việc
            />
            {/* <TextInput label={'New Todo'} onChangeText={(text)=>setTodo(text)}/>
            <Button onPress={addTodo}>Add TODO</Button> */}
            
            <Modal isVisible={isModalVisible}>
              <View style={{backgroundColor:'white'}}>
                <TextInput
                  placeholder="Tên liên hệ"
                  value={User}
                  onChangeText={(text) => setUser(text)}
                />
              
                <TextInput
                  placeholder="Số điện thoại"
                  value={Phone}
                  maxLength={10}
                  keyboardType="phone-pad"
                  onChangeText={(text) => setPhoneIn(text)}
                />
              <View style={styles.buttongr}>
                <Button title="Save" onPress={handleSave}  style={{backgroundColor:'blue'}}/>
                <Button title="Cancel" onPress={toggleModal} />
              </View>
            </View>
          </Modal>          
      </View>
    );
}
export default Contacts;
const styles = StyleSheet.create(
  {
    buttongr:{
      flexDirection:'row',
      justifyContent:'space-around',
      color:'white',
    }
  }
)