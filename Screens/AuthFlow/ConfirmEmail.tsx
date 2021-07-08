import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Auth, graphqlOperation, API } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import { createUser } from '../../src/graphql/mutations';
import { useRoute } from '@react-navigation/native';

const ConfirmEmail = ({navigation} : any) => {

    const route = useRoute();

    const {username, password} = route.params

    const [data, setData] = useState({
        username: username,
        code: '',
        password: password,
    });

    async function confirmSignUp() {

        const {username, code, password} = data;
        
        try {
        console.log(username, code, password);
          let result = await Auth.confirmSignUp(username, code);

          if (result) {
            await Auth.signIn (username, password)

            const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true })

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
          
                  const newUser = {
                    id: userInfo.attributes.sub,
                    name: userInfo.attributes.name,
                    imageUri: userInfo.attributes.imageUri,
                    email: userInfo.attributes.email,
                    bio: userInfo.attributes.bio,
                  }
          
                //if there is no user in DB with the id, then create one
                  await API.graphql(
                    graphqlOperation(
                      createUser,
                      { input: newUser }
                    )
                  )
                
                } 
              navigation.navigate('HomeDrawer')  
              }
              return;
          }
            // On failure, display error in console      
        catch (error) {
            console.log('error confirming sign up', error);
            alert('Error confirming account. Please try again.')
        }
    }

    async function resendConfirmationCode() {
        const {username} = data;
        try {
            await Auth.resendSignUp(username);
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }

    const handleCode = (val : any) => {
        setData({
            ... data,
            code: val
        });
    }

    // useEffect(() => {
    //     const UserName = route.params;
    //     setData({
    //         ...data,
    //         username: UserName
    //     })
    // })


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#155843', '#155843']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                
                    {/* <View style={{ position: 'absolute', top: 50, left: 30}}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp') }>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </TouchableOpacity>
                    </View> */}
                
                

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
                                onChangeText={(val) => handleCode(val)}
                                
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={confirmSignUp}>
                    <View style={styles.button}>
                        <Text style={styles.buttontext}>
                            Confirm Account
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={resendConfirmationCode}>
                    <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 16, color: '#fff', alignSelf: 'center', margin: 20}}>
                        Resend code
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
        fontFamily: 'chalkboard-regular',
        marginHorizontal: 20,
        marginVertical: 10,
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
        fontFamily: 'chalkboard-bold',
        fontSize: 16,
    },
});

export default ConfirmEmail;