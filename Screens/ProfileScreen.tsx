import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Avatar, Chip, TouchableRipple, Switch } from 'react-native-paper';
import WinLossHeader from '../Components/WinLossHeader';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';

import ActiveGameScroll from '../Components/ActiveGames';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;


const ProfileScreen = ({ navigation } : any) => {

  const handleSignOut = () => {
    Auth.signOut()
      //.then(() => props.navigation.navigate('WelcomeScreen'))
      .catch(err => console.log(err));
  }

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true});
        if (!userInfo) {
          return;
        }
      try {
        const userData = await API.graphql(graphqlOperation(
          getUser, {id: userInfo.attributes.sub}))
          if (userData) {
            setUser(userData.data.getUser);
          }
      } catch (e) {
        console.log(e);
      }
    }
    fetchUser();
  }, [])

  return (

      <ScrollView>
        <View style={ styles.container}>
            <View style={{ paddingHorizontal: 20, height: 100, width: SCREEN_WIDTH, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()} style={{padding: 5}}>
                    <Feather 
                        name='chevron-down'
                        size={30}
                        color='#fff'
                    />
                </TouchableWithoutFeedback> 
            </View>
          <Avatar.Image
                source={{ uri: user?.imageUri || 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg'}}
                size={120}
                style={{ 
                  elevation: 2,
                  marginBottom: 4,
                  alignSelf: 'center',
                }}
            />
            <View style={ styles.displaynamebox}>
              <Text style={ styles.displayname }>
                {!!user ? user.name : 'Player 1'}
              </Text>
          </View>
          <Text style={ styles.username }>
            { user?.status || 'The worst trash talker in the land'}
          </Text>
          <TouchableOpacity onPress={() => {navigation.navigate('EditProfile')}}>
            <Chip textStyle={{  
                      fontFamily: 'chalkboard-light',
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      }} style={ styles.chip } >
                  Edit
            </Chip>
          </TouchableOpacity>

          {/* <View style={ styles.winloss }>
            <WinLossHeader />
          </View> */}

        </View>

        <View style={{ width: '90%', alignSelf: 'center'}}>
          <Text style={ styles.activeHeader }>Active Games</Text>
        </View>

        <View>
          <ActiveGameScroll />
        </View>

        <TouchableWithoutFeedback
          onPress={() => {navigation.navigate('FriendsList')}}
        >
          <View style={ styles.share }>
            <FontAwesome
              name='users'
              size={20}
              color='#155843'
            />
              <Text style={ styles.shareText }>Friends</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {navigation.navigate('Favorites')}}
        >
          <View style={ styles.share }>
            <AntDesign 
              name='heart'
              size={20}
              color='red'
            />
              <Text style={ styles.shareText }>Favorites</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {navigation.navigate('Framed')}}
        >
          <View style={ styles.share }>
            <FontAwesome 
              name='trophy'
              size={25}
              color='gold'
            />
              <Text style={ styles.shareText }>Framed Games</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={ styles.share }>
            <Feather 
              name='share-2'
              size={20}
              color='#155843'
            />
            <Text style={ styles.shareText }>Stats</Text>
        </View>

        <TouchableWithoutFeedback
          onPress={handleSignOut}
        >
          <View style={{ paddingBottom: 24}}>
            <View style={ styles.signout }>
              {/* <FontAwesome
                name='sign-out'
                size={25}
                color='#155843'
              /> */}
                <Text style={ styles.shareText }>Sign Out</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
    </ScrollView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    justifyContent: "flex-start",
    alignSelf: 'center',
    alignItems: "center",
    flexDirection: 'column',
    width: '100%',
    elevation: 1,
    backgroundColor: '#155843',
    paddingBottom: 20,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  share: {
    marginTop: 12, 
    //marginBottom: 2,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: 60,
    elevation: 1,
    backgroundColor: '#fff',
    //borderRadius: 8,
    padding: 32,
  },
  displayname: {
    fontSize: 20,
    fontFamily: 'chalkboard-bold',
    marginRight: 8,
    color: '#fff',
  },
  username: {
    fontSize: 16,
    fontFamily: 'chalkboard-light',
    paddingTop: 8,
    color: '#fff'
  },
  winloss: {
    margin: 16,
  },
  shareText: {
    fontFamily: 'chalkboard-regular',
    fontSize: 16,
    letterSpacing: 1,
  },
  activeHeader: {
    fontFamily: 'chalkboard-bold',
    fontSize: 18,

  },
  activeContent: {
    width: 100,
    height: 150,
    elevation: 1,
  },
  displaynamebox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  chip: {
    marginTop: 8,
  },
  signout: {
    marginTop: 12, 
    //marginBottom: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '60%',
    height: 60,
    //elevation: 1,
    //backgroundColor: '#fff',
    borderRadius: 8,
    padding: 32,
  },
})