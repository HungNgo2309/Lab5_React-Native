import React from "react";
import firestore from '@react-native-firebase/firestore';
import {List} from 'react-native-paper'
function Todo({id,title,complete}){
    async function toggleComplete(){
        await firestore()
        .collection('todos')
        .doc(id)
        .update({
            complete:!complete,
            
        });
    }
    return(
        <List.Item
        title={title}
        onPress={()=>toggleComplete()} 
        left={props=>(//Điều này cho phép bạn truyền các props từ List.Item 
        //vào List.Icon, bao gồm color, size, style, 
        //và bất kỳ thuộc tính nào khác mà List.Icon có thể sử dụng.
            <List.Icon {...props} icon={complete?'check':'cancel'}/>
        )}
        />
    );
}
export default Todo;