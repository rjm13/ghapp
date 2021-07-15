import React, {useState, useEffect, useContext, useLayoutEffect} from "react";
import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import { AppContext } from '../../AppContext';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';




const SCREEN_WIDTH = Dimensions.get('window').width

const SCREEN_HEIGHT = Dimensions.get('window').height

const Redirect = ({route, navigation} : any) => {

    const trigger = route.params

    const { userID } = useContext(AppContext);
    const { setUserID } = useContext(AppContext);

    const { ScorecardID } = useContext(AppContext);
    const { setScorecardID } = useContext(AppContext);

    useEffect(() => {
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
            const userData = await API.graphql(graphqlOperation(getUser,{ id: userInfo.attributes.sub}))
      
                if (userData.data.getUser) {
                    console.log(userData.data.getUser);
                    setUserID(userData.data.getUser);
                    navigation.reset({
                        //index: 0,
                        routes: [{ name: 'HomeDrawer' }],
                    });
                    //navigation.navigate('HomeDrawer')
                    
                } else {
                    setUserID(null);
                    navigation.reset({
                        //index: 0,
                        routes: [{ name: 'HomeDrawer' }],
                    });
                    //navigation.navigate('HomeDrawer')
                }
          }
        }
        fetchUser();
        
    }, [trigger])

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