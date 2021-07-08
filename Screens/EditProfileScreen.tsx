import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Platform, Dimensions, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { getUser } from '../src/graphql/queries';
import { API, graphqlOperation, Auth } from "aws-amplify";
import { updateUser } from '../src/graphql/mutations';
import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';
import { Modal, Portal, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';


const EditProfile = ({navigation} : any) => {

    const [avatarKey, setAvatarKey] = useState('');
    const [isUploading, setIsUploading ] = useState(false);
    const [image, setImage] = useState('');

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

//signout function
    async function handleSignOut() {
        try {
            await Auth.signOut()
            .then(() => navigation.navigate('SignIn'))
        } catch (error) {
            console.log('error signing out: ', error);
        }
        hideSignOutModal();
    }

//give the camera roll perissions
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

//update the image
    const handleUpdateImage = async ()=> {
        try {
            const response = await fetch(image);
            const blob = await response.blob();
            const filename =  uuid.v4();
            const s3Response = await Storage.put(filename, blob);
            setAvatarKey(s3Response.key);
        } catch (e) {
            console.error(e);
        }
    }

//publish avatar
    const PublishAvatar = async () => {
        setIsUploading(true);
        await handleUpdateImage();
        if ( avatarKey !== '' ) {
            const userInfo = await Auth.currentAuthenticatedUser();
            const response = await Storage.get(avatarKey);
            const updatedUser = { id: userInfo.attributes.sub, imageUri: response }
            if (userInfo) {
                let result = await API.graphql(
                graphqlOperation(updateUser, { input: updatedUser }))
            console.log(result);
            }
        }
        setIsUploading(false);
    };

//Modal
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#fff', 
        margin: 20,
    };

//SignOutModal
    const [visible2, setVisible2] = useState(false);
    const showSignOutModal = () => setVisible2(true);
    const hideSignOutModal = () => setVisible2(false);
    const signoutcontainerStyle = {
        backgroundColor: '#fff', 
        margin: 20,
        borderRadius: 15,
};

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
                <Portal>
                    <Modal visible={visible2} onDismiss={hideSignOutModal} contentContainerStyle={signoutcontainerStyle}>
                        <View style={{padding: 20, height: 200, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 16}}>
                                Are you sure you want to sign out?
                            </Text>
                            <TouchableOpacity onPress={handleSignOut}>
                                <View style={{ marginTop: 40, paddingHorizontal: 30, paddingVertical: 10, backgroundColor: '#ff0000', borderRadius: 20}}>
                                    <Text style={{fontFamily: 'chalkboard-bold', fontSize: 16, color: '#fff'}}>
                                        Sign Out
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                    </Modal>
                </Portal>

                <View>

                    <Animatable.View animation='bounceInDown' style={{ flexDirection: 'row', height: 90, borderBottomRightRadius: 20, borderBottomLeftRadius: 20,
                                    backgroundColor: '#155843', alignItems: 'flex-end', paddingBottom: 20, paddingLeft: 20}}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <View style={{flexDirection: 'row'}}>
                               <Feather name='chevron-left' color='#fff' size={25}/>
                                <Text style={{fontFamily: 'chalkboard-regular', color: '#fff', fontSize: 18, marginLeft: 10 }}>
                                    Edit Profile
                                </Text> 
                            </View>
                            
                        </TouchableWithoutFeedback>
                    </Animatable.View>

                    <View style={{ justifyContent: 'space-between', height: Dimensions.get('window').height - 90}}>
                        <View>
                            <TouchableWithoutFeedback onPress={pickImage}>
                                <View style={styles.photocontainer }>
                                    <Text style={ styles.words }>Photo</Text>
                                    <Image 
                                        //source={{ uri: user?.imageUri || 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg'}} 
                                        source={{ uri: image || 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg'}} 

                                        style={styles.avatar} 
                                    />
                                </View>
                            </TouchableWithoutFeedback> 

                            <View style={styles.namecontainer }>
                                    <Text style={ styles.words }>Display Name</Text>
                                    <TextInput
                                        placeholder={user?.name || 'Player 1'}
                                        style={styles.nametext}
                                        maxLength={20}
                                        multiline={false}
                                        onChangeText={displayName => setDisplayName(displayName)}
                                    />
                            </View>

                            <View style={{ marginHorizontal: 20}}>
                                <ImageBackground 
                                    source={require('../assets/chalkboard.jpg')} 
                                    imageStyle={{ resizeMode: 'cover', width: '100%', height: '100%'}}
                                    style={{marginTop: 10, flexDirection: 'row', backgroundColor: '#155843',
                                        alignSelf: 'center', borderWidth: 4, borderColor: 'tan'}}>
                                    <TextInput
                                        placeholder={user?.status || 'Say something about yourself'}
                                        placeholderTextColor='#fff'
                                        style={[{flex: 1, height: 100, marginHorizontal: 10, fontFamily: 'chalkboard-regular', fontSize: 16, color: '#fff'}]}
                                        maxLength={50}
                                        multiline={true}
                                        numberOfLines={2}
                                        onChangeText={displayStatus => setDisplayStatus(displayStatus)}
                                    />
                                </ImageBackground>
                            </View>
                          

                            <TouchableOpacity onPress={() => {navigation.navigate('UpdateEmail')}}>
                                <View style={styles.emailcontainer }> 
                                    <Text style={ styles.words }>Update Email</Text>
                                </View>
                            </TouchableOpacity>
                    
                            <TouchableOpacity
                                onPress={() => {navigation.navigate('ChangePassword')}}>
                                <View style={styles.emailcontainer }>
                                    <Text style={ styles.words }>Reset Password</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={showSignOutModal}>
                                <View style={styles.emailcontainer }>
                                    <Text style={ styles.words }>Sign Out</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity onPress={handleUpdateAttributes}>
                                <View style={[styles.savebutton]} >
                                    <Text style={styles.savewords}>Save Changes</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
                <StatusBar style='light'/>
            </View>
        </Provider> 
);}

export default EditProfile;

const styles = StyleSheet.create({
    photocontainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    namecontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 10,
    },
    statuscontainer: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: '#155843b3',
        padding: 30,
        alignSelf: 'center',
        width: '90%',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'tan'
    },
    emailcontainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 20,
    },
    nametext: {
        fontFamily: 'chalkboard-bold',
        fontSize: 16,
        color: '#155843',
        textAlign: 'right',
        width: 100,
    },
    words: {
        fontFamily: 'chalkboard-regular',
        fontSize: 16,
        color: '#000',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
      },
      modalavatar: {
        width: 120,
        height: 120,
        borderRadius: 50,
        margin: 16,
        borderWidth: 4,
        borderColor: '#155843',
        
      },
    savebutton: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#155843',
        alignSelf: 'center'
    },
    savewords: {
        fontFamily: 'chalkboard-bold',
        fontSize: 16,
        padding: 16,
        color: 'white',
    },
})
