import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import ContactThumbnail from './ContactThumbnail';
const Calling =({route})=>{
    const { contact } = route.params;
    const { name, phone } = contact;
    return(
    <View style={styles.container}>
        <View style={styles.avatarsection}>
            <ContactThumbnail  name={name} phone={phone}/>
        </View>
        <LottieView style={styles.lottie}
            source={require('../calling.json')} autoPlay loop />
    </View>
    );
}
export default Calling;
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#6495ed',
    },
    lottie:{
        flex:1,
        height: 150,
        width: 150,
        //alignItems:"center",
        marginLeft:130,
        justifyContent:'center',
        flexDirection:'column',
    }
        
    
}
    
)