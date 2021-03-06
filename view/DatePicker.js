import React, { Component, UIManager } from 'react';

import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import PickerView from './PickerView';

import BaseDialog from './BaseDialog';

import TimeUtils from '../utils/TimeUtils';

class DatePicker extends BaseDialog {

    static defaultProps = {
        removeSubviews: false,
        itemTextColor: 0x333333ff,
        itemSelectedColor: 0x1097D5ff,
        unitTextColor: '#97D5ff',
        onPickerCancel: null,
        onPickerConfirm: null,
        unit: ['年', '月', '日'],
        timeUnit: ['時', '分', '秒'],
        selectedValue: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()],
        startYear: 1990,
        endYear: new Date().getFullYear(),

        confirmText: '确定',
        confirmTextSize: 14,
        confirmTextColor: '#333333',

        cancelText: '取消',
        cancelTextSize: 14,
        cancelTextColor: '#333333',

        confirmBackgroundColor: '#fff',

        itemHeight: 40,

        HH: true,
        mm: true,
        ss: false,
        onlyTime: false,
    }

    constructor(props) {
        super(props);
        this.state = this.getDateList();
    }


    getDateList() {
        //console.log(this.props)
        let unit = this.props.unit;
        let years = [];
        let months = [];
        let days = [];
        pickerData = [];
        selectedIndex = [];

        let startYear = this.props.startYear;
        let endYear = this.props.endYear;
        for (let i = 0; i < endYear + 1 - startYear; i++) {
            years.push(i + startYear);
        }

        let selectedYear = years[0];
        if (this.props.selectedValue) {
            selectedYear = this.props.selectedValue[0];
        }
        selectedYear = selectedYear;//.substr(0, selectedYear.length - unit[0].length);
        for (let i = 1; i < 13; i++) {
            months.push(i);
        }

        let selectedMonth = months[0];
        if (this.props.selectedValue) {
            selectedMonth = this.props.selectedValue[1];
        }
        selectedMonth = selectedMonth;//.substr(0, selectedMonth.length - unit[1].length);

        let dayCount = TimeUtils.getDaysInOneMonth(selectedYear, selectedMonth);
        for (let i = 1; i <= dayCount; i++) {
            days.push(i);
        }

        let selectedDay = days[0];
        if (this.props.selectedValue) {
            selectedDay = this.props.selectedValue[2];
        }
        selectedDay = selectedDay;//.substr(0, selectedDay.length - unit[2].length);

        if(!this.props.onlyTime) {
            pickerData = [years, months, days];
        }

        selectedIndex = [
            years.indexOf(selectedYear) == -1 ? years.length - 1 : years.indexOf(selectedYear),
            months.indexOf(selectedMonth),
            days.indexOf(selectedDay) == -1 ? days.length - 1 : days.indexOf(selectedDay)];

        this.props.selectedValue[0] = years[selectedIndex[0]];
        this.props.selectedValue[1] = months[selectedIndex[1]];
        this.props.selectedValue[2] = days[selectedIndex[2]];

        if (this.props.HH) {
            let hours = [];
            for (let i = 0; i < 24; i++) {
                hours.push(i);
            }
            pickerData.push(hours);
            if (this.props.selectedValue) {
                if(this.props.onlyTime) {
                    selectedIndex.push((this.props.selectedValue[3] ? parseInt(this.props.selectedValue[3]) : 0));
                } else {
                    selectedIndex.push((this.props.selectedValue[3] ? parseInt(this.props.selectedValue[3]) : 0));
                }
            } else {
                selectedIndex.push((new Date().getHours()));
            }

            this.props.selectedValue[3] = (selectedIndex[3]);

            if (this.props.mm) {
                let minutes = [];
                for (let i = 0; i < 60; i++) {
                    minutes.push((i));
                }
                pickerData.push(minutes);
                if (this.props.selectedValue) {
                    selectedIndex.push((this.props.selectedValue[4] ? parseInt(this.props.selectedValue[4]) : 0));
                } else {
                    selectedIndex.push((new Date().getMinutes()));
                }

                this.props.selectedValue[4] = (selectedIndex[4]);

                if (this.props.ss) {
                    let seconds = [];
                    for (let i = 0; i < 60; i++) {
                        seconds.push((i));
                    }
                    pickerData.push(seconds);
                    if (this.props.selectedValue) {
                        selectedIndex.push((this.props.selectedValue[5] ? parseInt(this.props.selectedValue[5]) : 0));
                    } else {
                        selectedIndex.push(1);
                    }

                    this.props.selectedValue[5] = (selectedIndex[5]);
                }
            }
        }


        let data = {
            pickerData: pickerData,
            selectedIndex: selectedIndex,
        };
        return data;
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }

    renderPicker() {
        return this.state.pickerData.map((item, pickerId) => {
            if (item) {
                if(!this.props.onlyTime && pickerId < 3) {
                    return (
                        <View key={'pickerview' + pickerId} style={{
                        width: this.mScreenWidth / this.state.pickerData.length,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                    }}>
                <PickerView
                    key={'picker' + pickerId}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    list={item}
                    onPickerSelected={(toValue) => {
                        //是否联动的实现位置
                        this.props.selectedValue[(this.props.onlyTime ? pickerId + 3 : pickerId)] = toValue;
                        //console.log('====')
                        this.setState({ ...this.getDateList() });
                    }}
                    selectedIndex={this.state.selectedIndex[(this.props.onlyTime ? pickerId + 3 : pickerId)]}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth / this.state.pickerData.length - 25}
                    itemHeight={this.props.itemHeight} />
                    <View style={{
                        width: 25,
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff'
                    }}>
                <View style={{
                        height: this.props.itemHeight + 0.5,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 14,
                    }}>
                <Text style={{
                        color: this.props.unitTextColor,
                            fontSize: this.getSize(14),
                            fontWeight: '400',
                    }}>{this.props.unit[pickerId]}</Text>
                    </View>
                    </View>
                    </View>
                );
                } else {
                    return (
                        <View key={'pickerview' + pickerId} style={{
                        width: this.mScreenWidth / this.state.pickerData.length,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                    }}>
                <PickerView
                    key={'picker' + pickerId}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    list={item}
                    onPickerSelected={(toValue) => {
                        //是否联动的实现位置
                        this.props.selectedValue[(this.props.onlyTime ? pickerId + 3 : pickerId)] = toValue;
                        //console.log('====')
                        this.setState({ ...this.getDateList() });
                    }}
                    selectedIndex={this.state.selectedIndex[(this.props.onlyTime ? pickerId + 3 : pickerId)]}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth / this.state.pickerData.length - (!!this.props.onlyTime ? 40 : 25)}
                    itemHeight={this.props.itemHeight} />
                    <View style={{
                        width: (!!this.props.onlyTime ? 40 : 25),
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff'
                    }}>
                <View style={{
                        height: this.props.itemHeight + 0.5,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 14,
                    }}>
                <Text style={{
                        color: this.props.unitTextColor,
                            fontSize: this.getSize(14),
                            fontWeight: '400',
                    }}>{this.props.timeUnit[!!this.props.onlyTime ? pickerId : pickerId - 3]}</Text>
                    </View>
                    </View>
                    </View>
                );
                }

            }
        });
    }

    renderContent() {
        // let data = this.getDateList();
        // this.state.pickerData = data.pickerData;
        // this.state.selectedIndex = data.selectedIndex;
        return <View
        style={{
            height: this.props.itemHeight * 5 + this.getSize(15) + this.getSize(44), width: this.mScreenWidth,
        }}>
    <View style={{ backgroundColor: '#fff', width: this.mScreenWidth, height: this.props.itemHeight * 5 + this.getSize(15), flexDirection: 'row', position: 'absolute', bottom: 0 }}>
        {this.renderPicker()}
    </View>
        <View style={{
            width: this.mScreenWidth, height: this.getSize(44),
                backgroundColor: this.props.confirmBackgroundColor, flexDirection: 'row',
                justifyContent: 'space-between', position: 'absolute', top: 0
        }}>
    <TouchableOpacity
        onPress={() => {
            this.dismiss(() => this.props.onPickerCancel && this.props.onPickerCancel(this.props.selectedValue));
        }}
        style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: this.props.cancelTextSize, fontWeight: '400', color: this.props.cancelTextColor }}>{this.props.cancelText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {
            this.dismiss(() => this.props.onPickerConfirm && this.props.onPickerConfirm(this.props.selectedValue));
        }}
        style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: this.props.confirmTextSize, fontWeight: '400', color: this.props.confirmTextColor }}>{this.props.confirmText}</Text>
        </TouchableOpacity>
        </View>
        </View>
    }
}

export default DatePicker;
