import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Switch, StyleSheet, Dimensions, ScrollView, ImageBackground, TouchableWithoutFeedback, Animated, SectionList, FlatList, TouchableOpacity, TextInput, RefreshControlBase, ScrollViewBase } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Modal, Portal, Provider } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import OptionsMenu from "react-native-option-menu";

import Timer from '../Components/Timer';
import { TapGestureHandler } from 'react-native-gesture-handler';


//constants
const MoreIcon = ( <Feather name='more-vertical' color='#fff' size={20}/> )

const SCREEN_WIDTH = Dimensions.get('window').width;

const SCREEN_HEIGHT = Dimensions.get('window').height;

const DoneSound = ['none', 'ting', 'rooster', 'whistle', 'doorbell', 'air horn', 'trombone', 'meep meep','tick tock!', 'bomb'];

const Ticker = ['none', 'clock', 'stopwatch', 'grandfather clock', 'water tap', 'blood', 'war drums', 'jumanji', 'jeopordy'];

//convert rounds from 1 to roman numerals
const toRoman = require('roman-numerals').toRoman;
[ 42, new Number(42), '42', new String('42')].forEach(function (x, i) {});

//exported scorecard function
const Scorecard = ({navigation} : {navigation: any}) => {

//for timer to scroll to bottom
    //const scrollViewRef = useRef();

//number of teams array
    const [TeamArray, setTeamArray] = useState([1, 2]);

    const [ExtraArray, setExtraArray] = useState([['', '', ''], ['', '', '']]);

    const [ScoreArray, setScoreArray] = useState(['', '']);

//scorecard dataset
    const [Scores, setScores] = useState(
        [
            {
                round: 1,
                team: [1, 2],
                score: ['', ''],
                extra: [['', '', ''], ['', '', '']],
                winner: null,
            }, 
        ]
    )

//teams dataset
    const [Teams, setTeams] = useState(
        [
            {
                id: 1,
                name: 'Team 1',
                playerNames: [],
                playerID: [],
                total: 0 ,
                roundWins: 0,
                //roundWins: Scores.reduce((count, item) => count + (item.winner === 0 ? 1 : 0), 0),
            },
            {
                id: '2',
                name: 'Team 2',
                playerNames: [],
                playerID: [],
                total: 0,
                roundWins: 0,
                //roundWins: Scores.reduce((count, item) => count + (item.winner === 1 ? 1 : 0), 0),
            },
        ]
    )

//scorecard dataset
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

// State controllers to force update of components through useEffect and extraData(flatlist)
    const [Updated, setUpdated] = useState(true);
    const [roundUpdate, setRoundUpdate] = useState(false);
    const [updateScores, setUpdateScores] = useState(false);

//round and team state management for updating the score through the modal
    const [roundState, setRoundState] = useState(1);
    const [teamState, setTeamState] = useState(1);

//blank datasets to reset the scorecard
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
            playerID: [],
            total: 0 ,
            roundWins: 0, 
        },
        {
            id: '2',
            name: 'Team 2',
            playerID: [],
            total:  0 ,
            roundWins: 0,
        },
    ]

    const blankScores = [
        {
            round: 1,
            team: [1, 2],
            score: ['', '', '', ''],
            extra: [ ['', '', ''], ['', '', ''] ],
            winner: null,
        },
    ];

//set if two player or more in order to change the cell size for 2 players
    useEffect(() => {
        if (Teams.length > 2) {setIsTwoPlayer(false);}
    }, [Teams])

//setting states

    const [whiteTheme, setWhiteTheme] = useState(true);
    const toggleWhiteTheme = () => {setWhiteTheme(previousState => !previousState); setChalkTheme(false); setLegalPadTheme(false); setDarkTheme(false);}

    const [chalkTheme, setChalkTheme] = useState(false);
    const toggleChalkTheme = () => {setChalkTheme(previousState => !previousState); setDarkTheme(false); setLegalPadTheme(false); setWhiteTheme(false);}

    const [darkTheme, setDarkTheme] = useState(false);
    const toggleDarkTheme = () => {setDarkTheme(previousState => !previousState); setChalkTheme(false); setLegalPadTheme(false); setWhiteTheme(false);}

    const [legalPadTheme, setLegalPadTheme] = useState(false);
    const toggleLegalPad = () => {setLegalPadTheme(previousState => !previousState); setChalkTheme(false); setDarkTheme(false); setWhiteTheme(false);}

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

    //const [scrollToEnd, setScrollToEnd] = useState(false);

    const [isTimerEnabled, setIsTimerEnabled] = useState(false);
    const toggleSwitchTimer = () => setIsTimerEnabled(previousState => !previousState); //setScrollToEnd(previousState => !previousState);}

    const [isWarningEnabled, setIsWarningEnabled] = useState(false);
    const toggleSwitchWarning = () => setIsWarningEnabled(previousState => !previousState);

    const [roundLength, setRoundLength] = useState(60000);

    const [sound, setSound] = useState('');

    const [ticker, setTicker] = useState('');

    const [newSetting, setNewSetting] = useState(false);

    const [isTwoPlayer, setIsTwoPlayer] = useState(true);

    const [teamToDelete, setTeamToDelete] = useState(0);

    const TWO_PLAYER_CELL_WIDTH = (SCREEN_WIDTH - 60) / 2;

    const CELL_WIDTH = isBidEnabled === true || isMeldEnabled === true || isBonusEnabled === true && isTwoPlayer === false ? 150 : 
                        isTwoPlayer === true ? TWO_PLAYER_CELL_WIDTH : 100;

    const CELL_HEIGHT = isBidEnabled === true || isMeldEnabled === true || isBonusEnabled === true ? 100 : 50;

    

