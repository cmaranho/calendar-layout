import React, {Component} from 'react';
import {Platform, StyleSheet, Dimensions, Text, View} from 'react-native';

//import components
import AgendaScreen from '../components/AgendaScreen'

export default class Home extends Component {
  render() {
    return (      
      <AgendaScreen/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
