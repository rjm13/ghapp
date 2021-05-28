//this shows the number of wins and losses on the profile page and the drawer

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption, Paragraph } from 'react-native-paper';

const WinLossHeader = () => {
  return (

    <View style={ styles.row }>
        <View style={ styles.section }>
            <Paragraph style={[styles.paragraph ]}>32</Paragraph>
            <Caption style={ styles.caption }>Wins</Caption>
        </View>
        <View style={ styles.section }>
            <Paragraph style={[styles.paragraph ]}>112</Paragraph>
            <Caption style={ styles.caption }>Losses</Caption>
        </View>
        <View style={ styles.section }>
            <Paragraph style={[styles.paragraph ]}>2</Paragraph>
            <Caption style={ styles.caption }>Ties</Caption>
        </View>
    </View>
    
  );
}

export default WinLossHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    height: '100%',
    flexDirection: 'column',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#000000',
    fontFamily: 'chalkboard-light'
},
row: {
    //marginTop: 20,
    flexDirection: 'row',
    //marginBottom: 0,
    alignSelf: 'center',
    //borderBottomColor: '#f4f4f4',
    //borderBottomWidth: 1,
    //paddingBottom: 20,
},
section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
},
paragraph: {
    //fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
    color: '#000000',
    marginRight: 10,
    fontFamily: 'chalkboard-regular',
},
})