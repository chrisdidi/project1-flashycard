import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Button, TextInput, TouchableOpacity, StatusBar,Modal, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardList from './CardList';
import Constants from 'expo-constants';

export default ({closeModal, decks, removeCards, addToMain, addCardToMain, removeCard, updateDeckName, newCardFront, newCardBack}) => {

    const [ action, setAction ] = useState("chooseCard")
    const [ modalVisibility, setVisibility ] = useState(false)
    const [ newDeckName, setDeckName ] = useState("")
    const [ newFront, setFront ] = useState("")
    const [ newBack, setBack ] = useState("")

    removeElement = (deckIndex, cardIndex) => {
        {action === "chooseCard" ? 
            Alert.alert(
                "Delete Card Deck",
                'Confirm delete ' + decks[deckIndex].name + '?',
                [{
                    text: 'Cancel', onPress: () => console.log("cancel")
                },{
                    text: 'Delete', onPress: () => {
                        removeCards(deckIndex)
                    }
                }])
         : 
            Alert.alert(
                'Delete Card',
                'Confirm delete card?',
                [{
                    text: 'Cancel', onPress: () => console.log("cancel")
                },{
                    text: 'Delete', onPress: () => {
                        removeCard(deckIndex, cardIndex)
                    }
                }]
            )
         }
    }

    addNewDeck = () => {
        let newDeck = {
            name: newDeckName,
            cards: []
        }
        addToMain(newDeck)
        setDeckName("")
        setVisibility(!modalVisibility)
    }

    addNewCard = () => {
        let card = {
            front: newFront,
            back: newBack
        }
        addCardToMain(card, action)
        setFront("")
        setBack("")
        setVisibility(!modalVisibility)
    }

    handleAdd = () => {
        {action === "chooseCard" ? this.addNewDeck() : this.addNewCard() }
    }

    updateName = text => {
        updateDeckName(action, text)
    }

    changeState = event => {
        setAction(event)
    }

    updateCardFront = (text, cardKey, deckKey) => {
        newCardFront(text, cardKey, deckKey)
    }

    updateCardBack = (text, cardKey, deckKey) => {
        newCardBack(text, cardKey, deckKey)
    }

    return( 
        <View style={styles.wrapper}>
            <Modal visible={modalVisibility} style={{flex: 1}}>
                <View style={{flex: 1, padding: 20, paddingTop: Constants.statusBarHeight}}> 
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                            <Button title="Cancel" onPress={() => {setVisibility(!modalVisibility)}}/>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>{action === "chooseCard" ? "Add new deck" : "Add new card"}</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <Button title="Add" onPress={handleAdd}/>
                        </View>
                    </View>
                    <View style={{flex: 9}}>
                        {action === "chooseCard" ? 
                            <View style={{paddingTop: 25}}>
                                <Text style={{width: '100%', fontSize:20, textAlign: 'center',fontWeight: 'bold'}}>Name of new deck:</Text>
                                <TextInput multiline={true} style={styles.addNewInput} value={newDeckName} onChangeText={text => setDeckName(text)}/>
                            </View> : <View> 
                                <View>
                                    <Text>Question:</Text>
                                    <TextInput multiline={true} style={styles.addNewInput} value={newFront} onChangeText={text => setFront(text)}/>
                                </View>
                                <View>
                                    <Text>Answer:</Text>
                                    <TextInput multiline={true} style={styles.addNewInput} value={newBack} onChangeText={text => setBack(text)}/>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </Modal>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.navWrapper}>
                <View style={styles.backButton}>
                  {action === "chooseCard" ? <Button title="Back" onPress={() => {
                    {closeModal()}
                  }}/> : <Button title="Back" onPress={() => {
                    setAction("chooseCard")
                  }}/>}
                </View>
                <View style={styles.titleWrapper}>
                {action === "chooseCard" ? 
                    <Text style={styles.pageTitle}>Edit Card Decks</Text>
                : 
                    <TextInput value={decks[action].name} onChange={text => {updateName(text)}} multiline={true} style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}/>
                }
                </View>
                <View style={styles.addButton}>
                <TouchableOpacity onPress={() => {setVisibility(!modalVisibility)}}>
                    <Ionicons name="ios-add" size={30} color="#147efb"/>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentWrapper}>
                <ScrollView>
                    {action === "chooseCard" ? decks.map((deck, index) => {
                        return <CardList selectDeck={changeState} deckKey={"chooseCard"} deckName={deck.name} deckNumber={deck.cards.length + " cards"} key={index} state={index} removeElement={removeElement}/>
                    }) :
                        decks[action].cards.map((card, index) => {
                            return <CardList changeCardFront={updateCardFront} changeCardBack={updateCardBack}deckNumber={card.back} removeElement={removeElement} deckName={card.front} key={index} deckKey={decks[action].cards.findIndex(x => x.front === card.front)} state={action}/>
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    navWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dbdbdb',
        backgroundColor: 'white'
        
    },
    backButton: {
        flex: 1
    },
    titleWrapper: {
        flex: 1
    },
    addButton: {
        flex: 1,
        alignItems: 'center'
    },
    pageTitle: {
        textAlign: 'center',
        fontSize: 18
    },
    contentWrapper: {
        flex: 8
    },
    addNewInput: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '100%',
        marginTop: 10,
        marginBottom:15,
        padding: 15
    }
})