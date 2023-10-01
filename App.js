/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import {Appbar,TextInput,Button} from 'react-native-paper'
import Todo from './component/todo';

function App() {
  const [loading,setLoading]= useState(true);
  const [todo,setTodo]= useState('');
  const [todos,setTodos]= useState([]);
   const ref = firestore().collection('todos');
   async function addTodo() {
      await ref.add({
        title:todo,
        complete:false,
      });
      setTodo('');
   }
   useEffect(()=>{
    return  ref.onSnapshot(querySnapshot=>{
      const list =[];
      querySnapshot.forEach(doc=>{
        const{title,complete}=doc.data();
        list.push({
          id:doc.id,
          title,
          complete,
        });
      });
      setTodos(list);
      if(loading){
        setLoading(false)
      }
    });
   });
   if(loading){
    return null;
   }
   return (
    <View style={{flex:1}}>
      <Appbar>
        <Appbar.Content title={'TODOs List'}/>
      </Appbar>
     <FlatList
     style={{flex:1}}
     data={todos}
     keyExtractor={(item)=>item.id}
     renderItem={({item})=><Todo {...item}/>}
     />
      <TextInput label={'New Todo'} onChangeText={(text)=>setTodo(text)}/>
      <Button onPress={addTodo}>Add TODO</Button>
      </View>
   ) 
}


export default App;
