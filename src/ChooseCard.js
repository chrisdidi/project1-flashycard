import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList} from 'react-native';
import Card from './Components/Card';

export default class ChooseCard extends Component {

    constructor(props){
        super(props);
        this.state={

        }
    }

    handleAction = event => {
        this.props.changeState(event)
    }

    render(){
        return(
            <View style={styles.wrapper} >
                <FlatList 
                    data={this.props.decks}
                    renderItem={({item}) => 
                        <Card deckName={item.name} handleEvent={this.handleAction} cardKey={this.props.decks.findIndex(x => x.name === item.name)}cardAmount={item.cards.length}/>
                    }
                    keyExtractor={item => this.props.decks.findIndex(x => x.name === item.name).toString()}
                    horizontal={true}
                    style={{paddingTop: 140}}
                />
            </View>
        )

    }
}

        
const styles = StyleSheet.create({
    wrapper: {
        flex: 8,
    }
})
