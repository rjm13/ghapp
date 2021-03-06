import React, {useState, useEffect, useRef, useContext } from 'react';
import { Animated, TouchableHighlight, Text, Modal, Dimensions, SafeAreaView, View, FlatList, StyleSheet, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionsMenu from "react-native-option-menu";
import {StatusBar} from 'expo-status-bar';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getGame, listGameSections, listGames, listGameVariations } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';

import {AppContext} from '../AppContext';
import { UIImagePickerControllerQualityType } from 'expo-image-picker/build/ImagePicker.types';

const MoreIcon = ( <Feather name='more-vertical' color='#05375a' size={20}/> )
const FilterIcon = (<MaterialCommunityIcons name='filter-variant' color='#05375a' size={20} />)
const SortIcon = (<MaterialCommunityIcons name='sort' color='#05375a' size={20} />)

const HomeScreen = ({navigation} : any) => {

  const { userID } = useContext(AppContext);
  const { setUserID } = useContext(AppContext);

  const Card = ({ name, highlight, players, variations, teams, liked, id } : {name : any, highlight: any, players: any, variations: any, teams: any, liked: any, id: any}) => {

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
    console.log(result.data.updateUser)
    };

    return(
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
                        onPress={onLikePress }
                    />
                    {/* <OptionsMenu
                        customButton={MoreIcon}
                        destructiveIndex={1}
                        options={["Share", "Hide", "Favorite", "Details"]}
                        //actions={[editPost, deletePost]}
                    /> */}
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
                

                {variations.length > 0 ? (
                  <View style={styles.variationsbutton}>
                    <Text style={styles.footertext}>
                      {variations.length} house variations
                    </Text>
                  </View>
                ) : null }
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


  const [Category, setCategory] = useState('Cards');

  const [menuVisible, setMenuVisible] = useState(false);

//sort functions
  const [sortRandomstate, setSortRandom] = useState(false);
  const [sortAZstate, setSortAZ] = useState(false);
  const [sortZAstate, setSortZA] = useState(false);
  const [sortPopularstate, setSortPopular] = useState(false);
  const [sortHousestate, setSortHouse] = useState(false);
  const [sortNewstate, setSortNew] = useState(false);

  const sortRandom = () => {
    setSortRandom(true);
    setSortAZ(false);
    setSortZA(false);
    setSortPopular(false);
    setSortHouse(false);
    setSortNew(false);
    setMenuVisible(false);
  }

  const sortAZ = () => {
    setSortRandom(false);
    setSortAZ(true);
    setSortZA(false);
    setSortPopular(false);
    setSortHouse(false);
    setSortNew(false);
    setMenuVisible(false);
  }

  const sortZA = () => {
    setSortRandom(false);
    setSortAZ(false);
    setSortZA(true);
    setSortPopular(false);
    setSortHouse(false);
    setSortNew(false);
    setMenuVisible(false);
  }

  const sortPopular = () => {
    setSortRandom(false);
    setSortAZ(false);
    setSortZA(false);
    setSortPopular(true);
    setSortHouse(false);
    setSortNew(false);
    setMenuVisible(false);
  }

  const sortByHouse = () => {
    setSortRandom(false);
    setSortAZ(false);
    setSortZA(false);
    setSortPopular(false);
    setSortHouse(true);
    setSortNew(false);
    setMenuVisible(false);
  }

  const sortNew = () => {
    setSortRandom(false);
    setSortAZ(false);
    setSortZA(false);
    setSortPopular(false);
    setSortHouse(false);
    setSortNew(true);
    setMenuVisible(false);
  }

//sort and filter states
  const [filter, setFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([''])
  const [sorted, setSorted] = useState([''])

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
    if (selectedFilter.includes('1')) {setFilter2(true);  setFilter3(false); setFilter4(false); setFilter5(false); setFilter6(false); setFilter8(false); setFilter9(false);} else {setFilter2(false)}
    if (selectedFilter.includes('2')) {setFilter3(true);  setFilter2(false); setFilter4(false); setFilter5(false); setFilter6(false); setFilter8(false); setFilter9(false);} else {setFilter3(false)}
    if (selectedFilter.includes('3')) {setFilter4(true);  setFilter3(false); setFilter2(false); setFilter5(false); setFilter6(false); setFilter8(false); setFilter9(false);} else {setFilter4(false)}
    if (selectedFilter.includes('4')) {setFilter5(true);  setFilter3(false); setFilter4(false); setFilter2(false); setFilter6(false); setFilter8(false); setFilter9(false);} else {setFilter5(false)}
    if (selectedFilter.includes('5')) {setFilter6(true);  setFilter3(false); setFilter4(false); setFilter5(false); setFilter2(false); setFilter8(false); setFilter9(false);} else {setFilter6(false)}
    if (selectedFilter.includes('6')) {setFilter8(true);  setFilter3(false); setFilter4(false); setFilter5(false); setFilter6(false); setFilter2(false); setFilter9(false);} else {setFilter8(false)}
    if (selectedFilter.includes('7')) {setFilter9(true);  setFilter3(false); setFilter4(false); setFilter5(false); setFilter6(false); setFilter8(false); setFilter2(false);} else {setFilter9(false)}
    selectedFilter.includes('8') ? setFilterTeams(true) : setFilterTeams(false);
    selectedFilter.includes('9') ? setFilterFavs(true) : setFilterFavs(false);
  }, [selectedFilter])

 


  const FilterList = ['Players', '2', '3', '4', '5', '6', '8', '9+', 'With Teams']

  const HandleSelect = (index : any) => {
    if (selectedFilter.includes(index.toString())) {
      let newArray = selectedFilter.filter(item => item !== index.toString())
      setSelectedFilter(newArray);
    } else {
      // if (filterFavs === true && filterTeams === false) {
      //   setSelectedFilter([index.toString(), '8'])
      // } else if (filterFavs === false && filterTeams === true) {
      //   setSelectedFilter([index.toString(), '9'])
      // } else if (filterFavs ===true && filterTeams === true ) {
      //   setSelectedFilter([index.toString(), '8', '9'])
      // }
      if (selectedFilter.includes('8')) {
        setSelectedFilter([index.toString(), '8'])
      // if (selectedFilter.includes('9')) {
      //   setSelectedFilter([index.toString(), '9'])
      } else {
        setSelectedFilter([index.toString()])
        //setSelectedFilter(selectedFilter => [...selectedFilter, index.toString()])
      }
    }
  }

  const FilterItem = ({item, index} : any) => (
    item === 'Players' ? (
      <View style={{marginLeft: index === 0 ? 20 : 10, marginRight: index === 8 ? 20 : 0 }}>
        <Text style={{fontFamily: 'chalkboard-light', color: 'gray'}}>{item} :</Text>
      </View>
    ) : (
    <View style={{marginLeft: index === 0 ? 20 : 10, marginRight: index === 8 ? 20 : 0 }}>
        <TouchableWithoutFeedback onPress={() => HandleSelect(index)}>
          <Text style={{fontFamily: 'chalkboard-light', fontSize: 12, paddingVertical: 2, width: '100%', paddingHorizontal: 10, borderWidth: 0.4, borderRadius: 15,
            borderColor: '#000', backgroundColor: selectedFilter.includes(index.toString()) ? '#155843' : '#f5f5f5', color: selectedFilter.includes(index.toString()) ? '#fff' : '#000'}}>
            {item}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    )
    
  )

  const renderFilterItem = ({item, index} : any) => {
    return (
      <FilterItem 
        index={index}
        item = {item}
      />
    )
  }

  


  


    

  
  //const CategoryList = () => {

    const [selectedId, setSelectedId] = useState('');

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
      setCategory('Cards')
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
        variations={item.variations}
        teams={item.teams}
        liked={item.liked}
        id={item.id}
    />
  );

  const [filterdGames, setFilteredGames] = useState([])

  useEffect(() => {

    const filterMethods = [
      (item => item.category === Category),
    ]

    if (filterTeams === true) {filterMethods.push((item => item.teams === true))}
    //if (filterFavs === true) {filterMethods.push((item => item.isLiked.includes(item.isLiked)))}
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

    const sortedArray = 
      sortAZstate === true ? filteredArray.sort((a, b) => a.name.localeCompare(b.name)) : //sort A to Z
      sortZAstate === true ? filteredArray.sort((a, b) => b.name.localeCompare(a.name)) : //sort Z to A
      sortRandomstate === true ? filteredArray.sort(() => 0.5 - Math.random()) : //sort Random
      //sortPopularstate === true ? filteredArray.sort((a, b) => b.name.localeCompare(a.name)) : //sort by most popular
      sortNewstate === true ? filteredArray.sort((a, b) => (a.createdAt) - (b.createdAt)) : //sort by date created
      sortHousestate === true ? filteredArray.sort((a, b) => (a.variations.length) - (b.variations.length)) : //sort by most house variations
      filteredArray.sort((a, b) => a.name.localeCompare(b.name))
  

    setFilteredGames(sortedArray);

    // setFilteredGames(
    //   filterTeams === true ? games.filter(item => item.category === Category).filter(item => item.teams === true) :
    //   filter2 === true ? games.filter(item => item.category === Category).filter(item => item.players.includes('2'))
    //   : games.filter(item => item.category === Category))
  }, [selectedId, Category, filterTeams, filter2, filter3, filter4, filter5, filter6, filter8, filter9, sortAZstate, sortZAstate, sortNewstate, sortHousestate, sortRandomstate])
    

  return (


      <View>
        <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => {setMenuVisible(!menuVisible);}}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
        <View style={{backgroundColor: 'transparent', width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        <View style={{ elevation: 4, width: 180, height: 220, backgroundColor: '#fff', padding: 0, position: 'absolute', top: 190, right: 40}}>
          <TouchableHighlight onPress={sortAZ} underlayColor="#f5f5f5">
            <View style={{paddingVertical: 6, paddingLeft: 10}}>
              <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 15}}>Sort A - Z</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={sortZA} underlayColor="#f5f5f5">
            <View style={{paddingVertical: 6, paddingLeft: 10}}>
              <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 15}}>Sort Z - A</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={sortRandom} underlayColor="#f5f5f5">
            <View style={{paddingVertical: 6, paddingLeft: 10}}>
              <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 15}}>Randomize</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={sortNew} underlayColor="#f5f5f5">
            <View style={{paddingVertical: 6, paddingLeft: 10}}>
              <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 15}}>Sort Newest</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={sortPopular} underlayColor="#f5f5f5">
            <View style={{paddingVertical: 6, paddingLeft: 10}}>
              <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 15}}>Top</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={sortByHouse} underlayColor="#f5f5f5">
            <View style={{paddingVertical: 6, paddingLeft: 10}}>
              <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 15}}>Most Variations</Text>
            </View>
          </TouchableHighlight>
        </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>

        <View style={styles.scrollBox}>
         {/* <CategoryList /> */}
          <FlatList
            data={DATA}
            renderItem={renderItem2}
            ref={flatListRef}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{backgroundColor: '#f5f5f5', marginTop: -16, paddingTop: 16, marginHorizontal: -20, paddingHorizontal: 20}}
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
          {selectedId === '' ? (
            <View style={{margin: 20, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 166}}>
              <Text style={{textAlign: 'center', fontFamily: 'chalkboard-regular', fontSize: 16}}>
                Going to put an ad here for this initial state. Make me some moolah.
              </Text>
            </View>
          ) : (
          <FlatList
            data={filterdGames}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            stickyHeaderIndices={[0]}
            style={{backgroundColor: '#f5f5f5'}}
            ListHeaderComponent={() => (
                <View>
                  <View style={[styles.filterBox, {backgroundColor: '#f5f5f5'}]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableWithoutFeedback onPress={()=> setFilter(!filter)}>
                        <MaterialCommunityIcons name='filter-variant' color='#05375a' size={20}/>
                      </TouchableWithoutFeedback>
                      {filter === true ? (
                        <Text style={{ marginLeft: 10, fontFamily: 'chalkboard-light', color: 'gray'}}>
                          Filter
                        </Text>
                      ) : null}
                      
                    </View>
                    {/* <OptionsMenu
                      customButton={FilterIcon}
                      //buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
                      destructiveIndex={1}
                      options={["Favorites", "2 Players", "3 Players", "4 Players", "5 Players", "6 Players", "8 Players", "9+ Players", "With Teams"]}
                      actions={[HandleSelect]}
                    /> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{ marginRight: 20, fontFamily: 'chalkboard-light', color: 'gray'}}>
                          {sortZAstate === true ? 'Z to A' : 
                          sortAZstate === true ? 'A to Z' :
                          sortRandomstate === true ? 'Randomized' :
                          sortPopularstate === true ? 'Top' :
                          sortNewstate === true ? 'Most Recent' :
                          sortHousestate === true ? 'Most Variations' :
                          null}
                        </Text>

                        <View>
                          <TouchableWithoutFeedback onPress={() => setMenuVisible(!menuVisible)}>
                            <MaterialCommunityIcons name='sort' color='#05375a' size={20} />
                          </TouchableWithoutFeedback>
                        </View>

                      {/* <OptionsMenu
                        customButton={SortIcon}
                        //buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
                        destructiveIndex={1}
                        options={["Random", "A to Z", "Z to A", "Most Popular", "New", "Most Variations"]}
                        actions={[sortRandom, sortAZ, sortZA, sortPopular, sortNew, sortByHouse, ]}
                      /> */}
                    </View>
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
          )}
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
    //width: 64,
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

