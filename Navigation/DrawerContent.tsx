//contains all of the stlying for the drawer

import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Caption, Paragraph, Drawer, Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';


import { getUser } from '../src/graphql/queries'
import { API, graphqlOperation, Auth } from "aws-amplify";

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import uuid from 'react-native-uuid';


import WinLossHeader from '../Components/WinLossHeader';
import { AppContext } from '../AppContext';

export function DrawerContent({navigation} : any) {

    const [user, setUser] = useState();

    const { userID } = useContext(AppContext);
    const { setUserID } = useContext(AppContext);

    const { ScorecardID } = useContext(AppContext);

    const [CurrentCard, setCurrentCard] = useState(ScorecardID);

    const [gamesExpanded, setGamesExpanded] = useState(false);

    const [scorecardExpanded, setScorecardExpanded] = useState(false);


    useEffect(() => {
        setCurrentCard(ScorecardID);
    }, [ScorecardID])

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
    }, [userID])


    // function getExpandableView(props : any){
    //     return (
    //         <ExpandableViewSeparate navObj={props.navigation}/>
    //       );
    // };

    return(
        <View style={{ flex:1 }}>
            <DrawerContentScrollView>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection} >
                        {/* <TouchableOpacity
                            onPress={() => {navigation.navigate('QR Code')}}> */}
                            <View style={{ marginTop: 45 }}>
                                <View style={{alignSelf: 'center', height: 104, width: 104, backgroundColor: '#fff', borderRadius: 52, alignItems: 'center', justifyContent: 'center'}}>
                                    <Avatar.Image
                                        source={{ uri: user?.imageUri || 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg'}}
                                        size={100}
                                    />
                                </View>
                                
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={styles.title}>
                                    {!!user ? user?.name : 'Player One'}
                                </Text>
                            </View>
                            </View>
                        {/* </TouchableOpacity> */}
                    </View>
                        <View style={ styles.row }>
                            <WinLossHeader />
                        </View>
                    
                        

                    <Drawer.Section style={styles.drawerSection}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20}}>
                                <View style={styles.box}>
                                    <Feather name='user' color='#636363' size={25} />
                                    <Text style={styles.itemtext}>
                                        Profile
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => setGamesExpanded(!gamesExpanded)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20}}>
                                <View style={styles.box}>
                                    <MaterialCommunityIcons name='cards-playing-outline' color='#636363' size={25} />
                                    <Text style={styles.itemtext}>
                                        Games
                                    </Text>
                                </View>
                                <Feather name={gamesExpanded ? 'chevron-down' : 'chevron-right'} color='#636363' size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                    
                        {gamesExpanded ? (
                            <Animatable.View animation='flipInX'>
                                <TouchableHighlight onPress={() => navigation.navigate('HomeDrawer')}>
                                    <View style={styles.expandedbox}>
                                        <Text style={styles.expandedtext}>Discover</Text> 
                                    </View>
                                </TouchableHighlight>
                                
                                <TouchableHighlight onPress={() => navigation.navigate('Favorites')}>
                                    <View style={styles.expandedbox}>
                                        <Text style={styles.expandedtext}>Favorites</Text> 
                                    </View>
                                </TouchableHighlight>

                                <View style={styles.expandedbox}>
                                    <Text style={styles.expandedtext}>Submit new</Text> 
                                </View>
                            </Animatable.View>
                        ) : null}

                        <TouchableWithoutFeedback onPress={() => setScorecardExpanded(!scorecardExpanded)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20}}>
                                <View style={styles.box}>
                                    <MaterialCommunityIcons name='grid' color='#636363' size={22} />
                                    <Text style={styles.itemtext}>
                                        Scorecards
                                    </Text>
                                </View>
                                <Feather name={scorecardExpanded ? 'chevron-down' : 'chevron-right'} color='#636363' size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                    
                        {scorecardExpanded ? (
                            <Animatable.View animation='flipInX'>
                                <TouchableHighlight onPress={() => navigation.navigate('Scorecard', {cardID: 'new' + uuid.v4()})}>
                                    <View style={styles.expandedbox}>
                                        <Text style={styles.expandedtext}>New</Text> 
                                    </View>
                                </TouchableHighlight>
                                
                                {/* <TouchableHighlight>
                                    <View style={styles.expandedbox}>
                                        <Text style={styles.expandedtext}>Presets</Text> 
                                    </View>
                                </TouchableHighlight>   */}

                                <TouchableHighlight onPress={() => navigation.navigate('ScoresHome', {screen: 'SavedScores'})}>
                                    <View style={styles.expandedbox}>
                                        <Text style={styles.expandedtext}>Saved</Text> 
                                    </View>
                                </TouchableHighlight>  
                                    
                                
                                
                            </Animatable.View>
                        ) : null}

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Help')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20}}>
                                <View style={styles.box}>
                                    <Feather name='help-circle' color='#636363' size={22} />
                                    <Text style={styles.itemtext}>
                                        Help
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                {CurrentCard !== null ? (
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather
                                name='book'
                                color={color}
                                size={size}
                            />
                        )}
                            label='Current Game'
                            labelStyle={ styles.itemText}
                            onPress={() => navigation.navigate('Scorecard')}
                    />
                ) : null}
                

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
    box: {
        paddingVertical: 14, 
        paddingHorizontal: 20, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    expandedbox: {
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: '#ededed'
    },
    itemtext: {
        marginLeft: 30, 
        color: '#636363', 
        fontFamily: 'chalkboard-regular', 
        fontSize: 16
    },
    expandedtext: {
        marginLeft: 30, 
        color: '#636363', 
        fontFamily: 'chalkboard-regular', 
        fontSize: 16
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
        marginBottom: 0,
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