import React, { Component } from 'react';
import { AppRegistry, View, TextInput, StyleSheet } from 'react-native';

class Input extends Component {
  render() {

    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        maxLength = {120}
      />
    );
  }
}

export default Input

const styles = StyleSheet.create({

})