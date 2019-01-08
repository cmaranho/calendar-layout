import React, { Component } from 'react';
import { AppRegistry, Picker, View, TextInput, StyleSheet } from 'react-native';

class PickerTags extends Component {
    render() {
        return (
            <View>
                <Picker
                    {...this.props}
                >
                    {this.props.children}
                </Picker>
            </View>
        );
    }
}

export default PickerTags

const styles = StyleSheet.create({

})


