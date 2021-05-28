import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const SCREEN_WIDTH = Dimensions.get('window').width

const HeaderRow = () => {
    return (
        <View style={{flexDirection: 'row', height: 50}}>
                <View style={{backgroundColor: 'blue', width: 80}}>

                </View>

                <View style={styles.headerbox}>
                    <Text style={styles.header}>
                        Team 1
                    </Text>
                </View>
                <View style={styles.headerbox}>
                    <Text style={styles.header}>
                        Team 2
                    </Text>
                </View>
                <View style={styles.headerbox}>
                    <Text style={styles.header}>
                        Team 3
                    </Text>
                </View>
                <View style={styles.headerbox}>
                    <Text style={styles.header}>
                        Team 4
                    </Text>
                </View>
        </View>
    );
}

const ScoreRow = () => {
    return (
        <View style={{flexDirection: 'row', height: 50}}>
            <View style={{backgroundColor: 'blue', width: 80}}>

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

    const handleVertScroll = (event) => {
      
    	scrollRef.current?.scrollTo({
          //y: (200),
          y: (event.nativeEvent.contentOffset.y),
          animated: true,
        })
    }

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
                            
                            
                       >
                           <View style={{}}>
                                <HeaderRow />
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

               <ScrollView 
                    style={{width: 80, height: '100%', position: 'absolute', top: 0, left: 0, }}
                    stickyHeaderIndices={[0]}
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
                </ScrollView>
                
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
        alignItems: 'center'
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
        
    },
});

export default Scorecard;
