import React, { useRef, useState, useEffect } from 'react';
import { Animated, FlatList, PanResponder, View, Dimensions, StyleSheet, Text, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableOpacity, SectionList, SafeAreaView } from 'react-native';
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
          {
            title: "House Variations",
            data: [
                ]
          },
    ],

    variations: [
        {
            id: '0',
            title: 'A user submitted house rule',
            para: 'This is a house rule submitted by a user of the app. It should be able to be written in paragraphs.',
            user: 'Game Haven'
        },
        {
            id: '1',
            title: 'Another user house rule',
            para: 'This is a house rule submitted by a user of the app. It should be able to be written in paragraphs.',
            user: 'Game Haven'
        },
        {
            id: '2',
            title: 'Yet a third user house rule',
            para: 'This is a house rule submitted by a user of the app. It should be able to be written in paragraphs.',
            user: 'Game Haven'
        },
        {
            id: '3',
            title: 'Yet a third user house rule',
            para: 'This is a house rule submitted by a user of the app. It should be able to be written in paragraphs.',
            user: 'Game Haven'
        },
        {
            id: '4',
            title: 'Yet a third user house rule',
            para: 'This is a house rule submitted by a user of the app. It should be able to be written in paragraphs.',
            user: 'Game Haven'
        },
        {
            id: '5',
            title: 'Yet a third user house rule',
            para: 'This is a house rule submitted by a user of the app. It should be able to be written in paragraphs.',
            user: 'Game Haven'
        },
        {
            id: '6',
            title: 'Yet a third user house rule',
            para: 'This is a house rule submitted by a user of the app. It should be able to be written in paragraphs.',
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

const VariationItem = ({data, user, title} : {data: any, user: any, title: any}) => {
    return (
        <View style={{elevation: 6, backgroundColor: '#fff', marginHorizontal: 10, marginTop: 10}}>
            <Text style={[styles.title, {fontSize: 16, marginLeft: 10, marginTop: 4}]}>{title}</Text>                         
            <View style={[styles.databox, {marginTop: 4, backgroundColor: '#e0e0e0a5', borderRadius: 15, marginHorizontal: 16, elevation: 0}]}>
                <Text style={styles.warningtext}>
                    {data}
                </Text>
            </View> 
            <View style={[styles.footerbox, {elevation: 0}]}>
                <Text style={styles.submittedby}>Submitted by {user}</Text>
            </View>
        </View>
    )
}

const renderVariationItem = ({item} : any) => {
    return (
        <VariationItem 
            title = {item.title}
            data = {item.para}
            user = {item.user}
            
        />
    )
}


const GameScreen = ({ navigation, route } : any) => {

    const {gameid} = route.params;

    const [game, setGame] = useState({});
    const [gameSection, setGameSection] = useState([]);

    useEffect(() => {
        const fetchGame = async () => {
          const gameInfo = {id: gameid};
            if (!gameInfo) {
              return;
            }
          try {
            const response = await API.graphql(graphqlOperation(
              getGame, {id: gameid}))
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

//animation controls
    const animation = useRef(new Animated.Value(0)).current;

    const [isScrollEnabled, setIsScrollEnabled] = useState(true);

    const [scrollOffset, setScrollOffset] = useState(0);

    const animatedOpacity = animation.interpolate({
        inputRange: [100, 150],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    const animatedAppearOpacity = animation.interpolate({
        inputRange: [100, 300],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });

    const animatedHeaderHeight = animation.interpolate({
        inputRange: [0, 200],
        outputRange: [130, 0],
        extrapolate: 'clamp',
        });
    const animatedHeight = animation.interpolate({
        inputRange: [100, 150],
        outputRange: [0, 64],
        extrapolate: 'clamp',
        });
    const animatedMargin = animation.interpolate({
        inputRange: [0, 100],
        outputRange: [10, 0],
        extrapolate: 'clamp',
        });

    const animatedColor = animation.interpolate({
        inputRange: [0, 300],
        outputRange: ['#000000', '#ffffff'],
        extrapolate: 'clamp',
        });

//like the game function
    const [isLiked, setIsLiked] = useState(false);
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }
            
    };


    return (
        <SafeAreaView style={styles.container}>
            <Animatable.View animation='bounceInDown'>
                
                <Animated.View style={{ opacity: animatedOpacity, flexDirection: 'row', height: 90, borderBottomRightRadius: 20, borderBottomLeftRadius: 20,
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
                </Animated.View>
                <Animated.View style={{  justifyContent: 'center', height: animatedHeight, marginTop: -4, position: 'absolute', top: 30, width: Dimensions.get('window').width, opacity: animatedAppearOpacity, backgroundColor: '#fff', paddingVertical: 0, paddingHorizontal: 20}}>
                    <View style={styles.titlebox}>
                        <View style={styles.titleblock}>
                            <Text style={[styles.title, {fontSize: 18}]}>
                                {game.name}
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
                </Animated.View>

                
            </Animatable.View>

            
            <Animated.View style={[styles.headerbox, { marginBottom: animatedMargin, height: animatedHeaderHeight, opacity: 1}]}>
                <View style={[styles.titlebox, {marginTop: 10}]}>
                    <View style={[styles.titleblock, {marginLeft: 16}]}>
                        <Text style={[styles.title, {fontSize: 20}]}>
                            {game.name}
                        </Text> 
                        <Text style={styles.category}>
                            {game.category} Game
                        </Text> 
                    </View>
                    <View style={{alignItems: 'center', marginVertical: 8, marginRight: 16}}>
                        <AntDesign
                            name={isLiked ? 'heart' : 'hearto'}
                            color={isLiked ? 'red' : '#05375a'}
                            size={20}
                            onPress={onLikePress}
                        /> 
                    </View>
                </View>
                <View style={[styles.footer, {marginHorizontal: 16, marginBottom: 16}]}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={[styles.playersbutton, {backgroundColor: 'lightblue', marginRight: 10}]}>
                            <Text style={[styles.footertext, {fontFamily: 'chalkboard-bold'}]}>
                                T
                            </Text>
                        </View>
                        <View style={styles.playersbutton}>
                            <Text style={styles.footertext}>
                                {game.players} players
                            </Text>
                        </View>
                    </View>
                    <View style={styles.variationsbutton}>
                        <Text style={styles.footertext}>
                            {Game.variations.length} house variations
                        </Text>
                    </View>
                </View>
            </Animated.View>
            

            <Animated.SectionList
                sections={gameSection.sort((a, b) => (a.orderId) - (b.orderId))}
                keyExtractor={(item, orderId) => item + orderId}
                renderItem={({ item }) => <Item title={item} />}
                stickySectionHeadersEnabled={true}

                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: animation } } }],
                    { useNativeDriver: false }
                  )}
                scrollEventThrottle={1}
                SectionSeparatorComponent={ () => (
                    <View style={{height: 10}}>

                    </View>
                )}
                
                renderSectionHeader={({ section: { title } }) => (
                    <View style={[styles.cardbox, {backgroundColor: title === 'House Variations' ? '#f0f0f0' : '#fff',flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={[styles.title, {fontFamily: 'chalkboard-regular', fontSize: 16, marginVertical: 8, backgroundColor: title === 'House Variations' ? '#D9D1B2' : 'lightgray', paddingHorizontal: 10, borderRadius: 4}]}>{title}</Text>
                        {title === 'House Variations' ? (
                            <View style={styles.submitbutton}>
                                <Text style={[styles.footertext, {color: '#fff'}]}>
                                    Submit new
                                </Text>
                            </View>) : null}
                    </View>
                )}
                ListFooterComponent={ () => (
                    <View style={{ backgroundColor: '#f0f0f0', paddingTop: 10}}>
                        <FlatList
                            data={Game.variations}
                            keyExtractor={(item) => item + item.id}
                            renderItem={renderVariationItem}
                            // SectionSeparatorComponent={ () => (
                            //     <View style={{height: 10}}>
            
                            //     </View>
                            // )}
                            // ListHeaderComponent={ () => (
                            //     <View style={styles.flattitlebox }>
                                    
                            //     </View>
                            // )}
                            // renderSectionHeader={({ section: { title } }) => (
                            //     <View style={[styles.cardbox, {marginHorizontal: 16}]}>
                            //         <Text style={styles.title}>{title}</Text>
                            //         <TouchableOpacity style={styles.housefavbutton} >
                            //             <Feather
                            //                 name='heart'
                            //                 color='#05375a'
                            //                 size={20}
                            //             />
                            //         </TouchableOpacity>
                            //     </View>
                            // )}
                            // renderSectionFooter={() => (
                                
                            // )}
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
    //padding: 16, 
    
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
    marginLeft: -10,
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
    marginHorizontal: 0,
    marginBottom: -10,
    backgroundColor: '#fff',
    elevation: 0,
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
    marginBottom: 0,
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
    borderRadius: 15,
    backgroundColor: '#155843',
    paddingHorizontal: 14,
    paddingVertical: 2,
    marginVertical: 8
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