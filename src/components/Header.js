import React, {Component} from 'react';
import {Platform, StyleSheet, Dimensions, View} from 'react-native';

//import components

export default class Calendar extends Component {

    constructor(props) {
      super(props)
    
      this.state = { };
    };
    
   
  render() {

    const {custom, children} = this.props

    return (
      <View style={[styles.container, {...custom}]}>
       {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#704ef6',
  }
});