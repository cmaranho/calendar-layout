import React from 'react';
import { StyleSheet, Platform, View, Text, Dimensions, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const Button = props => {

    const { selected, press, size } = props;
    const styleBtn = [styles.button]

    let sizes = {
        width: size,
        height: size,
    }

    if(size) styleBtn.push(sizes)

    return (

        <TouchableNativeFeedback
            onPress={press}
            background={
                Platform.Version >= 21 ?
                    TouchableNativeFeedback.Ripple('rgba(255,255,255,.2)', true) :
                    TouchableNativeFeedback.SelectableBackground()
            }>
            <View style={styleBtn}>
                <Icon name={props.name} size={20} color="#fff" />
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({

    button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 45,
    },


})

export default Button;
