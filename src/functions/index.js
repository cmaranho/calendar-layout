//moment module for manipulate dates
const moment = require('moment-timezone');


import DeviceInfo from 'react-native-device-info';
const is24Hour = DeviceInfo.is24Hour();

const time24to12 = (time24) => {
    let ts = time24;
    let H = +ts.substr(0, 2);
    let h = (H % 12) || 12;
    h = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    let ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
};

const getTimeFormat = (time) => {
    let timeName = moment.tz.guess()
    return moment(time).tz(timeName).format('HH:mm')
}

const createTag = (items) => {
    if (Object.values(items).length === 0) { return null }
    else {
        return Object.assign(
            ...Object.entries(items)
                .map(([key, value]) => (
                    { [key]: value = { dots: value.map(value => value.dots) } }
                )));
    }

}

const filterItens = (items) => {
    return Object.assign(...Object.entries(items).map(([key, value]) => (
        {
            [key]: value = value.map(value => {
                const { name, dateTime, tasks, dateString, dots } = value
                if (is24Hour === false) {
                    return { name, dateTime: time24to12(getTimeFormat(dateTime)), tasks, dateString, dots }
                } else
                    return { name, dateTime: getTimeFormat(dateTime), tasks, dateString, dots }
            })

        })))
}

const filterItemByHour = (items) => {
    const itemsDate = filterItens(items)
    return Object.assign(...Object.entries(itemsDate)
        .map(([key, value]) => ({
            [key]: value.sort((a, b) => {
                return (a.dateTime < b.dateTime) ? -1 : (a.dateTime > b.dateTime) ? 1 : 0;
            })
        })));
}

const showTag = (items) => {
    const marked = createTag(items);

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

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

export {
    time24to12, getTimeFormat, createTag, filterItens,
    filterItemByHour, showTag, timeToString
}