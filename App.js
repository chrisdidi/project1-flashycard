import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import decks from './src/flashcards';
import ChooseCard from './src/ChooseCard';
import PlayCard from './src/PlayCard';
import EditModal from './src/Components/EditModal'
import Constants from 'expo-constants';

export default class App extends Component{

  state={
    action: "chooseCard",
    modalVisibility: false,
    decks: decks
  }

  handleChangeState = event => {
    this.setState({
      action: event
    })
  }

  removeCards = event => {
    decks.splice(event, 1)
    this.setState({
      decks: decks
    })
  }

  removeCard = (deckIndex, cardIndex) => {
    decks[deckIndex].cards.splice(cardIndex, 1)
    this.setState({
      decks: decks
    })
  }

  closeEditModal = () => {
    this.setState({
      modalVisibility: !this.state.modalVisibility
    })
  }

  updateCardBack = (text, cardKey, deckKey) => {
    let decks = this.state.decks
    decks[deckKey].cards[cardKey].back = text
    this.setState({
      decks: decks
    })
  }

  updateCardFront = (text, cardKey, deckKey) => {
    let decks = this.state.decks
    console.log("old name: " + decks[deckKey].cards[cardKey].front)
    decks[deckKey].cards[cardKey].front = text
    this.setState({
      decks: decks
    })
  }

  addDeck = deck => {
    this.setState({
      decks: [...this.state.decks, deck]
    })
  }

  addCard = (card, index) => {
    let decks = this.state.decks;
    decks[index].cards = [...this.state.decks[index].cards, card]
    this.setState({
      decks: decks
    })
  }

  handleChangeDeckName = (key, newName) => {
    let decks = this.state.decks
    decks[key].name = newName.nativeEvent.text
    this.setState({
      decks: decks
    })
  }

  render(){
  return (
    <View style={styles.container}>
      <Modal style={styles.editModal} animationType="slide" visible={this.state.modalVisibility}>
        <EditModal addCardToMain={this.addCard} addToMain={this.addDeck} newCardBack={this.updateCardBack} newCardFront={this.updateCardFront} updateDeckName={this.handleChangeDeckName}removeCard={this.removeCard} removeCards={this.removeCards} closeModal={this.closeEditModal} decks={this.state.decks}/>
      </Modal>
      <View style={styles.menuWrapper}>
        <View style={{flex: 1}}>
          {this.state.action === "chooseCard" ? <></> : <Button title="Back" onPress={() => {
            this.setState({
              action: "chooseCard"
            })
          }}/>}
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.appTitle}>
            {this.state.action === "chooseCard" ? "FLASHY FLASHCARDS" : this.state.decks[this.state.action].name}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Button title="Edit" onPress={() => {
            this.setState({
              modalVisibility: !this.state.modalVisibility
            })
          }}/>
        </View>
      </View>
      {this.state.action === "chooseCard" ? <ChooseCard decks={this.state.decks} changeState={this.handleChangeState}/> : <PlayCard deck={this.state.decks[this.state.action]}/>}
    </View>
  )};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9CCAFF',
  },
  menuWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
  },
  appTitle: {
    color: '#FFF',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  editButton: {
    color: '#FFF',
    backgroundColor: '#000000',
  },
  titleWrapper: {
    flex: 2,  
  },
  contentWrapper: {
    flex: 4,  
  },
  buttonWrapper: {
    flex: 3,
  },
});
