import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import  {AuthStack}  from './AuthStack';
import  {AppStack}  from './AppStack';
import  {LoadingIndicator}  from '../component/LoadingIndicator';
import {AuthenticatedUserContext} from '../providers';
import TabNavigator from '../component/TabNavigator';
import Route from '../Ex7/Route';

export const RootNavigator = () => {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    //console.log("user1123"+user);   
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        //console.log("jj");
        const unsubscribeAuthStateChanged = auth().onAuthStateChanged(
            authenticatedUser => {
                //console.log("use"+ authenticatedUser);
                authenticatedUser ? setUser(authenticatedUser) : setUser(null);
                //console.log("authenticatedUser: ha  ", authenticatedUser);        
                setIsLoading(false);
            }    
        );
            // unsubscribe auth listener on unmount
        return unsubscribeAuthStateChanged;
        }, [user]);

    if (isLoading) {
        return <LoadingIndicator />;
    }
    //console.log("user1123"+user);
    return (
    <NavigationContainer>
        {user ? <Route /> : <AuthStack />}
    </NavigationContainer>
    );  
};