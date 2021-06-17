import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Audio } from 'expo-av';






const Timer = ({warning, length, ticker}) => {

    const [sound, setSound] = useState();

    const [AudioUri, setAudioUri] = useState(
        ticker === '1' ? require('../assets/sounds/Zelda.mp3') :
        ticker === '2' ? require('../assets/sounds/Jeopardy.mp3') :
        ticker === '3' ? require('../assets/sounds/Jeopardy.mp3') : require('../assets/sounds/Zelda.mp3')
    );

    //const [AudioUri, setAudioUri] = useState();

    const [soundLength, setSoundLength] = useState(0);
    const [position, setPosition] = useState(0);

        const SetSound = () => {
            ticker === '1' ? setAudioUri(require('../assets/sounds/Zelda.mp3')) :
            ticker === '2' ? setAudioUri(require('../assets/sounds/Jeopardy.mp3')) :
            ticker === '3' ? setAudioUri(require('../assets/sounds/Jeopardy.mp3')) : setAudioUri(require('../assets/sounds/Zelda.mp3'))
        }

    const [isWarning, setWarning] = useState(warning);

    const [timerLength, setTimerLength] = useState(length);

    const [timerPosition, setTimerPosition] = useState(length);

    const [PlayPause, setPlayPause] = useState(false);

    const [isTimerRunning, setIsTimerRunning] = useState(false);

    function useInterval(callback, delay) {
        const savedCallback = useRef();
        
        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);
        
        // Set up the interval.
        useEffect(() => {
            let id = setInterval(() => {
            savedCallback.current();
            }, delay);
            return () => clearInterval(id);
        }, [delay]);
    }

    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(timerPosition / 60000);
        let seconds = ((timerPosition % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

    useInterval(() => {
        if (isTimerRunning === true) {
        setTimerPosition(timerPosition - 1000);
        setPosition(position + 1000);
        }
        }, 1000);

    

    async function StartStopTimer () {

        if (ticker === '0') {
            setPlayPause(!PlayPause);
            setIsTimerRunning(!isTimerRunning);
        } else {
            setPlayPause(!PlayPause);
            console.log(ticker); 
        
            const { sound } = await Audio.Sound.createAsync(
                AudioUri,
                {shouldPlay: true, isLooping: true}
            );

            setSound(sound);

            let time = await sound.getStatusAsync();
            setSoundLength(time.durationMillis);
            
            if (isTimerRunning === false) {
                console.log('Playing Sound');
                setIsTimerRunning(true);
                await sound.playAsync(); 
                //await sound.setPositionAsync(position);
                //console.log(position) 
            } 
            if (isTimerRunning === false && position < soundLength) {
                await sound.setPositionAsync(position);
            } 

            if (isTimerRunning === true) {
                setIsTimerRunning(false);     
                await sound.pauseAsync();
            }
        }
    }

    useEffect(() => {
        if (isTimerRunning === true && position >= soundLength) {
            setPosition (0)
        }
    },[position])

    const ResetTimer = () => {
        setPlayPause(false);
        setIsTimerRunning(false);
        setTimerPosition(length);
        setPosition(0);
        SetSound();
    }

    useEffect(() => {
        if (timerPosition === 0) {
            setPlayPause(false);
            setIsTimerRunning(false);
            sound.unloadAsync();
        }
    })

    useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);

    return (
        <View style={[styles.container, {
            backgroundColor: 
                isTimerRunning === true && timerPosition > 10000 ? '#41a661' : 
                isTimerRunning === true && timerPosition <= 10000 ? '#cc1616' :
                '#212121'
        }]}>
            <TouchableOpacity onPress={ResetTimer}>
                <View>
                    <FontAwesome5 
                        name='redo-alt'
                        size={25}
                        color='#ffffffa5'
                    />
                </View>
            </TouchableOpacity>
            
            <View>
                <Text style={{ color: '#fff', fontFamily: 'chalkboard-regular', fontSize: 25}}>
                    {millisToMinutesAndSeconds()}
                </Text>
            </View>

            <TouchableOpacity onPress={StartStopTimer}>
                <View>
                    <FontAwesome5 
                        name={PlayPause === false ? 'play' : 'pause'}
                        size={25}
                        color='#ffffffa5'
                    />
                </View>
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width, 
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
})

export default Timer;
