import React, {useState, useEffect} from 'react';
import { StyleSheet,Text, View,FlatList,ActivityIndicator } from 'react-native'; 
import {fetchContacts } from '../utility/api';
import ContactThumbnail from './ContactThumbnail';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const keyExtractor = ({ phone }) => phone;
const Favorites = ({navigation})=>
{
//state
    const route = useRoute();
    const {id}= route.params;
    const [favorites, setfavorite] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const ref = firestore().collection('Favorites');
//Load du lieu
    // useEffect(()=>{
    //     return  ref.where('id_user', '==', id).onSnapshot(querySnapshot=>{
    //         const list =[];
    //         // Lặp qua từng tài liệu trong collection
    //         querySnapshot.forEach(doc=>{
    //           const{ID_Contact,ID_User}=doc.data();  // Trích xuất dữ liệu từ tài liệu
    //           list.push({// Thêm tài liệu vào danh sách công việc
    //             id:doc.id,
    //             ID_Contact,
    //             ID_User,
    //           });
    //         })
    //     })
    //     })
    useEffect(() => {
    const unsubscribe = ref.where('ID_Contact', '==', id).onSnapshot(querySnapshot => {
        const list = [];

        // Lặp qua từng tài liệu trong collection 'Favorites'
        querySnapshot.forEach(doc => {
            const { ID_Contact, ID_User } = doc.data();
            list.push({
                id: doc.id,
                ID_Contact,
                ID_User,
            });
        });
        // Nếu danh sách không rỗng, thực hiện truy vấn cho từng tài liệu
        if (list.length > 0) {
            const list_2 =[];
            const promises = list.map(item => {
                const { ID_Contact, ID_User } = item;
                return  firestore().collection('contacts')
                .where('id_user', '==', ID_Contact)
                .where('phone', '==', ID_User)
                .onSnapshot(querySnapshot=>{
                             
                              //Lặp qua từng tài liệu trong collection
                             querySnapshot.forEach(doc=>{
                               const{name,phone}=doc.data();   //Trích xuất dữ liệu từ tài liệu
                               list_2.push({ //Thêm tài liệu vào danh sách công việc                                 
                                 name,
                                 phone,
                               });
                             })
                             
                         })   
                
            });
            setfavorite(list_2);
        }
    });

    // Ngắn chặn lắng nghe khi component unmount
        return () => unsubscribe();
    }, [id]);
    console.log(favorites);
    const renderFavoriteThumbnail = ({ item }) =>
     {
        const { name,phone } = item;
        return (
            <ContactThumbnail
            name={name}
            phone={phone}
            id_main={id}
            onPress={() => navigation.navigate('Profile', { contact: item })}
            />)
    };
    return (
    <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}
        {!loading && !error && (
            <FlatList
                data={favorites}
                keyExtractor={keyExtractor}
                numColumns={3}
                contentContainerStyle={styles.list} 
                renderItem={renderFavoriteThumbnail}
            />
        )}
        </View> 
        );
    }
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
    list: {
        alignItems: 'center'
    },
});
export default Favorites;