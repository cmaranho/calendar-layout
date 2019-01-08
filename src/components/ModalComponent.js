import React from 'react';
import { Text, View, Alert, Modal, StyleSheet } from 'react-native';


import Header from './Header';
import Button from './Button'
import { ScrollView } from 'react-native-gesture-handler';


const ModalComponent = props => (
  <View>
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={{ flex: 1 }}>
        <Header custom={{ justifyContent: 'flex-start', elevation: 2 }}>
          <Button name={'close'} size={35} press={props.press} />
          <Text style={{ color: 'white' }}>Adicionar tarefas</Text>
        </Header>
        <ScrollView>
          <View>
            {props.calendar}
          </View>
          <View style={styles.modalView}>
            {props.children}
          </View>
        </ScrollView>
      </View>
    </Modal>
  </View>
);

export default ModalComponent;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,


  }

})