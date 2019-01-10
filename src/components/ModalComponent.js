import React from 'react';
import { Text, View, Alert, Modal, StyleSheet } from 'react-native';


import Header from './Header';
import ButtonComponent from './ButtonComponent'
import { ScrollView } from 'react-native-gesture-handler';


const ModalComponent = props => (
  <View>
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert('Feche a janela para voltar.');
      }}>
      <View style={{ flex: 1 }}>
        <Header custom={{ justifyContent: 'flex-start', elevation: 2 }}>
          <ButtonComponent name={'close'} size={35} press={props.close} />
          <ButtonComponent name={'check'} size={35} press={props.save} />
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