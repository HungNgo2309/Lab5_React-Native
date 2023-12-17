import React, { useEffect, useState } from "react";
import { View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { Text } from "react-native-paper";
import { FlatList } from "react-native";

const History = () => {
    const historyCollection = firestore().collection('Datetime');
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = historyCollection.onSnapshot((snapshot) => {
            const list = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                // Check if the datetime field exists before conversion
                const datetime = data.datetime ? data.datetime.toDate() : null;
                // Add the converted datetime back to the data
                list.push({ ...data, datetime });
            });
            setData(list);
        });

        return () => {
            // Unsubscribe from the snapshot listener when the component unmounts
            unsubscribe();
        };
    }, []);

    console.log(data);

    const renderItem = ({ item }) => {
        return (
            <View style={{backgroundColor:'white',margin:10}}>
                <Text>Dịch vụ {item.name}</Text>
                <Text>Giá {item.price}</Text>
                {item.datetime && (
                    <Text>Lịch đã đặt vào ngày:  {item.datetime.toLocaleString()}</Text>
                )}
            </View>
        );
    };

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderItem}
            />
        </View>
    );
};

export default History;
