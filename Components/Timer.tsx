import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Audio } from 'expo-av';






const Timer = ({warning, length, ticker, donesound, settingchange} : {warning: boolean, length: any, ticker: any, donesound: any, settingchange: boolean}) => {

    const [settingChange, setSettingChange] = useState(settingchange);

    const [sound, setSound] = useState();

    const[doneSound, setDoneSound] = useState();

    const[doneSoundUri, setDoneSoundUri] = useState(
        donesound === '1' ? require('../assets/donesounds/Ting.mp3') :
        donesound === '2' ? require('../assets/donesounds/Rooster.mp3') :
        donesound === '3' ? require('../assets/donesounds/Whistle.mp3') : 
        donesound === '4' ? require('../assets/donesounds/Doorbell.mp3') : 
        donesound === '5' ? require('../assets/donesounds/AirHorn.mp3') : 
        donesound === '6' ? require('../assets/donesounds/Trombone.mp3') : 
        donesound === '7' ? require('../assets/donesounds/MeepMeep.mp3') : 
        donesound === '8' ? require('../assets/donesounds/Ticktock.mp3') : 
        donesound === '9' ? require('../assets/donesounds/Bomb.mp3') :
        require('../assets/donesounds/Ting.mp3')
    );

    const [AudioUri, setAudioUri] = useState(
        ticker === '1' ? require('../assets/sounds/Clock.mp3') :
        ticker === '2' ? require('../assets/sounds/Stopwatch.mp3') :
        ticker === '3' ? require('../assets/sounds/Grandfather.mp3') : 
        ticker === '4' ? require('../assets/sounds/WaterTap.mp3') : 
        ticker === '5' ? require('../assets/sounds/Blood.mp3') : 
        ticker === '6' ? require('../assets/sounds/WarDrums.mp3') : 
        ticker === '7' ? require('../assets/sounds/Jumanji.mp3') : 
        ticker === '8' ? require('../assets/sounds/Jepordy.mp3') : 
        require('../assets/sounds/Clock.mp3')
    );

    //const [AudioUri, setAudioUri] = useState();

    const [soundLength, setSoundLength] = useState(0);
    const [position, setPosition] = useState(0);

    const SetSound = () => {
        ticker === '1' ? setAudioUri(require('../assets/sounds/Clock.mp3')) :
        ticker === '2' ? setAudioUri(require('../assets/sounds/Stopwatch.mp3')) :
        ticker === '3' ? setAudioUri(require('../assets/sounds/Grandfather.mp3')) : 
        ticker === '4' ? setAudioUri(require('../assets/sounds/WaterTap.mp3')) : 
        ticker === '5' ? setAudioUri(require('../assets/sounds/Blood.mp3')) : 
        ticker === '6' ? setAudioUri(require('../assets/sounds/WarDrums.mp3')) : 
        ticker === '7' ? setAudioUri(require('../assets/sounds/Jumanji.mp3')) : 
        ticker === '8' ? setAudioUri(require('../assets/sounds/Jepordy.mp3')) : 
        setAudioUri(require('../assets/sounds/Clock.mp3'))
    }

    const SetdDoneSound = () => {
        donesound === '1' ? setDoneSoundUri(require('../assets/donesounds/Ting.mp3')) :
        donesound === '2' ? setDoneSoundUri(require('../assets/donesounds/Rooster.mp3')) :
        donesound === '3' ? setDoneSoundUri(require('../assets/donesounds/Whistle.mp3')) : 
        donesound === '4' ? setDoneSoundUri(require('../assets/donesounds/Doorbell.mp3')) : 
        donesound === '5' ? setDoneSoundUri(require('../assets/donesounds/AirHorn.mp3')) : 
        donesound === '6' ? setDoneSoundUri(require('../assets/donesounds/Trombone.mp3')) : 
        donesound === '7' ? setDoneSoundUri(require('../assets/donesounds/MeepMeep.mp3')) : 
        donesound === '8' ? setDoneSoundUri(require('../assets/donesounds/Ticktock.mp3')) : 
        donesound === '9' ? setDoneSoundUri(require('../assets/donesounds/Bomb.mp3')) : 
        setDoneSoundUri(require('../assets/donesounds/Ting.mp3'))
    }

    const [isWarning, setIsWarning] = useState(warning);

    const [warningSound, setWarningSound] = useState();

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

    useEffect(() => {

        async function PlayTone () {
            if (timerPosition === 0) {
                const { sound } = await Audio.Sound.createAsync(
                    doneSoundUri,
                    {shouldPlay: true, isLooping: false}
                );
                setDoneSound(sound);
                await sound.playAsync(); 
            }
            if (timerPosition <= 15000 && timerPosition >= 14000 && isWarning === true) {
                const { sound } = await Audio.Sound.createAsync(
                    require('../assets/warning/DingDing.mp3'),
                    {shouldPlay: true, isLooping: false}
                );
                setWarningSound(sound);
                await sound.playAsync(); 
            }
        }

        PlayTone();
        
    },[timerPosition])

    const ResetTimer = () => {
        setPlayPause(false);
        setIsTimerRunning(false);
        setTimerPosition(length);
        setPosition(0);
        setIsWarning(warning);
        SetSound();
        SetdDoneSound();
    }

    useEffect(() => {
        if (timerPosition === 0) {
            setPlayPause(false);
            setIsTimerRunning(false);
            sound.unloadAsync();
        }
    })

    useEffect(() => {
        ResetTimer();
    }, [settingchange])

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
                isTimerRunning === true && timerPosition > 15000 ? '#41a661' : 
                isTimerRunning === true && timerPosition <= 15000 ? '#cc1616' :
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
