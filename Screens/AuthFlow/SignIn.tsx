import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import { createUser } from '../../src/graphql/mutations';



const SignIn = ({navigation} : any) => {

    const [auth, setAuth] = useState(false);

    const CreateUser = async () => {
    
        const userInfo = await Auth.currentAuthenticatedUser(
            { bypassCache: true }
          );
          console.log();
    
          if (!userInfo) {
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
        const {username, password} = data;
        try {
            const user = await Auth.signIn(username, password)
            .then (CreateUser)
            // .then(auth === true ? navigation.navigate('HomeDrawer') : alert('Incorrect email or password. Please try again.'))
            console.log(user);
        } 
        catch (error) {
            console.log('error signing in', error);
        }
        if (auth === true) {
            navigation.navigate('HomeDrawer')
        } else {
            alert('Incorrect email or password. Please try again.')
        }
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
                                onChangeText={handleUsername}
                            />
                        </View>
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
                                maxLength={30}
                                secureTextEntry={true}
                                onChangeText={handlePassword}
                            />
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <View style={{ borderBottomWidth: 1, borderColor: '#ffffffa5', marginBottom: 0, marginTop: 30, marginHorizontal: 20}}>
                            <Text style={{ fontSize: 16, fontFamily: 'chalkboard-regular', color: '#fff', alignSelf: 'center', margin: 20}}>
                                Forgot Password
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity onPress={signIn}>
                    <View style={styles.button}>
                        <Text style={styles.buttontext}>
                            Sign In
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignUp') }>
                    <Text style={{ fontFamily: 'chalkboard-bold', fontSize: 18, color: '#fff', alignSelf: 'center', margin: 20}}>
                        Create an account
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('HomeDrawer')}>
                        <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 16, color: '#ffffffa5', alignSelf: 'center', margin: 20}}>
                            Continue without logging in
                        </Text>
                </TouchableOpacity>
            </LinearGradient>
            
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
        fontFamily: 'chalkboard-regular'
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
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontFamily: 'chalkboard-bold',
        color: '#000',
        fontSize: 16,

    },
});

export default SignIn;
