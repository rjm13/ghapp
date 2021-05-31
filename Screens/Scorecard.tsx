import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Animated, FlatList, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const SCREEN_WIDTH = Dimensions.get('window').width







const Footer = ({total}) => {
    return (
        <View style={{ height: 50, backgroundColor: '#fff', flexDirection: 'row'}}>
            
           

            <View style={{ width: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[styles.score, {fontFamily: 'chalkboard-bold'}]}>
                    {total}
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

const ScoreRow = ({score}) => {
    return (
        <View style={{flexDirection: 'row', height: 50}}>
            <View style={{backgroundColor: '#155843', width: 80}}>

            </View>
            <View style={styles.scorebox}>
                <Text style={styles.score}>
                    {score}
                </Text>
            </View>
            <View style={styles.scorebox}>
                <Text style={styles.score}>
                    {score}
                </Text>
            </View>
            <View style={styles.scorebox}>
                <Text style={styles.score}>
                    {score}
                </Text>
            </View>
            <View style={styles.scorebox}>
                <Text style={styles.score}>
                    {score}
                </Text>
            </View>

    </View>
    );
}


const Scorecard = () => {

    const [Totals, setTotals] = useState([0, 0, 0, 0]);

    const [Scores, setScores] = useState(
        [
            {
                id: 1,
                score: 200
            },
            {
                id: 2,
                score: 150
            },
            {
                id: 3,
                score: 150
            },
            {
                id: 4,
                score: 150
            },
            {
                id: 5,
                score: 150
            },
            {
                id: 6,
                score: 150
            },
            {
                id: 7,
                score: 150
            },
            {
                id: 8,
                score: 150
            },
            {
                id: 9,
                score: 150
            },
            {
                id: 10,
                score: 150
            },
            {
                id: 11,
                score: 150
            },
            {
                id: 12,
                score: 150
            },
            {
                id: 13,
                score: 150
            },
            {
                id: 14,
                score: 150
            },
            {
                id: 15,
                score: 150
            },
            {
                id: 16,
                score: 150
            }, 
        ]
    )

    

    const [Teams, setTeams] = useState(
        [
            {
                id: 1,
                name: 'R & M',
                playerID: [1, 2],
                total: Totals [0], 
                scores: [
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
                id: '2',
                name: 'T & L',
                playerID: [3, 4],
                total: 800,
                scores: [
                    {
                        round: 1,
                        score: 200
                    },
                    {
                        round: 2,
                        score: 0
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
                        score: 200
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
                id: '3',
                name: 'M & P',
                playerID: [5, 6],
                total: 1200,
                scores: [
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
                        score: 0
                    },
                    {
                        round: 7,
                        score: 100
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
                id: '4',
                name: 'D & J',
                playerID: [7, 8],
                total: 1500,
                scores: [
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
                        score: 0
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
    
    )



    const [ScorecardData, setScorecardData] = useState(
        {
            id: '1',
            name: 'Custom 1',
            updated: false,
            teams: [Teams]
        },
    );

        const [Updated, setUpdated] = useState(true)

    useEffect(() => {

        // setTotals(
        //     [
        //         Teams[0].scores.reduce((a,v) =>  a = a + v.score , 0 ),
        //         Teams[1].scores.reduce((a,v) =>  a = a + v.score , 0 ),
        //         Teams[2].scores.reduce((a,v) =>  a = a + v.score , 0 ),
        //         Teams[3].scores.reduce((a,v) =>  a = a + v.score , 0 ),
        //     ]
            
        // );
        // setUpdated(!Updated)
        // setScorecardData(
        //     {...ScorecardData, updated: Updated, name: 'custom 2', } 
        // )
        // setTeams(
        //     [
        //         {...Teams[0], total: Totals [0], }, 
        //         {...Teams[1], total: Totals [1], }, 
        //         {...Teams[2], total: Totals [2], }, 
        //         {...Teams[3], total: Totals [3], }
        //     ]
        // )
        

        // console.log(Updated)
        // console.log(ScorecardData.updated)
        // console.log(Totals)


    }, [Totals])



    const Set = () => {
        setTotals(
            [
                Teams[0].scores.reduce((a,v) =>  a = a + v.score , 0 ),
                Teams[1].scores.reduce((a,v) =>  a = a + v.score , 0 ),
                Teams[2].scores.reduce((a,v) =>  a = a + v.score , 0 ),
                Teams[3].scores.reduce((a,v) =>  a = a + v.score , 0 ),
            ]
            
        );
        setUpdated(!Updated)
        setScorecardData(
            {...ScorecardData, updated: Updated, name: 'custom 2', } 
        )
        setTeams(
            [
                {...Teams[0], total: Totals [0], }, 
                {...Teams[1], total: Totals [1], }, 
                {...Teams[2], total: Totals [2], }, 
                {...Teams[3], total: Totals [3], }
            ]
        )
        

        console.log(Updated)
        console.log(ScorecardData.updated)
        console.log(Totals)
        
        
        // setTotal(
        //     Teams[0].scores.reduce((a,v) =>  a = a + v.score , 0 )
        //     //Total + 2
        // );
        // setUpdated(!Updated)
        // setScorecardData(
        //     {...ScorecardData, updated: Updated, name: 'custom 2', } 
        // )
        // setTeams(
        //     [{...Teams[0], total: Total, }, {...Teams[1], total: Total + 2, }, {...Teams[2], total: Total + 2, }, {...Teams[3], total: Total + 2, }]
        // )
        

        // console.log(Updated)
        // console.log(ScorecardData.updated)
        // console.log(Total)
        // //console.log(ScorecardData.team[0].total)
        
    }

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
      
    	horzScrollRef.current?.scrollToOffset({
          //y: (200),
          offset: (event.nativeEvent.contentOffset.x),
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

      const renderFooter = ({ item }) => {
        
        return (
          <Footer
            
            total={item.total}
          />
        );
      };

      const renderItemScoreRow = ({ item }) => {
        
        return (
          <ScoreRow
            score={item.score}

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
                        {ScorecardData.name}
                    </Text>
                </View>
                <View style={{marginTop: 20, marginHorizontal: 20}}>
                    <TouchableOpacity onPress={Set}>
                        <Feather 
                            name='settings'
                            size={20}
                            color='#fff'
                        />
                    </TouchableOpacity>
                    
                </View>
            </View>

            <View style={{}}>

                
              
               <ScrollView 
                    style={{height: '89%', width: '100%',}}
                    stickyHeaderIndices={[]}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    horizontal={true}
                    onScroll = {(event)=>{{
                        handleHorzScroll(event);}}}//Vertical scrolling distance 
                    scrollEventThrottle={16}
                    
                >
                    
                        <FlatList
                            data={Scores}
                            renderItem={renderItemScoreRow}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            style={{ flexDirection: 'column', backgroundColor: '#fff', height: '100%'}}
                            contentContainerStyle={{width: 480}}
                            scrollEnabled={true}
                            //ref={scrollRef}
                            onScroll = {(event)=>{{
                                handleVertScroll(event);}}}//Vertical scrolling distance 
                            ListFooterComponent={() => (
                                <View style={{width: 480, height: 50}}>

                                </View>
                            )}
                            
                        />
                    
                       {/* <ScrollView
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
                       </ScrollView> */}
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
                        data={Teams}
                        renderItem={renderItem}
                        //keyExtractor={item => item.id}
                        horizontal={true}
                        
                        style={{position: 'absolute', top: 0, marginLeft: 80}}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{width: 400}}
                        ref={horzScrollRef2}
                        scrollEnabled={false}
                        
                    />
                

                <FlatList 
                    data={Teams}
                    renderItem={renderFooter}
                    //keyExtractor={item => item.id}
                    
                    horizontal={true}
                    
                    style={{position: 'absolute', bottom: 0, marginLeft: 80}}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{width: 400}}
                    ref={horzScrollRef}
                    scrollEnabled={false}
                    extraData={Updated}
                />

                {/* <ScrollView 
                    style={{ position: 'absolute', bottom: 0}} 
                    horizontal={true}
                    contentContainerStyle={{width: 480}}
                    showsHorizontalScrollIndicator={false}
                    ref={horzScrollRef}
                    scrollEnabled={false}
                >
                <Footer />
            </ScrollView> */}
               

               <ScrollView 
                    style={{width: 80, height: '100%', position: 'absolute', top: 0, left: 0, }}
                    stickyHeaderIndices={[0, 16]}
                    showsVerticalScrollIndicator={false}
                    // onScroll = {(event)=>{{
                    //            handleVertScroll(event);}}}//Vertical scrolling distance 
                    ref={scrollRef}
                    scrollEnabled={false}
                 
                    scrollEventThrottle={16}
               >
                    <View style={styles.roundbox}>
                        <Text style={styles.header}>
                            
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
