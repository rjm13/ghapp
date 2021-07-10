import React, {useState, useEffect, useContext, useLayoutEffect} from "react";
import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import { AppContext } from '../../AppContext';
import { Auth, API, graphqlOperation } from 'aws-amplify';



const SCREEN_WIDTH = Dimensions.get('window').width

const SCREEN_HEIGHT = Dimensions.get('window').height

const Redirect = ({navigation} : any) => {


    useLayoutEffect(() => {
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser(
            { bypassCache: true }
          )
          .catch(err=>err)
          console.log('this ran')
          //console.log(userInfo)
          if (userInfo === 'The user is not authenticated') {
                navigation.navigate('SignIn')
          }
          else {
                navigation.navigate('HomeDrawer')    
          }
        }
        fetchUser();
        
    }, [])

    // const { userID } = useContext(AppContext);

    // const newUser = () => {
    //     userID === null ? navigation.navigate('SignIn') : navigation.navigate("HomeDrawer")
    //     console.log('this is my user object')
    //     console.log(userID)
    // }

    // useEffect(() => {
    //     newUser();
    // }, [])

    

    // useEffect(() => {
    //     if (userID === null) {
    //         navigation.navigate('SignIn')
    //     } else {
    //         navigation.navigate("HomeDrawer")
    //     }
    // }, [])

    return (
        <View style={{alignContent: 'center', justifyContent: 'center', width: SCREEN_WIDTH, height: SCREEN_HEIGHT, backgroundColor: '#fff'}}>
            <ActivityIndicator size="large" color="#155843" />
        </View>
    );
}

export default Redirect;