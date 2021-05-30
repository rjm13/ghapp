import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Animated, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const SCREEN_WIDTH = Dimensions.get('window').width

const ScorecardData = 
    {
        id: 1,
        name: 'Custom 1',
        team: [
            {
                id: 1,
                name: 'R & M',
                playerID: [1, 2],
                score: [
                    {
                        round: 1,
                        score: 200
                    },
                    {
                        round: 2,
                        score: 150
                    },
                    {
                        round: 3,
                        score: 150
                    },
                    {
                        round: 4,
                        score: 150
                    },
                    {
                        round: 5,
                        score: 150
                    },
                    {
                        round: 6,
                        score: 150
                    },
                    {
                        round: 7,
                        score: 150
                    },
                    {
                        round: 8,
                        score: 150
                    },
                    {
                        round: 9,
                        score: 150
                    },
                    {
                        round: 10,
                        score: 150
                    },
                    {
                        round: 11,
                        score: 150
                    },
                    {
                        round: 12,
                        score: 150
                    },
                    {
                        round: 13,
                        score: 150
                    },
                    {
                        round: 14,
                        score: 150
                    },
                    {
                        round: 15,
                        score: 150
                    },
                    {
                        round: 16,
                        score: 150
                    },
                ],

            },
            {
                id: 2,
                name: 'T & L',
                playerID: [3, 4],
                score: [
                    {
                        round: 1,
                        score: 200
                    },
                    {
                        round: 2,
                        score: 150
                    },
                    {
                        round: 3,
                        score: 150
                    },
                    {
                        round: 4,
                        score: 150
                    },
                    {
                        round: 5,
                        score: 150
                    },
                    {
                        round: 6,
                        score: 150
                    },
                    {
                        round: 7,
                        score: 150
                    },
                    {
                        round: 8,
                        score: 150
                    },
                    {
                        round: 9,
                        score: 150
                    },
                    {
                        round: 10,
                        score: 150
                    },
                    {
                        round: 11,
                        score: 150
                    },
                    {
                        round: 12,
                        score: 150
                    },
                    {
                        round: 13,
                        score: 150
                    },
                    {
                        round: 14,
                        score: 150
                    },
                    {
                        round: 15,
                        score: 150
                    },
                    {
                        round: 16,
                        score: 150
                    },
                ],

            },
            {
                id: 3,
                name: 'M & P',
                playerID: [5, 6],
                score: [
                    {
                        round: 1,
                        score: 200
                    },
                    {
                        round: 2,
                        score: 150
                    },
                    {
                        round: 3,
                        score: 150
                    },
                    {
                        round: 4,
                        score: 150
                    },
                    {
                        round: 5,
                        score: 150
                    },
                    {
                        round: 6,
                        score: 150
                    },
                    {
                        round: 7,
                        score: 150
                    },
                    {
                        round: 8,
                        score: 150
                    },
                    {
                        round: 9,
                        score: 150
                    },
                    {
                        round: 10,
                        score: 150
                    },
                    {
                        round: 11,
                        score: 150
                    },
                    {
                        round: 12,
                        score: 150
                    },
                    {
                        round: 13,
                        score: 150
                    },
                    {
                        round: 14,
                        score: 150
                    },
                    {
                        round: 15,
                        score: 150
                    },
                    {
                        round: 16,
                        score: 150
                    },
                ],

            },
            {
                id: 4,
                name: 'D & J',
                playerID: [7, 8],
                score: [
                    {
                        round: 1,
                        score: 200
                    },
                    {
                        round: 2,
                        score: 150
                    },
                    {
                        round: 3,
                        score: 150
                    },
                    {
                        round: 4,
                        score: 150
                    },
                    {
                        round: 5,
                        score: 150
                    },
                    {
                        round: 6,
                        score: 150
                    },
                    {
                        round: 7,
                        score: 150
                    },
                    {
                        round: 8,
                        score: 150
                    },
                    {
                        round: 9,
                        score: 150
                    },
                    {
                        round: 10,
                        score: 150
                    },
                    {
                        round: 11,
                        score: 150
                    },
                    {
                        round: 12,
                        score: 150
                    },
                    {
                        round: 13,
                        score: 150
                    },
                    {
                        round: 14,
                        score: 150
                    },
                    {
                        round: 15,
                        score: 150
                    },
                    {
                        round: 16,
                        score: 150
                    },
                ],

            },
        ]

        
    }


