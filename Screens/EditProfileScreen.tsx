import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Platform } from 'react-native';
import { getUser } from '../src/graphql/queries';
import { API, graphqlOperation, Auth } from "aws-amplify";
import { updateUser } from '../src/graphql/mutations';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import { Modal, Portal, Button, Provider } from 'react-native-paper';


const EditProfile = ({navigation} : any) => {

//Modal
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#fff', 
        padding: 20,
    };

//Fetch user information
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true});
            if (!userInfo) {
            return;
            }
        try {
            const userData = await API.graphql(graphqlOperation(
            getUser, {id: userInfo.attributes.sub}))
            if (userData) {
                setUser(userData.data.getUser);
            }
        } catch (e) {
            console.log(e);
        }
        }
        fetchUser();
    }, [])

    //Attribute state
    const [ displayName, setDisplayName ] = useState('');
    const [ displayStatus, setDisplayStatus ] = useState('');
    const [ displayEmail, setDisplayEmail ] = useState('');

//handle change attribute using graphql operation
const handleUpdateAttributes = async () => {
      //get authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser(
        { bypassCache: true }
      );

      const updatedUser = {
        id: userInfo.attributes.sub,
        name: displayName.length === 0 ? user?.name : displayName,
        //imageUri: 
        status: displayStatus.length === 0 ? user?.status : displayStatus,
        //email: displayEmail.length === 0 ? user?.email : displayEmail,
      }
      
      if (userInfo) {
      //get the user from Backend with the user SUB from Auth
        let result = await API.graphql(
          graphqlOperation(
            updateUser, { input: updatedUser }
          )
        )
        
        let action = navigation.navigate('Profile')

        console.log(result);
      }
  }


    return (
        <Provider>
            <View>
            <View style={styles.container } >

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{
                            fontFamily: 'futura-bold',
                            fontSize: 22,
                            paddingVertical: 16,
                            }}>Change Photo
                        </Text>
                        <Image 
                            source={{ uri: user?.imageUri || 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg'}} 
                            style={styles.modalavatar} 
                        />
                        <Text style={{
                            fontFamily: 'futura',
                            fontSize: 20,
                            paddingVertical: 16,
                            }}>Upload new photo
                        </Text>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={hideModal}>
                                <LinearGradient
                                    colors={['#55B142', '#155843']}
                                    style={styles.savebutton} >
                                    <Text style={styles.savewords}>Submit</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Portal>

                <TouchableWithoutFeedback onPress={showModal}>
                    <View style={styles.photocontainer }>
                        <Text style={ styles.words }>Photo</Text>
                        <Image 
                            source={{ uri: user?.imageUri || 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg'}} 
                            style={styles.avatar} 
                        />
                    </View>
                </TouchableWithoutFeedback> 

                <View style={styles.namecontainer }>
                    <Text style={ styles.words }>Display Name</Text>
                    <TextInput
                        placeholder={user?.name}
                        style={styles.nametext}
                        maxLength={20}
                        multiline={false}
                        onChangeText={displayName => setDisplayName(displayName)}
                        //defaultValue={user?.name}
                    />
                </View>

                <View style={styles.statuscontainer}>
                    <TextInput
                                placeholder={user?.status || 'Say something about yourself'}
                                style={styles.textInput}
                                maxLength={50}
                                multiline={true}
                                numberOfLines={2}
                                onChangeText={displayStatus => setDisplayStatus(displayStatus)}
                                //defaultValue={user?.status || ''}
                    />
                </View>

                <TouchableOpacity onPress={() => {navigation.navigate('UpdateEmail')}}>
                    <View style={styles.emailcontainer }> 
                         <Text style={ styles.words }>Update Email</Text>
                        {/* <Text style={ styles.nametext }>{user?.email}</Text> */}
                    </View>
                </TouchableOpacity>
               
                <TouchableOpacity
                    onPress={() => {navigation.navigate('ChangePassword')}}>
                    <View style={styles.smallcontainer }>
                        <Text style={ styles.words }>Reset Password</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.button}>
                    <TouchableOpacity 
                        onPress={handleUpdateAttributes}
                        >
                        <LinearGradient
                            colors={['#55B142', '#155843']}
                            style={styles.savebutton}
                        >
                            <Text style={styles.savewords}>Save Changes</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

                {/* <View style={styles.deletecontainer }>
                    <View>
                        <TouchableOpacity 
                            onPress={() => alert('This will permenantly delete your account. Are you sure you want to continue?')}>
                                <Text style={ styles.deletewords }>Delete Account</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </View>
        </Provider> 
);}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
       //backgroundColor: 'green',
       //height: '100%',
    },
    photocontainer: {
        marginVertical: 16,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        //flexDirection: 'row',
        width: '100%',
        elevation: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    namecontainer: {
        //marginTop: 16,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        //flexDirection: 'row',
        width: '100%',
        elevation: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    statuscontainer: {
        marginTop: 16,
        flexDirection: 'row',
        //margin: 12,
        backgroundColor: 'white',
        padding: 40,
        width: '100%',
    },
    emailcontainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: "center",
        alignSelf: 'center',
        alignItems: "center",
        //flexDirection: 'row',
        width: '100%',
        elevation: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    smallcontainer: {
        marginVertical: 16,
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        //flexDirection: 'row',
        width: '100%',
        elevation: 1,
        backgroundColor: '#fff',
    },
    nametext: {
        fontFamily: 'futura-bold',
        fontSize: 16,
        color: 'green',
        textAlign: 'right',
    },
    words: {
        fontFamily: 'futura',
        fontSize: 18,
        padding: 16,
        color: 'gray',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        margin: 16,
      },
      modalavatar: {
        width: 120,
        height: 120,
        borderRadius: 50,
        margin: 16,
        borderWidth: 4,
        borderColor: '#155843',
        
      },
      textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: 'green',
        fontFamily: 'futura',
        fontSize: 18,
    },
    button: {
        alignItems: 'center',
        paddingTop: 48,
    },
    savebutton: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    savewords: {
        fontFamily: 'futura-bold',
        fontSize: 18,
        padding: 16,
        color: 'white',
    },
    deletecontainer: {
        margin: 50,
        //backgroundColor: 'yellow',
        //height: '100%',
        alignItems: 'center',
        //flexDirection: 'column-reverse'
        
        
    },
    deletewords: {
        fontFamily: 'futura',
        fontSize: 18,
        padding: 16,
        color: 'gray',
        //alignSelf: 'center',
    },
})