//themes
    const ThemeColor = 
            chalkTheme === true ? '#fff' : 
            legalPadTheme === true ? '#6a0dad' :
            darkTheme === true ? 'gold' :
            whiteTheme === true ? '#000' : '#000';

    const Theme2Color = 
            chalkTheme === true ? '#ffffffa5' :
            legalPadTheme === true ? '#3b49bf' :
            darkTheme === true ? '#ffffffa5' :
            whiteTheme === true ? '#000000a5' : '#000000a5';

    const ThemeBackgroundColor = 
            chalkTheme === true ? 'transparent' :
            legalPadTheme === true ? '#f7f483' :
            darkTheme === true ? '#000' :
            whiteTheme === true ? '#fff' : '#fff';

    const ThemeBackgroundColor2 = 
            chalkTheme === true ? 'transparent' :
            legalPadTheme === true ? '#f7f483' :
            darkTheme === true ? '#000' :
            whiteTheme === true ? '#fff' : '#fff';

    const ThemeBackgroundColor3 = 
            chalkTheme === true ? 'transparent' :
            legalPadTheme === true ? 'lightgray' :
            darkTheme === true ? 'transparent' :
            'lightgray';  


//scroll timer settings to the bottom
    // useEffect(() => {
    //     if (isTimerEnabled === true) {scrollViewRef.current?.scrollTo({
    //         y: 700,
    //         animated: true,
    //     })}
    // }, [scrollToEnd])

//conversion function for timer - seconds from textinput to millieconds
    const ConvertToMillis = (val : any) => {
        let time = parseInt(val) * 1000
        setRoundLength(time)
        console.log(time)
    }

//Scorecard Settings Modal
    const [visibleSettingModal, setVisibleSettingModal] = useState(false);
    
    const showSettingModal = () => setVisibleSettingModal(true);

    const hideSettingModal = () => setVisibleSettingModal(false);
    const settingModalContainerStyle = {
        backgroundColor: 'transparent', 
        padding: 20,
    }; 

//edit team functions and states

    const addPlayerRef = useRef();

    const [teamPlayer, setTeamPlayer] = useState('');

    const [players, setPlayers] = useState([])

    const [TeamSettingId, setTeamSettingId] = useState(1)

    const [TeamName, setTeamName] = useState('Team');

    const [TeamNames, setTeamNames] = useState(['Team 1', 'Team 2']); 

//add team players and set team name
    const AddTeam = () => {

        let new2Array = [...TeamNames];
        new2Array[TeamSettingId - 1] = TeamName;
        setTeamNames(new2Array);

        let teamArray = [...Teams];
        teamArray[TeamSettingId - 1].playerNames = players;
        setTeams(teamArray)

        setPlayers([]);
        setUpdated(!Updated);

        hideTeamModal();
    }

//delete player from team
    const DeletePlayer = ({index}: {index: any}) => {
        let array = [...players]
        array.splice(index, 1)
        setPlayers(array)
    }
    
