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

    const [isRoundWinsEnabled, setIsRoundWinsEnabled] = useState(false);
    const toggleSwitchRoundWins = () => setIsRoundWinsEnabled(previousState => !previousState);

    const [isPointsEnabled, setIsPointsEnabled] = useState(false);
    const toggleSwitchPoints = () => setIsPointsEnabled(previousState => !previousState);

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
                score: [null, null, null, null],
            },
            {
                round: 2,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 3,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 4,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 5,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 6,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 7,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 8,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 9,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 10,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 11,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 12,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 13,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 14,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
            },
            {
                round: 15,
                team: [1, 2, 3, 4],
                score: [null, null, null, null],
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

    const [Updated, setUpdated] = useState(true);


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

    const [leader, setLeader] = useState(null)

    useEffect(() => {
        setLeader( Math.max(Teams[0].total, Teams[1].total, Teams[2].total, Teams[3].total))
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
        
        console.log(text);
        console.log(id)
        console.log(TeamNames)
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

      const renderItemScoreRow = ({ item }) => {
        
        return (
          <ScoreRow
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


      const [roundState, setRoundState] = useState(0);
      const [teamState, setTeamState] = useState(0);

//Scorebox Modal
      const [visible, setVisible] = useState(false);
  
      const showModal = ({round, team1, team2, team3, team4}) => {

        const team = () => {
            if (team1) return team1;
            else if (team2) return team2;
            else if (team3) return team3;
            else if (team4) return team4;
            else return null;
        }
            setVisible(true);
            setRoundState(round);
            setTeamState(team());
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

      const ScoreRow = ({score, round, team}) => {

        const team1 = team[0];
        const team2 = team[1];
        const team3 = team[2];
        const team4 = team[3];

        return (
            <View style={{flexDirection: 'row', height: 50}}>
                <View style={{backgroundColor: '#155843', width: 60}}>
    
                </View>
                <TouchableOpacity onPress={() => showModal({round, team1})}>
                    <View style={styles.scorebox}>
                        <Text style={styles.score}>
                            {score[0]}
                        </Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => showModal({round, team2})}>
                    <View style={styles.scorebox}>
                        <Text style={styles.score}>
                            {score[1]}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => showModal({round, team3})}>
                    <View style={styles.scorebox}>
                        <Text style={styles.score}>
                            {score[2]}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => showModal({round, team4})}>
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

        let newArray = [...Scores];
        newArray[roundState - 1].score[teamState - 1 ] = textNum;
        setScores(newArray);

        hideModal();

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
                                                Round Wins
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
                            keyExtractor={item => item.id}
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
                        
                        style={{position: 'absolute', top: 0, marginLeft: 60}}
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
                    
                    style={{position: 'absolute', bottom: -2, marginLeft: 60}}
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
                    <TouchableOpacity>
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
        color: '#000000a5',
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
