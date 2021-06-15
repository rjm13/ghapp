import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Switch, StyleSheet, Dimensions, ScrollView, Animated, FlatList, TouchableOpacity, TextInput, RefreshControlBase } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Modal, Portal, Provider } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

import OptionsMenu from "react-native-option-menu";

const MoreIcon = ( <Feather name='more-vertical' color='#fff' size={20}/> )

const SCREEN_WIDTH = Dimensions.get('window').width



var toRoman = require('roman-numerals').toRoman;
[ 42, new Number(42), '42', new String('42')].forEach(function (x, i) {
    //console.log('%d: %s', i, toRoman(x));
});


const Footer = ({total, style}) => {
    return (
        <View style={{ height: 50, backgroundColor: '#fff', flexDirection: 'row'}}>
            
           

            <View style={{ width: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[styles.score, style, {fontFamily: 'chalkboard-bold', fontSize: 22}]}>
                    {total}
                </Text>
            </View>
            
        </View>
    );
}

const WinsFooter = ({roundWins, style}) => {
    return (
        <View style={{ height: 50, backgroundColor: '#fff', flexDirection: 'row'}}>
            
           

            <View style={{ width: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[styles.score, style, {fontFamily: 'chalkboard-bold', fontSize: 22}]}>
                    {roundWins}
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


const Scorecard = ({navigation}) => {

    const [Totals, setTotals] = useState([0, 0, 0, 0]);

    const [isBidEnabled, setIsBidEnabled] = useState(false);
    const toggleSwitchBid = () => setIsBidEnabled(previousState => !previousState);

    const [isMeldEnabled, setIsMeldEnabled] = useState(false);
    const toggleSwitchMeld = () => setIsMeldEnabled(previousState => !previousState);


    const [isBonusEnabled, setIsBonusEnabled] = useState(false);
    const toggleSwitchBonus = () => setIsBonusEnabled(previousState => !previousState);

    const [isRomanEnabled, setIsRomanEnabled] = useState(false);
    const toggleSwitchRoman = () => setIsRomanEnabled(previousState => !previousState);

    const [isRoundWinnerEnabled, setIsRoundWinnerEnabled] = useState(false);
    const toggleSwitchRoundWinner = () => setIsRoundWinnerEnabled(previousState => !previousState);

    const [isRoundWinsEnabled, setIsRoundWinsEnabled] = useState(true);
    const toggleSwitchRoundWins = () => setIsRoundWinsEnabled(previousState => !previousState);

    const [isPointsEnabled, setIsPointsEnabled] = useState(true);
    const toggleSwitchPoints = () => setIsPointsEnabled(previousState => !previousState);

    const [isLowestPointsEnabled, setIsLowestPointsEnabled] = useState(false);
    const toggleSwitchLowestPoints = () => setIsLowestPointsEnabled(previousState => !previousState);

    const [isTimerEnabled, setIsTimerEnabled] = useState(false);
    const toggleSwitchTimer = () => setIsTimerEnabled(previousState => !previousState);

    const [isWarningEnabled, setIsWarningEnabled] = useState(false);
    const toggleSwitchWarning = () => setIsWarningEnabled(previousState => !previousState);

    const [roundLength, setRoundLength] = useState('0:00')


    const [Scores, setScores] = useState(
        [
            {
                round: 1,
                team: [1, 2, 3, 4],
                score: [5, 5, 5, 5],
                winner: null,
        
            },
            {
                round: 2,
                team: [1, 2, 3, 4],
                score: [10, 95, 30, 35],
                winner: null,
            },
            {
                round: 3,
                team: [1, 2, 3, 4],
                score: [10, 95, 30, 35],
                winner: null,
            },
            {
                round: 4,
                team: [1, 2, 3, 4],
                score: [10, 95, 30, 35],
                winner: null,
            },
            {
                round: 5,
                team: [1, 2, 3, 4],
                score: [10, 95, 30, 35],
                winner: null,
            },
            {
                round: 6,
                team: [1, 2, 3, 4],
                score: [10, 95, 30, 35],
                winner: null,
            },
            {
                round: 7,
                team: [1, 2, 3, 4],
                score: [10, 95, 30, 35],
                winner: null,
            },
            {
                round: 8,
                team: [1, 2, 3, 4],
                score: [10, 95, 30, 35],
                winner: null,
            },
            {
                round: 9,
                team: [1, 2, 3, 4],
                score: [10, 95, 30, 35],
                winner: null,
            },
            {
                round: 10,
                team: [1, 2, 3, 4],
                score: [10, 95, 30, 35],
                winner: null,
            },
            {
                round: 11,
                team: [1, 2, 3, 4],
                score: [10, 95, 30, 35],
                winner: null,
            },
            {
                round: 12,
                team: [1, 2, 3, 4],
                score: [10, 95, 30, 35],
                winner: null,
            },
            {
                round: 13,
                team: [1, 2, 3, 4],
                score: [10, 95, 30, 35],
                winner: null,
            },
            {
                round: 14,
                team: [1, 2, 3, 4],
                score: [10, 95, 39, 35],
                winner: null,
            },
            {
                round: 15,
                team: [1, 2, 3, 4],
                score: [10, 25, 39, 35],
                winner: null,
            },
        ]
    )

    

    const [Teams, setTeams] = useState(
        [
            {
                id: 1,
                name: 'Team 1',
                playerID: [1, 2],
                total: Scores.reduce((a,v) =>  a = a + v.score[0] , 0 ), 
                roundWins: Scores.reduce((count, item) => count + (item.winner === 0 ? 1 : 0), 0),
                
            },
            {
                id: '2',
                name: 'Team 2',
                playerID: [3, 4],
                total: Scores.reduce((a,v) =>  a = a + v.score[1] , 0 ),
                roundWins: Scores.reduce((count, item) => count + (item.winner === 1 ? 1 : 0), 0),
            },
            {
                id: '3',
                name: 'Team 3',
                playerID: [5, 6],
                total: Scores.reduce((a,v) =>  a = a + v.score[2] , 0 ),
                roundWins: Scores.reduce((count, item) => count + (item.winner === 2 ? 1 : 0), 0),
            },
            {
                id: '4',
                name: 'Team 4',
                playerID: [7, 8],
                total: Scores.reduce((a,v) =>  a = a + v.score[3] , 0 ),
                roundWins: Scores.reduce((count, item) => count + (item.winner === 3 ? 1 : 0), 0),
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

    const [Updated, setUpdated] = useState(true);

    const [roundUpdate, setRoundUpdate] = useState(false);


    //Scorecard Settings Modal
    const [visibleSettingModal, setVisibleSettingModal] = useState(false);
    
    const showSettingModal = () => setVisibleSettingModal(true);

    const hideSettingModal = () => setVisibleSettingModal(false);
    const settingModalContainerStyle = {
        backgroundColor: 'transparent', 
        padding: 20,
    }; 

    
    const [TeamNames, setTeamNames] = useState(['Team 1', 'Team 2', 'Team 3', 'Team 4'])
    
    const ChangeSettings = () => {    

        let newArray = [...Teams];
        newArray[0].name = TeamNames[0];
        newArray[1].name = TeamNames[1];
        newArray[2].name = TeamNames[2];
        newArray[3].name = TeamNames[3];
        setTeams(newArray);

        setUpdated(!Updated)  
        hideSettingModal();  
        
    }


    const Set = ({val}) => {
        
        setScorecardData(
            {...ScorecardData, updated: Updated, name: val, } 
        )
    }

    const scrollRef = useRef();

    const horzScrollRef = useRef();

    const horzScrollRef2 = useRef();

    const horzScrollRef3 = useRef();

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

        horzScrollRef3.current?.scrollToOffset({
            //y: (200),
            offset: (event.nativeEvent.contentOffset.x),
            animated: true,
        })
    }


    const [leader, setLeader] = useState(null);
    const [roundLeader, setRoundLeader] = useState(null);

    useEffect(() => {
        setLeader( Math.max(Teams[0].total, Teams[1].total, Teams[2].total, Teams[3].total))
        setRoundLeader( Math.max(Teams[0].roundWins, Teams[1].roundWins, Teams[2].roundWins, Teams[3].roundWins))
    }, [Teams])


    // const MapTeamNames = ({val, id}) => {
    //     if (id === 1) {setTeamNames([val, TeamNames[1], TeamNames[2], TeamNames[3]])}
    //     else if (id === 2) {setTeamNames([TeamNames[0], val, TeamNames[2], TeamNames[3]])}
    //     else if (id === 3) {setTeamNames([TeamNames[0], TeamNames[1], val, TeamNames[3]])}
    //     else if (id === 4) {setTeamNames([TeamNames[0], TeamNames[1], TeamNames[2], val])}

    //     console.log(val);
    //     console.log(id)
    //     console.log(TeamNames)
    // }

    // const inputRef = useRef(null);

    // useEffect(() => {
    //     inputRef.current.focus();
    // }, [TeamNames])

    

    const MapTeamNames = ({text, id}) => {

        

        let newArray = [...TeamNames];
        newArray[id - 1] = text;
        setTeamNames(newArray);
        
        // if (id === 1) {setTeamNames([text, TeamNames[1], TeamNames[2], TeamNames[3]])}
        // else if (id === 2) {setTeamNames([TeamNames[0], text, TeamNames[2], TeamNames[3]])}
        // else if (id === 3) {setTeamNames([TeamNames[0], TeamNames[1], text, TeamNames[3]])}
        // else if (id === 4) {setTeamNames([TeamNames[0], TeamNames[1], TeamNames[2], text])}
        
        // console.log(text);
        // console.log(id)
        // console.log(TeamNames)
    }


    const TeamList = ({name, id}) => {

        

        return(
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', margin: 10}}>
                    <TextInput 
                        placeholder={name}
                        //ref={inputRef}
                        //defaultValue={Teams[0].name}
                        placeholderTextColor='#000000a5'
                        style={{textAlign: 'left', height: 30, width: 150, fontFamily: 'chalkboard-bold', fontSize: 16}}
                        maxLength={20}
                        //ref={inputRef + id}
                        //keyboardType='number-pad'
                     
                        //autoFocus={false}
                        //value={text[id-1]}
                        //onChangeText={val => setTeamName()}
                        //onChangeText={val => MapTeamNames({val, id})}
                        onChangeText={text => MapTeamNames({text, id})}
                        
                        
                    /> 
                    <View style={{ flexDirection: 'row'}}>
                        <Feather
                            name='plus-circle'
                            color='#155843a5'
                            size={18}
                        />
                        <Text style={{fontSize: 12, color: '#155843a5', marginLeft: 5}}>
                            Add Player
                        </Text>
                    </View>
                </View>
                <View style={{marginHorizontal: 10, marginTop: -10}}>
                    <Text style={{fontSize: 14, textTransform: 'capitalize'}}>
                        Randy, Meghan
                    </Text>
                </View>
            </View>
        );
    };
    

    const renderItem = ({ item }) => {
        
        return (
          <HeaderRow
            id={item.id} 
            name={item.name}
          />
        );
      };

    const renderFooter = ({ item }) => {

    const color = item.total === leader ? 'green' : '#000';

    
    return (
        <Footer
        total={item.total}
        style={{ color }}
        />
    );
    };

    const renderWinsFooter = ({ item }) => {

        const color = item.roundWins === roundLeader && roundLeader !== 0 ? 'green' : '#000';
    
        
        return (
            <WinsFooter
                roundWins={item.roundWins}
                style={{ color }}
            />
        );
    };

      const renderItemScoreRow = ({ item, index }) => {
        
        return (
          <ScoreRow
            index={index}
            score={item.score}
            round={item.round}
            team={item.team}

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

      const renderTeamList = ({item}) => {

        return (
            <TeamList 
                name={item.name}
                id={item.id}
            />
        );
      };


      const [roundState, setRoundState] = useState(null);
      const [teamState, setTeamState] = useState(0);
      const [scoreState, setScoreState] = useState();

//Scorebox Modal
      const [visible, setVisible] = useState(false);
  
      const showModal = ({round, index}) => {

        // const team = () => {
        //     if (team1) return team1;
        //     else if (team2) return team2;
        //     else if (team3) return team3;
        //     else if (team4) return team4;
        //     else return null;
        // }
            setVisible(true);
            setRoundState(round);
            setTeamState(index + 1);
            //setScoreState(Score);

            //console.log(winnerIndex)
            // console.log(round);
            // console.log(index);
        }

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



    const HeaderRow = ({id, name}) => {

        return (
            <View style={{flexDirection: 'column', height: 50, backgroundColor: '#fff', justifyContent: 'center'}}>
                <TouchableOpacity onPress={showSettingModal}>
                    <View style={styles.headerbox}>
                        <Text style={styles.header}>
                            {name}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    // const ScoreRow = ({score, round, team}) => {

    //     const [roundWinner, setRoundWinner] = useState(null);

    //     useEffect(() => {
    //         setRoundWinner( Math.max(score))
    //     }, [Teams])

    //     const team1 = team[0];
    //     const team2 = team[1];
    //     const team3 = team[2];
    //     const team4 = team[3];

    //     return (
    //         <View style={{flexDirection: 'row', height: 50}}>
    //             <View style={{backgroundColor: '#155843', width: 60}}>
    
    //             </View>
    //             <TouchableOpacity onPress={() => showModal({round, team1})}>
    //                 <View style={styles.scorebox}>
    //                     <Text style={styles.score}>
    //                         {score[0]}
    //                     </Text>
    //                 </View>
    //             </TouchableOpacity>
                
    //             <TouchableOpacity onPress={() => showModal({round, team2})}>
    //                 <View style={styles.scorebox}>
    //                     <Text style={styles.score}>
    //                         {score[1]}
    //                     </Text>
    //                 </View>
    //             </TouchableOpacity>

    //             <TouchableOpacity onPress={() => showModal({round, team3})}>
    //                 <View style={styles.scorebox}>
    //                     <Text style={styles.score}>
    //                         {score[2]}
    //                     </Text>
    //                 </View>
    //             </TouchableOpacity>

    //             <TouchableOpacity onPress={() => showModal({round, team4})}>
    //                 <View style={styles.scorebox}>
    //                     <Text style={styles.score}>
    //                         {score[3]}
    //                     </Text>
    //                 </View>
    //             </TouchableOpacity>
    
    //     </View>
    //     );
    // }

    
    //const [winnerIndex, setWinnerIndex] = useState(0);
    

    // useEffect(() => {

    //     let newArray = [...Scores];
    //     newArray[ roundState - 1].winner = winnerIndex;
    //     setScores(newArray);
    //     //console.log(winnerIndex)

    // }, [roundUpdate])

    // const updateRoundLeader = () => {
    //     let newArray = [...Scores];
    //     newArray[winnerIndex].winner = winnerIndex;
    //     setScores(newArray);
    //     //console.log(newArray[index].roundWins)
    //     //console.log(index)
    // }

    
    //const [winner, setWinner] = useState(0)

      const ScoreRow = ({index, round, score, team}) => {

        const data = Scores[round - 1].score

        const Round = round

        const roundWinner = Math.max(score[0], score[1], score[2], score[3]);

        // const winnerIndex = roundWinner === score[0] ? 0 : 
        //                     roundWinner === score[1] ? 1 : 
        //                     roundWinner === score[2] ? 2 : 
        //                     roundWinner === score[3] ? 3 : 0

        //setWinner(winnerIndex);

        //console.log(winnerIndex)

        //const [roundWinner, setRoundWinner] = useState(Math.max(score[0], score[1], score[2], score[3]));

        //const [wIndex, setWIndex] = useState(0)

        //const [winner, setWinner] = useState(Math.max(score[0], score[1], score[2], score[3]))

        
                
            // if (roundWinner === score[0]) {
            //     let newArray = [...Scores];
            //     newArray[ roundState - 1].winner = 0;
            //     setScores(newArray);} 
            // if (roundWinner === score[0]) {
            //     let newArray = [...Scores];
            //     newArray[ roundState - 1].winner = 1;
            //     setScores(newArray);}  
            // if (roundWinner === score[0]) {
            //     let newArray = [...Scores];
            //     newArray[ roundState - 1].winner = 2;
            //     setScores(newArray);} 
            // if (roundWinner === score[0]) {
            //     let newArray = [...Scores];
            //     newArray[ roundState - 1].winner = 3;
            //     setScores(newArray);} 
            
    



        const Row = ({item, index, style}) => {

            const round = Round

            //const Score = score

            return (
                
                  <View style={{}}>
                      
                      <TouchableOpacity onPress={() => {showModal({index, round});}}>
                        <View style={[styles.scorebox, style]}>
                            <Text style={[styles.score]}>
                            {item}
                            </Text>
                        </View>
                    </TouchableOpacity>
                  </View> 
            )
        }

        const renderRow = ({ item, index }) => {

            //const color = item === roundWinner ? 'green' : '#000000a5';

            const backgroundColor = item === roundWinner ? '#f0f0f0a5' : '#fff';

            return (
                <Row
                    index={index}
                    item={item}
                    style={{  backgroundColor }}
                />
            );
        };


        return (
            <View style={{flexDirection: 'row', height: 50}}>
                <View style={{backgroundColor: '#155843', width: 60}}>
    
                </View>
                
                <FlatList 
                    data={data}
                    renderItem={renderRow}
                    
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    //style={{position: 'absolute', top: 0, marginLeft: 60}}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{width: 400}}
                    scrollEnabled={false}
                    
                />
    
        </View>
        );
    }

    const [text, setText] = useState('');

    const textNum = parseInt(text)

    const [winnerState, setWinnerState] = useState(0);

    const SetScore = () => {    

        

        let newArray = [...Scores];
        newArray[roundState - 1].score[teamState - 1 ] = textNum;
        //newArray[roundState - 1].winner = winnerState;
        setScores(newArray);

        // let newArray2 = [...Scores];
        // newArray[roundState - 1].winner = winnerState;
        // setScores(newArray2);

        //console.log(winnerState)

        hideModal();

        setUpdated(!Updated)    
        //setWinnerState(winnerIndex);
        setRoundUpdate(!roundUpdate)
        //updateRoundLeader();
    }

    useEffect(() => {

        if (roundState) {
        let newArray = [...Scores];

        const roundWinner = Math.max(newArray[roundState - 1].score[0], newArray[roundState - 1].score[1], newArray[roundState - 1].score[2], newArray[roundState - 1].score[3]);

        const winnerIndex = roundWinner === newArray[roundState - 1].score[0] ? 0 : 
                            roundWinner === newArray[roundState - 1].score[1] ? 1 : 
                            roundWinner === newArray[roundState - 1].score[2] ? 2 : 
                            roundWinner === newArray[roundState - 1].score[3] ? 3 : null


        newArray[roundState - 1].winner = winnerIndex;
        setScores(newArray);
        }
    }, [roundUpdate])

    useEffect(() => {
        setTeams (
            [
                {...Teams[0], total: Scores.reduce((a,v) =>  a = a + v.score[0] , 0), roundWins: Scores.reduce((count, item) => count + (item.winner === 0 ? 1 : 0), 0), }, 
                {...Teams[1], total: Scores.reduce((a,v) =>  a = a + v.score[1] , 0 ), roundWins: Scores.reduce((count, item) => count + (item.winner === 1 ? 1 : 0), 0),}, 
                {...Teams[2], total: Scores.reduce((a,v) =>  a = a + v.score[2] , 0 ), roundWins: Scores.reduce((count, item) => count + (item.winner === 2 ? 1 : 0), 0),},
                {...Teams[3], total: Scores.reduce((a,v) =>  a = a + v.score[3] , 0 ), roundWins: Scores.reduce((count, item) => count + (item.winner === 3 ? 1 : 0), 0),},
            ]
        );
    },[Updated]);





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
                                Round {roundState}
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
{/* Scorecard title modal */}
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

                                    {/* <FlatList 
                                        data={Teams}
                                        renderItem={renderTeamList}
                                        keyExtractor={item => item.id.toString()}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={false}
                                        //removeClippedSubviews={false}
                                        
                                    /> */}

                                    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', margin: 10}}>
                                        <TextInput 
                                            placeholder={Teams[0].name}
                                            //defaultValue={Teams[0].name}
                                            placeholderTextColor='#000000a5'
                                            style={{textAlign: 'left', height: 30, width: 150, fontFamily: 'chalkboard-bold', fontSize: 16}}
                                            maxLength={20}
                                            //keyboardType='number-pad'
                                            autoFocus={false}
                                            //onChangeText={val => setTeamName()}
                                            onChangeText={val => setTeamNames([
                                                val,
                                                TeamNames[1],
                                                TeamNames[2],
                                                TeamNames[3],
                                                
                                            ])}
                                        /> 
                                        <View style={{ flexDirection: 'row'}}>
                                            <Feather
                                                name='plus-circle'
                                                color='#155843a5'
                                                size={18}
                                            />
                                            <Text style={{fontSize: 12, color: '#155843a5', marginLeft: 5}}>
                                                Add Player
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{marginHorizontal: 10, marginTop: -10}}>
                                        <Text style={{fontSize: 14, textTransform: 'capitalize'}}>
                                            Randy, Meghan
                                        </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10}}>
                                       
                                            <TextInput 
                                                placeholder={Teams[1].name}
                                                placeholderTextColor='#000000a5'
                                                style={{textAlign: 'left', height: 30, width: 150, fontFamily: 'chalkboard-bold', fontSize: 16}}
                                                maxLength={20}
                                                //keyboardType='number-pad'
                                                autoFocus={false}
                                                onChangeText={val => setTeamNames([
                                                    TeamNames[0],
                                                    val,
                                                    TeamNames[2],
                                                    TeamNames[3],
                                                    
                                                ])}
                                            /> 
                                       
                                       <View style={{ flexDirection: 'row'}}>
                                            <Feather
                                                name='plus-circle'
                                                color='#155843a5'
                                                size={18}
                                            />
                                            <Text style={{fontSize: 12, color: '#155843a5', marginLeft: 5}}>
                                                Add Player
                                            </Text>
                                        </View>
                                        
                                    </View>
                                    <View style={{marginHorizontal: 10, marginTop: -10}}>
                                        <Text style={{fontSize: 14, textTransform: 'capitalize'}}>
                                            Jack, Luke
                                        </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', margin: 10}}>
                                            <TextInput 
                                                placeholder={Teams[2].name}
                                                placeholderTextColor='#000000a5'
                                                style={{textAlign: 'left', height: 30, width: 150, fontFamily: 'chalkboard-bold', fontSize: 16}}
                                                maxLength={20}
                                                //keyboardType='number-pad'
                                                autoFocus={false}
                                                onChangeText={val => setTeamNames([
                                                    TeamNames[0],
                                                    TeamNames[1],
                                                    val,
                                                    TeamNames[3],
                                                    
                                                ])}
                                            /> 
                                        
                                        <View style={{ flexDirection: 'row'}}>
                                            <Feather
                                                name='plus-circle'
                                                color='#155843a5'
                                                size={18}
                                            />
                                            <Text style={{fontSize: 12, color: '#155843a5', marginLeft: 5}}>
                                                Add Player
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{marginHorizontal: 10, marginTop: -10}}>
                                        <Text style={{fontSize: 14, textTransform: 'capitalize'}}>
                                            Mikey, Max
                                        </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', margin: 10}}>
                                            <TextInput 
                                                placeholder={Teams[3].name}
                                                placeholderTextColor='#000000a5'
                                                style={{textAlign: 'left', height: 30, width: 150, fontFamily: 'chalkboard-bold', fontSize: 16}}
                                                maxLength={20}
                                                //keyboardType='number-pad'
                                                autoFocus={false}
                                                //onChangeText={val => Set({val})}
                                                //onChangeText={val => setData({...data, title: val})}
                                                onChangeText={val => setTeamNames([
                                                    TeamNames[0],
                                                    TeamNames[1],
                                                    TeamNames[2],
                                                    val,
                                                    
                                                ])}
                                            /> 
                                        <View style={{ flexDirection: 'row'}}>
                                            <Feather
                                                name='plus-circle'
                                                color='#155843a5'
                                                size={18}
                                            />
                                            <Text style={{fontSize: 12, color: '#155843a5', marginLeft: 5}}>
                                                Add Player
                                            </Text>
                                        </View>
                                        
                                    </View>
                                    <View style={{marginHorizontal: 10, marginTop: -10}}>
                                        <Text style={{fontSize: 14, textTransform: 'capitalize'}}>
                                            Quinn, Bruna
                                        </Text>
                                    </View>
                                </View>  
                            </View>

                            <View style={{marginTop: 30}}>
                                    <View>
                                        <Text style={{paddingBottom: 5, fontSize: 16, color: '#000', fontWeight: 'bold', borderBottomColor: 'darkgray', borderBottomWidth: 1}}>
                                            Play Style
                                        </Text>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                            <Text style={{fontSize: 16}}>
                                                Rounds
                                            </Text> 
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                                thumbColor={isRoundWinsEnabled ? "#155843" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitchRoundWins}
                                                value={isRoundWinsEnabled}
                                            />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                            <Text style={{fontSize: 16}}>
                                                Points
                                            </Text> 
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                                thumbColor={isPointsEnabled ? "#155843" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitchPoints}
                                                value={isPointsEnabled}
                                            />
                                        </View>

                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                            <Text style={{fontSize: 16}}>
                                                Lowest Points Wins
                                            </Text> 
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                                thumbColor={isLowestPointsEnabled ? "#155843" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitchLowestPoints}
                                                value={isLowestPointsEnabled}
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
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                                thumbColor={isBidEnabled ? "#155843" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitchBid}
                                                value={isBidEnabled}
                                            />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                            <Text style={{fontSize: 16}}>
                                                Meld
                                            </Text> 
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                                thumbColor={isMeldEnabled ? "#155843" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitchMeld}
                                                value={isMeldEnabled}
                                            />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                            <Text style={{fontSize: 16}}>
                                                Bonus +
                                            </Text> 
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                                thumbColor={isBonusEnabled ? "#155843" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitchBonus}
                                                value={isBonusEnabled}
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
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                                thumbColor={isRomanEnabled ? "#155843" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitchRoman}
                                                value={isRomanEnabled}
                                            />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                            <Text style={{fontSize: 16}}>
                                                Show Round Winners
                                            </Text> 
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                                thumbColor={isRoundWinnerEnabled ? "#155843" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitchRoundWinner}
                                                value={isRoundWinnerEnabled}
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
                                            Use Timer
                                        </Text> 
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                            thumbColor={isTimerEnabled ? "#155843" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleSwitchTimer}
                                            value={isTimerEnabled}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            10 Second Warning
                                        </Text> 
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                            thumbColor={isWarningEnabled ? "#155843" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleSwitchWarning}
                                            value={isWarningEnabled}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Round Length (sec)
                                        </Text> 
                                        <TextInput 
                                            placeholder='60'
                                            placeholderTextColor='#000000a5'
                                            keyboardType='number-pad'
                                            style={{textAlign: 'right', height: 30, width: 60, fontFamily: 'chalkboard-bold', fontSize: 16}}
                                            maxLength={5}
                                            autoFocus={false}
                                            onChangeText={val => setRoundLength(val)}
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
                            <TouchableOpacity onPress={ChangeSettings}>
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
                <View style={{marginTop: 20, marginHorizontal: 0, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={showSettingModal} >
                        <Feather 
                            name='settings'
                            size={20}
                            color='#fff'
                        />
                    </TouchableOpacity>
                    <View style={{marginHorizontal: 20}}>
                        <OptionsMenu
                            customButton={MoreIcon}
                            destructiveIndex={1}
                            options={["Save Settings", "Mark as Complete", "Share", "Save Scores"]}
                            //actions={[editPost, deletePost]}
                        />
                    </View>
                    
                    
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
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            style={{ marginTop: 0, flexDirection: 'column', backgroundColor: '#fff', height: '100%'}}
                            contentContainerStyle={{width: 460}}
                            scrollEnabled={true}
                            //ref={scrollRef}
                            onScroll = {(event)=>{{
                                handleVertScroll(event);}}}//Vertical scrolling distance 
                            ListHeaderComponent={() => (
                                <View style={{width: 460, height: 50}}>

                                </View>
                            )}
                            ListFooterComponent={() => (
                                <View>
                                    <View style={styles.roundbox}>
                                         
                                    </View>
                                    <View style={styles.roundbox}>
                                         
                                    </View>
                                    <View style={styles.roundbox}>
                                         
                                    </View>
                                </View>
                            )}   
                        />
                    
               </ScrollView>

                <FlatList 
                    data={Teams}
                    renderItem={renderItem}
                    //keyExtractor={item => item.id}
                    horizontal={true}
                    style={{position: 'absolute', top: 0, marginLeft: 60}}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{width: 400}}
                    ref={horzScrollRef2}
                    scrollEnabled={false}
                />
                
                { isRoundWinsEnabled ? (
                    <FlatList 
                        data={Teams}
                        renderItem={renderWinsFooter}
                        //keyExtractor={item => item.id}
                        horizontal={true}
                        style={{position: 'absolute', bottom: 48, marginLeft: 60}}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{width: 400}}
                        ref={horzScrollRef3}
                        scrollEnabled={false}
                        //extraData={roundUpdate}
                    />
                ) : null }

                { isPointsEnabled ? (
                    <FlatList 
                        data={Teams}
                        renderItem={renderFooter}
                        //keyExtractor={item => item.id}
                        horizontal={true}
                        style={{position: 'absolute', bottom: -2, marginLeft: 60}}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{width: 400}}
                        ref={horzScrollRef}
                        scrollEnabled={false}
                        extraData={Updated}
                    />
                ) : null }

                <FlatList
                    data={Scores}
                    renderItem={renderRounds}
                    //keyExtractor={item => item.id}
                    style={{width: 60, height: '100%', position: 'absolute', top: 0, left: 0, marginVertical: 0}}
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
                            <TouchableOpacity>
                                <Feather 
                                    name='plus-circle'
                                    color='lightgray'
                                    size={22}
                                /> 
                            </TouchableOpacity>
                            
                            </View>
                            <View style={styles.roundbox}>
                            </View>
                            <View style={styles.roundbox}>
                            </View>
                        </View>
                    )}
                />
                
            </View>

            { isRoundWinsEnabled ? (
                <View style={[styles.roundbox, { position: 'absolute', bottom: 50, left: 0}]}> 
                    <TouchableOpacity>
                        <View style={styles.roundbox}>
                            {/* <Text style={[styles.round, {fontSize: 12}]}>
                                Wins
                            </Text> */}
                        </View> 
                    </TouchableOpacity>
                </View>
            ) : null }

            { isPointsEnabled ? (
                <View style={[styles.roundbox, { position: 'absolute', bottom: 0, left: 0}]}> 
                    <TouchableOpacity>
                        <View style={styles.roundbox}>
                            {/* <Text style={[styles.round, {fontSize: 12}]}>
                                Points
                            </Text> */}
                            {/* <Feather 
                                name='plus-circle'
                                color='gray'
                                size={22}
                            />  */}
                        </View> 
                    </TouchableOpacity>
                </View>
            ) : null }
           
            

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
        fontFamily: 'chalkboard-bold',
        textAlign: 'center'
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
        //color: '#000000a5',
        fontFamily: 'chalkboard-regular',
    },
    roundbox: {
        paddingVertical: 0, 
        width: 60, 
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