const Footer = () => {
    return (
        <View style={{ height: 50, backgroundColor: '#fff', flexDirection: 'row'}}>
            
            <View style={{ width: 80}}>
            </View>

            <View style={{ width: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.score}>
                    1050
                </Text>
            </View>
            <View style={{ width: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.score}>
                    100
                </Text>
            </View>
            <View style={{ width: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.score}>
                    10500
                </Text>
            </View>
            <View style={{ width: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.score}>
                    2050
                </Text>
            </View>
        </View>
    );
}

const HeaderRow = ({id, name}) => {
    return (
        <View style={{flexDirection: 'column', height: 50, backgroundColor: '#fff'}}>

                <View style={styles.headerbox}>
                    <Text style={styles.header}>
                        {name}
                    </Text>
                </View>
                
        </View>
    );
}

const ScoreRow = () => {
    return (
        <View style={{flexDirection: 'row', height: 50}}>
            <View style={{backgroundColor: '#155843', width: 80}}>

            </View>
            <View style={styles.scorebox}>
                <Text style={styles.score}>
                    100
                </Text>
            </View>
            <View style={styles.scorebox}>
                <Text style={styles.score}>
                    550
                </Text>
            </View>
            <View style={styles.scorebox}>
                <Text style={styles.score}>
                    1050
                </Text>
            </View>
            <View style={styles.scorebox}>
                <Text style={styles.score}>
                    1225
                </Text>
            </View>

    </View>
    );
}


const Scorecard = () => {

    const scrollRef = useRef();

    const horzScrollRef = useRef();

    const horzScrollRef2 = useRef();

    const handleVertScroll = (event) => {
      
    	scrollRef.current?.scrollTo({
          //y: (200),
          y: (event.nativeEvent.contentOffset.y),
          animated: true,
        })
    }

    const handleHorzScroll = (event) => {
      
    	horzScrollRef.current?.scrollTo({
          //y: (200),
          x: (event.nativeEvent.contentOffset.x),
          animated: true,
        })

        horzScrollRef2.current?.scrollToOffset({
            //y: (200),
            offset: (event.nativeEvent.contentOffset.x),
            animated: true,
          })
    }

    const renderItem = ({ item }) => {
        
        return (
          <HeaderRow
            id={item.id} 
            name={item.name}
          />
        );
      };

    return (
        <View>
 {/* Header            */}
            <View style={{ width: SCREEN_WIDTH, height: 80, justifyContent: 'space-between', backgroundColor: '#155843', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{marginTop: 20, marginHorizontal: 20}}>
                    <Feather 
                        name='chevron-down'
                        size={30}
                        color='#fff'
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 18, fontFamily: 'chalkboard-regular', color: '#fff'}}>
                        Custom Scorecard
                    </Text>
                </View>
                <View style={{marginTop: 20, marginHorizontal: 20}}>
                    <Feather 
                        name='settings'
                        size={20}
                        color='#fff'
                    />
                </View>
            </View>

            <View style={{}}>

                
              
               <ScrollView 
                    style={{height: '89%', width: '100%'}}
                    stickyHeaderIndices={[]}
                    ref={scrollRef}
                    scrollEnabled={false}
                    
                    
                    
                >
                       <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{ flexDirection: 'column', backgroundColor: '#fff', height: '100%'}}
                            contentContainerStyle={{width: 480}}
                            stickyHeaderIndices={[]}
                            nestedScrollEnabled={true}
                            onScroll = {(event)=>{{
                                handleHorzScroll(event);}}}//Vertical scrolling distance 
                  
                            scrollEventThrottle={16}
                       >
                           <View style={{}}>
                                <View style={{height: 50}}>

                                </View>
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />
                                <ScoreRow />

                                
                           </View>
                       </ScrollView>
               </ScrollView>

                {/* <ScrollView 
                    horizontal={true}
                    style={{position: 'absolute', top: 0}}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{width: 480}}
                    ref={horzScrollRef2}
                    scrollEnabled={false}
                >
                        <HeaderRow />
                </ScrollView> */}
               
               
                    <FlatList 
                        data={ScorecardData.team}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        
                        style={{position: 'absolute', top: 0, marginLeft: 80}}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{width: 400}}
                        ref={horzScrollRef2}
                        scrollEnabled={true}
                        
                    />
                



                <ScrollView 
                    style={{ position: 'absolute', bottom: 0}} 
                    horizontal={true}
                    contentContainerStyle={{width: 480}}
                    showsHorizontalScrollIndicator={false}
                    ref={horzScrollRef}
                    scrollEnabled={false}
                >
                <Footer />
            </ScrollView>
               

               <ScrollView 
                    style={{width: 80, height: '100%', position: 'absolute', top: 0, left: 0, }}
                    stickyHeaderIndices={[0, 16]}
                    showsVerticalScrollIndicator={false}
                    onScroll = {(event)=>{{
                               handleVertScroll(event);}}}//Vertical scrolling distance 
                 
                    scrollEventThrottle={16}
               >
                    <View style={styles.roundbox}>
                        <Text style={styles.header}>
                            Round
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            1
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            2
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            3
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            4
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            5
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            6
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            7
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            8
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            9
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            10
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            11
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            12
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            13
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            14
                        </Text>
                    </View>
                    <View style={styles.roundbox}>
                        <Text style={styles.round}>
                            15
                        </Text>
                    </View>
                    <View style={[styles.roundbox]}>
                        
                    </View>
                    
                </ScrollView>
                
            </View>

            <View style={[styles.roundbox, { position: 'absolute', bottom: 0, left: 0}]}>
                        
            </View>
            
            
               
            
            
     
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        paddingVertical: 10
    },
    headerbox: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    round: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    score: {
        fontSize: 20,
        color: '#000',
        fontFamily: 'chalkboard-regular',
    },
    roundbox: {
        paddingVertical: 0, 
        width: 80, 
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center', 
        borderRightWidth: 0.3,
        
        justifyContent: 'center',
        
    },
    scorebox: {
        paddingVertical: 0, 
        width: 100, 
        alignItems: 'center', 
        borderRightWidth: 0.3,
        borderBottomWidth: 0.2,
        justifyContent: 'center',
        borderColor: '#cccccc',
        
    },
});

export default Scorecard;
