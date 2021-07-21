import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppContext} from '../AppContext';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getGame, listGameSections, listGames, listGameVariations } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';

const Favorites = ({navigation, route} : any) => {

    const {userID} = useContext(AppContext);
    const {setUserID} = useContext(AppContext);

    const [games, setGames] = useState([]);

    useEffect(() => {

        const fetchGames = async () => {

            let FavGames = []

            for (let i = 0; i < userID.isLiked.length; i++) {
                try {
                    const response = await API.graphql(graphqlOperation(getGame, {
                    id: userID.isLiked[i]
                } ))
                    FavGames.push(response.data.getGame);
                } catch (e) {

                }
            }
            setGames(FavGames)
        };
        fetchGames();
    }, [userID])

    const Tile = ({index, id, name, highlight, players, teams, variations, category} : any) => {

        const [isLiked, setIsLiked] = useState(false);

        useEffect(() => {
        if (userID.isLiked) {
            if (userID.isLiked.includes(id)) {
                setIsLiked(true);
                }
        } else {null}   
        }, [])
    
        const onLikePress = async () => { 

        //const userInfo = await Auth.currentAuthenticatedUser();
        if (userID.isLiked.includes(id)) {
            setIsLiked(false);
        } else {setIsLiked(true);}
        //setIsLiked(!isLiked) 

        const updatedUser = {
            id: userID.id,
            isLiked: userID.isLiked.includes(id) ? userID.isLiked.filter(item => item !== id) :
            userID.isLiked.length > 0 ? [...userID.isLiked, id] : [id]
        }

        let result = await API.graphql(graphqlOperation(updateUser, { input: updatedUser }))

        setUserID(result.data.updateUser);
    };

        return (
            <View style={styles.block}>
                <View style={styles.titlebox}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Game', {gameid: id}) }}>
                        <Text style={styles.title}>
                            {name}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.iconbox}>
                        <AntDesign
                            name={isLiked ? 'heart' : 'hearto'}
                            color={isLiked ? 'red' : '#05375a'}
                            size={20}
                            onPress={onLikePress}
                        />
                    </View>
                </View>

                <View style={{marginLeft: 16, marginTop: -5, marginBottom: 6}}>
                    <Text style={{ fontFamily: 'chalkboard-regular', color: '#155843'}}>
                        {category} Game
                    </Text>
                </View>

                <View style={styles.footer}>
                    <View style={{ flexDirection: 'row'}}>
                        {teams === true ? (
                            <View style={[styles.playersbutton, {backgroundColor: 'lightblue', marginRight: 0}]}>
                                <Text style={[styles.footertext, {fontFamily: 'chalkboard-bold'}]}>
                                    T
                                </Text>
                            </View>
                        ) : null}
                        <View style={styles.playersbutton}>
                            <Text style={styles.footertext}>
                                {players} players
                            </Text>
                        </View>
                    </View>

                    {variations?.length > 0 ? (
                        <View style={styles.variationsbutton}>
                            <Text style={styles.footertext}>
                                {variations?.length} house variations
                            </Text>
                        </View>
                    ) : null }
                </View>
        </View>
        )
    }

    const renderTile = ({item, index} : any) => (
        <Tile 
            index={index}
            id={item.id}
            name={item.name}
            category={item.category}
            highlight={item.highlight}
            players={item.players}
            teams={item.teams}
            variations={item.variations}
        />
    )

    return (
        <View>
            <Animatable.View animation='bounceInDown' style={{ flexDirection: 'row', height: 90, borderBottomRightRadius: 20, borderBottomLeftRadius: 20,
                            backgroundColor: '#155843', alignItems: 'flex-end', paddingBottom: 20, paddingLeft: 20}}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Feather name='chevron-left' color='#fff' size={25}/>
                        <Text style={{fontFamily: 'chalkboard-regular', color: '#fff', fontSize: 18, marginLeft: 10 }}>
                            Favorites
                        </Text> 
                    </View>
                </TouchableWithoutFeedback>
            </Animatable.View>
            <View>
                <FlatList 
                    data={games}
                    renderItem={renderTile}
                    //keyExtractor={(item, index) => item + index}
                    style={{ backgroundColor: '#f5f5f5', paddingLeft: 0, paddingBottom: 8, paddingTop: 4, paddingRight: 0, }}
                />
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    header: {
      fontFamily: 'chalkboard-bold',
      fontSize: 21,
      marginHorizontal: 20,
      marginVertical: 0,
    },
    content: {
      marginTop: 8,
      marginHorizontal: 8,
    },
    category: {
      fontFamily: 'chalkboard-regular',
      fontSize: 12,
      color: '#000', 
      paddingHorizontal: 8,
    },
    block: {
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: '#fff',
      elevation: 1,
  },
    titlebox: {
        marginHorizontal: 16,
        marginTop: 4,
        marginBottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'chalkboard-bold',
        fontSize: 18,
    },
    iconbox: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-between',
    },
    summarybox: {
        backgroundColor: '#E9E9EA',
        marginHorizontal: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    paragraph: {
        fontFamily: 'chalkboard-regular',
        fontSize: 14,
        margin: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    playersbutton: {
        borderRadius: 4,
        backgroundColor: '#B2D9BF',
        marginHorizontal: 16,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    variationsbutton: {
        borderRadius: 4,
        backgroundColor: '#D9D1B2',
        marginHorizontal: 16,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    footertext: {
        fontFamily: 'chalkboard-regular',
        fontSize: 14,
    },
  });

export default Favorites;