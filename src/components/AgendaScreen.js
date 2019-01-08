import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
  Dimensions
} from 'react-native';

//Device info
import DeviceInfo from 'react-native-device-info';
const is24Hour = DeviceInfo.is24Hour();

//component Calendar 
import { Agenda, CalendarList } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

//moment module for manipulate dates
const moment = require('moment-timezone');

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


export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      title: '',
      buttonIndex: 0,
      showDateTime: '',
      getTime: '',
      modalVisible: false,
      isDateTimePickerVisible: false,
      items: {
        '2019-01-01': [
          {
            name: 'Dar carona',
            dateTime: '2019-01-06T08:47:00.000Z',
            tasks: 'Passar no Roberto leva-lo ao centro de santo andré',
            dots: { key: 'massage', color: '#38c328' }

          },
          {
            name: 'Ir ao centro de São Paulo ',
            dateTime: '2019-01-06T11:47:00.000Z',
            tasks: 'Ir sem falta, preciso ver um presente',
            dots: { key: 'defautMark', color: '#30c0f8' }

          },
          {
            name: 'Levar o cachorro no banho e tosa',
            dateTime: '2019-01-06T14:47:00.000Z',
            tasks: 'Levar o cachorro pra tosar',
            dots: { key: 'workout', color: '#ff4745' }
          },
          {
            name: 'Ir ao médico ',
            dateTime: '2019-01-06T16:47:00.000Z',
            tasks: 'Consulta com o dr. Anderson',
            dots: { key: 'workout', color: '#ff4745' }
          },
          {
            name: 'Viajar',
            dateTime: '2019-01-07T00:47:00.000Z',
            tasks: 'Pegar a estrada para Santos',
            dots: { key: 'vacation', color: '#fbab15' }
          },
        ],
        '2019-01-08': [
          {
            name: 'SEGUNDO EXEMPLO ',
            tasks: 'TESTE TASKS',
            dateTime: '2019-01-06T16:47:00.000Z',
            dots: { key: 'defautMark', color: '#30c0f8' }
          }
        ],
        '2019-01-22': [
          {
            name: 'TERCEIRO EXEMPLO ',
            tasks: 'TESTE TASKS',
            dateTime: '2019-01-06T16:47:00.000Z',
            dots: { key: 'defautMark', color: '#30c0f8' }
          },
          {
            name: 'Viajar',
            dateTime: '2019-01-06T16:47:00.000Z',
            tasks: 'Pegar a estrada para Santos',
            dots: { key: 'vacation', color: '#fbab15' }
          },
        ],
        '2019-01-24': [
          {
            name: 'QUARTO EXEMPLO ',
            tasks: 'TESTE TASKS',
            dateTime: '2019-01-06T16:47:00.000Z',
            dateString: '2019-01-24',
            dots: { key: 'defautMark', color: '#30c0f8' }
          }
        ],
      }
    };
  }


  componentWillMount() {
    this.getDayTime()
  }

  getTimeFormat = (time) => {
    let timeName = moment.tz.guess()
    return moment(time).tz(timeName).format('HH:mm')
  }


  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    Reactotron.log('A date has been picked: ', date);
    this._hideDateTimePicker();
    this.setState({
      getTime: date,
      showDateTime:  date.getHours() + ':' + date.getMinutes()
    })
  };

  time24to12(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  };


  getDayTime = () => {
    let date = new Date();
    let getDateHour = date.getHours() + ':' + date.getMinutes();
    this.setState({
      showDateTime: getDateHour
    })
  }

  createTag = () => {
    const { items } = this.state

    if (Object.values(items).length === 0) { return null }
    else {
      return Object.assign(
        ...Object.entries(items)
          .map(([objKey, dots]) => (
            { [objKey]: dots = { dots: dots.map(dots => dots.dots) } }
          )));
    }

  }

  filterItens = () => {
    const { items } = this.state
    return Object.assign(...Object.entries(items).map(([key, value]) => (
      {
        [key]: value = value.map(value => {
          const { name, dateTime, tasks, dateString, dots } = value
          if (is24Hour === false) {
            return { name, dateTime: this.time24to12(this.getTimeFormat(dateTime)), tasks, dateString, dots }
          } else
            return { name, dateTime: this.getTimeFormat(dateTime), tasks, dateString, dots }
        })

      })))
  }

  filterItemByHour = () => {
    let items = this.filterItens()
    return Object.assign(...Object.entries(items)
      .map(([key, value]) => ({
        [key]: value.sort((a, b) => {
          return (a.dateTime < b.dateTime) ? -1 : (a.dateTime > b.dateTime) ? 1 : 0;
        })
      })));
  }

  showTag = () => {
    let marked = this.createTag();
    if (marked !== null) {
      return Object.assign(
        ...Object.entries(marked).map(
          ([key, value]) => {
            if (value.dots.length > 3) {
              for (let i = 2; i < value.dots.length; i++) {
                value.dots.splice(i, 1)
              }
              return { [key]: { dots: value.dots } }

            } else { return { [key]: { dots: value.dots } } }
          }))
    } else return null
  }

 

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).map(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <TouchableNativeFeedback
        background={
          Platform.Version >= 21 ?
            TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)', false) :
            TouchableNativeFeedback.SelectableBackground()
        }>
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
      </TouchableNativeFeedback>
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

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible
    });
  }

  onDayPress = (day) => {
    this.setState({
      selected: day.dateString
    });
    Reactotron.log(this.state.getTime.getHours(), this.state.getTime)
  }

  getButton = (index, color) => {
    const { buttonIndex } = this.state
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


  render() {
    return (

      <View style={styles.container}>

        <ModalComponent
          press={() => this.setModalVisible(!this.state.modalVisible)}
          modalVisible={this.state.modalVisible}
          calendar={
            <CalendarList
              onDayPress={(day) => this.onDayPress(day)}
              horizontal={true}
              pagingEnabled={true}
              markedDates={{ [this.state.selected]: { selected: true, disableTouchEvent: true } }}
              style={{ height: 320 }}
              theme={{
                ...theme
              }}
            />}
        >
          <View style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 20,
            height: 40,
            width: Dimensions.get('window').width, flexDirection: 'row'
          }}>
            <TouchableOpacity onPress={this._showDateTimePicker}>
              <Text style={{ fontSize: 18 }}>{this.state.showDateTime}</Text>
            </TouchableOpacity>
            <DateTimePicker
              mode={'time'}
              is24Hour={is24Hour}
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />

          </View>

          <View style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 10,
            width: Dimensions.get('window').width, flexDirection: 'row'
          }}>
            <Text>Marcadores</Text>
            <View style={{ flexDirection: 'row' }}>
              {this.groupButtons()}
            </View>
          </View>


          <Input
            style={{
              height: 40,
              marginTop: 10,
              marginBottom: 5,
              width: Dimensions.get('window').width - 20,
              borderColor: '#ececec', borderWidth: 1
            }}
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
            placeholder={'Título'}
          />
          <Text>Descrição</Text>
          <Input
            style={{
              height: 120,
              width: Dimensions.get('window').width - 20,
              borderColor: '#ececec', borderWidth: 1,
            }}
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
          items={this.filterItemByHour()}
          selected={new Date()}
          loadItemsForMonth={(day) => this.loadItems(day)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          onDayPress={(day) => { Reactotron.log('selected day', day) }}
          markedDates={this.showTag()}
          markingType={'multi-dot'}
          theme={{ ...theme }}
        // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
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
  }
});