//main stack that contains every page with the primary header

import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Feather from 'react-native-vector-icons/Feather';
import MatericalCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import QRStack from './QRStack';

import GamesHome from '../Screens/GamesHome';
// import WelcomeScreen from '../authentication/screens/WelcomeScreen';

// import SignInScreen from '../authentication/screens/SignInScreen';
// import SignUpScreen from '../authentication/screens/SignUpScreen';
// import ForgotPasswordScreen from '../authentication/screens/ForgotPasswordScreen';
// import ConfirmEmailScreen from '../authentication/screens/ConfirmEmail';
// import ChangePassword from '../authentication/screens/ChangePassword';
// import UpdateEmail from '../authentication/screens/UpdateEmail';

import ScoresHome from '../Screens/ScoresHome';
// import GamePageScreen from '../screens/GameScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import EditProfile from '../screens/EditProfile';
import SearchScreen from '../Screens/SearchScreen';
// import FriendsList  from '../screens/FriendsList';
// import UserProfile from '../screens/UserProfile';



const HomeStack = createStackNavigator();


const MainNavStack = ({ navigation }) => {

    const [selectedId, setSelectedId] = useState(2)


    return (
        <HomeStack.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#155843',
                },
                headerTitleStyle: {
                    fontFamily: 'chalkboard-regular',
                    fontSize: 16,
                },
                headerTintColor: '#fff',
                headerLeft: () => (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                                }}
                    >
                    <Feather.Button 
                        name='menu'
                        size={20}
                        backgroundColor='#155843'
                        style={{ paddingLeft: 25 }}
                        onPress={() => { navigation.toggleDrawer() }}
                    />
                    </View>
                ),
                headerRight: () => (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                                }}
                    >
                        <MatericalCommunityIcons.Button 
                            name='magnify'
                            size={20}
                            color={selectedId === 0 ? 'gold' : '#fff'}
                            backgroundColor='#155843'
                            style={{ paddingHorizontal: 8 }}
                            onPress={() => { navigation.navigate('SearchScreen'); setSelectedId(0) }}
                        />
                        <MatericalCommunityIcons.Button 
                            name='grid'
                            size={20}
                            color={selectedId === 1 ? 'gold' : '#fff'}
                            backgroundColor='#155843'
                            style={{ paddingHorizontal: 8 }}
                            onPress={() => { navigation.navigate('ScoresHome'); setSelectedId(1) }}
                        />
                        <MatericalCommunityIcons.Button 
                            name='cards-playing-outline'
                            size={20}
                            color={selectedId === 2 ? 'gold' : '#fff'}
                            backgroundColor='#155843'
                            style={{ paddingHorizontal: 8 }}
                            onPress={() => { navigation.navigate('Home'); setSelectedId(2) }}
                        />           
                    </View>
                ),   
            }}   
        >
            <HomeStack.Screen
                name='Games'
                component={GameNavigator}
                options={{
                    //headerTitle: props => <Logo {...props} />,
                    headerTitle: null,
                    headerTitleContainerStyle: {
                        //height: '75%',
                    },
                    headerTitleAlign: 'center',              
                }}
            />
            <HomeStack.Screen
                name='SearchScreen'
                component={SearchNavigator}
                options={{
                    headerTitle: null,
                }}
            />
            <HomeStack.Screen
                name='ScoresHome'
                component={ScoreNavigator}
                options={{
                    headerTitle: null,
                    headerTitleAlign: 'center',    
                }}
            />
            
            {/* <HomeStack.Screen
                name='WelcomeScreen'
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                }}
            />

            
            <HomeStack.Screen
                name='GamePage'
                component={GamePageScreen}
                options={{
                    headerTitle: null,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                                    }}
                        >
                        
                        <Feather.Button 
                            name='arrow-left'
                            size={20}
                            backgroundColor='#155843'
                            style={{ paddingLeft: 24 }}
                            onPress={() => { navigation.goBack() }}
                        />
                        </View>
                    ),
                }}
            />
            <HomeStack.Screen
                name='Profile'
                component={ ProfileScreen }
                options={{
                    title: 'Profile',
                }}
            />
            <HomeStack.Screen
                name='EditProfile'
                component={ EditProfile }
                options={{
                    title: 'Edit Profile',
                }}
            />
            <HomeStack.Screen
                name='FriendsList'
                component={FriendsList}
                options={{
                    headerTitle: 'My Friends',
                }}
            />
            <HomeStack.Screen
                name='QR Code'
                component={QRStack}
            />
            <HomeStack.Screen
                name='UserProfile'
                component={UserProfile}
            />
            <HomeStack.Screen
                name='SignInScreen'
                component={SignInScreen}
                options={{
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name='SignUpScreen'
                component={SignUpScreen}
                options={{
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name='ForgotPasswordScreen'
                component={ForgotPasswordScreen}
                options={{
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name='ConfirmEmailScreen'
                component={ConfirmEmailScreen}
                options={{
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name='ChangePassword'
                component={ChangePassword}
                options={{
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name='UpdateEmail'
                component={UpdateEmail}
                options={{
                    headerShown: false,
                }}
            /> */}
        </HomeStack.Navigator>
);
}

const GameStack = createStackNavigator();

function GameNavigator() {
  return (
    <GameStack.Navigator>
      <GameStack.Screen
        name="Home"
        component={GamesHome}
        options={{ headerShown: false }}
      />
    </GameStack.Navigator>
  );
}

const ScoreStack = createStackNavigator();

function ScoreNavigator() {
  return (
    <ScoreStack.Navigator>
      <ScoreStack.Screen
        name="ScoreHome"
        component={ScoresHome}
        options={{ headerShown: false }}
      />
    </ScoreStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </SearchStack.Navigator>
  );
}


export default MainNavStack;
