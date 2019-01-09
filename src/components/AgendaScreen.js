import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

//Device info
import DeviceInfo from 'react-native-device-info';
const is24Hour = DeviceInfo.is24Hour();

//component Calendar 
import { Agenda, CalendarList } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

//Dev module
import Reactotron from 'reactotron-react-native'

//components
import DateTimePicker from 'react-native-modal-datetime-picker';
import Header from './Header'
import CardAgenda from './CardAgenda'
import TagComponent from './TagComponent'
import TextCard from './TextCard'
import ModalComponent from './ModalComponent'
import Button from './Button'
import Input from './Input'

import Swipeout from 'react-native-swipeout';

//functions 
import {
  filterItemByHour,
  time24to12,
  showTag,
  timeToString,
  getTimeFormat,
} from '../functions'

LocaleConfig.locales['pt-BR'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'],
  monthNamesShort: ['jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.']
};

LocaleConfig.defaultLocale = 'pt-BR';

const initialState = {
  description: '',
  title: '',
  buttonIndex: 0,
  showDateTime: new Date().toISOString(),
  getTime: '',
  getTimeTamp: '',
}


const defaultMark = { key: 'defautMark', color: '#30c0f8' }
const greenMark = { key: 'greenMark', color: '#38c328' };
const redMark = { key: 'redMark', color: '#ff4745' }
const yellowMark = { key: 'yellowMark', color: '#fbab15' }



