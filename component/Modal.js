import React, { useContext } from "react";
import {View} from "react-native"
import { Text } from "react-native-paper";
import { AuthenticatedUserContext } from "../lab3/AuthenticatedUserProvider";
const Modal=()=>{
  const { user } = useContext(AuthenticatedUserContext);
  console.log("tiep tho"+user.uid)
  return (
      <View>
        <Text>Hello</Text>
      </View>
  )
    
}
export default Modal;