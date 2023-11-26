import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Contacts from './contacts';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import Calling from './Calling';

import ModalScreen from './Modal';
import Login from './Login';
import { useRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ContactsScreens = () => { // Chúng ta nhận tham số route ở đây
  const route = useRoute();
    const { id, username } = route.params;
  return (      
    <Stack.Navigator 
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        initialParams={{ id, username }} // Truyền tham số vào màn hình "Contacts"
      />

      <Stack.Screen name="Profile" component={Profile} 
        options={({ route }) => {
          const { contact } = route.params;
          const { name } = contact;
          return {
            title: name.split(' ')[0],
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'blue',
            }
          };
        }} />

      <Stack.Screen name="Calling" component={Calling}  
        options={({ route }) => {
          const { contact } = route.params;
          const { name } = contact;
          return {
            title: name.split(' ')[0],
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'blue',
            }
          };
        }} 
      />
      <Stack.Screen name="ModalScreen" component={ModalScreen} />
    </Stack.Navigator>
  );
};

export default ContactsScreens;
