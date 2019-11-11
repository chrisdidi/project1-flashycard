import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default class PlayCard extends Component{

    constructor(props){
        super(props);
        this.state={
            correctDeck: [],
            wrongDeck: [],
            currentCard: 0,
            time: 0,
            deck: this.props.deck,
            status: "ready",
            cardFace: 'front'
        }
    }

    startTimer = () => {
        this.setState({
            time: this.state.time + 1
        })
    }

    sortRight = (a, b) => {
        // Use toUpperCase() to ignore character casing
        const timeA = a.time
        const timeB = b.time
      
        let comparison = 0;
        if (timeA > timeB) {
          comparison = -1;
        } else if (timeA < timeB) {
          comparison = 1;
        }
        return comparison;
      }

    handleWrong = () => {
        if(this.state.cardFace !== 'front'){
            let tempDeck = this.state.deck
            let card = tempDeck.cards.shift()
            card.time = this.state.time
            let tempArray = [...this.state.wrongDeck, card]
            let sortedArray = tempArray.sort(this.sortRight)
            if(!Array.isArray(tempDeck.cards) || !tempDeck.cards.length){
                tempDeck.cards = [...sortedArray, ...this.state.correctDeck]
                this.setState({
                    status: "complete",
                    wrongDeck: sortedArray,
                    deck: tempDeck,
                    cardFace: 'front',
                    time: 0,
                })
            }else{
                this.setState({
                    timerInterval: setInterval(this.startTimer, 1000),
                    wrongDeck: sortedArray,
                    deck: tempDeck,
                    cardFace: 'front',
                    time: 0,
                })
            }
        } 
    }

    handleRight = () => {
        if(this.state.cardFace !== 'front'){
            let tempDeck = this.state.deck
            let card = tempDeck.cards.shift()
            card.time = this.state.time
            let tempArray = [...this.state.correctDeck, card]
            let sortedArray = tempArray.sort(this.sortRight)
            if(!Array.isArray(tempDeck.cards) || !tempDeck.cards.length){
                tempDeck.cards = [...this.state.wrongDeck, ...sortedArray]
                this.setState({
                    status: "complete",
                    correctDeck: sortedArray,
                    deck: tempDeck,
                    cardFace: 'front',
                    time: 0,
                })
            }else{
                this.setState({
                    timerInterval: setInterval(this.startTimer, 1000),
                    correctDeck: sortedArray,
                    deck: tempDeck,
                    cardFace: 'front',
                    time: 0,
                })
            }
        }

    }

    handleRestart = () => {
        let deckLeft = this.state.deck;
        if(this.state.status === "playing"){
            deckLeft.cards = [...this.state.wrongDeck, ...this.state.deck.cards, ...this.state.correctDeck]
            clearInterval(this.state.timerInterval)
            this.setState({
                status: 'ready',
                cardFace: 'front',
                deck: deckLeft,
                correctDeck: [],
                wrongDeck: [],
                time: 0,
            })
        }else if(this.state.status === "complete"){
            this.setState({
                status: 'ready',
                deck: deckLeft,
                correctDeck: [],
                wrongDeck: [],
                time: 0,
            })
        }
    }

    checkStatus = () => {
        switch(this.state.status){
            case "ready": return "Tap to start!"
            case "playing": return this.state.deck.cards[this.state.currentCard].front
            case "complete": return "Congratulations! You have completed " + this.state.deck.name +"! Restart or exit to try other topics!"
        }
    }

    handleCardChange = () => {
        if(this.state.status === "ready"){
            this.setState({
                status: "playing",
                timerInterval: setInterval(this.startTimer, 1000)
            })
        }else if(this.state.status === "complete"){
            this.setState({
                correctDeck: [],
                wrongDeck: [],
                status: "playing",
                timerInterval: setInterval(this.startTimer, 1000)
            })
        }else{
            if(this.state.cardFace === 'front'){
                clearInterval(this.state.timerInterval)
                this.setState({
                    cardFace: 'back'
                })
            }
        }
    }

    componentWillUnmount(){
        let deck = this.state.deck
        clearInterval(this.state.timerInterval)
        if(this.state.status !== "complete"){
        deck.cards = [...this.state.wrongDeck, ...this.state.deck.cards, ...this.state.correctDeck]
        this.setState({
            deck: deck
        })
    }
    }

    render(){
    return(
        <View style={styles.wrapper}>
            <View style={styles.statsBar}>
                <View style={styles.rightWrongCard}>
                    <View  style={{alignItems: 'center', flexDirection: 'row', padding: 5, paddingLeft: 15}}>
                        <MaterialCommunityIcons color="#8EEEA3" name="cards" size={24}/>
                        <Text style={styles.statsText}>
                            Right: {this.state.correctDeck.length}
                        </Text>
                    </View>
                    <View style={{alignItems: 'center', flexDirection: 'row', padding: 5, paddingLeft: 15}}>
                        <MaterialCommunityIcons color="#E9776F" name="cards" size={24}/>
                        <Text style={styles.statsText}>
                            Wrong: {this.state.wrongDeck.length}
                        </Text>
                    </View>
                </View>
                <View style={styles.timer}>
                    <MaterialCommunityIcons name="timer-sand" color="#fff"size={20}/>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 24, marginTop: 5}}>{this.state.time}</Text>
                </View>
                <View style={styles.cardsLeft}>
                    <Text style={styles.statsText}>Cards Left:</Text>
                    <Text style={styles.cardsLeftNumber}>{this.state.deck.cards.length}</Text>
                </View>
            </View>
            <View style={styles.card}>
                {this.state.deck.cards.length === 0 ? <Text style={styles.cardText}>No cards! Click Edit to add new cards!</Text> : 
                <>
                <TouchableOpacity onPress={this.handleCardChange}>
                    {this.state.cardFace === "front" ? 
                        <View style={styles.cardComponent}>
                            <View style={styles.cardContainer}>
                                {/* <Text style={styles.cardText}>{this.state.status === "ready" ? "Tap to start!" : this.state.deck.cards[this.state.currentCard].front}</Text> */}
                                <Text style={styles.cardText}>{this.checkStatus()}</Text>
                            </View>
                        </View>
                    :
                        <View style={styles.cardComponent}>
                            <Text style={styles.cardText}>{this.state.deck.cards[this.state.currentCard].back}</Text>
                        </View>
                    }
                </TouchableOpacity>
                <Text style={{ fontSize: 18, marginTop: 20, color: 'white'}}>{this.state.cardFace === 'front' ? "Take a guess and tap on the card!" : "Did you get it right or wrong?"}</Text>
                </>
                }
            </View>
            <View style={styles.buttons}>
                <View style={styles.rightWrong}>
                    <View style={{flex: 1, padding: 10}}>
                        <TouchableOpacity onPress={this.handleWrong}>
                            <View style={styles.wrong}>
                            <Text style={styles.buttonText}>
                                    WRONG
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, padding: 10}}>
                        <TouchableOpacity onPress={this.handleRight}>
                            <View style={styles.right}>
                                <Text style={styles.buttonText}>
                                    RIGHT
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 1, padding: 10}}>
                    <TouchableOpacity onPress={this.handleRestart}>
                        <View style={styles.restart}>
                        <Text style={styles.buttonText}>
                                    RESTART
                                </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )

}}

const styles = StyleSheet.create({
    wrapper: {
        flex: 8
    },
    statsBar: {
        flex: 1,
        flexDirection: 'row',
    },
    rightWrongCard: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    cardsLeft: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 10
    },
    cardsLeftNumber: {
        marginTop: 5,
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    timer: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
    },
    card: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        flex: 3,
    },
    rightWrong: {
        flex: 1,
        flexDirection: 'row'
    },
    wrong: {
        height: '100%',
        width: '100%',
        backgroundColor: '#E9776F',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    right: {
        height: '100%',
        width: '100%',
        backgroundColor: '#8EEEA3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    restart: {
        height: '100%',
        width: '100%',
        backgroundColor: '#E9D56F',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },
    statsText: {
        marginLeft: 5,
        color: '#fff',
        fontWeight: 'bold',
    },
    cardComponent: {
        height: 340,
        width: 240,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#FFBB95',
    },
    cardContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: '#33B0A9',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    cardText: {
        fontStyle: "normal",
        fontWeight: "bold",
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
})