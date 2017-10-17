/*
* @Author: miaoxinyu.zh
* @Date:   2017-08-22 06:06:10
 * @Last Modified by: zhaozheng1.zh
 * @Last Modified time: 2017-10-12 21:27:58
*/

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';

import {PieChart} from 'react-native-charts-wrapper';

_getPID = (v1, v2) => {
    let info = {
        sj: `赵${v1}`,
        fsj: `钱${v1}`,
        jw: `孙${v1}`,
        zw: `李${v1}`,
        xw: `周${v1}`,
        groupData: {
            zz: `吴${v2}`,
            zy: `郑${v2}，王${v2}，冯${v2}，陈${v2}，褚${v2}，卫${v2}，蒋${v2}，沈${v2}，韩${v2}，杨${v2}`
        }
    };
    return info;
}


export function getPartyInfoData(branch, group) {
    let v1 = '一'
    let v2 = '一一'
    if (branch === '第一党支部' && group === '第二党小组') { v1 = '一'; v2 = '一二' };
    if (branch === '第二党支部' && group === '第一党小组') { v1 = '二'; v2 = '二一' };
    if (branch === '第二党支部' && group === '第二党小组') { v1 = '二'; v2 = '二二' };
    return _getPID(v1, v2)
}

export function getPartyPieData(value) {

    let jsonPieData = '';

    switch (value) {
        case 'sex':
            jsonPieData = {
                dataSets: [{
                    values: [{ value: 230, label: '男' },
                    { value: 10, label: '女' }],
                    label: '性别区分',
                    config: {
                        colors: [processColor('#C0FF8C'), processColor('#FF8C9D')],
                        valueTextSize: 20,
                        valueTextColor: processColor('green'),
                        sliceSpace: 5,
                        selectionShift: 13
                    }
                }],
            };
            break;
        case 'diploma':
            jsonPieData = {
                dataSets: [{
                    values: [{ value: 5, label: '专科' },
                    { value: 8, label: '大学本科' },
                    { value: 130, label: '硕士研究生' },
                    { value: 3, label: '博士研究生' },
                    { value: 2, label: '其他' }],
                    label: '学历区分',
                    config: {
                        colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#FF8C9D'), processColor('#8CEAFF')],
                        valueTextSize: 20,
                        valueTextColor: processColor('green'),
                        sliceSpace: 5,
                        selectionShift: 13
                    }
                }],
            };
            break;
        case 'type':
            jsonPieData = {
                dataSets: [{
                    values: [{ value: 5, label: '入党积极分子' },
                    { value: 8, label: '预备党员' },
                    { value: 210, label: '正式党员' }],
                    label: '党员类型区分',
                    config: {
                        colors: [processColor('#FFF78C'), processColor('#FFD08C'), processColor('#FF8C9D'),],
                        valueTextSize: 20,
                        valueTextColor: processColor('green'),
                        sliceSpace: 5,
                        selectionShift: 13
                    }
                }],
            };
            break;
    }

    return jsonPieData
}

