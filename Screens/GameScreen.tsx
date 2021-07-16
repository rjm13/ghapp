import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableOpacity, SectionList, SafeAreaView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';

import { API, graphqlOperation } from 'aws-amplify';
import { getGame, listGameSections, listGames } from '../src/graphql/queries';

import Constants from "expo-constants";

const Game = {
        
    id: '1',
    name: 'The Name of the Game',
    category: 'Pool',
    players: '4',

    highlight: 'The name of the game is Game Haven. My first app, but not my last. The best belly flop wins, no exceptions',

    sections: [
        {
            title: "You should know...",
            data: ['This game requires a pool.',
                    'This game is played with teams of 2.']
        },
        {
            title: "Objective",
            data: ['The objective of the game is to win', 'The second objective is not to lose']
        },
        {
            title: "Rules",
            data: ['The first rule of Game Haven is there are no rules', 
                    'The second rule is to run around in circles 8 times around a bat and then try to catch the pig.',
                    'Simon says to rub your belly, touch your toes, pat your head, and jump up and down all at the same time.'
                ]
          },
          {
            title: "Game Play",
            data: ['The first player spins the bottle. Whoever the bottle is facing when it stops spinng gets punched in the face by the spinner.',
                    'The second player goes in the closet while everyone else hangs out awkwardly'
                ]
          },
    ],

    variations: [
        {
            title: 'A user submitted house rule',
            data: ['This is a house rule submitted by a user of the app. It should be able to be written in paragraphs.'],
            user: 'Game Haven'
        },
        {
            title: 'Another user house rule',
            data: ['This is a house rule submitted by a user of the app. It should be able to be written in paragraphs.'],
            user: 'Game Haven'
        },
        {
            title: 'Yet a third user house rule',
            data: ['This is a house rule submitted by a user of the app. It should be able to be written in paragraphs.'],
            user: 'Game Haven'
        },
    ],
};


const Item = ({ title } : any) => (

    <View style={styles.databox}>
            <Text style={styles.warningtext}>
                {title}
            </Text>
    </View>
);


