import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
 import ContactThumbnail from'./ContactThumbnail';
import { Button, IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Profile =({route,navigation})=>
{
    
    
    const {contact}=route.params;
    const{name, phone,id_main}= contact;
    console.log(id_main);
    const[favoriteId,setfavoriteID]= useState('');
    const[iconfa,setIconfa]=useState('cards-heart-outline')
    const ref = firestore().collection('Favorites');
    checkFavorite();
    async function checkFavorite() {
        try {
            const querySnapshot = await ref
                .where('ID_Contact', '==', id_main)
                .where('ID_User', '==', phone)
                .get();
    
            if (!querySnapshot.empty) {
                // Có tài liệu thỏa mãn điều kiện
                const firstDoc = querySnapshot.docs[0];
                setfavoriteID(firstDoc.id);
                setIconfa("cards-heart");
            } else {
                // Không có tài liệu thỏa mãn điều kiện
                setIconfa("cards-heart-outline");
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra Favorite:", error);
        }
    }
    async function addFavorite() {
        if(iconfa==="cards-heart-outline")
        {
            const docRef =await ref.add({
                ID_Contact:id_main,
                ID_User:phone,
              });
              setfavoriteID(docRef.id);
              checkFavorite();
        }
        else {deleteFavorite(favoriteId)}
     }
     async function deleteFavorite(favoriteId) {
        try {
            await ref.doc(favoriteId).delete();
            console.log("Favorite đã bị xóa thành công");
            checkFavorite();
        } catch (error) {
            console.error("Lỗi khi xóa Favorite:", error);
        }
    }
    return (
    <View style={styles.container}>
        <View style={styles.avatarsection}>
            <ContactThumbnail  name={name} phone={phone}/>
        </View>
        <View style={styles.detailssection}>
                <IconButton icon="phone" size={30} 
                    onPress={()=>navigation.navigate("Calling", { contact: contact })}/>
                <IconButton icon="android-messages" size={30}/>
                <IconButton icon={iconfa} size={30} onPress={()=>addFavorite()}/>
        </View>
    </View>
    );
}
export default Profile;
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#6495ed',
    },
    avatarSection:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    detailssection:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-around',
    },
});