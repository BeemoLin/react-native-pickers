import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import BaseDialog from './view/BaseDialog';

import PickerView from './view/PickerView';

export default class Picker extends BaseDialog {

    static defaultProps = {
        items: [{key: 0, value: 'a'}, {key: 1, value: 'b'}, {key: 2, value: 'c'}],
        onPickerSelected: null,
        confirmText: 'OK',
        confirmBtnColor: '#fff',
        confirmTextColor: '#333',
        onPress: null,
    };

    constructor(props) {
        super(props);

        this.select = this.props.items[0];
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' };
    }

    renderContent() {
        return (
            <View style={{
                width: this.mScreenWidth, flexDirection: 'column'
            }}>
                <PickerView
                    list={this.props.items}
                    onPickerSelected={(toValue) => {
                        this.select = toValue;
                    }}
                    fontSize={this.getSize(14)}
                    itemSelectedColor={0x333333ff}
                    itemWidth={this.mScreenWidth}
                    itemHeight={this.getSize(40)} />
                <View style={{width: this.mScreenWidth}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.onPickerSelected && this.props.onPickerSelected(this.select);
                            this.dismiss();
                        }}
                        style={{
                            width: this.mScreenWidth, height: this.getSize(50),
                            backgroundColor: this.props.confirmBtnColor,
                            justifyContent: 'center', alignItems: 'center', borderTopWidth: 2
                        }}>
                        <Text style={{ color: this.props.confirmTextColor, fontSize: this.getSize(16), fontWeight: '400' }}>{this.props.confirmText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}
