import React, {useState} from 'react';
import {View, ScrollView, Text, StyleSheet } from 'react-native';
import { Chip, Title, Searchbar } from 'react-native-paper';


export default function SearchScreen () {

    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
    
   <View>
       <View style={styles.searchblock}>
            <Searchbar
                placeholder="Games, players"
                onChangeText={onChangeSearch}
                value={searchQuery}
                iconColor='#155843'
                style={styles.search}
                inputStyle={styles.searchtext}
            />
       </View>

        <ScrollView>
            <View style={ styles.block }>
                <Title style={ styles.title }>Suggestions</Title>
            </View>
            <View style={ styles.chips }>

                <Chip
                    textStyle={{  
                        fontFamily: 'chalkboard-light',
                        fontSize: 16,
                    }}
                    style={ styles.chip }
                >
                    Sharks and Minnows
                </Chip>

                <Chip
                    textStyle={{  
                        fontFamily: 'chalkboard-light',
                        fontSize: 16,
                    }}
                    style={ styles.chip }
                >
                    Canasta
                </Chip>

                <Chip
                    textStyle={{  
                        fontFamily: 'chalkboard-light',
                        fontSize: 16,
                    }}
                    style={ styles.chip }
                >
                    Cards Against Humanity
                </Chip>

            </View>
        </ScrollView>
    </View> 
    );
}



const styles = StyleSheet.create({
    searchblock: {
        margin: 16,
        justifyContent: 'center'
    },
    block: {
      //flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      //paddingTop: 16,
      marginLeft: 32,

    },
    title: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        //color: '#155843',
        fontFamily: 'chalkboard-bold',
        letterSpacing: 1,
        fontSize: 18,
        
    },
    chips: {
        marginHorizontal: 32,
        flexDirection: 'row',
        flexWrap: 'wrap',
        
    },
    chip: {
        //padding: 4,
        alignItems: 'center',
        margin: 10,
    },
    search: {
        //width: '90%',
        height: 40,
        margin: 5,
        borderRadius: 8,
        backgroundColor: '#fff',
      },
      searchtext: {
        fontFamily: 'chalkboard-light',
        fontSize: 16,
      },
})