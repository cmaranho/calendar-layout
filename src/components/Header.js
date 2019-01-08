import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

const Header = props => {

  const { custom, children } = props
  return (
    <View style={[styles.container, { ...custom }]}>
      {children}
    </View>
  );

};

export default Header;

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