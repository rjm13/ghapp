import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight,  ScrollView, Dimensions } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MatericalCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ActiveGames from '../Components/ActiveGames';
import GamesStatsList from '../Components/GameStatsList';

const SCREEN_WIDTH = Dimensions.get('window').width

const ScorecardMenu = ({navigation}) => {
    return(
        <View>
            <View style={{marginTop: 20, marginHorizontal: 20}}>
                <Text style={styles.header}>
                    New Scorecard
                </Text>
            </View>
            <View style={{flexDirection: 'row', margin: 20, width: SCREEN_WIDTH, justifyContent: 'space-around', alignSelf: 'center'}}>
                <View style={{ alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Scorecard', {cardID: 'new'})}>
                        <View style={styles.quickbutton}>
                                <Ionicons 
                                    name='md-add-circle'
                                    size={40}
                                    color='#D9D1B2'
                                />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.quickbuttontext}>
                        New
                    </Text>
                </View>

                <View style={{ alignItems: 'center'}}>
                    <View style={styles.quickbutton}>
                            <MatericalCommunityIcons 
                                name='robot'
                                size={36}
                                color='#B2D9BF'
                            />
                    </View>
                    <Text style={styles.quickbuttontext}>
                        Preset
                    </Text>
                </View>

                <View style={{ alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('SavedScores')}>
                        <View style={styles.quickbutton}>
                                <Ionicons 
                                    name='save'
                                    size={36}
                                    color='#B2D9BF'
                                />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.quickbuttontext}>
                        Saved
                    </Text>
                </View>
            </View>

            <View>
                <View style={{margin: 20}}>
                    <Text style={styles.header}>
                        Active Games
                    </Text>
                </View>
                <View>
                    <ActiveGames />
                </View>
            </View>

            <View>
                <View style={{margin: 20}}>
                    <Text style={styles.header}>
                        Game Stats
                    </Text>
                </View>
                <View>
                    <GamesStatsList />
                </View>
            </View>




        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    quickbutton: {
        height: 80, 
        width: 80, 
        backgroundColor: '#ffffff', 
        borderRadius: 40, alignItems: 'center', 
        justifyContent: 'center',
        elevation: 2,
    },
    quickbuttontext: {
        marginTop: 5,
        fontSize: 17,
        fontFamily: 'chalkboard-regular'
    },
  });

export default ScorecardMenu;