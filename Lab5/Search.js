import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { Text } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

const SearchAutoComplete = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore().collection('Books').get();
        const resultData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllData(resultData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Fetch data only once when the component mounts
  useEffect(() => {
    // Filter data based on the search term
    const filteredResult = allData.filter((item) =>
      item && item.bookname && item.bookname.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredResult);
  }, [search, allData]);
  console.log(filteredData);
  

  const handleSearch = (text) => {
    setSearch(text);
  };

  const handleSelectItem = (item) => {
    console.log('Selected item:', item);
    // Xử lý khi một mục được chọn
  };
  const  renderCategories=({item})=>{
        
    return(
      <TouchableOpacity style={{flexDirection:'row',marginLeft:20,backgroundColor:'white'}} onPress={()=>navigation.navigate('Home', { screen: 'BookDetail', params: { book: item }})}>
        <Image style={{height:50,width:50}} source={{uri:item.bookCover}}/>
        <Text>{item.bookname}</Text>  
      </TouchableOpacity>
            
    )
};
  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={handleSearch}
        value={search}
      />
      <FlatList
        data={filteredData}
        renderItem={renderCategories}
      />
    </View>
  );
};

export default SearchAutoComplete;
