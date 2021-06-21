import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Switch, StyleSheet, Dimensions, ScrollView, Animated, SectionList, FlatList, TouchableOpacity, TextInput, RefreshControlBase } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Modal, Portal, Provider } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

import OptionsMenu from "react-native-option-menu";

import Timer from '../Components/Timer';
import { FULLSCREEN_UPDATE_PLAYER_DID_PRESENT } from 'expo-av/build/Video';

const MoreIcon = ( <Feather name='more-vertical' color='#fff' size={20}/> )

const SCREEN_WIDTH = Dimensions.get('window').width

const DoneSound = ['none', 'ting', 'rooster', 'whistle', 'doorbell', 'air horn', 'trombone', 'meep meep','tick tock!', 'bomb']

const Ticker = ['none', 'clock', 'stopwatch', 'grandfather clock', 'water tap', 'blood', 'war drums', 'jumanji', 'jeopordy']



var toRoman = require('roman-numerals').toRoman;
[ 42, new Number(42), '42', new String('42')].forEach(function (x, i) {
    //console.log('%d: %s', i, toRoman(x));
});



const Scorecard = ({navigation}) => {

    const [Totals, setTotals] = useState([0, 0, 0, 0]);

    const [isBidEnabled, setIsBidEnabled] = useState(false);
    const toggleSwitchBid = () => setIsBidEnabled(previousState => !previousState);

    const [isMeldEnabled, setIsMeldEnabled] = useState(false);
    const toggleSwitchMeld = () => setIsMeldEnabled(previousState => !previousState);

    const [isBonusEnabled, setIsBonusEnabled] = useState(false);
    const toggleSwitchBonus = () => setIsBonusEnabled(previousState => !previousState);

    const [isRomanEnabled, setIsRomanEnabled] = useState(true);
    const toggleSwitchRoman = () => setIsRomanEnabled(previousState => !previousState);

    const [isRoundWinnerEnabled, setIsRoundWinnerEnabled] = useState(true);
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

    const [roundLength, setRoundLength] = useState(60000)

    const [sound, setSound] = useState('');

    const [ticker, setTicker] = useState('');

    const [newSetting, setNewSetting] = useState(false);

    const CELL_WIDTH = isBidEnabled === true || isMeldEnabled === true || isBonusEnabled === true ? 150 : 100

    const CELL_HEIGHT = isBidEnabled === true || isMeldEnabled === true || isBonusEnabled === true ? 100 : 50



    const Footer = ({total, style}) => {


        return (
            <View style={{ height: 50, backgroundColor: '#fff', flexDirection: 'row'}}>
                
               
    
                <View style={{ width: CELL_WIDTH, alignItems: 'center', justifyContent: 'center'}}>
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
                
               
    
                <View style={{ width: CELL_WIDTH, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[styles.score, style, {fontFamily: 'chalkboard-bold', fontSize: 22}]}>
                        {roundWins}
                    </Text>
                </View>
                
            </View>
        );
    }

    const ConvertToMillis = (val) => {
        let time = parseInt(val) * 1000
        setRoundLength(time)
        console.log(time)
    }


    const RoundsColumn = ({round}) => {
        return (
            <View style={[styles.roundbox, {height: CELL_HEIGHT}]}>
                <Text style={styles.round}>
                    {isRomanEnabled === true ? toRoman(round) : round}
                </Text>
            </View>
        );
    }


    const [Scores, setScores] = useState(
        [
            {
                round: 1,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 2,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 3,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 4,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 5,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 6,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 7,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 8,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 9,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 10,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 11,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 12,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 13,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 14,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
            {
                round: 15,
                team: [1, 2, 3, 4],
                score: ['', '', '', ''],
                extra: [
                    ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
                ],
                winner: null,
            },
        ]
    )

    

    const [Teams, setTeams] = useState(
        [
            {
                id: 1,
                name: 'Team 1',
                playerNames: [''],
                playerID: [1, 2],
                total: Scores.reduce((a,v) =>  a = a + v.score[3] , 0 ),
                //total: Scores.reduce((a,v) =>  a = parseInt(a) + parseInt(v.score[0]) , 0 ), 
                roundWins: Scores.reduce((count, item) => count + (item.winner === 0 ? 1 : 0), 0),
                
            },
            {
                id: '2',
                name: 'Team 2',
                playerNames: [''],
                playerID: [3, 4],
                total: Scores.reduce((a,v) =>  a = a + v.score[1] , 0 ),
                //total: Scores.reduce((a,v) =>  a = parseInt(a) + parseInt(v.score[1]) , 0 ), 
                roundWins: Scores.reduce((count, item) => count + (item.winner === 1 ? 1 : 0), 0),
            },
            {
                id: '3',
                name: 'Team 3',
                playerNames: [''],
                playerID: [5, 6],
                total: Scores.reduce((a,v) =>  a = a + v.score[2] , 0 ),
                //total: Scores.reduce((a,v) =>  a = parseInt(a) + parseInt(v.score[2]) , 0 ),
                roundWins: Scores.reduce((count, item) => count + (item.winner === 2 ? 1 : 0), 0),
            },
            {
                id: '4',
                name: 'Team 4',
                playerNames: [''],
                playerID: [7, 8],
                total: Scores.reduce((a,v) =>  a = a + v.score[3] , 0 ),
                //total: Scores.reduce((a,v) =>  a = parseInt(a) + parseInt(v.score[3]) , 0 ),
                roundWins: Scores.reduce((count, item) => count + (item.winner === 3 ? 1 : 0), 0),
            },
        ]
    
    )



    const [ScorecardData, setScorecardData] = useState(
        {
            id: '1',
            name: new Date().toDateString(),
            updated: false,
            dateCreated: new Date().toDateString(),
            teams: [Teams],
            scores: [Scores]
        },
    );

// State controllers
    const [Updated, setUpdated] = useState(true);
    const [roundUpdate, setRoundUpdate] = useState(false);

//clear scorecard

    const blankScorecard = {
        id: '1',
        name: new Date().toDateString(),
        updated: false,
        dateCreated: new Date().toDateString(),
        teams: [Teams],
        scores: [Scores]
    }

    const blankTeams = [
        {
            id: 1,
            name: 'Team 1',
            playerID: [1, 2],
            total: 0 ,
            roundWins: 0,
            
        },
        {
            id: '2',
            name: 'Team 2',
            playerID: [3, 4],
            total:  0 ,
            roundWins: 0,
        },
        {
            id: '3',
            name: 'Team 3',
            playerID: [5, 6],
            total: 0,
            roundWins: 0,
        },
        {
            id: '4',
            name: 'Team 4',
            playerID: [7, 8],
            total: 0,
            roundWins: 0,
        },
    ]
    const blankScores = [
        {
            round: 1,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
    
        },
        {
            round: 2,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 3,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 4,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 5,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 6,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 7,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 8,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 9,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 10,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 11,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 12,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 13,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 14,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
        {
            round: 15,
            team: [1, 2, 3, 4],
            score: ['', '', '', ''],
            extra: [
                ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
            ],
            winner: null,
        },
    ];



    //Scorecard Settings Modal
    const [visibleSettingModal, setVisibleSettingModal] = useState(false);
    
    const showSettingModal = () => setVisibleSettingModal(true);

    const hideSettingModal = () => setVisibleSettingModal(false);
    const settingModalContainerStyle = {
        backgroundColor: 'transparent', 
        padding: 20,
    }; 

    const addPlayerRef = useRef();

    const [teamPlayer, setTeamPlayer] = useState('');

    const [players, setPlayers] = useState([])

    const [TeamName, setTeamName] = useState('Some Team');

    const [TeamNames, setTeamNames] = useState(['Team 1', 'Team 2', 'Team 3', 'Team 4']);

    const [TeamSettingId, setTeamSettingId] = useState(0)

    const AddTeam = () => {

        let newArray = [...TeamNames];
        newArray[TeamSettingId - 1] = TeamName;
        setTeamNames(newArray);

        let teamArray = [...Teams];
        teamArray[TeamSettingId - 1].playerNames = players;
        setTeams(teamArray)

        hideTeamModal();

    }

    const ChangeSettings = () => {    

        let newArray = [...Teams];
        newArray[0].name = TeamNames[0];
        newArray[1].name = TeamNames[1];
        newArray[2].name = TeamNames[2];
        newArray[3].name = TeamNames[3];
        setTeams(newArray);

        setUpdated(!Updated);
        setRoundUpdate(!roundUpdate)
        setNewSetting(!newSetting);
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
        if (isLowestPointsEnabled === false) {
            setLeader( Math.max(Teams[0].total, Teams[1].total, Teams[2].total, Teams[3].total).toString());
            setRoundLeader( Math.max(Teams[0].roundWins, Teams[1].roundWins, Teams[2].roundWins, Teams[3].roundWins));
        }
        if (isLowestPointsEnabled === true) {
            setLeader( Math.min(Teams[0].total, Teams[1].total, Teams[2].total, Teams[3].total).toString());
            setRoundLeader( Math.max(Teams[0].roundWins, Teams[1].roundWins, Teams[2].roundWins, Teams[3].roundWins));
        }
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
                <TouchableOpacity onPress={() => showTeamModal({name, id})}>
                    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', margin: 10}}>
                        <Text style={{fontFamily: 'chalkboard-bold', fontSize: 16, color: '#000000a5'}}>
                            {TeamNames[id - 1]}
                        </Text>
                        
                        
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            
                            {/* <Text style={{fontSize: 12, color: '#155843a5', marginLeft: 5}}>
                                EDIT
                            </Text> */}
                            
                                <Feather 
                                    name='edit'
                                    color='#155843a5'
                                    size={18}
                                    style={{marginHorizontal: 5}}
                                />
                            
                            
                        </View>
                    </View>
                    <View style={{marginHorizontal: 10, marginTop: -10}}>
                        <Text style={{fontSize: 14, textTransform: 'capitalize'}}>
                            {Teams[id - 1].playerNames.join(', ')}
                        </Text>
                    </View>
                </TouchableOpacity>
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

      

//New Scorecard  Modal
        const [visibleClearModal, setVisibleClearModal] = useState(false);
        
        const showClearModal = () => setVisibleClearModal(true);

        const hideClearModal = () => setVisibleClearModal(false);
        const clearModalContainerStyle = {
            backgroundColor: 'transparent', 
            padding: 20,
        }; 

//Extras Modal
        const [visibleExtrasModal, setVisibleExtrasModal] = useState(false);
                
        const showExtrasModal = ({ index, round}) => {
            setVisibleExtrasModal(true);
            setRoundState(round);
            setTeamState(index + 1);
        }

        const hideExtrasModal = () => setVisibleExtrasModal(false);
        const extrasModalContainerStyle = {
            backgroundColor: 'transparent', 
            padding: 20,
        }; 

//Team  Modal

    const [visibleTeamModal, setVisibleTeamModal] = useState(false);
        
    const showTeamModal = ({id, name}) => {

        setTeamSettingId(id);
        setVisibleTeamModal(true);
        console.log(id);
    
    }

    const hideTeamModal = () => setVisibleTeamModal(false);
    const teamModalContainerStyle = {
        backgroundColor: 'transparent', 
        padding: 20,
    }; 



    const HeaderRow = ({id, name}) => {

        return (
            <View style={{flexDirection: 'column', height: 50, backgroundColor: '#fff', justifyContent: 'center'}}>
                <TouchableOpacity onPress={showSettingModal}>
                    <View style={[styles.headerbox, {width: CELL_WIDTH}]}>
                        <Text style={styles.header}>
                            {name}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    const [updateScores, setUpdateScores] = useState(false);

      const ScoreRow = ({index, round, score, team}) => {

        //const data = Scores[round - 1].score

        const Round = round

        const roundWinner =
            isLowestPointsEnabled === false ? Math.max(score[0], score[1], score[2], score[3]) :
            isLowestPointsEnabled === true ? Math.min(score[0], score[1], score[2], score[3]) : Math.max(score[0], score[1], score[2], score[3])


            const ExtraItemSingle = ({index, item}) => {

                return (
                    <View style={{borderColor: '#cccccc', borderRightWidth: 0.2, width: CELL_WIDTH }}>
                        <TouchableOpacity style={{height: 50, paddingTop: 5, opacity: item ? 0.3 : 1}} onPress={() => {showExtrasModal({index, round});}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>

                                { isBidEnabled === true ? (
                                    <View style={{ paddingBottom: 4, borderBottomWidth: 0.3, borderColor: 'lightgray', flexDirection: 'row', justifyContent: 'space-around', width: CELL_WIDTH/3}}>
                                            <View style={{ width: 50, alignItems: 'center'}}>
                                                <Text style={{fontWeight: 'bold', fontSize: 11}}>
                                                    Bid
                                                </Text>
                                            </View>   
                                    </View>
                                ) : null}

                                { isMeldEnabled === true ? (
                                    <View style={{ paddingBottom: 4, borderBottomWidth: 0.3, borderColor: 'lightgray', flexDirection: 'row', justifyContent: 'space-around', width: CELL_WIDTH/3}}>
                                            <View style={{ width: 50, alignItems: 'center'}}>
                                                <Text style={{fontWeight: 'bold', fontSize: 11}}>
                                                    Meld
                                                </Text>
                                            </View>
                                    </View>
                                ) : null}

                                { isBonusEnabled === true ? (
                                    <View style={{ paddingBottom: 4, borderBottomWidth: 0.3, borderColor: 'lightgray', flexDirection: 'row', justifyContent: 'space-around', width: CELL_WIDTH/3}}>
                                            <View style={{ width: 50, alignItems: 'center'}}>
                                                <Text style={{fontWeight: 'bold', fontSize: 11}}>
                                                    Bonus
                                                </Text>
                                            </View>
                                    </View>
                                ) : null}

                            </View>

                            <View style={{ paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-around', width: CELL_WIDTH}}>
                               
                                    {/* <View style={{ width: 50, alignItems: 'center'}}> */}
                                    { isBidEnabled === true ? (
                                        <Text style={{fontFamily: 'chalkboard-light'}}>
                                            {item[0]}
                                        </Text>
                                    ) : null}
                                        { isMeldEnabled === true ? (
                                        <Text style={{fontFamily: 'chalkboard-light'}}>
                                            {item[1]}
                                        </Text>
                                    ) : null}
                                        { isBonusEnabled === true ? (
                                        <Text style={{fontFamily: 'chalkboard-light'}}>
                                            {item[2]}
                                        </Text>
                                    ) : null}
                                    {/* </View> */}
                             
                            </View> 
                            
                        
                        </TouchableOpacity>
                </View>
                );
                
            }


            // const ExtraItem = ({index, item}) => {

            //     return (
            //         <View style={{borderColor: '#cccccc', borderRightWidth: 0.2, width: CELL_WIDTH/3, backgroundColor: 'cyan'  }}>
            //             <TouchableOpacity style={{height: 50, paddingTop: 5, opacity: item ? 0.3 : 1}} onPress={() => {showExtrasModal({index, round});}}>
                        
            //                 <View style={{ paddingBottom: 4, borderBottomWidth: 0.3, borderColor: 'lightgray', flexDirection: 'row', justifyContent: 'space-around', width: CELL_WIDTH/3}}>
                                
            //                         <View style={{ width: 50, alignItems: 'center'}}>
            //                             <Text style={{fontWeight: 'bold', fontSize: 11}}>
            //                                 Bid
            //                             </Text>
            //                         </View>
                                
            //                 </View>

            //                 <View style={{ paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-around', width: CELL_WIDTH/3}}>
                               
            //                         <View style={{ width: 50, alignItems: 'center'}}>
            //                             <Text style={{fontFamily: 'chalkboard-light'}}>
            //                                 {item}
            //                             </Text>
            //                         </View>
                             
            //                 </View> 
                        
            //             </TouchableOpacity>
            //     </View>
            //     );
                
            // }

            // const MeldItem = ({index, item}) => {

            //     return (
            //         <View style={{borderColor: '#cccccc', borderRightWidth: 0.2, width: CELL_WIDTH/3, backgroundColor: 'yellow'}}>
            //         <TouchableOpacity style={{height: 50, paddingTop: 5, opacity: item ? 0.3 : 1}} onPress={() => {showExtrasModal({index, round});}}>
                    
            //             <View style={{ paddingBottom: 4, borderBottomWidth: 0.3, borderColor: 'lightgray', flexDirection: 'row', justifyContent: 'space-around', width: CELL_WIDTH/3}}>
                            
                           
            //                     <View style={{ width: 50, alignItems: 'center'}}>
            //                         <Text style={{fontWeight: 'bold', fontSize: 11}}>
            //                             Meld
            //                         </Text>
            //                     </View>
                          
            //             </View>

            //             <View style={{ paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-around', width: CELL_WIDTH/3}}>
                         
            //                     <View style={{ width: 50, alignItems: 'center'}}>
            //                         <Text style={{fontFamily: 'chalkboard-light'}}>
            //                             {item}
            //                         </Text>
            //                     </View>
                        
            //             </View> 
                    
            //         </TouchableOpacity>
            //     </View>
            //     );
                
            // }

            // const BonusItem = ({index, item}) => {

            //     return (
            //         <View style={{borderColor: '#cccccc', borderRightWidth: 0.2, width: CELL_WIDTH/3, backgroundColor: 'lime' }}>
            //         <TouchableOpacity style={{height: 50, paddingTop: 5, opacity: item ? 0.3 : 1}} onPress={() => {showExtrasModal({index, round});}}>
                    
            //             <View style={{ paddingBottom: 4, borderBottomWidth: 0.3, borderColor: 'lightgray', flexDirection: 'row', justifyContent: 'space-around', width: CELL_WIDTH/3}}>
                          
            //                     <View style={{ width: 50, alignItems: 'center'}}>
            //                         <Text style={{fontWeight: 'bold', fontSize: 11}}>
            //                             Bonus
            //                         </Text>
            //                     </View>
                          
            //             </View>

            //             <View style={{ paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-around', width: CELL_WIDTH/3}}>
                       
            //                     <View style={{ width: 50, alignItems: 'center'}}>
            //                         <Text style={{fontFamily: 'chalkboard-light'}}>
            //                             {item}
            //                         </Text>
            //                     </View>
                    
            //             </View> 
                    
            //         </TouchableOpacity>
            //     </View>
            //     );
                
            // }

        const Row = ({item, index, style}) => {

            const round = Round

            return (
                  <View style={{}}>
                        <View style={[styles.scorebox, style, { width: CELL_WIDTH, height: 50}]}>
                            <TouchableOpacity onPress={() => {showModal({index, round});}}>
                                <View style={{width: CELL_WIDTH, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={[styles.score]}>
                                        {item}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                  </View> 
            )
        }

        const renderRow = ({ item, index }) => {

            const backgroundColor = item === roundWinner && item !== 0 && isRoundWinnerEnabled === true ? '#f0f0f0a5' : '#fff';

            return (
                <Row
                    index={index}
                    item={item}
                    style={{  backgroundColor }}
                />
            );
        };

        const renderExtraItemSingle = ({ item, index }) => {
            return (
                <ExtraItemSingle
                    index={index}
                    item={item}
                />
            );
        };

        // const renderExtraItem = ({ item, index }) => {
        //     return (
        //         <ExtraItem
        //             index={index}
        //             item={item}
        //         />
        //     );
        // };

        // const renderMeldItem = ({ item, index }) => {
        //     return (
        //         <MeldItem
        //             index={index}
        //             item={item}
        //         />
        //     );
        // };

        // const renderBonusItem = ({ item, index }) => {
        //     return (
        //         <BonusItem
        //             index={index}
        //             item={item}
        //         />
        //     );
        // };



        return (
            <View style={{flexDirection: 'row', height: CELL_HEIGHT}}>
                <View style={{backgroundColor: '#155843', width: 60}}>
    
                </View>

                <View style={{ }}>

                    { isBidEnabled === true || isMeldEnabled === true || isBonusEnabled === true ? (
                    <View>
                        <FlatList 
                            data={Scores[round - 1 ].extra}
                            renderItem={renderExtraItemSingle}
                            //keyExtractor={(item, index) => item.id.toString()}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal={true}
                            //style={{position: 'absolute'}}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{width: CELL_WIDTH * 4, height: 50}}
                            scrollEnabled={false}
                            extraData={updateScores}
                        />
                    </View>
                    ) : null}

                    {/* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                        { isBidEnabled === true ? (
                        <FlatList 
                            data={Scores[round - 1 ].bid}
                            renderItem={renderExtraItem}
                            //keyExtractor={(item, index) => item.id.toString()}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal={true}
                            //style={{position: 'absolute'}}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{width: CELL_WIDTH * 4, height: 50}}
                            scrollEnabled={false}
                            extraData={updateScores}
                        />
                        ) : null }
                        { isMeldEnabled === true ? (
                            <FlatList 
                                data={Scores[round - 1 ].meld}
                                renderItem={renderMeldItem}
                                //keyExtractor={(item, index) => item.id.toString()}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                //style={{position: 'absolute'}}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{width: CELL_WIDTH * 4, height: 50}}
                                scrollEnabled={false}
                                extraData={updateScores}
                            />
                        ) : null }
                        { isBonusEnabled === true ? (
                            <FlatList 
                                data={Scores[round - 1 ].bonus}
                                renderItem={renderBonusItem} 
                                //keyExtractor={(item, index) => item.id.toString()}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                //style={{position: 'absolute'}}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{width: CELL_WIDTH * 4, height: 50}}
                                scrollEnabled={false}
                                extraData={updateScores}
                            />
                        ) : null }
                    </View> */}

                
                <FlatList 
                    data={Scores[round - 1].score}
                    renderItem={renderRow}
                    
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    //style={{position: 'absolute', top: 0, marginLeft: 60}}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{width: CELL_WIDTH * 4, height: 70}}
                    scrollEnabled={false}
                    extraData={updateScores}
                    
                    
                />
                </View>
        </View>
        );
    }

    const [text, setText] = useState('');

    const textNum = parseInt(text);

    const [bidText, setBidText] = useState('');

    const textBid = parseInt(bidText);

    const [meldText, setMeldText] = useState('');

    const textMeld = parseInt(meldText);

    const [bonusText, setBonusText] = useState('');

    const textBonus = parseInt(bonusText);

    const [winnerState, setWinnerState] = useState(0);

    const UpdateExtra = () => {

        let prev = Scores[roundState - 1].extra[teamState - 1][0]

        let newArray = [...Scores];
        newArray[roundState - 1].extra[teamState - 1 ] = [
            bidText === '' ? Scores[roundState - 1].extra[teamState - 1][0] : bidText, 
            meldText === '' ? Scores[roundState - 1].extra[teamState - 1][1] : meldText, 
            bonusText === '' ? Scores[roundState - 1].extra[teamState - 1][2] : bonusText
        ];
        //if (meldText !== '') {newArray[roundState - 1].meld[teamState - 1 ][1] = textMeld;}
        //if (bonusText !== '') {newArray[roundState - 1].bonus[teamState - 1 ][2] = textBonus;}

        setScores(newArray);
        setUpdated(!Updated)    
        setRoundUpdate(!roundUpdate);
        setBidText('');
        setMeldText('');
        setBonusText('');

        hideExtrasModal();
    }

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

        const roundWinner = isLowestPointsEnabled === false ? Math.max(newArray[roundState - 1].score[0], newArray[roundState - 1].score[1], newArray[roundState - 1].score[2], newArray[roundState - 1].score[3]) :
                            isLowestPointsEnabled === true ? Math.min(newArray[roundState - 1].score[0], newArray[roundState - 1].score[1], newArray[roundState - 1].score[2], newArray[roundState - 1].score[3]) :
                            Math.max(newArray[roundState - 1].score[0], newArray[roundState - 1].score[1], newArray[roundState - 1].score[2], newArray[roundState - 1].score[3])
        

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


//clear scorecard function
    const clearScorecard = () => {

        let array = {...blankScorecard};
        array.name = new Date().toDateString();
        
        setScores(blankScores);
        setTeams(blankTeams);
        setScorecardData(array);
        setUpdateScores(!updateScores);    
        
        //setUpdated(!Updated);
        //setRoundUpdate(!roundUpdate)
        hideClearModal(); 
    }

    const [timePlaceholder, setTimePlaceholder] = useState('');
    const [TickerPlaceholder, setTickerPlaceholder] = useState('None');
    const [DoneSoundPlaceholder, setDoneSoundPlaceholder] = useState('None');

    return (
        <Provider>
        <View>

{/*Score Modal */}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 15,}}>

                        <View style={{ alignItems: 'center'}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-bold'}}>
                                {   teamState === 1 ? Teams[0].name :
                                    teamState === 2 ? Teams[1].name :
                                    teamState === 3 ? Teams[2].name :
                                    teamState === 4 ? Teams[3].name : 'Some Team'}
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

{/* New Scorecard Modal */}
                <Modal visible={visibleClearModal} onDismiss={hideClearModal} contentContainerStyle={clearModalContainerStyle}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 15,}}>

                        <View style={{ alignItems: 'center', marginVertical: 40}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-regular', textAlign: 'center'}}>
                                Are you sure you want to erase this scorecard?
                            </Text>
                        </View>

                        <View style={{ alignItems: 'center'}}>
                            <TouchableOpacity onPress={clearScorecard}>
                                <View style={{ width: 200, height: 50, borderRadius: 25, backgroundColor: '#d92121', alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: '#fff', fontSize: 22, textAlign: 'center', fontWeight: 'bold'}}>
                                        Erase
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>



{/* Extras Modal */}
                <Modal visible={visibleExtrasModal} onDismiss={hideExtrasModal} contentContainerStyle={extrasModalContainerStyle}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 15,}}>

                    <View style={{ alignItems: 'center', marginVertical: 20}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-bold'}}>
                                {   teamState === 1 ? Teams[0].name :
                                    teamState === 2 ? Teams[1].name :
                                    teamState === 3 ? Teams[2].name :
                                    teamState === 4 ? Teams[3].name : 'Some Team'}
                            </Text>
                            <Text style={{fontSize: 16, fontFamily: 'chalkboard-bold'}}>
                                Round {roundState}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20}}>
                            <View style={{marginVertical: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                               <Text style={{fontSize: 20, fontFamily: 'chalkboard-bold'}}>
                                   Bid
                               </Text>
                               
                               <TextInput 
                                    placeholder={roundState ? Scores[roundState - 1].extra[teamState - 1][0] : '0'}
                                    placeholderTextColor='#000000a5'
                                    //defaultValue={Scores[roundState - 1].extra[teamState - 1][0]}
                                    style={{borderBottomWidth: 0.5, borderColor: 'lightgray', textAlign: 'center', height: 40, width: 60, fontFamily: 'chalkboard-bold', fontSize: 24, marginVertical: 10, color: '#363636a5'}}
                                    maxLength={20}
                                    keyboardType='number-pad'
                                    autoFocus={false}
                                    //value={bidText}
                                    //onChangeText={text =>setBidText(text)}
                                    onChangeText={text => setBidText(text)}
                                /> 
                            </View>
                            <View style={{marginVertical: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                               <Text style={{fontSize: 20, fontFamily: 'chalkboard-bold'}}>
                                   Meld
                               </Text>
                               
                               <TextInput 
                                    placeholder={roundState ? Scores[roundState - 1].extra[teamState - 1][1] : '0'}
                                    placeholderTextColor='#000000a5'
                                    style={{borderBottomWidth: 0.5, borderColor: 'lightgray', textAlign: 'center', height: 40, width: 60, fontFamily: 'chalkboard-bold', fontSize: 24, marginVertical: 10, color: '#363636a5'}}
                                    maxLength={20}
                                    keyboardType='number-pad'
                                    autoFocus={false}
                                    onChangeText={val =>setMeldText(val)}
                                /> 
                            </View>
                            <View style={{marginVertical: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                               <Text style={{fontSize: 20, fontFamily: 'chalkboard-bold'}}>
                                   Bonus
                               </Text>
                               
                               <TextInput 
                                    placeholder={roundState ? Scores[roundState - 1].extra[teamState - 1][2] : '0'}
                                    placeholderTextColor='#000000a5'
                                    style={{borderBottomWidth: 0.5, borderColor: 'lightgray', textAlign: 'center', height: 40, width: 60, fontFamily: 'chalkboard-bold', fontSize: 24, marginVertical: 10, color: '#363636a5'}}
                                    maxLength={20}
                                    keyboardType='number-pad'
                                    autoFocus={false}
                                    onChangeText={val =>setBonusText(val)}
                                /> 
                            </View>
                        </View>

                        <View style={{ alignItems: 'center'}}>
                            <TouchableOpacity onPress={UpdateExtra}>
                                <View style={{ marginTop: 20, width: 200, height: 50, borderRadius: 25, backgroundColor: '#155843', alignItems: 'center', justifyContent: 'center'}}>
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

                        <ScrollView style={{height: 460, marginTop: 10, marginBottom: 20}} showsVerticalScrollIndicator={false}>

                            <View style={{ alignItems: 'center', marginBottom: 20}}>
                                <Text style={{fontSize: 22, fontFamily: 'chalkboard-bold'}}>
                                    Scorecard Settings
                                </Text>
                            </View>

                            <View>
                                <Text style={{paddingBottom: 5, fontSize: 16, color: '#000', fontWeight: 'bold', borderBottomColor: 'darkgray', borderBottomWidth: 1}}>
                                    Card Title
                                </Text>

                                <View style={{ marginVertical: 10, marginHorizontal: 5}}>
                                    <TextInput 
                                        //placeholder={ScorecardData.name}
                                        placeholder='----'
                                        placeholderTextColor='#000000a5'
                                        style={{height: 40, width: '100%', fontFamily: 'chalkboard-bold', fontSize: 18}}
                                        maxLength={20}
                                        autoFocus={false}
                                        onChangeText={val => Set({val})}
                                    /> 
                                </View>
                            </View>


                        <View style={{marginTop: 10}}>
                                <View>
                                    <Text style={{paddingBottom: 5, fontSize: 16, color: '#000', fontWeight: 'bold', borderBottomColor: 'darkgray', borderBottomWidth: 1}}>
                                        Teams and Players
                                    </Text>

                                    <FlatList 
                                        data={Teams}
                                        renderItem={renderTeamList}
                                        keyExtractor={item => item.id.toString()}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={false}
                                        ListFooterComponent={() => 
                                            <View style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 30}}>
                                                <Feather
                                                name='plus-circle'
                                                color='#155843a5'
                                                size={18}
                                                />
                                                <Text style={{color: 'gray', fontSize: 12, marginLeft: 10}}>
                                                    Add Team
                                                </Text>
                                            </View>
                                        }
                                    />
                                </View>
                        </View>

                                    {/* <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', margin: 10}}>
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
                                            
                                            <Text style={{fontSize: 12, color: '#155843a5', marginLeft: 5}}>
                                                EDIT TEAM
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
                            </View> */}


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
                                            15 Second Warning
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
                                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{fontSize: 16}}>
                                                Length
                                            </Text> 
                                            <Text style={{ fontSize: 12, color: 'gray', marginLeft: 6}}>
                                                (in seconds)
                                            </Text>
                                        </View>
                                        
                                        <TextInput 
                                            //placeholder={(roundLength / 1000).toString()}
                                            placeholder={timePlaceholder}
                                            placeholderTextColor='#000000a5'
                                            keyboardType='number-pad'
                                            style={{textAlign: 'right', height: 30, width: 60, fontFamily: 'chalkboard-bold', fontSize: 16}}
                                            maxLength={5}
                                            autoFocus={false}
                                            onChangeText={val => ConvertToMillis(val)}
                                        />
                                    </View>
                                    
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Ding
                                        </Text> 
                                        <ModalDropdown 
                                            options={DoneSound}
                                            defaultValue={DoneSoundPlaceholder}
                                            defaultTextStyle={{ color: '#155843'}}
                                            onSelect={(val) => {setSound(val.toString()); setDoneSoundPlaceholder(DoneSound[val])}}
                                            style={{ 
                                            }}
                                            textStyle={{ color: '#155843', fontSize: 18, textTransform: 'capitalize', fontFamily: 'chalkboard-regular'}}
                                            dropdownStyle={{ 
                                                backgroundColor: '#363636', 
                                                width: 200, 
                                                borderWidth: 0,
                                                borderRadius: 15,
                                                height: 330,
                                                marginTop: 10
                                            }}
                                            dropdownTextStyle={{ 
                                                backgroundColor: 'transparent',
                                                color: '#fff',
                                                fontSize: 14,
                                                paddingHorizontal: 20,
                                                paddingVertical: 15,
                                                textTransform: 'capitalize',
                                                fontFamily: 'chalkboard-regular'
                                                
                                            }}
                                            dropdownTextHighlightStyle={{
                                                color: '#41a661'
                                            }}
                                            />
                                    </View>

                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Ticker
                                        </Text> 
                                        <ModalDropdown 
                                            options={Ticker}
                                            defaultValue={TickerPlaceholder}
                                            defaultTextStyle={{ color: '#155843'}}
                                            onSelect={(val) => {setTicker(val.toString()); setTickerPlaceholder(Ticker[val])}}
                                            style={{ 
                                            }}
                                            textStyle={{ color: '#155843', fontSize: 18, textTransform: 'capitalize', fontFamily: 'chalkboard-regular'}}
                                            dropdownStyle={{ 
                                                backgroundColor: '#363636', 
                                                width: 200, 
                                                borderWidth: 0,
                                                borderRadius: 15,
                                                height: 320,
                                                marginTop: 10
                                            }}
                                            dropdownTextStyle={{ 
                                                backgroundColor: 'transparent',
                                                color: '#fff',
                                                fontSize: 14,
                                                paddingHorizontal: 20,
                                                paddingVertical: 15,
                                                textTransform: 'capitalize',
                                                fontFamily: 'chalkboard-regular'
                                                
                                            }}
                                            dropdownTextHighlightStyle={{
                                                color: '#41a661'
                                            }}
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

{/* Team Modal */}
                <Modal visible={visibleTeamModal} onDismiss={hideTeamModal} contentContainerStyle={teamModalContainerStyle}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 15,}}>

                        <View style={{ alignItems: 'center', marginVertical: 40}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-regular', textAlign: 'center'}}>
                                Team Name:
                            </Text>
                            <TextInput 
                                placeholder={'Enter a team name'}
                                placeholderTextColor='lightgray'
                                style={{textAlign: 'center', borderBottomWidth: 0.5, borderColor: 'gray', height: 50, width: '100%', fontFamily: 'chalkboard-bold', fontSize: 20}}
                                maxLength={20}
                                onChangeText={val => setTeamName(val)}
                                    
                            /> 
                        </View>

                        <View style={{ alignItems: 'center', marginBottom: 40}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-regular', textAlign: 'center', marginBottom: 10}}>
                                Add Player:
                            </Text>
                                      
                            <FlatList 
                                data={players}
                                scrollEnabled={false}
                                numColumns={3}
                                style={{}}
                                contentContainerStyle={{width: '100%'}}
                                renderItem={({item}) => 
                                    <View style={{ backgroundColor: '#e0e0e0', paddingVertical: 4, paddingHorizontal: 14, margin: 6, borderRadius: 20}}>
                                        <Text style={{textTransform: 'capitalize', fontSize: 17, fontFamily: 'chalkboard-regular', textAlign: 'center'}}>
                                            {item}
                                        </Text>
                                    </View>
                                }
                            />
                            
                            <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
                                <TextInput 
                                    placeholder='Enter a player name'
                                    placeholderTextColor='lightgray'
                                    style={{textAlign: 'center', borderBottomWidth: 0.5, borderColor: 'gray', height: 50, width: 220, fontFamily: 'chalkboard-bold', fontSize: 20}}
                                    maxLength={20}
                                    onChangeText={val => setTeamPlayer(val)}  
                                    ref={addPlayerRef}
                                /> 
                                <TouchableOpacity onPress={() =>  {setPlayers([...players, teamPlayer]); addPlayerRef.current.clear(); }}>
                                    <View style={{alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 15, backgroundColor: '#155843a5'}}>
                                        <Feather 
                                            name='corner-right-up'
                                            color='#fff'
                                            size={24}
                                        />
                                    </View>
                                </TouchableOpacity>
                                
                            </View>
                            
                        </View>

                        <View style={{ alignItems: 'center'}}>
                            <TouchableOpacity onPress={AddTeam}>
                                <View style={{ width: 200, height: 50, borderRadius: 25, backgroundColor: '#155843', alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', fontFamily: 'chalkboard-bold'}}>
                                        Create Team
                                    </Text>
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
                    <TouchableOpacity onPress={() => {showSettingModal(); setTimePlaceholder((roundLength / 1000).toString())}} >
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
                            options={["New","Save Settings", "Mark as Complete", "Share", "Save Scores"]}
                            actions={[showClearModal]}
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
                            contentContainerStyle={{width: CELL_WIDTH * 4 + 60}}
                            scrollEnabled={true}
                            extraData={updateScores}
                            //ref={scrollRef}
                            onScroll = {(event)=>{{
                                handleVertScroll(event);}}}//Vertical scrolling distance 
                            ListHeaderComponent={() => (
                                <View style={{width: CELL_WIDTH * 4 + 60, height: 50}}>

                                </View>
                            )}
                            ListFooterComponent={() => (
                                <View>
                                    <View style={[styles.roundbox, {height: 50}]}>
                                         
                                    </View>
                                    <View style={[styles.roundbox, {height: 50}]}>
                                         
                                    </View>
                                    <View style={[styles.roundbox, {height: 50}]}>
                                         
                                    </View>
                                    {isTimerEnabled === true ? (
                                        <View>
                                            <View style={[styles.roundbox, {height: 50}]}>
                                         
                                        </View>
                                        <View style={[styles.roundbox, {height: 50}]}>
                                         
                                        </View>
                                        </View>
                                        
                                    ) : null}

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
                    contentContainerStyle={{width: CELL_WIDTH * 4}}
                    ref={horzScrollRef2}
                    scrollEnabled={false}
                />
                
                { isRoundWinsEnabled ? (
                    <FlatList 
                        data={Teams}
                        renderItem={renderWinsFooter}
                        //keyExtractor={item => item.id}
                        horizontal={true}
                        style={{position: 'absolute', marginLeft: 60,
                            bottom: 
                                isTimerEnabled === true && isPointsEnabled === true ? 108 : 
                                isTimerEnabled === true && isPointsEnabled === false ? 60 : 
                                isTimerEnabled === false && isPointsEnabled === true ? 48 :
                                isTimerEnabled === false && isPointsEnabled === false ? -2 : 48
                            }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{width: CELL_WIDTH * 4}}
                        ref={horzScrollRef3}
                        scrollEnabled={false}
                        extraData={roundUpdate}
                    />
                ) : null }

                { isPointsEnabled ? (
                    <FlatList 
                        data={Teams}
                        renderItem={renderFooter}
                        //keyExtractor={item => item.id}
                        horizontal={true}
                        style={{position: 'absolute', bottom: isTimerEnabled === true ? 58 : -2, marginLeft: 60}}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{width: CELL_WIDTH * 4}}
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
                        <View style={[styles.roundbox, {height: 50}]}>
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <View>
                            <View style={[styles.roundbox, {height: 50}]}>
                            <TouchableOpacity>
                                <Feather 
                                    name='plus-circle'
                                    color='lightgray'
                                    size={22}
                                /> 
                            </TouchableOpacity>
                            
                            </View>
                            <View style={[styles.roundbox, {height: 50}]}>
                            </View>
                            <View style={[styles.roundbox, {height: 50}]}>
                            </View>
                            {isTimerEnabled === true ? (
                                        <View>
                                            <View style={[styles.roundbox, {height: 50}]}>
                                         
                                        </View>
                                        <View style={[styles.roundbox, {height: 50}]}>
                                         
                                        </View>
                                        </View>
                                        
                                    ) : null}
                        </View>
                    )}
                />
                
            </View>

            { isRoundWinsEnabled ? (
                <View style={[styles.roundbox, { position: 'absolute', 
                    bottom: isTimerEnabled === true ? 110 : isPointsEnabled === false ? 0 : 50
                    , left: 0, height: 50}]}> 
                    <TouchableOpacity>
                        <View style={[styles.roundbox, {height: 50}]}>
                            {/* <Text style={[styles.round, {fontSize: 12}]}>
                                Wins
                            </Text> */}
                        </View> 
                    </TouchableOpacity>
                </View>
            ) : null }

            { isPointsEnabled ? (
                <View style={[styles.roundbox, { 
                    position: 'absolute', 
                    bottom: isTimerEnabled === true ? 60 : 0, 
                    left: 0, height: 50}]}> 
                    <TouchableOpacity>
                        <View style={[styles.roundbox, {height: 50}]}>
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

            { isTimerEnabled ? (
                <View style={{position: 'absolute', bottom: 0, left: 0}}> 
                    <Timer 
                        warning={isWarningEnabled}
                        length={roundLength}
                        ticker={ticker}
                        donesound={sound}
                        settingchange={newSetting}
                    />
                </View>
            ) : null }
           
            

            <View style={[styles.roundbox, { position: 'absolute', top: 80, left: 0, height: 50, width: 60}]}>      
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
        //width: 100,
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
        //height: 50,
        backgroundColor: '#fff',
        alignItems: 'center', 
        borderRightWidth: 0.3,
        justifyContent: 'center',
        
    },
    scorebox: {
        paddingVertical: 0, 
        //width: CELL_WIDTH, 
        //height: 50,
        alignItems: 'center', 
        borderRightWidth: 0.2,
        borderBottomWidth: 0.2,
        justifyContent: 'center',
        borderColor: '#cccccc',
        
    },
});

export default Scorecard;
