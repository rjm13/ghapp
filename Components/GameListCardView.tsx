import React, {useEffect, useState} from 'react';
import { Dimensions, SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OptionsMenu from "react-native-option-menu";

import { API, graphqlOperation } from 'aws-amplify';
import { listGames } from '../src/graphql/queries';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const MoreIcon = ( <Feather name='more-vertical' color='#05375a' size={20}/> )
const FilterIcon = (<MaterialCommunityIcons name='filter-variant' color='#05375a' size={20} />)
const SortIcon = (<MaterialCommunityIcons name='sort' color='#05375a' size={20} />)


const Card = ({ name, highlight, players } : {name : any, highlight: any, players: any}) => {

    const [isLiked, setIsLiked] = useState(false);

    const navigation = useNavigation();
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }
            
    };

    return(
        <View style={styles.block}>

            <View style={styles.titlebox}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Game') }}>
                    <Text style={styles.title}>
                        {name}
                    </Text>
                </TouchableOpacity>
                <View style={styles.iconbox}>
                    <AntDesign
                        name={isLiked ? 'heart' : 'hearto'}
                        color={isLiked ? 'red' : '#05375a'}
                        size={20}
                        onPress={onLikePress }
                    />
                    <OptionsMenu
                        customButton={MoreIcon}
                        //buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
                        destructiveIndex={1}
                        options={["Share", "Hide", "Favorite", "Details"]}
                        
                        //actions={[editPost, deletePost]}
                    />
                    {/* <TouchableOpacity>
                        <Feather
                            name='more-vertical'
                            color='#05375a'
                            size={20}
                        />
                    </TouchableOpacity> */}
                </View>
            </View>

            <View style={styles.summarybox}>
                <Text style={styles.paragraph}>
                    {highlight}
                </Text>
            </View>

            <View style={styles.footer}>

                <View style={styles.playersbutton}>
                    <Text style={styles.footertext}>
                        {players} players
                    </Text>
                </View>

                <View style={styles.variationsbutton}>
                    <Text style={styles.footertext}>
                        0 house variations
                    </Text>
                </View>

            </View>

        </View>
    );
}

const GameListCardView = ({category} : any) => {

    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await API.graphql(graphqlOperation(listGames))
                setGames(response.data.listGames.items);
            } catch (e) {

            }
        };

        fetchGames();
    }, []);

  const renderItem = ({ item }) => (
    <Card 
        name={item.name} 
        highlight={item.highlight} 
        players={item.players} 
    />
  );

  return (
    <SafeAreaView style={{height: Dimensions.get('window').height - 166}}>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        stickyHeaderIndices={[0]}
        style={{
            //height: Dimensions.get('window').height - 130,
            backgroundColor: '#f5f5f5'

        }}
        ListHeaderComponent={() => (
            <View style={[styles.filterBox, {backgroundColor: '#f5f5f5'}]}>
          <OptionsMenu
            customButton={FilterIcon}
            //buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
            destructiveIndex={1}
            options={["NSFW", "Favorites", "By Number of Players"]}
            
            //actions={[editPost, deletePost]}
          />
          <OptionsMenu
            customButton={SortIcon}
            //buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
            destructiveIndex={1}
            options={["A to Z", "Z to A", "Number of Players", "Most Popular"]}
            
            //actions={[editPost, deletePost]}
          />
        </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
  container: {
    height: Dimensions.get('window').height - 166
  },
  block: {
    //justifyContent: 'center',
    //borderWidth: .5,
    marginHorizontal: 16,
    marginVertical: 8,
    //borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 1,
},
filterBox: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
titlebox: {
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
},
title: {
    fontFamily: 'chalkboard-bold',
    fontSize: 18,
},
iconbox: {
    flexDirection: 'row',
    //backgroundColor: 'green',
    marginVertical: 8,
    justifyContent: 'space-between',
    width: 64,
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

export default GameListCardView;
