import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import BaseDialog from './view/BaseDialog';

import PickerObjectView from './view/PickerObjectView';

export default class Picker extends BaseDialog {

    static defaultProps = {
        items: [{key: 0, value: 'a'}, {key: 1, value: 'b'}, {key: 2, value: 'c'}],
        onPickerSelected: null,
        confirmText: 'OK',
        cancelText: 'Cancel',
        confirmBackgroundColor: '#fff',
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
        this.props.items.map((item, _index) => {item._index = _index;});
        return (
            <View style={{
                width: this.mScreenWidth, flexDirection: 'column'
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: this.mScreenWidth,
                    backgroundColor: this.props.confirmBackgroundColor,
                    paddingLeft: 10, paddingRight: 10,
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.dismiss();
                        }}
                        style={{
                            width: this.getSize(50), height: this.getSize(50),
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                        <Text style={{ color: this.props.confirmTextColor, fontSize: this.getSize(16), fontWeight: '400' }}>{this.props.cancelText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.onPickerSelected && this.props.onPickerSelected(this.select);
                            this.dismiss();
                        }}
                        style={{
                            width: this.getSize(50), height: this.getSize(50),
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                        <Text style={{ color: this.props.confirmTextColor, fontSize: this.getSize(16), fontWeight: '400' }}>{this.props.confirmText}</Text>
                    </TouchableOpacity>
                </View>
                <PickerObjectView
                    list={this.props.items}
                    onPickerSelected={(toValue) => {
                        this.select = toValue;
                    }}
                    fontSize={this.getSize(14)}
                    selectedIndex={this.select._index}
                    itemWidth={this.mScreenWidth}
                    itemHeight={this.getSize(40)} />
            </View>
        );
    }

}
