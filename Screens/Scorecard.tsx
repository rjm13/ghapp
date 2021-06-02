import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Animated, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Modal, Portal, Provider } from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width



var toRoman = require('roman-numerals').toRoman;
[ 42, new Number(42), '42', new String('42')].forEach(function (x, i) {
    console.log('%d: %s', i, toRoman(x));
});


const Footer = ({total}) => {
    return (
        <View style={{ height: 50, backgroundColor: '#fff', flexDirection: 'row'}}>
            
           

            <View style={{ width: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[styles.score, {fontFamily: 'chalkboard-bold', color: '#000'}]}>
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

const RoundsColumn = ({round}) => {
    return (
        <View style={styles.roundbox}>
            <Text style={styles.round}>
                {toRoman(round)}
            </Text>
        </View>
    );
}

// const ScoreRow = ({score}) => {
//     return (
//         <View style={{flexDirection: 'row', height: 50}}>
//             <View style={{backgroundColor: '#155843', width: 80}}>

//             </View>
//             <TouchableOpacity onPress={showModal}>
//                 <View style={styles.scorebox}>
//                     <Text style={styles.score}>
//                         {score[0]}
//                     </Text>
//                 </View>
//             </TouchableOpacity>
            
//             <View style={styles.scorebox}>
//                 <Text style={styles.score}>
//                     {score [1]}
//                 </Text>
//             </View>
//             <View style={styles.scorebox}>
//                 <Text style={styles.score}>
//                     {score [2]}
//                 </Text>
//             </View>
//             <View style={styles.scorebox}>
//                 <Text style={styles.score}>
//                     {score [3]}
//                 </Text>
//             </View>

//     </View>
//     );
// }


const Scorecard = ({navigation}) => {

    const [Totals, setTotals] = useState([0, 0, 0, 0]);

    const [Scores, setScores] = useState(
        [
            {
                round: 1,
                team: [1, 2, 3, 4],
                score: [100, 150, 300, 100],
            },
            {
                round: 2,
                team: [1, 2, 3, 4],
                score: [50, 150, 200, 100],
            },
            {
                round: 3,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
            {
                round: 4,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
            {
                round: 5,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
            {
                round: 6,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
            {
                round: 7,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
            {
                round: 8,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
            {
                round: 9,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
            {
                round: 10,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
            {
                round: 11,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
            {
                round: 12,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
            {
                round: 13,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
            {
                round: 14,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
            {
                round: 15,
                team: [1, 2, 3, 4],
                score: [50, 150, 300, 100],
            },
        ]
    )

    

    const [Teams, setTeams] = useState(
        [
            {
                id: 1,
                name: 'R & M',
                playerID: [1, 2],
                total: Scores.reduce((a,v) =>  a = a + v.score[0] , 0 ), 
                
            },
            {
                id: '2',
                name: 'T & L',
                playerID: [3, 4],
                total: Scores.reduce((a,v) =>  a = a + v.score[1] , 0 ),
               
            },
            {
                id: '3',
                name: 'M & P',
                playerID: [5, 6],
                total: Scores.reduce((a,v) =>  a = a + v.score[2] , 0 ),
                
            },
            {
                id: '4',
                name: 'D & J',
                playerID: [7, 8],
                total: Scores.reduce((a,v) =>  a = a + v.score[3] , 0 ),
                
            },
        ]
    
    )



    const [ScorecardData, setScorecardData] = useState(
        {
            id: '1',
            name: 'Custom 1',
            updated: false,
            teams: [Teams],
            scores: [Scores]
        },
    );

        const [Updated, setUpdated] = useState(true)

    



    const Set = ({val}) => {
        // setTotals(
        //     [
        //         Scores.reduce((a,v) =>  a = a + v.score[0] , 0 ),
        //         Scores.reduce((a,v) =>  a = a + v.score[1] , 0 ),
        //         Scores.reduce((a,v) =>  a = a + v.score[2] , 0 ),
        //         Scores.reduce((a,v) =>  a = a + v.score[3] , 0 ),
        //         //Teams[3].scores.reduce((a,v) =>  a = a + v.score , 0 ),
        //     ]   
        // );

        
        setScorecardData(
            {...ScorecardData, updated: Updated, name: val, } 
        )

        //setUpdated(!Updated)

        // setTeams(
        //     [
        //         {...Teams[0], total: Totals [0], }, 
        //         {...Teams[1], total: Totals [1], }, 
        //         {...Teams[2], total: Totals [2], }, 
        //         {...Teams[3], total: Totals [3], }
        //     ]
        // )
        
        
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
      
    	scrollRef.current?.scrollToOffset({
          //y: (200),
          offset: (event.nativeEvent.contentOffset.y),
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

      const renderRounds = ({ item }) => {
        
        return (
          <RoundsColumn
            round={item.round}

          />
        );
      };

//Scorebox Modal
      const [visible, setVisible] = useState(false);
  
      const showModal = () => setVisible(true);

      const hideModal = () => setVisible(false);
      const containerStyle = {
          backgroundColor: 'transparent', 
          padding: 20,
      }; 

//Scorecard Name Modal
      const [visibleNameModal, setVisibleNameModal] = useState(false);
  
      const showNameModal = () => setVisibleNameModal(true);

      const hideNameModal = () => setVisibleNameModal(false);
      const nameModalContainerStyle = {
          backgroundColor: 'transparent', 
          padding: 20,
      }; 

//Scorecard Settings Modal
    const [visibleSettingModal, setVisibleSettingModal] = useState(false);
    
    const showSettingModal = () => setVisibleSettingModal(true);

    const hideSettingModal = () => setVisibleSettingModal(false);
    const settingModalContainerStyle = {
        backgroundColor: 'transparent', 
        padding: 20,
    }; 

      const ScoreRow = ({score}) => {

        return (
            <View style={{flexDirection: 'row', height: 50}}>
                <View style={{backgroundColor: '#155843', width: 80}}>
    
                </View>
                <TouchableOpacity onPress={showModal}>
                    <View style={styles.scorebox}>
                        <Text style={styles.score}>
                            {score[0]}
                        </Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={showModal}>
                    <View style={styles.scorebox}>
                        <Text style={styles.score}>
                            {score[1]}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={showModal}>
                    <View style={styles.scorebox}>
                        <Text style={styles.score}>
                            {score[2]}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={showModal}>
                    <View style={styles.scorebox}>
                        <Text style={styles.score}>
                            {score[3]}
                        </Text>
                    </View>
                </TouchableOpacity>
    
        </View>
        );
    }

    const [text, setText] = useState('');

    const textNum = parseInt(text)

    const SetScore = () => {

        hideModal();

        setScores(
                [{...Scores[0], score: [textNum, Scores[0].score[1], Scores[0].score[2], Scores[0].score[3]]}, {...Scores[1]}, {...Scores[2]}]
            ) 

        // setTeams (
        //     [
        //         {...Teams[0], total: Scores.reduce((a,v) =>  a = a + v.score[0] , 0) }, 
        //         {...Teams[1], total: Scores.reduce((a,v) =>  a = a + v.score[1] , 0 ), }, 
        //         {...Teams[2], total: Scores.reduce((a,v) =>  a = a + v.score[2] , 0 ), },
        //         {...Teams[3], total: Scores.reduce((a,v) =>  a = a + v.score[3] , 0 ), },
        //     ]
        // )

        setUpdated(!Updated)    
    }

    useEffect(() => {
        setTeams (
            [
                {...Teams[0], total: Scores.reduce((a,v) =>  a = a + v.score[0] , 0) }, 
                {...Teams[1], total: Scores.reduce((a,v) =>  a = a + v.score[1] , 0 ), }, 
                {...Teams[2], total: Scores.reduce((a,v) =>  a = a + v.score[2] , 0 ), },
                {...Teams[3], total: Scores.reduce((a,v) =>  a = a + v.score[3] , 0 ), },
            ]
        )
    },[Updated])




    return (
        <Provider>
        <View>

{/* Modal */}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 15,}}>

                        <View style={{ alignItems: 'center'}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-bold'}}>
                                Team Name
                            </Text>
                            <Text style={{fontSize: 16, fontFamily: 'chalkboard-bold'}}>
                                Round 1
                            </Text>
                        </View>

                        <View>
                            <View style={{height: 200, alignItems: 'center', justifyContent: 'center'}}>
                               <TextInput 
                                    placeholder='--'
                                    placeholderTextColor='#000'
                                    style={{textAlign: 'center', height: 200, width: '100%', fontFamily: 'chalkboard-bold', fontSize: 60}}
                                    maxLength={6}
                                    keyboardType='number-pad'
                                    autoFocus={true}
                                    onChangeText={val =>setText(val)}
                                    
                                    
                                /> 
                            </View>
                        </View>

                        <View style={{ alignItems: 'center'}}>
                            <TouchableOpacity onPress={SetScore}>
                                <View style={{ width: 200, height: 50, borderRadius: 25, backgroundColor: '#155843', alignItems: 'center', justifyContent: 'center'}}>
                                    <Feather 
                                        name='check'
                                        color='#fff'
                                        size={30}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>

                <Modal visible={visibleNameModal} onDismiss={hideNameModal} contentContainerStyle={nameModalContainerStyle}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 15,}}>

                        <View style={{ alignItems: 'center'}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-bold'}}>
                                Scorecard Name
                            </Text>
                        </View>

                        <View>
                            <View style={{marginVertical: 20, height: 80, alignItems: 'center', justifyContent: 'center'}}>
                               <TextInput 
                                    placeholder=''
                                    placeholderTextColor='#000000a5'
                                    style={{textAlign: 'center', height: 80, width: '100%', fontFamily: 'chalkboard-bold', fontSize: 40}}
                                    maxLength={20}
                                    //keyboardType='number-pad'
                                    autoFocus={true}
                                    onChangeText={val => Set({val})}
                                    //onChangeText={val => setData({...data, title: val})}
                                /> 
                            </View>
                        </View>

                        <View style={{ alignItems: 'center'}}>
                            <TouchableOpacity onPress={hideNameModal}>
                                <View style={{ width: 200, height: 50, borderRadius: 25, backgroundColor: '#155843', alignItems: 'center', justifyContent: 'center'}}>
                                    <Feather 
                                        name='check'
                                        color='#fff'
                                        size={30}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
        
{/* Settings Modal */}
                <Modal visible={visibleSettingModal} onDismiss={hideSettingModal} contentContainerStyle={settingModalContainerStyle}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 15,}}>

                        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 20, justifyContent: 'space-around'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#155843'}}>
                                Share
                            </Text>
                            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#155843'}}>
                                Frame
                            </Text>
                            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#155843'}}>
                                Clear
                            </Text>
                            

                        </View>

                        <View style={{ alignItems: 'center'}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-bold'}}>
                                Scorecard Settings
                            </Text>
                        </View>

                        <ScrollView style={{height: 400, marginVertical: 20}} showsVerticalScrollIndicator={false}>

                        <View style={{marginTop: 10}}>
                                <View>
                                    <Text style={{paddingBottom: 5, fontSize: 16, color: '#000', fontWeight: 'bold', borderBottomColor: 'darkgray', borderBottomWidth: 1}}>
                                        Teams and Players
                                    </Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Team 1
                                        </Text> 
                                        <Feather
                                            name='check-square'
                                            color='#155843'
                                            size={20}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Team 2
                                        </Text> 
                                        <Feather
                                            name='check-square'
                                            color='#155843'
                                            size={20}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Team 3
                                        </Text> 
                                        <Feather
                                            name='check-square'
                                            color='#155843'
                                            size={20}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Team 4
                                        </Text> 
                                        <Feather
                                            name='check-square'
                                            color='#155843'
                                            size={20}
                                        />
                                    </View>
                                </View>  
                            </View>

                            <View style={{marginTop: 20}}>
                                    <View>
                                        <Text style={{paddingBottom: 5, fontSize: 16, color: '#000', fontWeight: 'bold', borderBottomColor: 'darkgray', borderBottomWidth: 1}}>
                                            Counters
                                        </Text>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                            <Text style={{fontSize: 16}}>
                                                Bid
                                            </Text> 
                                            <Feather
                                                name='check-square'
                                                color='#155843'
                                                size={20}
                                            />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                            <Text style={{fontSize: 16}}>
                                                Meld
                                            </Text> 
                                            <Feather
                                                name='check-square'
                                                color='#155843'
                                                size={20}
                                            />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                            <Text style={{fontSize: 16}}>
                                                Tricks
                                            </Text> 
                                            <Feather
                                                name='check-square'
                                                color='#155843'
                                                size={20}
                                            />
                                        </View>
                                    </View>  
                                </View>

                                <View style={{marginTop: 20}}>
                                    <View>
                                        <Text style={{paddingBottom: 5, fontSize: 16, color: '#000', fontWeight: 'bold', borderBottomColor: 'darkgray', borderBottomWidth: 1}}>
                                            Options
                                        </Text>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                            <Text style={{fontSize: 16}}>
                                                Use Roman Numerals
                                            </Text> 
                                            <Feather
                                                name='check-square'
                                                color='#155843'
                                                size={20}
                                            />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                            <Text style={{fontSize: 16}}>
                                                Text Size
                                            </Text> 
                                            <Feather
                                                name='check-square'
                                                color='#155843'
                                                size={20}
                                            />
                                        </View>
                                    </View>  
                                </View>

                            <View style={{marginTop: 20}}>
                                <View>
                                    <Text style={{paddingBottom: 5, fontSize: 16, color: '#000', fontWeight: 'bold', borderBottomColor: 'darkgray', borderBottomWidth: 1}}>
                                        Timer
                                    </Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Display
                                        </Text> 
                                        <Feather
                                            name='check-square'
                                            color='#155843'
                                            size={20}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Round Length
                                        </Text> 
                                        <Feather
                                            name='check-square'
                                            color='#155843'
                                            size={20}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Warning
                                        </Text> 
                                        <Feather
                                            name='check-square'
                                            color='#155843'
                                            size={20}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Sound
                                        </Text> 
                                        <Feather
                                            name='check-square'
                                            color='#155843'
                                            size={20}
                                        />
                                    </View>
                                </View>

                                
                            </View>

                            
                        </ScrollView>

                        <View style={{ alignItems: 'center'}}>
                            <TouchableOpacity onPress={hideSettingModal}>
                                <View style={{ width: 200, height: 50, borderRadius: 25, backgroundColor: '#155843', alignItems: 'center', justifyContent: 'center'}}>
                                    <Feather 
                                        name='check'
                                        color='#fff'
                                        size={30}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
            </Portal>


 {/* Header            */}
            <View style={{ width: SCREEN_WIDTH, height: 80, justifyContent: 'space-between', backgroundColor: '#155843', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{marginTop: 20, marginHorizontal: 20}}>
                        <Feather 
                            name='chevron-down'
                            size={30}
                            color='#fff'
                        />
                    </View>
                </TouchableOpacity>
                <View style={{marginTop: 20}}>
                    <TouchableOpacity onPress={showNameModal}>
                        <Text style={{fontSize: 18, fontFamily: 'chalkboard-regular', color: '#fff'}}>
                            {ScorecardData.name}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{marginTop: 20, marginHorizontal: 20}}>
                    <TouchableOpacity onPress={showSettingModal} >
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
                            style={{ marginTop: 0, flexDirection: 'column', backgroundColor: '#fff', height: '100%'}}
                            contentContainerStyle={{width: 480}}
                            scrollEnabled={true}
                            //ref={scrollRef}
                            onScroll = {(event)=>{{
                                handleVertScroll(event);}}}//Vertical scrolling distance 
                            ListHeaderComponent={() => (
                                <View style={{width: 480, height: 50}}>

                                </View>
                            )}
                            ListFooterComponent={() => (
                                <View>
                                    <View style={styles.roundbox}>
                                         
                                    </View>
                                    <View style={styles.roundbox}>
                                         
                                    </View>
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
                    
                    style={{position: 'absolute', bottom: -2, marginLeft: 80}}
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

                <FlatList
                    data={Scores}
                    renderItem={renderRounds}
                    //keyExtractor={item => item.id}
                    style={{width: 80, height: '100%', position: 'absolute', top: 0, left: 0, marginVertical: 0}}
                    //contentContainerStyle={{height: 850}}
                    showsVerticalScrollIndicator={false}
                    ref={scrollRef}
                    scrollEnabled={false}
                    scrollEventThrottle={16}
                    stickyHeaderIndices={[]}
                    ListHeaderComponent={() => (
                        <View style={styles.roundbox}>
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <View>
                            <View style={styles.roundbox}>
                                 
                            </View>
                            <View style={styles.roundbox}>
                                 
                            </View>
                        </View>
                    )}
                />
               

               {/* <ScrollView 
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
                    
                </ScrollView> */}
                
            </View>

            
                <View style={[styles.roundbox, { position: 'absolute', bottom: 0, left: 0}]}> 
                    <TouchableOpacity onPress={() => 
                        {
                        setTeams(
                            [
                                {...Teams[0], total: Scores.reduce((a,v) =>  a = a + v.score[0] , 0) }, 
                                {...Teams[1], total: Scores.reduce((a,v) =>  a = a + v.score[1] , 0 ), }, 
                                {...Teams[2], total: Scores.reduce((a,v) =>  a = a + v.score[2] , 0 ), },
                                {...Teams[3], total: Scores.reduce((a,v) =>  a = a + v.score[3] , 0 ), },
                            ]
                        )
                        setUpdated(!Updated)
                        }}>
                        <View style={styles.roundbox}>
                            <Feather 
                                name='plus-circle'
                                color='gray'
                                size={22}
                            /> 
                        </View> 
                    </TouchableOpacity>
                
                </View>
           
            

            <View style={[styles.roundbox, { position: 'absolute', top: 80, left: 0}]}>      
            </View>
            
            
               
            
            
     
        </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 16,
        //fontWeight: 'bold',
        color: '#000',
        paddingVertical: 10,
        fontFamily: 'chalkboard-bold'
    },
    headerbox: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    round: {
        fontSize: 16,
        //fontWeight: 'bold',
        color: 'gray',
        textTransform: 'lowercase',
    },
    score: {
        fontSize: 19,
        color: '#000000a5',
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
        height: 50,
        alignItems: 'center', 
        borderRightWidth: 0.3,
        borderBottomWidth: 0.2,
        justifyContent: 'center',
        borderColor: '#cccccc',
        
    },
});

export default Scorecard;
