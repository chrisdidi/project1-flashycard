import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Button, ScrollView, SegmentedControlIOS,  Modal, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default ({deckName, deckKey, deckNumber, removeElement, selectDeck, state, changeCardBack, changeCardFront}) => {

    const [ modalVisibility, setModalVisibility ] = useState(false)
    const [ section, setSection ] = useState("question")

    handleRemove = () => {
        removeElement(state, deckKey)
    }

    handleSelect = () => {
        if(deckKey === "chooseCard"){
        selectDeck(state)
        }else{
            setModalVisibility(!modalVisibility)
        }
    }

    updateCardFront = (text, index) => {
        changeCardFront(text, index, state)
    }

    updateCardBack = (text, index) => {
        changeCardBack(text, index, state)
    }

    return(
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', borderBottomWidth: 0.5, borderStyle: 'solid', borderBottomColor: '#c6c6c6'}}>
            <Modal style={styles.modalWrapper}visible={modalVisibility}>
                <View style={{padding: 20, flex: 1, paddingTop: Constants.statusBarHeight}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                            {section === "question" ? <Button title="Answer" onPress={() => setSection("answer")}/> : <Button title="Question" onPress={() => setSection("question")}/> }                            
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Button title="Done" onPress={() => {setModalVisibility(!modalVisibility)}}/>
                        </View>
                    </View>
                {section === "question" ? 
                    <View style={styles.modalPart}>
                        <Text style={styles.modalTitle}>Question: </Text>
                        <TextInput multiline={true} style={styles.input} value={deckName} onChangeText={text => updateCardFront(text, deckKey)}/>
                    </View>
                : 
                    <View style={styles.modalPart}>
                        <Text style={styles.modalTitle}>Answer: </Text>
                        <TextInput multiline={true} style={styles.input} value={deckNumber} onChangeText={text => updateCardBack(text, deckKey)}/>
                    </View>
                }
                </View>
            </Modal>
            <TouchableOpacity onPress={handleRemove}>
                <View style={{padding: 10, paddingLeft: 20}}>
                    <Ionicons name="ios-remove-circle" size={30} color="#FC3D39"/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={handleSelect}>
                <View style={styles.contentWrapper}>
                    <Text style={styles.deckName}>
                        {deckName}
                    </Text>
                    <Text style={styles.deckNumber}>
                        {deckNumber}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    contentWrapper: {
        padding: 10,
        width: Math.round(Dimensions.get('window').width) - 50,
        justifyContent: 'center'
    },
    deckName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    deckNumber: {
        fontSize: 12,
        marginTop: 5
    },
    modalPart: {
        flex: 6,
        alignItems: 'center',
    },
    modalWrapper: {
        flex: 1,
    },
    input: {
        minWidth: 80,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#b5b5b5'
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 18
    }
})