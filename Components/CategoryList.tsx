import React, {useState, useEffect, useRef} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';


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
  
  const Item = ({ category, tile, onPress, style }) => (

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
  
  const CategoryList = () => {

    const [selectedId, setSelectedId] = useState('1');

    useEffect(() => {
      
    }, [selectedId])

    const renderItem = ({ item, index }) => {
      const opacity = item.id === selectedId ? 1 : 0.4;
      
      return (
        <Item
          category={item.category} 
          tile={item.tile}
          onPress={() => ScrollToThisThing(index, item)}
          style={{ opacity }}
        />
      );
    };

    const flatListRef = useRef(null);

    function ScrollToThisThing (index, item) {
      setSelectedId(item.id)
      flatListRef.current.scrollToItem({ item: item, animated: true, viewPosition: 0.5 })

    };
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          ref={flatListRef}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(item, index) => { return {length: 166, index: index, offset: 166 * index} }}

        />
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
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
  });
  
  export default CategoryList;
