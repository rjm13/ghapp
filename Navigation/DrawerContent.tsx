//contains all of the stlying for the drawer

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Caption, Paragraph, Drawer, Text } from 'react-native-paper';

import { getUser } from '../src/graphql/queries'
import { API, graphqlOperation, Auth } from "aws-amplify";

import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ExpandableViewSeparate from '../Components/ExpandableViewSeparate';
import WinLossHeader from '../Components/WinLossHeader';

export function DrawerContent(props) {

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

    const handleSignOut = () => {
        Auth.signOut()
          .then(() => props.navigation.navigate('WelcomeScreen'))
          .catch(err => console.log(err));
      }

    function getExpandableView(props){
        return (
            <ExpandableViewSeparate navObj={props.navigation}/>
          );
    };

    return(
        <View style={{ flex:1 }}>
            <DrawerContentScrollView { ... props } >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection} >
                        <TouchableOpacity
                            onPress={() => {props.navigation.navigate('QR Code')}}>
                            <View style={{ marginTop: 45 }}>
                                <Avatar.Image
                                    source={{ uri: user?.imageUri || 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg'}}
                                    size={100}
                                    style={{ 
                                        alignSelf: 'center',
                                        
                                }}
                                />
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={styles.title}>
                                    {!!user ? user.name : 'Player One'}
                                </Text>
                            </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                        <View style={ styles.row }>
                            <WinLossHeader />
                        </View>
                    
                        

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name='user'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Profile'
                            labelStyle={ styles.itemText}
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        {getExpandableView(props)}
                       
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name='settings'
                                    color={color}
                                    size={size}
                                />
                            )}
                                label='Settings'
                                labelStyle={ styles.itemText}
                                onPress={() => {props.navigation.navigate('Settings')}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons
                                    name='help-circle-outline'
                                    color={color}
                                    size={size}
                                />
                            )}
                                label='Help & Support'
                                labelStyle={ styles.itemText}
                                onPress={() => { props.navigation.navigate('Help') }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section styles={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name='book'
                            color={color}
                            size={size}
                        />
                    )}
                        label='Current Game'
                        labelStyle={ styles.itemText}
                        //onPress={handleSignOut}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        backgroundColor: '#155843',
        marginTop: -30
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        color: '#fff',
        fontFamily: 'chalkboard-bold',
        marginBottom: 15,
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#000000',
        fontFamily: 'chalkboard-regular'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        marginBottom: 0,
        alignSelf: 'center',
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 10,
        //fontFamily: 'chalkboard-bold',
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    itemText: {
        fontFamily: 'chalkboard-regular',
        fontSize: 16,
        color: '#5e5e5e',
    }
});