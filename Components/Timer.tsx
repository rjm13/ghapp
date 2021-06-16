import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Timer = ({warning, length}) => {

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
            }
          }, 1000);

    const StartStopTimer = () => {
        setPlayPause(!PlayPause);
        setIsTimerRunning(!isTimerRunning);
    }

    const ResetTimer = () => {
        setPlayPause(false);
        setIsTimerRunning(false);
        setTimerPosition(length);

    }


    return (
        <View style={styles.container}>
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
                <Text style={{ color: isTimerRunning === true ? 'red' : '#fff', fontFamily: 'chalkboard-regular', fontSize: 25}}>
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
        backgroundColor: '#363636',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
})

export default Timer;
