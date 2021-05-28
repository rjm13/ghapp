//this page contains the scrolling function for displaying the game cards. 

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Caption } from 'react-native-paper';

export default function ActiveGameScroll () {
    return (

        <View>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ 
                    width: '205%', 
                    alignItems: 'flex-start', 
                    paddingLeft: 20, 
                    paddingTop: 10,
                    paddingBottom: 10
                }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
            >
                <Card style={styles.activeContent}>
                    <Card.Content>
                        <Title style={ styles.shareText }>Game Title</Title>
                        <Paragraph style={ styles.paragraphText }>08/18/2020</Paragraph>
                        <Caption style={ styles.captionText }>vs</Caption>
                        <Caption style={ styles.captionText }>The Family</Caption>
                        <Caption style={ styles.captionScore }>24 - 16 - 5</Caption>
                    </Card.Content>
                </Card>

                <Card style={styles.activeContent}>
                    <Card.Content>
                        <Title style={ styles.shareText }>Game Title</Title>
                        <Paragraph style={ styles.paragraphText }>08/18/2020</Paragraph>
                        <Caption style={ styles.captionText }>vs</Caption>
                        <Caption style={ styles.captionText }>The Family</Caption>
                        <Caption style={ styles.captionScore }>24 - 16 - 5</Caption>
                    </Card.Content>
                </Card>

                <Card style={styles.activeContent}>
                    <Card.Content>
                        <Title style={ styles.shareText }>Game Title</Title>
                        <Paragraph style={ styles.paragraphText }>08/18/2020</Paragraph>
                        <Caption style={ styles.captionText }>vs</Caption>
                        <Caption style={ styles.captionText }>The Family</Caption>
                        <Caption style={ styles.captionScore }>24 - 16 - 5</Caption>
                    </Card.Content>
                </Card>

                <Card style={styles.activeContent}>
                    <Card.Content>
                        <Title style={ styles.shareText }>Game Title</Title>
                        <Paragraph style={ styles.paragraphText }>08/18/2020</Paragraph>
                        <Caption style={ styles.captionText }>vs</Caption>
                        <Caption style={ styles.captionText }>The Family</Caption>
                        <Caption style={ styles.captionScore }>24 - 16 - 5</Caption>
                    </Card.Content>
                </Card>

                <Card style={styles.activeContent}>
                    <Card.Content>
                        <Title style={ styles.shareText }>Game Title</Title>
                        <Paragraph style={ styles.paragraphText }>08/18/2020</Paragraph>
                        <Caption style={ styles.captionText }>vs</Caption>
                        <Caption style={ styles.captionText }>The Family</Caption>
                        <Caption style={ styles.captionScore }>24 - 16 - 5</Caption>
                    </Card.Content>
                </Card>

               
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    
    shareText: {
      fontFamily: 'chalkboard-bold',
      fontSize: 16,
      //letterSpacing: 1,
      alignSelf: 'center',
    },
    activeContent: {
      width: 150,
      height: 184,
      marginRight: 10,
    },
    captionText: {
        alignSelf: 'center',
        fontFamily: 'chalkboard-light',
    },
    captionScore: {
        alignSelf: 'center',
        fontFamily: 'chalkboard-bold',
        fontSize: 16,
        //letterSpacing: 1,
        paddingTop: 8,
        color: '#155843'

    },
    paragraphText: {
        //paddingTop: 8,
        alignSelf: 'center',
        fontFamily: 'chalkboard-light',


    },
  })