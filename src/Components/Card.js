import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default ({deckName, cardAmount, cardKey, handleEvent}) => (

    <TouchableOpacity onPress={() => {
        handleEvent(cardKey)
    }}>
    <View style={styles.wrapper} >
        <View style={styles.container}>
            <Text style={styles.title}>
                {deckName}
            </Text>
            <Text style={styles.quantity}>
                {cardAmount} cards
            </Text>
        </View>
    </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    wrapper:{
         backgroundColor: '#FFBB95',
         borderRadius: 20,
         height: 298,
         width: 196,
         marginVertical: 8,
         marginHorizontal: 16,
         padding: 10,
         shadowOffset:{  width: 5,  height: 3,  },
        shadowColor: 'black',
        shadowOpacity: 0.5,
    },
    container:{
        height: '100%',
        width: '100%',
        backgroundColor: '#33B0A9',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    title: {
        fontStyle: "normal",
        fontWeight: "bold",
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
    },
    quantity: {
        color: 'white',
        marginTop: 40
    }
})