//add a team module and function
    const SetShowTeamModal = () => {

        let teams = Teams.length
        let id = teams + 1;
        let name = 'Team' + ' ' + id.toString();

        setTeams([...Teams, {
            id: id,
            name: name,
            playerNames: [],
            playerID: [],
            total: 0,
            roundWins: 0,
        }]);

        setTeamArray([...TeamArray, id]);
        setExtraArray([...ExtraArray, ['', '', '']]);
        setScoreArray([...ScoreArray, '']);
        setTeamNames([...TeamNames, name]);

        for (var i=0; i < Scores.length; i++) {

            let newArray = [...Scores];
            newArray[i].team = [...Scores[i].team, id];
            newArray[i].extra = [...Scores[i].extra, ['', '', '']];
            newArray[i].score = [...Scores[i].score, ''];
            setScores(newArray);
        }
    };

    const DeleteTeam = () => {

        let id = teamToDelete

    //delete the team object
        let newArray = [...Teams];
        newArray.splice(id - 1, 1);
        setTeams(newArray);

    //delete the team from the scores, extra, indexes
        let newTeamArray = [...TeamArray];
        newTeamArray.splice(id - 1, 1);
        setTeamArray(newTeamArray);

        let newExtraArray = [...ExtraArray];
        newExtraArray.splice(id - 1, 1);
        setExtraArray(newExtraArray);

        let newScoreArray = [...ScoreArray];
        newScoreArray.splice(id - 1, 1);
        setScoreArray(newScoreArray);

        let newTeamNamesArray = [...TeamNames];
        newTeamNamesArray.splice(id - 1, 1);
        setTeamNames(newTeamNamesArray);

        setUpdated(!Updated);
        setTeamState(1);

        hideDeleteTeamModal();

    //delete that team's scores

        for (var i=0; i < Scores.length; i++) {

            let newArray = [...Scores];
            newArray[i].team.splice(id - 1, 1);
            newArray[i].extra.splice(id - 1, 1);
            newArray[i].score.splice(id - 1, 1);
            
            setScores(newArray);
        }

    };

//function to add another round to the scorecard
    const SetNewRound = () => {

        let scores = Scores.length
        let round = scores + 1;
        let scorearray = Array(Teams.length).fill('');
        let extraarray = Array(Teams.length).fill(['', '', '']);
        
        setScores([...Scores, {
                round: round,
                team: TeamArray,
                score: scorearray,
                extra: extraarray,
                winner: null,
        }]);
    }
    
//final button to update the scorecard through the settings modal
    const ChangeSettings = () => {    

        for (var i=0; i < TeamArray.length; i++) {

            let newTeamArray = [...Teams];

            newTeamArray[i].name = TeamNames[i],
            setTeams(newTeamArray);
        }

        setUpdated(!Updated);
        //setUpdateScores(!updateScores);
        setRoundUpdate(!roundUpdate)
        setNewSetting(!newSetting);
        hideSettingModal();  
        
        if (Teams.length === 2) {setIsTwoPlayer(true);}
    }

//edit the name of the scorecard function
    const Set = (val : any) => {
        setScorecardData(
            {...ScorecardData, updated: Updated, name: val, } 
        )
    }

//text state management for textInputs

const [text, setText] = useState('');

const textNum = parseInt(text);

const [bidText, setBidText] = useState('');

const [meldText, setMeldText] = useState('');

const [bonusText, setBonusText] = useState('');

//function to update the extra data (bid, meld, bonus)
const UpdateExtra = () => {

    let newUpdateArray = [...Scores];
        newUpdateArray[roundState - 1].extra[teamState - 1 ] = [
        bidText === '' ? Scores[roundState - 1].extra[teamState - 1][0] : bidText, 
        meldText === '' ? Scores[roundState - 1].extra[teamState - 1][1] : meldText, 
        bonusText === '' ? Scores[roundState - 1].extra[teamState - 1][2] : bonusText
    ];

    setScores(newUpdateArray);
    setUpdated(!Updated)    
    setRoundUpdate(!roundUpdate);
    setBidText('');
    setMeldText('');
    setBonusText('');

    hideExtrasModal();
}

//function to the set the score of a single cell in the scorecard
    const NewScore = () => {    

        let newSArray = [...Scores];
        newSArray[roundState - 1].score[teamState - 1 ] = textNum;
        setScores(newSArray);

        hideModal();

        setUpdated(!Updated)    
        setRoundUpdate(!roundUpdate);
    }

    //when the round is updated, this function will determine the total round winner
    useEffect(() => {

        if (roundState) {
        
            let newArray = [...Scores];

            let i = isLowestPointsEnabled === false ? newArray[roundState - 1].score.indexOf(Math.max(...Scores[roundState - 1].score)) :
                    isLowestPointsEnabled === true ? newArray[roundState - 1].score.indexOf(Math.max(...Scores[roundState - 1].score)) : null
        
            newArray[roundState - 1].winner = i;
            setScores(newArray);
        }
    }, [roundUpdate])

//when the scorecard is updated, this function will add together the scores and round wins and update the dataset
    useEffect(() => {

        for (var i=0; i < TeamArray.length; i++) {

            let newArray = [...Teams];

            newArray[i].total = Scores.reduce((a,v) => a = a + (v.score[i] === '' ? 0 : v.score[i]), 0),
            newArray[i].roundWins = Scores.reduce((count, item) => count + (item.winner === i ? 1 : 0), 0);
            setTeams(newArray);
        }
    },[roundUpdate]);


