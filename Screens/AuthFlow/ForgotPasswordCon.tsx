import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {useNavigation} from '@react-navigation/native'
import {Auth} from '@aws-amplify/auth'

const ForgotPassword = ({email} : any) => {

    const navigation = useNavigation();

    const [updatePass, setUpdatePass] = useState({
        username: email,
        code: '',
        password: '',
        confirmPass: '',
    })

    const handleResetPassword = async () => {
        const {username, code, password, confirmPass} = updatePass;

        if(password === confirmPass) {

        try {
            console.log(username, code, password);
            let result = await Auth.forgotPasswordSubmit(username, code, password);

            if(result !== null) {
                () => navigation.navigate('SignIn');
            }
        } catch (e) {
            console.log(Error);
        }} else {
            () => alert('Passwords do not match')
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#155843', '#155843']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >

                <View style={{ margin: 20}}>
                    <View>
                        <Text style={styles.header}>
                            Confirmation Code
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='Check email for code'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                onChangeText={val => setUpdatePass({...updatePass, code: val})}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: 0, marginHorizontal: 20}}>
                    <View>
                        <Text style={styles.header}>
                            New Password
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='Create a new password'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                onChangeText={val => setUpdatePass({...updatePass, password: val})}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: 20, marginHorizontal: 20}}>
                    <View>
                        <Text style={styles.header}>
                            Confirm New Password
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='Confirm new password'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                onChangeText={val => setUpdatePass({...updatePass, confirmPass: val})}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={handleResetPassword}>
                    <View style={styles.button}>
                        <Text style={styles.buttontext}>
                            Reset Password
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack() }>
                    <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 18, color: '#fff', alignSelf: 'center', margin: 5}}>
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
        fontFamily: 'chalkboard-regular'
    },
    textInputTitle: {
        color: '#fff',
        fontFamily: 'chalkboard-regular'
    },
    inputfield: {
        width: '90%',
        height: 50,
        backgroundColor: '#8c8c8ca5',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    button: {
       alignItems: 'center',
       margin: 20,
    },
    buttontext: {
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontFamily: 'chalkboard-regular',
        fontSize: 16,

    },
});

export default ForgotPassword;