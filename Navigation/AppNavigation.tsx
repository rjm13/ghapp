//this is the main navigation function that contains the navigation container

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';

import MainNavStack from './MainNavStack';
import Scorecard from '../Screens/Scorecard'

const Drawer = createDrawerNavigator ();

const AppNavigation = () => {

    
    return (  
            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={props => <DrawerContent { ...props} />}
                    drawerPosition='left'
                >
                    <Drawer.Screen
                        name='HomeDrawer'
                        component={MainNavStack}
                    />
                    <Drawer.Screen
                        name='Scorecard'
                        component={Scorecard}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
    );
}

export default AppNavigation;