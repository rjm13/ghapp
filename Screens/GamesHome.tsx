import React, {useState, useEffect, useRef } from 'react';
import { Animated, Text, Dimensions, SafeAreaView, View, FlatList, StyleSheet, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionsMenu from "react-native-option-menu";
import {StatusBar} from 'expo-status-bar';

// import GamesCardScroll from '../../components/GamesCardScroll';
// import ScoreBanner from '../../components/ScoreBanner';
// import GameCard from '../../components/GameCard';
//import CategoryList from '../Components/CategoryList';
import GameListCardView from '../Components/GameListCardView';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

import { API, graphqlOperation } from 'aws-amplify';
import { getGame, listGameSections, listGames } from '../src/graphql/queries';

const MoreIcon = ( <Feather name='more-vertical' color='#05375a' size={20}/> )
const FilterIcon = (<MaterialCommunityIcons name='filter-variant' color='#05375a' size={20} />)
const SortIcon = (<MaterialCommunityIcons name='sort' color='#05375a' size={20} />)

const HomeScreen = ({navigation} : any) => {

  const Card = ({ name, highlight, players } : {name : any, highlight: any, players: any}) => {

    const [isLiked, setIsLiked] = useState(false);
    
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

  const DATA = [
    {
      id: '1',
      category: 'Classic Cards',
      tile: require('../assets/GameButtons/CardButton.png')
    },
    {
      id: '2',
      category: 'Dice',
      tile: require('../assets/GameButtons/dicegames.png')
    },
    {
      id: '3',
      category: 'Party',
      tile: require('../assets/GameButtons/partygames.png')
    },
    {
      id: '4',
      category: 'Drinking',
      tile: require('../assets/GameButtons/drinkinggames.png')
    },
    {
      id: '5',
      category: 'Casino',
      tile: require('../assets/GameButtons/casinogames.png')
    },
    {
      id: '6',
      category: 'Roadtrip',
      tile: require('../assets/GameButtons/roadtripgames.png')
    },
    {
      id: '7',
      category: 'Outdoor',
      tile: require('../assets/GameButtons/outdoorgames.png')
    },
    {
      id: '8',
      category: 'Pool',
      tile: require('../assets/GameButtons/poolgames.png')
    },
    {
      id: '9',
      category: 'Campfire',
      tile: require('../assets/GameButtons/campfiregames.png')
    },
    {
      id: '10',
      category: 'Playground',
      tile: require('../assets/GameButtons/playgroundgames.png')
    },
  ];


  const [Category, setCategory] = useState('cards');

//sort and filter states
  const [filter, setFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([''])

  const [filterFavs, setFilterFavs] = useState(false);
  const [filter2, setFilter2] = useState(false);
  const [filter3, setFilter3] = useState(false);
  const [filter4, setFilter4] = useState(false);
  const [filter5, setFilter5] = useState(false);
  const [filter6, setFilter6] = useState(false);
  const [filter8, setFilter8] = useState(false);
  const [filter9, setFilter9] = useState(false);
  const [filterTeams, setFilterTeams] = useState(false);  

  useEffect(() => {
    selectedFilter.includes('0') ? setFilterFavs(true) : setFilterFavs(false);
    selectedFilter.includes('1') ? setFilter2(true) : setFilter2(false);
    selectedFilter.includes('2') ? setFilter3(true) : setFilter3(false);
    selectedFilter.includes('3') ? setFilter4(true) : setFilter4(false);
    selectedFilter.includes('4') ? setFilter5(true) : setFilter5(false);
    selectedFilter.includes('5') ? setFilter6(true) : setFilter6(false);
    selectedFilter.includes('6') ? setFilter8(true) : setFilter8(false);
    selectedFilter.includes('7') ? setFilter9(true) : setFilter9(false);
    selectedFilter.includes('8') ? setFilterTeams(true) : setFilterTeams(false);
    console.log('filterteams is ' + filterTeams )
    console.log(selectedFilter)
  }, [selectedFilter])


  const FilterList = ['Favorites', '2 Players', '3 Players', '4 Players', '5 Players', '6 Players', '8 Players', '9+ Players', 'With Teams']

  const HandleSelect = (index : any) => {
    if (selectedFilter.includes(index.toString())) {
      let newArray = selectedFilter.filter(item => item !== index.toString())
      setSelectedFilter(newArray);
    } else {
      setSelectedFilter(selectedFilter => [...selectedFilter, index.toString()])
    }
    console.log('index is ' + index)
  }

  const FilterItem = ({item, index} : any) => (
    <View style={{marginLeft: index === 0 ? 20 : 10, marginRight: index === 8 ? 20 : 0 }}>
        <TouchableWithoutFeedback onPress={() => HandleSelect(index)}>
          <Text style={{fontFamily: 'chalkboard-light', fontSize: 12, paddingVertical: 2, width: '100%', paddingHorizontal: 10, borderWidth: 0.4, borderRadius: 15,
            borderColor: '#000', backgroundColor: selectedFilter.includes(index.toString()) ? '#155843' : '#f5f5f5', color: selectedFilter.includes(index.toString()) ? '#fff' : '#000'}}>
            {item}
          </Text>
        </TouchableWithoutFeedback>
      </View>
  );

  const renderFilterItem = ({item, index} : any) => {
    return (
      <FilterItem 
        index={index}
        item = {item}
      />
    )
  }

  const [sortAZ, setSortAZ] = useState(false);
  const [sortZA, setSortZA] = useState(false);
  const [sortPopular, setSortPopular] = useState(false);
  const [sortHouse, setSortHouse] = useState(false);
  const [sortNew, setSortNew] = useState(false);
  


    

  
  //const CategoryList = () => {

    const [selectedId, setSelectedId] = useState('1');

    useEffect(() => {
      selectedId === '1' ? setCategory('Cards') :
      selectedId === '2' ? setCategory('Dice') :
      selectedId === '3' ? setCategory('party') : 
      selectedId === '4' ? setCategory('drinking') :
      selectedId === '5' ? setCategory('casino') :
      selectedId === '6' ? setCategory('roadtrip') :
      selectedId === '7' ? setCategory('outdoor') :
      selectedId === '8' ? setCategory('Pool') :
      selectedId === '9' ? setCategory('campfire') :
      selectedId === '10' ? setCategory('playground') :
      setCategory('cards')
    }, [selectedId])

    const Item2 = ({ category, tile, onPress, style } : {category: any, tile: any, onPress: any, style: any}) => (

      <TouchableWithoutFeedback 
        onPress={onPress}
      >
        <View style={styles.content}>
          <ImageBackground source={tile} style={[styles.imageContent, style]}>
              <Text style={styles.category} >{category}</Text>
            </ImageBackground>
        </View>
            
      </TouchableWithoutFeedback>
      
    );

    const renderItem2 = ({ item, index } : {item: any, index: any}) => {
      const opacity = item.id === selectedId ? 1 : 0.4;
      
      return (
        <Item2
          category={item.category} 
          tile={item.tile}
          onPress={() => {ScrollToThisThing(index, item); }}
          style={{ opacity }}
        />
      );
    };

    const flatListRef = useRef();

    function ScrollToThisThing (index: any, item: any) {
      setSelectedId(item.id);
      flatListRef.current.scrollToItem({ item: item, animated: true, viewPosition: 0.5 });
    };
  

  const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await API.graphql(graphqlOperation(listGames, {
                  // filter: {
                  //     category: {
                  //         eq: Category
                  //     },
                  // }
              } ))
                setGames(response.data.listGames.items);
            } catch (e) {

            }
        };

        fetchGames();
    }, []);

  const renderItem = ({ item }: any) => (
    <Card 
        name={item.name} 
        highlight={item.highlight} 
        players={item.players} 
    />
  );

  const [filterdGames, setFilteredGames] = useState([])

  useEffect(() => {

    const filterMethods = [
      (item => item.category === Category),
    ]

    if (filterTeams === true) {filterMethods.push((item => item.teams === true))}
    if (filter2 === true) {filterMethods.push((item => item.players.includes('2')))}
    if (filter3 === true) {filterMethods.push((item => item.players.includes('3')))}
    if (filter4 === true) {filterMethods.push((item => item.players.includes('4')))}
    if (filter5 === true) {filterMethods.push((item => item.players.includes('5')))}
    if (filter6 === true) {filterMethods.push((item => item.players.includes('6')))}
    if (filter8 === true) {filterMethods.push((item => item.players.includes('8')))}
    if (filter9 === true) {filterMethods.push((item => item.players.includes('9')))}
    
    const filteredArray = games.filter((item) => {
      for (let i = 0; i < filterMethods.length; i++) {
        if (!filterMethods[i](item)) {
          return false
        }
      }
      return true
    })
    setFilteredGames(filteredArray);

    // setFilteredGames(
    //   filterTeams === true ? games.filter(item => item.category === Category).filter(item => item.teams === true) :
    //   filter2 === true ? games.filter(item => item.category === Category).filter(item => item.players.includes('2'))
    //   : games.filter(item => item.category === Category))
  }, [Category, filterTeams, filter2, filter3, filter4, filter5, filter6, filter8, filter9])
    

  return (


      <View>

        <View style={styles.scrollBox}>
         {/* <CategoryList /> */}
          <FlatList
            data={DATA}
            renderItem={renderItem2}
            ref={flatListRef}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            getItemLayout={(item, index) => { return {length: 166, index: index, offset: 166 * index} }}

          />
        </View>

        {/* <View style={styles.filterBox}>
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
        </View> */}
        
        
        <View style={{height: Dimensions.get('window').height - 166}}>
          <FlatList
            data={filterdGames}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            stickyHeaderIndices={[0]}
            style={{backgroundColor: '#f5f5f5'}}
            ListHeaderComponent={() => (
                <View>
                  <View style={[styles.filterBox, {backgroundColor: '#f5f5f5'}]}>
                    <TouchableWithoutFeedback onPress={()=> setFilter(!filter)}>
                      <MaterialCommunityIcons name='filter-variant' color='#05375a' size={20}/>
                    </TouchableWithoutFeedback>
                    {/* <OptionsMenu
                      customButton={FilterIcon}
                      //buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
                      destructiveIndex={1}
                      options={["Favorites", "2 Players", "3 Players", "4 Players", "5 Players", "6 Players", "8 Players", "9+ Players", "With Teams"]}
                      actions={[HandleSelect]}
                    /> */}
                    <OptionsMenu
                      customButton={SortIcon}
                      //buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
                      destructiveIndex={1}
                      options={["A to Z", "Z to A", "Number of Players", "Most Popular"]}
                      
                      //actions={[editPost, deletePost]}
                    />
                  </View>
                  {filter === true ? (
                    <View >
                      <FlatList 
                        data={FilterList}
                        renderItem={renderFilterItem}
                        keyExtractor={(item, index) => item + index}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{ backgroundColor: '#f5f5f5', paddingLeft: 0, paddingBottom: 8, paddingTop: 4, paddingRight: 0, }}
                      />
                    </View>
                  ) : null}
                </View>
            )}
          />
        </View>


        <StatusBar style="light" backgroundColor ='#155843' />
      </View>
 
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    fontFamily: 'chalkboard-bold',
    fontSize: 21,
    marginHorizontal: 20,
    marginVertical: 4,
  },
  scrollBox: {
    marginVertical: 8,
    paddingHorizontal: 32,
    marginHorizontal: -16
  },
  filterBox: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'chalkboard-light',
    color: '#05375a',
  },
  container: {
    marginHorizontal: 16,
    //marginVertical: 16,
    //flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
  content: {
    //flex: 1,
    marginTop: 8,
    marginHorizontal: 8,
  },
  imageContent: {
    width: 150,
    height: 88,
    borderRadius: 8,
    opacity: 1
    
  },
  category: {
    fontFamily: 'chalkboard-regular',
    fontSize: 12,
    color: '#000', 
    paddingHorizontal: 8,
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

