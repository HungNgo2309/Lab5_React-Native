import React, { useState } from 'react'
import { Button, Image } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const DatetimePicker= ({route}) => {
  const {service}= route.params;
  const{name,price,imageUrl}=service;
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const Services = firestore().collection('Datetime');
  const Submit=()=>{
    Services.add({
        name: name,
        price: price,
        datetime: date,
      });
  }
  console.log(imageUrl);
  return (
    <>
        <Text>Dịch vụ : {name}</Text>
        <Text>Giá: {price}</Text>
        {imageUrl != null && (
    <Image source={{uri: imageUrl}} />
)}

        <Text>{date.toDateString()}</Text>
      <Button title="Chọn thời gian" onPress={() => setOpen(true)} />

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <Button title='Đăt lịch' onPress={Submit}/>
    </>
  )
}
export default DatetimePicker;