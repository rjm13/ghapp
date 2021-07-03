import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';

const SCREEN_WIDTH = Dimensions.get('window').width;


const SavedScores = ({navigation} : any) => {

    const [isSaved, setIsSaved] = useState(false);

    const [SavedCards, setSavedCards] = useState(['']);

    const [removedItem, setRemovedItem] = useState('');

//fetch saved scorecards to set the dataset for the flatlist
    useEffect(() => {
        const LoadKeys = async () => {
            let saved = await AsyncStorage.getAllKeys();
    
            if (saved != null) {
                let result = saved.filter((item) => item.includes("card"));
                setSavedCards(result);
            } 
        }
        LoadKeys();
    
    }, [isSaved])

//remove an item from asyncstorage function
    //set the modal state
    const [visibleRemoveModal, setVisibleRemoveModal] = useState(false);
  
    const showRemoveModal = () => setVisibleRemoveModal(true);

    const hideRemoveModal = () => setVisibleRemoveModal(false);

    const removeModalContainerStyle = {backgroundColor: 'transparent', padding: 20}; 

    //remove the item
    const RemoveCard = async () => {
        try {
          await AsyncStorage.removeItem(removedItem);
        } catch(e) {
          // remove error
        }
        try {
            let object = await AsyncStorage.getItem(removedItem);
            let objs = object ? JSON.parse(object) : null
            await AsyncStorage.removeItem(objs.teams);
            await AsyncStorage.removeItem(objs.scores);
            await AsyncStorage.removeItem(objs.settings);
        }
        catch(e) {
            // read error
        }
        setIsSaved(!isSaved);
        hideRemoveModal();
      }

//rendered item for the localstorage load scorecard list
    const SavedItems = ({item} : any) => {

        let [itemname, setitemname] = useState('');
        let [itemdate, setitemdate] = useState('');


        useEffect(() => {
            let componentMounted = true;
            const fetchData = async () => {
                try {
                    let object = await AsyncStorage.getItem(item);
                    let objs = object ? JSON.parse(object) : null
                    if(componentMounted) {
                    setitemname(objs.name);
                    setitemdate(objs.dateCreated);
                }
                } catch(e) {
                    // read error
                }
                
            };
            fetchData();
            return () => {
            componentMounted = false;
            }
            }, []);

        return (
            
                <TouchableWithoutFeedback 
                    onPress={() => navigation.navigate('Scorecard', {cardID: item.toString()})}
                    onLongPress={() => {showRemoveModal(); setRemovedItem(item);}}
                >
                    <View style={{ 
                        padding: 12, marginVertical: 10, marginHorizontal: 5, backgroundColor: '#fff',
                        flexDirection: 'row', justifyContent: 'space-between', elevation: 1
                    }}>
                        <Text style={{ fontFamily: 'chalkboard-regular', fontSize: 16, flexWrap: 'wrap', width: (SCREEN_WIDTH - 20) / 2}}>
                            {itemname}
                        </Text> 
                        <Text style={{ fontFamily: 'chalkboard-light', fontSize: 14, color: 'gray'}}>
                            {itemdate}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            
        )
    }

//render list of the saved cards
    const renderSavedCards = ({item} : any) => {
        return(
        <SavedItems
                item={item}
            /> 
        ) 
    }

    return (
        <Provider>
            <Portal>
{/* New Scorecard Modal */}
                <Modal visible={visibleRemoveModal} onDismiss={hideRemoveModal} contentContainerStyle={removeModalContainerStyle}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 15,}}>
                        <View style={{ alignItems: 'center', marginVertical: 40}}>
                            <Text style={{fontSize: 22, fontFamily: 'chalkboard-regular', textAlign: 'center'}}>
                                Are you sure you want to delete this scorecard?
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center'}}>
                            <TouchableOpacity onPress={RemoveCard}>
                                <View style={{ width: 200, height: 50, borderRadius: 25, backgroundColor: '#d92121', alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: '#fff', fontSize: 22, textAlign: 'center', fontWeight: 'bold'}}>
                                        Delete
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Portal>
            <View>
                <View style={{}}>
                    
                    <View style={{marginHorizontal: 10}}>
                        {SavedCards === [''] ? (
                            <Text>
                                This is where you find your saved scorecards but there is nothing here!
                            </Text>
                        ) :
                            <FlatList 
                                data={SavedCards}
                                renderItem={renderSavedCards}
                                showsVerticalScrollIndicator={false}
                                ListHeaderComponent={() => (
                                    <View style={{ alignItems: 'center', marginVertical: 20, flexDirection: 'row'}}>
                                        <Feather 
                                            name='chevron-left'
                                            color='#000'
                                            size={25}
                                            style={{paddingRight: 15}}
                                            onPress={() => navigation.goBack()}
                                        />
                                        <Text style={{fontSize: 22, fontFamily: 'chalkboard-regular', textAlign: 'center'}}>
                                            Saved Scorecards
                                        </Text>
                                    </View>
                                )}
                                ListFooterComponent={() => (
                                    <View style={{ alignItems: 'center', marginVertical: 20}}>
                                        
                                    </View>
                                )}
                            />
                        }
                        
                    </View>
                </View>
            </View>
        </Provider>
    );
}

export default SavedScores;