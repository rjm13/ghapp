import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import { createUser } from '../../src/graphql/mutations';
import { AppContext } from '../../AppContext';
import { ActivityIndicator } from 'react-native-paper';




const SignIn = ({navigation} : any) => {

    const [seePass, setSeePass] = useState(false);

    const [isErr, setIsErr] = useState(false);

    const [signingIn, setSigningIn] = useState(false);

    const { userID, setUserID } = useContext(AppContext);

    const [trigger, setTrigger] = useState(false);

    const CreateUser = async () => {
    
        const userInfo = await Auth.currentAuthenticatedUser(
            { bypassCache: true }
          );
    
          if (userInfo === 'The user is not authenticated') {
            return;
          }
    
          else if (userInfo) {
          //get the user from Backend with the user SUB from Auth
            const userData = await API.graphql(
              graphqlOperation(
                getUser, 
                { id: userInfo.attributes.sub,
                }
              )
            )
    
    
            if (userData.data.getUser) {
                //console.log("User is already registered in database");
                setUserID(userData.data.getUser);
                setIsErr(false);
                setTrigger(!trigger);
                navigation.navigate('Redirect', {trigger: Math.random()});
                return;
            };
    
            // const newUser = {
            //   id: userInfo.attributes.sub,
            //   name: userInfo.attributes.name,
            //   imageUri: userInfo.attributes.imageUri,
            //   email: userInfo.attributes.email,
            //   bio: userInfo.attributes.bio,
            // }
    
          //if there is no user in DB with the id, then create one
            // await API.graphql(
            //   graphqlOperation(
            //     createUser,
            //     { input: newUser }
            //   )
            // )
          }
        }

    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const handlePassword = (val : any) => {
        setData({
            ... data,
            password: val
        });
    }

    const handleUsername = (val : any) => {
        setData({
            ... data,
            username: val
        });
    }

    async function signIn() {
        setSigningIn(true);
        const {username, password} = data;
        try {
            await Auth.signIn(username, password)
            .then (CreateUser)     
            //.then(userID !== null ? navigation.navigate('Redirect') : null)
        } 
        catch (error) {
            console.log('error signing in', error)
            //alert(error.message)
            setIsErr(true)
        }
        setSigningIn(false);
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
                    {isErr ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                        <Text style={{borderRadius: 15, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontFamily: 'chalkboard-regular', fontSize: 13, }}>
                            Error signing in. Please try again.
                        </Text>
                    </View>
                    ) : null}
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
                                onChangeText={handleUsername}
                                autoCapitalize='none'
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={styles.header}>
                            Password
                        </Text>
                        <View style={[styles.inputfield, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                secureTextEntry={seePass === true ? false : true}
                                onChangeText={handlePassword}
                                autoCapitalize='none'
                            />
                            <Feather 
                                name={seePass === true ? 'eye' : 'eye-off'}
                                color='#fff'
                                size={18}
                                style={{marginRight: 10}}
                                onPress={() => setSeePass(!seePass)}
                            />
                        </View>
                    </View>

                    <View style={{width: Dimensions.get('window').width - 60, alignSelf: 'center', marginVertical: 20, justifyContent: 'space-between', flexDirection: 'row', marginTop: 30}}>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <View style={{  }}>
                                <Text style={{ fontSize: 14, fontFamily: 'chalkboard-regular', color: '#ffffffa5', alignSelf: 'center'}}>
                                    Forgot password
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('HomeDrawer')}>
                            <View style={{ }}>
                                <Text style={{ fontSize: 14, fontFamily: 'chalkboard-regular', color: '#ffffffa5', alignSelf: 'center'}}>
                                    Continue logged out
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{alignSelf: 'center', width: Dimensions.get('window').width - 60, borderTopWidth: 1, borderColor: '#ffffffa5',}}>

                    </View>
                    

                </View>

                <TouchableOpacity onPress={() => navigation.navigate('SignUp') }>
                    <Text style={{ fontFamily: 'chalkboard-bold', fontSize: 16, color: '#fff', alignSelf: 'center', margin: 20}}>
                        Create an account
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={signIn}>
                    <View style={styles.button}>
                        {signingIn === true ? (
                            <ActivityIndicator size="small" color="#155843"/>
                        ) : (
                            <Text style={styles.buttontext}>
                                Sign In
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>

                
            </LinearGradient>
            <StatusBar style="light" backgroundColor ='#155843' />
        </View>
    );
}

const styles = StyleSheet.create ({
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
        fontFamily: 'chalkboard-regular',
        width: 220,
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
        marginTop: 40,
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingVertical: 6,
        paddingHorizontal: 30,
        width: 120,
        alignSelf: 'center'
    },
    buttontext: {
        fontFamily: 'chalkboard-regular',
        color: '#000',
        fontSize: 16,

    },
});

export default SignIn;
