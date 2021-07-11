import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Auth, API, graphqlOperation } from 'aws-amplify';


const ForgotPassword = ({navigation} : any) => {

    const [email, setEmail] = useState('');

    const handleForgotPassword = () => {
        Auth.forgotPassword(
            email,
        )
        .then(navigation.navigate('ForgotPasswordCon', {email: email}))
        .catch(err => console.log(err));
      }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#155843','#155843']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{ margin: 20}}>
                    <View>
                        <Text style={styles.header}>
                            Email
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                onChangeText={val => setEmail(val)}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={handleForgotPassword}>
                    <View style={styles.button}>
                        <Text style={styles.buttontext}>
                            Send Reset Code
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack() }>
                    <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 16, color: '#fff', alignSelf: 'center', margin: 20}}>
                        Go Back
                    </Text>
                </TouchableOpacity>

            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        //alignItems: 'center',
        flex: 1,
        width: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 18,
        marginHorizontal: 20,
        marginVertical: 10,
        fontFamily: 'chalkboard-regular',
    },
    textInputTitle: {
        color: '#fff',
        fontWeight: 'normal',
    },
    inputfield: {
        width: '90%',
        height: 40,
        backgroundColor: '#8C8C8Ca5',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    button: {
       alignItems: 'center',
       margin: 20,
    },
    buttontext: {
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontFamily: 'chalkboard-bold',
        fontSize: 18,
        backgroundColor: '#fff',
    },
});

export default ForgotPassword;