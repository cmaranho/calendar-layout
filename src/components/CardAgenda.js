import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CardAgenda = (props) => {
   
    return(
    <View style={styles.card}>
       {props.children}
    </View>
);}

export default CardAgenda;

const styles = StyleSheet.create({
    card:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 15,
        marginRight: 10,
        marginTop: 17,
        borderWidth: 1,
        borderLeftColor: '#fff',
        borderRightColor: '#fff',
        borderTopColor: '#fff',
        borderBottomColor: '#d5d5d5',
        
    }


})
