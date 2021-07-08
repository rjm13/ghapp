//this is the main navigation function that contains the navigation container

import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
import { Auth, API, graphqlOperation } from 'aws-amplify';


import MainNavStack from './MainNavStack';
import Scorecard from '../Screens/Scorecard';
import ProfileScreen from '../Screens/ProfileScreen';
import EditProfileScreen from '../Screens/EditProfileScreen';
import SignInScreen from '../Screens/AuthFlow/SignIn';
import ForgotPasswordScreen from '../Screens/AuthFlow/ForgotPassword';
import SignUpScreen from '../Screens/AuthFlow/SignUp';
import ForgotPasswordConScreen from '../Screens/AuthFlow/ForgotPasswordCon';
import ConfirmEmailScreen from '../Screens/AuthFlow/ConfirmEmail';




const Drawer = createDrawerNavigator ();

const AppNavigation = () => {

        const fetchUser = async () => {
            //get authenticated user from Auth
            const userInfo = await Auth.currentAuthenticatedUser(
              { bypassCache: true }
            );
            return userInfo ? true : false
        }
    
    return (  
            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={props => <DrawerContent { ...props} />}
                    drawerPosition='left'
                    initialRouteName={fetchUser() ? 'HomeDrawer' : 'SignIn'}
                >
                    <Drawer.Screen
                        name='HomeDrawer'
                        component={MainNavStack}
                    />
                    <Drawer.Screen
                        name='Scorecard'
                        component={Scorecard}
                    />
                    <Drawer.Screen
                        name='Profile'
                        component={ProfileScreen}
                    />
                    <Drawer.Screen
                        name='EditProfile'
                        component={EditProfileScreen}
                    />
                    <Drawer.Screen
                        name='SignIn'
                        component={SignInScreen}
                    />
                    <Drawer.Screen
                        name='ForgotPassword'
                        component={ForgotPasswordScreen}
                    />
                    <Drawer.Screen
                        name='SignUp'
                        component={SignUpScreen}
                    />
                    <Drawer.Screen
                        name='ForgotPasswordCon'
                        component={ForgotPasswordConScreen}
                    />
                    <Drawer.Screen
                        name='ConfirmEmail'
                        component={ConfirmEmailScreen}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
    );
}

export default AppNavigation;