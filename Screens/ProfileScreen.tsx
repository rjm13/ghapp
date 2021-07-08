import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Avatar } from 'react-native-paper';
import WinLossHeader from '../Components/WinLossHeader';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';
import {StatusBar} from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';


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
    <View>
        <Animatable.View 
            animation='bounceInDown' 
            style={{marginBottom: 20, alignItems: "center", backgroundColor: '#155843', 
            paddingBottom: 20, borderBottomRightRadius: 40, borderBottomLeftRadius: 40,}}>
            <View style={{ paddingHorizontal: 20, height: 80, width: SCREEN_WIDTH, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()} style={{padding: 5}}>
                    <Feather 
                        name='chevron-down'
                        size={30}
                        color='#fff'
                    />
                </TouchableWithoutFeedback> 
                <TouchableWithoutFeedback onPress={() => navigation.goBack()} style={{padding: 5}}>
                    <FontAwesome 
                        name='share'
                        size={20}
                        color='#fff'
                        style={{marginBottom: 5}}
                    />
                </TouchableWithoutFeedback> 
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 100, height: 125, width: 125}}>
                <Avatar.Image
                    source={{ uri: user?.imageUri || 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg'}}
                    size={120}
                    style={{alignSelf: 'center',}}
                />
            </View>
            
            <View style={ styles.displaynamebox}>
                <Text style={ styles.displayname }>
                    {!!user ? user.name : 'Player 1'}
                </Text>
            </View>
            <Text style={ styles.username }>
                { user?.status || 'The worst trash talker in the land'}
            </Text>

            {/* <View style={ styles.winloss }>
                <WinLossHeader />
            </View> */}
        </Animatable.View>

        <ScrollView>
            <View>
                <TouchableWithoutFeedback onPress={() => {navigation.navigate('FriendsList')}}>
                    <View style={ styles.box }>
                        <Text style={ styles.boxText }>Friends</Text>
                        <Feather
                            name='chevron-right'
                            size={20}
                            color='#000'
                        />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {navigation.navigate('Favorites')}}>
                    <View style={ styles.box }>
                        <Text style={ styles.boxText }>Favorites</Text>
                        <Feather 
                            name='chevron-right'
                            size={20}
                            color='#000'
                        />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {navigation.navigate('Framed')}}>
                    <View style={ styles.box }>
                        <Text style={ styles.boxText }>Archived</Text>
                        <Feather 
                        name='chevron-right'
                        size={20}
                        color='#000'
                        />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {navigation.navigate('Framed')}}>
                    <View style={ styles.box }>
                        <Text style={ styles.boxText }>Statistics</Text>
                        <Feather 
                            name='chevron-right'
                            size={20}
                            color='#000'
                        />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {navigation.navigate('EditProfile')}}>
                    <View style={ styles.box }>
                        <Text style={ styles.boxText }>Edit Profile</Text>
                        <Feather 
                            name='chevron-right'
                            size={20}
                            color='#000'
                        />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <View style={ styles.box }>
                        <Text style={ styles.boxText }>Settings</Text>
                        <Feather 
                            name='chevron-right'
                            size={20}
                            color='#000'
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
        <StatusBar style='light'/>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  box: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: 60,
    padding: 10,
  },
  boxText: {
    fontFamily: 'chalkboard-regular',
    fontSize: 16,
  },
  displayname: {
    fontSize: 20,
    fontFamily: 'chalkboard-bold',
    color: '#fff',
  },
  username: {
    fontSize: 16,
    fontFamily: 'chalkboard-light',
    paddingTop: 10,
    color: '#fff'
  },
})