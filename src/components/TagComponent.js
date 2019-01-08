import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TagComponent = (props) => {

    const { selected } = props

    const styleDefault = [styles.tag]

    let tagradius = {
        width: props.radius,
        height: props.radius,
    }

    if (selected) styleDefault.push(styles.tagRadiusSelected)

    return (
        <View style={[styleDefault, { backgroundColor: props.color, ...tagradius }]}></View>
    );
}

export default TagComponent;

TagComponent.defaultProps = {
    color: '#30c0f8',
    radius: 5,
}

const styles = StyleSheet.create({

    tag: {
        marginTop: 10,
        marginRight: 10,
        borderRadius: 44 / 2,
    },
    tagRadiusSelected: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#704ef6',

    }


})

