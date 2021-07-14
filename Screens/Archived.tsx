import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

const Archived = ({navigation} : any) => {
    return (
        <View>
            <Animatable.View animation='bounceInDown' style={{ flexDirection: 'row', height: 90, borderBottomRightRadius: 20, borderBottomLeftRadius: 20,
                            backgroundColor: '#155843', alignItems: 'flex-end', paddingBottom: 20, paddingLeft: 20}}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Feather name='chevron-left' color='#fff' size={25}/>
                        <Text style={{fontFamily: 'chalkboard-regular', color: '#fff', fontSize: 18, marginLeft: 10 }}>
                            Completed Scorecards
                        </Text> 
                    </View>
                </TouchableWithoutFeedback>
            </Animatable.View>
        </View>
        
    );
}

export default Archived;