import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const GamesStatsList = () => {

    return (
        <View>
            <ScrollView 
                horizontal={true}
                contentContainerStyle={{ 
                    width: '205%', 
                    alignItems: 'flex-start', 
                    marginHorizontal: 30,
                    marginVertical: 10,
                }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
            >
                <View style={styles.buttonblock}>
                    <View style={styles.listbutton}>
                        <Ionicons name='md-stats-chart' size={36} color='#000' />
                    </View>
                    <View style={{marginTop: 10, alignItems: 'center'}}>
                        <Text>Record</Text>
                    </View>
                </View>

                <View style={styles.buttonblock}>
                    <View style={styles.listbutton}>
                        <Ionicons name='md-stats-chart' size={36} color='#000' />
                    </View>
                    <View style={{marginTop: 10, alignItems: 'center'}}>
                        <Text>Vs</Text>
                    </View>
                </View>

                <View style={styles.buttonblock}>
                    <View style={styles.listbutton}>
                        <Ionicons name='trophy' size={36} color='#000' />
                    </View>
                    <View style={{marginTop: 10, alignItems: 'center'}}>
                        <Text>Awards</Text>
                    </View>
                </View>

                <View style={styles.buttonblock}>
                    <View style={styles.listbutton}>
                        <Ionicons name='trophy' size={36} color='#000' />
                    </View>
                    <View style={{marginTop: 10, alignItems: 'center'}}>
                        <Text>Awards</Text>
                    </View>
                </View>



            </ScrollView>
        </View>
    );
}

export default GamesStatsList;

const styles = StyleSheet.create({
    listbutton: {
        height: 60, 
        width: 60, 
        borderRadius: 30, 
        backgroundColor: '#fff', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    buttonblock: {
        marginRight: 30
    },
  })