const GameScreen = ({ navigation } : any) => {

    const [isLiked, setIsLiked] = useState(false);
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }
            
    };

    const [game, setGame] = useState({});
    const [gameSection, setGameSection] = useState([]);

    useEffect(() => {
        const fetchGame = async () => {
          const gameInfo = {id: '0e2cb273-b535-4cf7-ab16-198c44a4991c'};
            if (!gameInfo) {
              return;
            }
          try {
            const response = await API.graphql(graphqlOperation(
              getGame, {id: gameInfo.id}))
              if (response) {
                setGame(response.data.getGame);
                setGameSection(response.data.getGame.sections.items)
                console.log(response.data.getGame);
              }
          } catch (e) {
            console.log(e);
          }
        }
        fetchGame();
      }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Animatable.View animation='bounceInDown' style={{ flexDirection: 'row', height: 90, borderBottomRightRadius: 20, borderBottomLeftRadius: 20,
                            justifyContent: 'space-between', backgroundColor: '#155843', alignItems: 'flex-end', paddingBottom: 20, paddingHorizontal: 20}}>
                
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Feather name='chevron-left' color='#fff' size={25}/>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{flexDirection: 'row'}}>
                    <FontAwesome5 name='search' color='#fff' size={18} style={{marginRight: 30}}/>
                    <FontAwesome5 name='share' color='#fff' size={20}/>
                </View>
                
            </Animatable.View>

            <View style={styles.headerbox}>
                <View style={styles.titlebox}>

                    <View style={styles.titleblock}>
                        <Text style={styles.title}>
                            {Game.name}
                        </Text> 
                        <Text style={styles.category}>
                            {Game.category} Game
                        </Text> 
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 8}}>
                        <AntDesign
                            name={isLiked ? 'heart' : 'hearto'}
                            color={isLiked ? 'red' : '#05375a'}
                            size={20}
                            onPress={onLikePress}
                        />
                        
                    </View>

                </View>

                <View style={styles.footer}>

                        <View style={{flexDirection: 'row'}}>
                            <View style={[styles.playersbutton, {backgroundColor: 'lightblue', marginRight: 10}]}>
                                <Text style={[styles.footertext, {fontFamily: 'chalkboard-bold'}]}>
                                    T
                                </Text>
                            </View>
                            <View style={styles.playersbutton}>
                                <Text style={styles.footertext}>
                                    {Game.players} players
                                </Text>
                            </View>
                        </View>
                        

                        <View style={styles.variationsbutton}>
                            <Text style={styles.footertext}>
                                {Game.variations.length} house variations
                            </Text>
                        </View>
                </View>
            </View>

        
            <SectionList
                sections={Game.sections}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.cardbox}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                )}
                ListFooterComponent={ () => (
                    <View>
                        <SectionList
                            sections={Game.variations}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }) => 
                                <View style={styles.databox}>
                                    <Text style={styles.warningtext}>
                                        {item}
                                    </Text>
                                </View> }
                            ListHeaderComponent={ () => (
                                <View style={styles.flattitlebox }>
                                    <Text style={styles.title}>
                                        House Variations
                                    </Text>

                                    <View style={styles.submitbutton}>
                                        <Text style={styles.footertext}>
                                            Submit new
                                        </Text>
                                    </View>
                                </View>
                            )}
                            renderSectionHeader={({ section: { title } }) => (
                                <View style={styles.cardbox}>
                                    <Text style={styles.title}>{title}</Text>
                                    <TouchableOpacity style={styles.housefavbutton} >
                                        <Feather
                                            name='heart'
                                            color='#05375a'
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                            renderSectionFooter={() => (
                                <View style={styles.footerbox}>
                                    <Text style={styles.submittedby}>Submitted by Game Haven</Text>
                                </View>
                            )}
                            ListFooterComponent={ () => (
                                <TouchableOpacity 
                                    style={styles.bottombuttonbox}
                                    onPress={() => navigation.goBack()}
                                    >
                                    <Text style={styles.warningtext}>
                                        Go Back
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            />

            <StatusBar style='light' backgroundColor="#155843"/>
        </SafeAreaView>
)
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    //flex: 1,
    //  `marginTop: Constants.statusBarHeight,
  },
  headerbox: {
    backgroundColor: '#fff',
    //height: 100,
    elevation: 1,
    padding: 16, 
    
},
titlebox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
  title: {
    fontFamily: 'chalkboard-bold',
    fontSize: 18,
  },
  titleblock: {

},
submittedby: {
    fontFamily: 'chalkboard-regular',
    color: '#155843',
    fontSize: 14,
  },
iconbox: {
    flexDirection: 'row',
    //backgroundColor: 'green',
    marginVertical: 8,
    justifyContent: 'space-between',
    width: 64,
},
category: {
    fontFamily: 'chalkboard-light',
    fontSize: 14,
    color: '#155843',
},
footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8
},
playersbutton: {
    borderRadius: 4,
    backgroundColor: '#B2D9BF',
    paddingHorizontal: 8,
    paddingVertical: 2,
},
variationsbutton: {
    borderRadius: 4,
    backgroundColor: '#D9D1B2',
    paddingHorizontal: 8,
    paddingVertical: 2,
},
footertext: {
    fontFamily: 'chalkboard-regular',
    fontSize: 14,
},
//   titlebox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
  cardbox: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    elevation: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerbox: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    elevation: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  databox: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    elevation: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
    warningtext: {
        fontFamily: 'chalkboard-regular',
        fontSize: 14,
  },
  flattitlebox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
},
submitbutton: {
    borderRadius: 4,
    backgroundColor: '#D9D1B2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 8,
},
housefavbutton: {
    marginVertical: 8,
},
bottombuttonbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
},
});

export default GameScreen;