//clear scorecard function
    const clearScorecard = () => {

        let array = {...blankScorecard};
        array.name = new Date().toDateString();
        
        setScores(blankScores);
        setTeams(blankTeams);
        setScorecardData(array);
        setUpdateScores(!updateScores);  
        setRoundState(1);  
        setTeamState(1);
        setIsTwoPlayer(true);
        setTeamArray([1, 2]);
        setExtraArray([['', '', ''], ['', '', '']]);
        setScoreArray(['', '']);
       

        hideClearModal();    
    };

//horizontal and vertical scroll functions for flatlist

    const scrollRef = useRef();

    const horzScrollRef = useRef();

    const horzScrollRef2 = useRef();

    const horzScrollRef3 = useRef();

    const handleVertScroll = (event : any) => {
    	scrollRef.current?.scrollToOffset({
          //y: (200),
          offset: (event.nativeEvent.contentOffset.y),
          animated: true,
        })
    }

    const handleHorzScroll = (event : any) => {
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

//display who the leader of the rounds and totals are

    const [leader, setLeader] = useState(0);
    const [roundLeader, setRoundLeader] = useState(0);

    useEffect(() => {

        let totalarray = Teams.map(i => i.total);
        let roundarray = Teams.map(i => i.roundWins);

        if (isLowestPointsEnabled === false) {
            setLeader( Math.max(...totalarray));
            setRoundLeader( Math.max(...roundarray));
        }
        if (isLowestPointsEnabled === true) {
            setLeader( Math.min(...totalarray));
            setRoundLeader( Math.max(...roundarray));
        }
    }, [roundUpdate])

//footer that displays the team score totals
    const Footer = ({total, style}: {total: any, style: any}) => {
        return (
            <View style={{ height: 50, backgroundColor: ThemeBackgroundColor, flexDirection: 'row'}}>
                <View style={{ width: CELL_WIDTH, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[styles.score, style, {fontFamily: 'chalkboard-bold', fontSize: 22, }]}>
                        {total}
                    </Text>
                </View>
            </View>
        );
    }

//static left handed column that displays the rounds
    const RoundsColumn = ({round}: {round: any}) => {
        return (
            <View style={[styles.roundbox, {height: CELL_HEIGHT, backgroundColor: ThemeBackgroundColor2}]}>
                <Text style={styles.round}>
                    {isRomanEnabled === true ? toRoman(round) : round}
                </Text>
            </View>
        );
    }

//footer that displays the team round wins
    const WinsFooter = ({roundWins, style} : {roundWins: any, style: any}) => {
        return (
            <View style={{ height: 50, backgroundColor: ThemeBackgroundColor, flexDirection: 'row'}}>
                <View style={{ width: CELL_WIDTH, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[styles.score, style, {fontFamily: 'chalkboard-bold', fontSize: 22, }]}>
                        {roundWins}
                    </Text>
                </View> 
            </View>
        );
    }

//the item for the list of teams in the settings modal
    const TeamList = ({name, id} : {name: string, id: any}) => {
        return(
            <View>
                <TouchableOpacity onPress={() => showTeamModal({name, id})} onLongPress={() => showDeleteTeamModal(id)}>
                    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', margin: 10}}>
                        <Text style={{fontFamily: 'chalkboard-bold', fontSize: 16, color: '#000000a5'}}>
                            {TeamNames[id - 1]}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <Feather 
                                    name='edit'
                                    color='#155843a5'
                                    size={18}
                                    style={{marginHorizontal: 5}}
                                />
                        </View>
                    </View>
                    <View style={{marginHorizontal: 10, marginTop: -10}}>
                        <Text style={{fontSize: 14, textTransform: 'capitalize', fontFamily: 'chalkboard-light', color: '#000000a5'}}>
                            {Teams[id - 1].playerNames?.join(' - ')}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    
//render header row function
    const renderItem = ({ item } : {item: any}) => {
        return (
          <HeaderRow
            id={item.id} 
            name={item.name}
          />
        );
      };

//render points total footer
    const renderFooter = ({ item } : {item: any}) => {
        const color = item.total === leader && darkTheme === false ? 'green' :
                    item.total === leader && darkTheme === true ? 'green' :
                    item.total !== leader && darkTheme || chalkTheme=== true ? '#fff' :
                    '#000'
        return (
            <Footer
            total={item.total}
            style={{ color }}
            />
        );
    };

//render rounds total footer
    const renderWinsFooter = ({ item } : {item: any}) => {
        const color = item.roundWins === roundLeader && darkTheme === false ? 'green' :
                      item.roundWins === roundLeader && darkTheme === true ? 'green' :
                      item.roundWins !== roundLeader && darkTheme || chalkTheme === true ? '#fff' :
                      '#000';
        return (
            <WinsFooter
                roundWins={item.roundWins}
                style={{ color }}
            />
        );
    };

//render the score row for a round
    const renderItemScoreRow = ({ item, index } : {item: any, index: any}) => {
        return (
          <ScoreRow
            index={index}
            score={item.score}
            round={item.round}
            team={item.team}
          />
        );
    };

//render the static rounds list
    const renderRounds = ({ item } : {item: any}) => {
        return (
          <RoundsColumn
            round={item.round}
          />
        );
    };

//render the team list for the settings modal
    const renderTeamList = ({item} : {item: any}) => {
        return (
            <TeamList 
                name={item.name}
                id={item.id}
            />
        );
    };

//Scorebox Modal
    const [visible, setVisible] = useState(false);
  
    const showModal = ({round, index} : {round: any, index: any}) => {
        setVisible(true);
        setRoundState(round);
        setTeamState(index + 1);
    }

    const hideModal = () => setVisible(false);

    const containerStyle = {backgroundColor: 'transparent', padding: 20}; 

//Scorecard Name Modal
      const [visibleNameModal, setVisibleNameModal] = useState(false);
  
      const showNameModal = () => setVisibleNameModal(true);

      const hideNameModal = () => setVisibleNameModal(false);

      const nameModalContainerStyle = {backgroundColor: 'transparent', padding: 20}; 

//New Scorecard  Modal
        const [visibleClearModal, setVisibleClearModal] = useState(false);
        
        const showClearModal = () => setVisibleClearModal(true);

        const hideClearModal = () => setVisibleClearModal(false);

        const clearModalContainerStyle = {backgroundColor: 'transparent', padding: 20}; 

//New Scorecard  Modal

    const [visibleDeleteTeamModal, setVisibleDeleteTeamModal] = useState(false);
            
    const showDeleteTeamModal = (id : any) => {setVisibleDeleteTeamModal(true); setTeamToDelete(id)}

    const hideDeleteTeamModal = () => setVisibleDeleteTeamModal(false);

    const deleteTeamModalContainerStyle = {backgroundColor: 'transparent', padding: 20}; 

//Extras Modal (bid, meld, bonus)
        const [visibleExtrasModal, setVisibleExtrasModal] = useState(false);
                
        const showExtrasModal = ({ index, round} : {index: any, round: any}) => {
            setVisibleExtrasModal(true);
            setRoundState(round);
            setTeamState(index + 1);
        }

        const hideExtrasModal = () => setVisibleExtrasModal(false);

        const extrasModalContainerStyle = {backgroundColor: 'transparent', padding: 20}; 

//Edit Team  Modal
    const [visibleTeamModal, setVisibleTeamModal] = useState(false);
        
    const showTeamModal = ({id, name} : {id: any, name: string}) => {
        setTeamSettingId(id);
        setTeamName(Teams[TeamSettingId - 1].name ? Teams[TeamSettingId - 1].name : 'Team' + ' ' + id.toString())
        setVisibleTeamModal(true);
        setPlayers(Teams[id - 1].playerNames);
    }

    const hideTeamModal = () => setVisibleTeamModal(false);
    const teamModalContainerStyle = {backgroundColor: 'transparent', padding: 20}; 


//team name item for the header row
    const HeaderRow = ({id, name} : {id: any, name: string}) => {
        return (
            <View style={{flexDirection: 'column', height: 50, backgroundColor: ThemeBackgroundColor, justifyContent: 'center'}}>
                <TouchableOpacity onPress={showSettingModal}>
                    <View style={[styles.headerbox, {width: CELL_WIDTH}]}>
                        <Text style={[styles.header, {color: ThemeColor}]}>
                            {name}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

//item for the score row. This item contains nested flatlist
    const ScoreRow = ({index, round, score, team} : {index: any, round: any, score: any, team: any}) => {

        const Round = round

        const roundWinner =
            isLowestPointsEnabled === false ? Math.max(...score) :
            isLowestPointsEnabled === true ? Math.min(...score) : null

//item for the extras list. Controlled by state to show bid, meld, bonus
        const ExtraItemSingle = ({index, item} : {index: any, item: any}) => {
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
                            </View> 
                    </TouchableOpacity>
                </View>
            );
        }

//item for the score row
        const Row = ({item, index, style} : {item: any, index: any, style: any}) => {

            const round = Round

            return (
                  <View style={{}}>
                        <View style={[styles.scorebox, style, { width: CELL_WIDTH, height: 50}]}>
                            <TouchableOpacity onPress={() => {showModal({index, round});}}>
                                <View style={{width: CELL_WIDTH, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={[styles.score, {color: Theme2Color}]}>
                                        {item}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                  </View> 
            )
        }

        const renderRow = ({ item, index } : {item: any, index: any}) => {

            const backgroundColor = item === roundWinner && item !== 0 && isRoundWinnerEnabled === true && darkTheme === false ? '#f0f0f0a5' : 
                                    item === roundWinner && item !== 0 && isRoundWinnerEnabled === true && darkTheme === true ? '#606060a5' : 'transparent';
            

            return (
                <Row
                    index={index}
                    item={item}
                    style={{  backgroundColor }}
                />
            );
        };

        const renderExtraItemSingle = ({ item, index } : {item: any, index: any}) => {
            return (
                <ExtraItemSingle
                    index={index}
                    item={item}
                />
            );
        };

        return (
            <View style={{flexDirection: 'row', height: CELL_HEIGHT}}>
                <View style={{backgroundColor: ThemeBackgroundColor2, width: 60}}>
                </View>

                <View>
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
                                contentContainerStyle={{width: 
                                    isTwoPlayer === true ? (TWO_PLAYER_CELL_WIDTH * 2) : (CELL_WIDTH * Teams.length), 
                                    height: 50}}
                                scrollEnabled={false}
                                extraData={updateScores}
                            />
                        </View>
                    ) : null}

                    <FlatList 
                        data={Scores[round - 1].score}
                        renderItem={renderRow}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{width: 
                            isTwoPlayer === true ? (TWO_PLAYER_CELL_WIDTH * 2) : (CELL_WIDTH * Teams.length), 
                            height: 70}}
                        scrollEnabled={false}
                        extraData={updateScores}
                    />
                </View>
            </View>
        );
    }

//placeholder text states for textInputs
    const [timePlaceholder, setTimePlaceholder] = useState('');
    const [TickerPlaceholder, setTickerPlaceholder] = useState('Clock');
    const [DoneSoundPlaceholder, setDoneSoundPlaceholder] = useState('Ting');

//FINALLY, THE RETURN FUNCTION OF THE SCORECARD
    return (
        <Provider>
            <View>
{/* image background for the dark theme */}
                {chalkTheme === true ? (
                    <ImageBackground 
                            source={require('../assets/chalkboard.jpg')}
                            imageStyle={{resizeMode: 'cover', width: SCREEN_WIDTH, height: SCREEN_HEIGHT + 30}}
                            style={{position: 'absolute', justifyContent: 'center'}}
                        />
                ) : null}

{/*Score Modal */}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 15,}}>

                        <View style={{ alignItems: 'center'}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-bold'}}>
                                {Teams[teamState - 1].name}
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
                            <TouchableOpacity onPress={NewScore}>
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
                                    'Some Team'}
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
                                        style={{borderBottomWidth: 0.5, borderColor: 'lightgray', textAlign: 'center', height: 40, width: 60, fontFamily: 'chalkboard-bold', fontSize: 24, marginVertical: 10, color: '#363636a5'}}
                                        maxLength={20}
                                        keyboardType='number-pad'
                                        autoFocus={false}
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
                                    <TouchableOpacity onPress={showNameModal}>
                                        <Text style={{ color: '#000000a5', fontFamily: 'chalkboard-bold', fontSize: 18}}>
                                            {ScorecardData.name}
                                        </Text>
                                    </TouchableOpacity>
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
                                        extraData={Teams}
                                        ListFooterComponent={() => 
                                            <TouchableOpacity onPress={SetShowTeamModal}>
                                                <View style={{width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginHorizontal: 10, marginTop: 20}}>
                                                    <Feather
                                                        name='plus-circle'
                                                        color='#155843a5'
                                                        size={18}
                                                    />
                                                    <Text style={{color: '#155843a5', fontSize: 12, marginLeft: 10, marginRight: 10}}>
                                                        Add Team
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        
                                        }
                                    />
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
                                        Theme
                                    </Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Whiteboard
                                        </Text> 
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                            thumbColor={whiteTheme ? "#155843" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleWhiteTheme}
                                            value={whiteTheme}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Arcade
                                        </Text> 
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                            thumbColor={darkTheme ? "#155843" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleDarkTheme}
                                            value={darkTheme}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Legal Pad
                                        </Text> 
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                            thumbColor={legalPadTheme ? "#155843" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleLegalPad}
                                            value={legalPadTheme}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Chalkboard
                                        </Text> 
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#B2D9BF" }}
                                            thumbColor={chalkTheme ? "#155843" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleChalkTheme}
                                            value={chalkTheme}
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

                                    {isTimerEnabled === true ? (
                                        <View>
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
                                                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
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
                                                    <Feather 
                                                        name='chevron-down'
                                                        color='#155843'
                                                        size={22}
                                                        style={{ marginLeft: 10}}
                                                    />
                                                </View>
                                            </View>

                                            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                                <Text style={{fontSize: 16}}>
                                                    Ticker
                                                </Text> 
                                                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
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
                                                    <Feather 
                                                        name='chevron-down'
                                                        color='#155843'
                                                        size={22}
                                                        style={{ marginLeft: 10}}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    ) : <View style={{ height: 24}}></View>}
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

{/* New Scorecard Modal */}
                <Modal visible={visibleDeleteTeamModal} onDismiss={hideDeleteTeamModal} contentContainerStyle={deleteTeamModalContainerStyle}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 15,}}>
                        <View style={{ alignItems: 'center', marginVertical: 40}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-regular', textAlign: 'center'}}>
                                Are you sure you want to remove this team?
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center'}}>
                            <TouchableOpacity onPress={DeleteTeam}>
                                <View style={{ width: 200, height: 50, borderRadius: 25, backgroundColor: '#d92121', alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: '#fff', fontSize: 22, textAlign: 'center', fontWeight: 'bold'}}>
                                        Delete
                                    </Text>
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
                                    autoFocus={true}
                                onChangeText={val => Set(val)}
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

{/* Team Modal */}
                <Modal visible={visibleTeamModal} onDismiss={hideTeamModal} contentContainerStyle={teamModalContainerStyle}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 15}}>
                        <View style={{ alignItems: 'center', marginVertical: 40}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-regular', textAlign: 'center'}}>
                                Team Name:
                            </Text>
                            <TextInput 
                                placeholder={Teams[TeamSettingId - 1]?.name}
                                placeholderTextColor='lightgray'
                                style={{textAlign: 'center', borderBottomWidth: 0.5, borderColor: 'gray', height: 50, width: '100%', fontFamily: 'chalkboard-bold', fontSize: 20}}
                                maxLength={20}
                                onChangeText={val => setTeamName(val)}        
                            /> 
                        </View>
                        <View style={{ alignItems: 'center', marginBottom: 40}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-regular', textAlign: 'center', marginBottom: 0}}>
                                Add Player:
                            </Text>
                            <Text style={{fontSize: 12, fontFamily: 'chalkboard-light', textAlign: 'center', marginBottom: 10, color: '#000000a5'}}>
                                (press and hold to remove)
                            </Text>       
                            <FlatList 
                                data={players}
                                scrollEnabled={false}
                                numColumns={3}
                                style={{}}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={{width: '100%'}}
                                renderItem={({item, index}) => 
                                    <TouchableOpacity onLongPress={() => DeletePlayer({index})}>
                                        <View style={{ backgroundColor: '#e0e0e0', paddingVertical: 4, paddingHorizontal: 14, margin: 6, borderRadius: 20}}>
                                            <Text style={{textTransform: 'capitalize', fontSize: 17, fontFamily: 'chalkboard-regular', textAlign: 'center'}}>
                                                {item}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    
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
                                <TouchableOpacity onPress={() =>  {setPlayers([...players, teamPlayer]); addPlayerRef.current.clear() }}>
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

 {/* Header*/}
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
            <View>
{/* primary horizontal scroll of rows */}
                <ScrollView 
                    style={{height: '89%', width: '100%',}}
                    stickyHeaderIndices={[]}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    horizontal={true}
                    onScroll = {(event)=>{{handleHorzScroll(event);}}}//Vertical scrolling distance 
                    scrollEventThrottle={16}  
                >
{/* render list of score row, by round */}
                    <FlatList
                        data={Scores}
                        renderItem={renderItemScoreRow}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 0, flexDirection: 'column', backgroundColor: ThemeBackgroundColor2, height: '100%'}}
                        contentContainerStyle={{width: 
                            isTwoPlayer === true ? TWO_PLAYER_CELL_WIDTH * 2 + 60 : CELL_WIDTH * Teams.length + 60,

                        }}
                        scrollEnabled={true}
                        extraData={updateScores}
                        //ref={scrollRef}
                        onScroll = {(event)=>{{
                            handleVertScroll(event);}}}//Vertical scrolling distance 
                        ListHeaderComponent={() => (
                            <View style={{width:
                                isTwoPlayer === true ? TWO_PLAYER_CELL_WIDTH * 2 + 60 : CELL_WIDTH * Teams.length + 60,
                               // CELL_WIDTH * 4 + 60, 
                                height: 50}}>
                            </View>
                        )}
                        ListFooterComponent={() => (
                            <View>
                                <View style={[styles.roundbox, {height: 50, backgroundColor: ThemeBackgroundColor2}]}>
                                </View>
                                <View style={[styles.roundbox, {height: 50, backgroundColor: ThemeBackgroundColor2}]}>
                                </View>
                                <View style={[styles.roundbox, {height: 50, backgroundColor: ThemeBackgroundColor2}]}>
                                </View>
                                {isTimerEnabled === true ? (
                                    <View>
                                        <View style={[styles.roundbox, {height: 50, backgroundColor: ThemeBackgroundColor2}]}>
                                        </View>
                                        <View style={[styles.roundbox, {height: 50, backgroundColor: ThemeBackgroundColor2}]}>   
                                        </View>
                                    </View>
                                ) : null}
                            </View>
                        )}   
                    />
               </ScrollView>
{/* Header flatlist for team names, horizontal scroll */}
                <FlatList 
                    data={Teams}
                    renderItem={renderItem}
                    //keyExtractor={item => item.id}
                    horizontal={true}
                    style={{position: 'absolute', top: 0, marginLeft: 60}}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{width: 
                    isTwoPlayer === true ? TWO_PLAYER_CELL_WIDTH * 2  : CELL_WIDTH * Teams.length
                    }}
                    ref={horzScrollRef2}
                    scrollEnabled={false}
                />
{/* footer flatlist for round wins */}
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
                        contentContainerStyle={{width: 
                            isTwoPlayer === true ? TWO_PLAYER_CELL_WIDTH * 2  : CELL_WIDTH * Teams.length
                        }}
                        ref={horzScrollRef3}
                        scrollEnabled={false}
                    />
                ) : null }
{/* Footer flatlist for point wins */}
                { isPointsEnabled ? (
                    <FlatList 
                        data={Teams}
                        renderItem={renderFooter}
                        //keyExtractor={item => item.id}
                        horizontal={true}
                        style={{position: 'absolute', bottom: isTimerEnabled === true ? 58 : -2, marginLeft: 60}}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{width: 
                            isTwoPlayer === true ? TWO_PLAYER_CELL_WIDTH * 2 : CELL_WIDTH * Teams.length
                        }}
                        ref={horzScrollRef}
                        scrollEnabled={false}
                        //extraData={Updated}
                    />
                ) : null }
{/* static left flatlist for rounds */}
                
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
                        <View style={[styles.roundbox, {height: 50, backgroundColor:  ThemeBackgroundColor2}]}>
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <View>
                            <View style={[styles.roundbox, {height: 50, backgroundColor: ThemeBackgroundColor2}]}>
                                <TouchableOpacity onPress={SetNewRound}>
                                    <Feather 
                                        name='plus-circle'
                                        color='lightgray'
                                        size={22}
                                    /> 
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.roundbox, {height: 50, backgroundColor: ThemeBackgroundColor2}]}>
                            </View>
                            <View style={[styles.roundbox, {height: 50, backgroundColor: ThemeBackgroundColor2}]}>
                            </View>
                            {isTimerEnabled === true ? (
                                <View>
                                    <View style={[styles.roundbox, {height: 50, backgroundColor: ThemeBackgroundColor2}]}>
                                    </View>
                                    <View style={[styles.roundbox, {height: 50, backgroundColor: ThemeBackgroundColor2}]}>
                                    </View>
                                </View>
                            ) : null}
                        </View>
                    )}
                /> 
                 
            </View>

            { isRoundWinsEnabled ? (
                <View style={[styles.roundbox, { position: 'absolute', backgroundColor: ThemeBackgroundColor, 
                    bottom: isTimerEnabled === true ? 110 : isPointsEnabled === false ? 0 : 50
                    , left: 0, height: 50}]}> 
                    <TouchableOpacity>
                        <View style={[styles.roundbox, {height: 50, backgroundColor: ThemeBackgroundColor}]}>
                            {/* <Text style={[styles.round, {fontSize: 12}]}>
                                Wins
                            </Text> */}
                        </View> 
                    </TouchableOpacity>
                </View>
            ) : null }

            { isPointsEnabled ? (
                <View style={[styles.roundbox, { 
                    backgroundColor: ThemeBackgroundColor,
                    position: 'absolute', 
                    bottom: isTimerEnabled === true ? 60 : 0, 
                    left: 0, height: 50}]}> 
                    <TouchableOpacity>
                        <View style={[styles.roundbox, {height: 50, backgroundColor: ThemeBackgroundColor2}]}>
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
                <View style={{position: 'absolute', bottom: -2, left: 0}}> 
                    <Timer 
                        warning={isWarningEnabled}
                        length={roundLength}
                        ticker={ticker}
                        donesound={sound}
                        settingchange={newSetting}
                    />
                </View>
            ) : null }
           
            <View style={[styles.roundbox, { backgroundColor: ThemeBackgroundColor, position: 'absolute', top: 80, left: 0, height: 50, width: 60}]}>      
            </View>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 16,
        fontFamily: 'chalkboard-bold',
        textAlign: 'center'
    },
    headerbox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    round: {
        fontSize: 16,
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
        alignItems: 'center', 
        borderRightWidth: 0.3,
        justifyContent: 'center', 
    },
    scorebox: {
        paddingVertical: 0, 
        alignItems: 'center', 
        borderRightWidth: 0.2,
        borderBottomWidth: 0.2,
        justifyContent: 'center',
        borderColor: '#cccccc', 
    },
});

export default Scorecard;
