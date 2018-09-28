import React, { Component } from 'react';

import {
    View,
} from 'react-native';

import BaseDialog from './view/BaseDialog';

import PickerView from './view/PickerView';

export default class Picker extends BaseDialog {

    static defaultProps = {
        items: [{key: 0, value: 'a'}, {key: 1, value: 'b'}, {key: 2, value: 'c'}],
        onPickerSelected: null,
    };

    constructor(props) {
        super(props);
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' };
    }

    renderContent() {
        return (
            <View style={{
                width: this.mScreenWidth, flexDirection: 'row'
            }}>
                <PickerView
                    list={this.props.items}
                    onPickerSelected={(toValue) => {
                        this.props.onPickerSelected && this.props.onPickerSelected(toValue);
                        this.dismiss();
                    }}
                    fontSize={this.getSize(14)}
                    itemSelectedColor={0x333333ff}
                    itemWidth={this.mScreenWidth}
                    itemHeight={this.getSize(40)} />
            </View>
        );
    }

}
