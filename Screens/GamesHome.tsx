import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionsMenu from "react-native-option-menu";
import {StatusBar} from 'expo-status-bar';

// import GamesCardScroll from '../../components/GamesCardScroll';
// import ScoreBanner from '../../components/ScoreBanner';
// import GameCard from '../../components/GameCard';
import CategoryList from '../Components/CategoryList';
import GameListCardView from '../Components/GameListCardView';

const FilterIcon = (<MaterialCommunityIcons name='filter-variant' color='#05375a' size={20} />)
const SortIcon = (<MaterialCommunityIcons name='sort' color='#05375a' size={20} />)

const HomeScreen = ({navigation}) => {
  return (


      <View>

        <View style={styles.scrollBox}>
         <CategoryList />
        </View>

        <View style={styles.filterBox}>
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
        
        <View>
          <GameListCardView />
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
  },
  filterBox: {
    flexDirection: 'row',
    marginHorizontal: 32,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'chalkboard-light',
    color: '#05375a',
  },
});