export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      getDate: new Date().toISOString().split('T')[0],
      modalVisible: false,
      dataTest: {},
      isDateTimePickerVisible: false,
      itemData: {},
      items: {
        '2019-01-01': [
          {
            name: 'Ir ao médico',
            tasks: 'Consulta marcada com o dr. Leandro',
            dateTime: '2019-01-06T08:47:00.000Z',
            timeTamp: 1546992000000,
            dateString: '2019-01-01',
            dots: { key: 'defautMark', color: '#30c0f8' }

          }
        ],
        '2019-01-08': [
          {
            name: 'Dar carona',
            tasks: 'Passar no Roberto leva-lo ao centro de santo andré',
            dateTime: '2019-01-06T08:47:00.000Z',
            timeTamp: 1546992000000,
            dateString: '2019-01-08',
            dots: { key: 'defautMark', color: '#30c0f8' }

          },

        ],
        '2019-01-08': [
          {
            name: 'Viajar para a Praia',
            tasks: 'Viajar até Santos',
            dateTime: '2019-01-06T08:47:00.000Z',
            timeTamp: 1546992000000,
            dateString: '2019-01-08',
            dots: { key: 'defautMark', color: '#30c0f8' }
          }
        ],
        '2019-01-22': [
          {
            name: 'Ir para Santa Catarina',
            tasks: 'Viajar para Santa catarina',
            dateTime: '2019-01-06T08:47:00.000Z',
            timeTamp: 1546992000000,
            dateString: '2019-01-22',
            dots: { key: 'defautMark', color: '#30c0f8' }
          },

        ],
        '2019-01-24': [
          {
            name: 'Ir para Rio grande do Sul',
            tasks: 'Visitar a capítal do Rio grande do Sul',
            dateTime: '2019-01-06T08:47:00.000Z',
            timeTamp: 1546992000000,
            dateString: '2019-01-01',
            dots: { key: 'defautMark', color: '#30c0f8' }
          }
        ],
      }
    };
  }

  componentWillMount() {
    Reactotron.log(this.state.getDate)
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    Reactotron.log('A date has been picked: ', date);
    this._hideDateTimePicker();
    this.setState({
      getTime: date,
      showDateTime: date
    })
  };

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      const newItems = {};
      Object.keys(this.state.items).map(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  saveItens = () => {
    const { description,
      title,
      buttonIndex,
      getTime,
      getDate,
      getTimeTamp,
      items } = this.state

    let keyIndex = getDate
    let copyItens = items

    const data = {
      name: title,
      tasks: description,
      dateTime: getTime,
      timeTamp: getTimeTamp,
      ...buttonIndex === 0 ? { dots: defaultMark } : null,
      ...buttonIndex === 1 ? { dots: greenMark } : null,
      ...buttonIndex === 2 ? { dots: redMark } : null,
      ...buttonIndex === 3 ? { dots: yellowMark } : null,
    }

    if (!copyItens[keyIndex]) {
      copyItens[keyIndex] = [data]
    } else {
      copyItens[keyIndex].push(data)
    }

    this.setState({
      items: copyItens
    })

  }

  deleteTask = async (item) => {

    const { items } = this.state
    let key = item
    let copyItens = items

    Reactotron.log(key)

    copyItens[key].splice(item, 1)


    await this.setState(prevState => ({
      items: prevState.items = copyItens
    }))
  }

  renderItem(item) {

    let swipeoutBtns = [
      {
        text: 'Button',
        onPress: () => this.deleteTask(item.dateString),
      }
    ]
    return (

      <Swipeout
        style={{ backgroundColor: '#fff' }}
        autoClose={true}
        right={swipeoutBtns}>
        <CardAgenda>
          <TextCard>{item.dateTime}</TextCard>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <TagComponent color={item.dots.color} />
            <View style={{
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
              <TextCard weight={'bold'}>{item.name}</TextCard>
              <TextCard>{item.tasks}</TextCard>
            </View>
          </View>
        </CardAgenda>
      </Swipeout>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>Nenhuma tarefa</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
      ...initialState
    });
  }

  onDayPress = async (day) => {
    await this.setState({
      selected: day.dateString,
      getDate: day.dateString,
      getTimeTamp: day.timestamp,
    });
  }

  getButton = (index) => {
    this.setState({
      buttonIndex: index,
    })
  }

  groupButtons = () => {
    const { buttonIndex } = this.state
    const colors = ['#30c0f8', '#38c328', '#ff4745', '#fbab15']
    return colors.map((buttons, index) => {
      return (
        <TouchableOpacity onPress={() => this.getButton(index, buttons)} key={index} >
          <TagComponent radius={20} color={buttons} />
          {index === buttonIndex ?
            <TagComponent selected radius={20} color={buttons} /> : null
          }
        </TouchableOpacity>
      )
    })
  }

  exceptValues = (array, value) => {
    return (array.indexOf(value) > -1);
  }


  render() {
    return (
      <View style={styles.container}>

        <ModalComponent
          close={() => this.setModalVisible(!this.state.modalVisible)}
          save={() => this.saveItens()}
          modalVisible={this.state.modalVisible}
          calendar={
            <CalendarList
              onDayPress={(day) => { this.onDayPress(day) }}
              horizontal={true}
              pagingEnabled={true}
              markedDates={{ [this.state.selected]: { selected: true, disableTouchEvent: true } }}
              style={{ height: 320 }}
              theme={{
                ...theme
              }}
            />}
        >
          <View style={styles.viewHours}>
            <TouchableOpacity onPress={this._showDateTimePicker}>
              <Text style={{ fontSize: 18 }}>{!is24Hour ?
                time24to12(getTimeFormat(this.state.showDateTime)) : getTimeFormat(this.state.showDateTime)}</Text>
            </TouchableOpacity>
            <DateTimePicker
              mode={'time'}
              is24Hour={is24Hour}
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />

          </View>

          <View style={styles.groupButtons}>
            <Text>Marcadores</Text>
            <View style={{ flexDirection: 'row' }}>
              {this.groupButtons()}
            </View>
          </View>


          <Input
            style={styles.inputTitle}
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
            placeholder={'Título'}
          />
          <Text>Descrição</Text>
          <Input
            style={styles.inputdescBox}
            onChangeText={(description) => this.setState({ description })}
            value={this.state.description}
          />

        </ModalComponent>

        <Header>
          <Button name={'menu'} size={35} />
          <Button name={'plus'} size={35} press={() => {
            this.setModalVisible(true);
          }} />
        </Header>

        <Agenda
          items={filterItemByHour(this.state.items)}
          selected={new Date()}
          loadItemsForMonth={(day) => this.loadItems(day)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          onDayPress={(day) => { Reactotron.log('selected day', day) }}
          markedDates={showTag(this.state.items)}
          markingType={'multi-dot'}
          theme={{ ...theme }}
        />
      </View>
    );
  }
}


const theme = {
  backgroundColor: '#fff',
  agendaKnobColor: '#fff',
  calendarBackground: '#704ef6',
  selectedDayBackgroundColor: '#fff',
  selectedDayTextColor: '#333',
  textSectionTitleColor: '#fff',
  todayTextColor: '#e2e2e2',
  dayTextColor: '#b2b2b2',
  'stylesheet.calendar.header': {
    monthText: {
      fontSize: 20,
      fontWeight: '100',
      color: '#fff',
      margin: 9,
    },
    week: {
      marginTop: 0,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  container: {
    flex: 1,
  },

  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  groupButtons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    width: Dimensions.get('window').width, flexDirection: 'row'
  },
  inputTitle: {
    height: 40,
    marginTop: 10,
    marginBottom: 5,
    width: Dimensions.get('window').width - 20,
    borderColor: '#ececec', borderWidth: 1
  },
  inputdescBox: {
    height: 120,
    width: Dimensions.get('window').width - 20,
    borderColor: '#ececec', borderWidth: 1,
  },
  viewHours: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    height: 40,
    width: Dimensions.get('window').width, flexDirection: 'row'
  }
});