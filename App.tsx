import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View, Text, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading  from 'expo-app-loading';
import { AppContext } from './AppContext';

import Amplify from '@aws-amplify/core';
import config from './src/aws-exports';
Amplify.configure(config);

// import { withOAuth } from 'aws-amplify-react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';

import AppNavigation from './Navigation/AppNavigation'

StatusBar.setBarStyle("light-content");

const App = () => {

  const [userID, setUserID] = useState({});
  const [ScorecardID, setScorecardID] = useState<string|null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      //get authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser(
        { bypassCache: true }
      )
      .catch(err=>err)
      //console.log(userInfo.attributes.sub);

      if (!userInfo) {
        setUserID(null)
        return;
      }

      if (userInfo) {
      //get the user from Backend with the user SUB from Auth
        const userData = await API.graphql(
          graphqlOperation(
            getUser, 
            { id: userInfo.attributes.sub,
            }
          )
        )


        if (userData.data.getUser) {
          console.log(userData.data.getUser);
          setUserID(userData.data.getUser)
          return;
        } else {
          setUserID(null);
        }

        // const newUser = {
        //   id: userInfo.attributes.sub,
        //   name: userInfo.attributes.name,
        //   imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
        //   email: userInfo.attributes.email,
        //   status: '',
        // }

      //if there is no user in DB with the id, then create one
        // await API.graphql(
        //   graphqlOperation(
        //     createUser,
        //     { input: newUser }
        //   )
        // )
      }
    }
    fetchUser();

  }, [])

  let [fontsLoaded] = useFonts({
    //'chalkduster': require('./assets/fonts/Chalkduster.ttf'),
    'chalkboard-regular': require('./assets/fonts/chalkboard-se-regular.ttf'),
    'chalkboard-light': require('./assets/fonts/chalkboard-se-light.ttf'),
    'chalkboard-bold': require('./assets/fonts/chalkboard-se-bold.ttf'),
    'boardgame': require('./assets/fonts/kidsboardgamefont.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
    } else {
  return (
    <AppContext.Provider value={{
      userID,
      setUserID: (user: {}) => setUserID(user),
      ScorecardID,
      setScorecardID: (id: string | null) => setScorecardID(id),
    }}>
      <AppNavigation/>
    </AppContext.Provider>
  );
}}

export default App;