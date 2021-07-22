import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

const SCREEN_WIDTH = Dimensions.get('window').width

const HelpMenu = ({navigation} : any) => {

    return (
        <View>
            <Animatable.View animation='bounceInDown' style={{ flexDirection: 'row', height: 90, borderBottomRightRadius: 20, borderBottomLeftRadius: 20,
                            backgroundColor: '#155843', alignItems: 'flex-end', paddingBottom: 20, paddingLeft: 20}}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Feather name='chevron-left' color='#fff' size={25}/>
                        <Text style={{fontFamily: 'chalkboard-regular', color: '#fff', fontSize: 18, marginLeft: 10 }}>
                            Help and Support
                        </Text> 
                    </View>
                </TouchableWithoutFeedback>
            </Animatable.View>

            <View style={{marginTop: 20}}>
                <TouchableWithoutFeedback>
                    <View style={{width: SCREEN_WIDTH, marginHorizontal: 30, marginVertical: 10}}>  
                        <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 16}}>
                            Report a bug
                        </Text>
                    </View>   
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <View style={{width: SCREEN_WIDTH, marginHorizontal: 30, marginVertical: 10}}>  
                        <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 16}}>
                            Contact us
                        </Text>
                    </View>   
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <View style={{width: SCREEN_WIDTH, marginHorizontal: 30, marginVertical: 10}}>  
                        <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 16}}>
                            Terms and Conditions
                        </Text>
                    </View>   
                </TouchableWithoutFeedback>
            </View>
            
        </View>
    )
}

export default HelpMenu;