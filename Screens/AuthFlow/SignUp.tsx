import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {Auth, graphqlOperation, API} from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import { createUser } from '../../src/graphql/mutations';




const SignUp = ({navigation} : any) => {

    const [auth, setAuth] = useState(false);

    const CreateUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser(
            { bypassCache: true }
          );
          console.log(userInfo.attributes.sub);
    
          if (!userInfo) {
            alert('Error signing up. Please try again.')
            return;
          }
    
          if (userInfo) {
          //get the user from Backend with the user SUB from Auth
            const userData = await API.graphql(
              graphqlOperation(
                getUser, 
                { id: userInfo.attributes.sub,
                }
              )
            )
    
    
            if (userData.data.getUser) {
              console.log("User is already registered in database");
              setAuth(true);
              return;
            }
    
            
    
          //if there is no user in DB with the id, then create one

            const newUser = {
                id: userInfo.attributes.sub,
                name: userInfo.attributes.name,
                imageUri: userInfo.attributes.imageUri,
                email: userInfo.attributes.email,
                bio: userInfo.attributes.bio,
            }

            await API.graphql(
                graphqlOperation(
                createUser,
                    { input: newUser }
                )
            )
    }
}

    const [data, setData] = useState({
        username: '',
        password: '',
        name: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChange = (val : any) => {
        if( val.length !== 0 ) {
            setData({
                ... data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ... data,
                name: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val : any) => {
        setData({
            ... data,
            confirm_password: val
        });
    }

    const handleConfirmPasswordChange = (val : any) => {
        setData({
            ... data,
            password: val
        });
    }

    const handleNameChange = (val : any) => {
        setData({
            ... data,
            name: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ... data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    const updateConfirmSecureTextEntry = () => {
        setData({
            ... data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }

    const handleSignUp = () => {
        const { password, confirm_password, name, username } = data;
        // Make sure passwords match
        if (password === confirm_password) {
          Auth.signUp({
            password,
            username,
            attributes: 
                { name },
          })
          .then (CreateUser)
          .then(navigation.navigate('ConfirmEmail', {username, password}))
            // On failure, display error in console
            .catch(err => console.log(err));
        } else {
          alert('Passwords do not match.');
        }
      }

    // const handleSignUp = () => {
    //     const { password, confirm_password, name, username } = data;
    //     // Make sure passwords match
    //     if (password === confirm_password) {
    //       signUp(
    //       password,
    //         name,
    //         username,
    //         )
    //         // On failure, display error in console
    //         .catch(err => console.log(err));
    //     } else {
    //       alert('Passwords do not match.');
    //     }
    //   }

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#155843', '#155843']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{ margin: 20, paddingTop: 70}}>
                    <View>
                        <Text style={styles.header}>
                            Name
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='...'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                onChangeText={(val) => handleNameChange(val)}
                            />
                        </View>
                    </View>

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
                                onChangeText={(val) => textInputChange(val)}
                                autoCapitalize='none'
                            />
                        </View>
                    </View>

                    <View style={{ borderBottomWidth: 1, borderColor: '#ffffffa5', marginBottom: 10, marginTop: 20, marginHorizontal: 20}}>

                    </View>

                    <View>
                        <Text style={styles.header}>
                            Password
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={20}
                                autoCapitalize='none'
                                secureTextEntry={data.secureTextEntry ? true : false }
                                onChangeText={(val) => handlePasswordChange(val)}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={styles.header}>
                            Confirm Password
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={20}
                                autoCapitalize='none'
                                secureTextEntry={data.confirm_secureTextEntry ? true : false }
                                onChangeText={(val) => handleConfirmPasswordChange(val)}
                            />
                        </View>
                    </View>

                </View>

                <TouchableOpacity onPress={handleSignUp}>
                    <View style={styles.button}>
                        <Text style={styles.buttontext}>
                            Create Account
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignIn') }>
                    <Text style={{ fontSize: 16, fontFamily: 'chalkboard-bold', color: '#fff', alignSelf: 'center', margin: 20}}>
                        I already have an account.
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'flex-start',
        //alignItems: 'center',
        flex: 1,
        width: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 18,
        marginHorizontal: 20,
        marginBottom: 8,
        marginTop: 10,
        fontFamily: 'chalkboard-regular',
    },
    textInputTitle: {
        color: '#fff',
        fontFamily: 'chalkboard-regular',
        fontSize: 13
    },
    inputfield: {
        width: '90%',
        height: 40,
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
        paddingVertical: 6,
        paddingHorizontal: 30,
        fontFamily: 'chalkboard-regular',
        fontSize: 16

    },
});

export default SignUp;