<template>
    <chart-layout>
        <a-collapse class="optionText" defaultActiveKey="1" :bordered="false">
            <a-collapse-panel header="图标属性" key="1" style="border:0">
                <t-list-item>
                    <span slot="left">显示标签</span>
                    <a-switch @change="v => setDom('_setLabelShow', v)" size="small" v-model="dataForm.label.show"></a-switch>
                </t-list-item>
                <t-list-item-top>
                    <span slot="top">名称</span>
                    <a-checkbox-group @change="setLabelFormatter" class="mxlMin" :options="ds.viewOptions" v-model="dataForm.label.formatter"/>
                </t-list-item-top>
                <t-list-item-top>
                    <t-list-item slot="top">
                        <span slot="left">内径</span>
                        <a-input-number size="small" :min="1" :max="100" v-model="dataForm.radius[0]" class="mxlAntINRepair" />
                    </t-list-item>
                    <a-slider @change="setRadiusN" v-model="dataForm.radius[0]" class="mxlAntSiderRepair"/>
                </t-list-item-top>
                <t-list-item-top>
                    <t-list-item slot="top">
                        <span slot="left">外径</span>
                        <a-input-number size="small" :min="1" :max="100" v-model="dataForm.radius[1]" class="mxlAntINRepair" />
                    </t-list-item>
                    <a-slider @change="setRadiusW" v-model="dataForm.radius[1]" class="mxlAntSiderRepair"/>
                </t-list-item-top>
                <t-list-item>
                    <span slot="left">悬停提示</span>
                    <a-switch @change="v => setDom('_setTooltipShow', v)" size="small" v-model="dataForm.tooltip.show"></a-switch>
                </t-list-item>
                <t-list-item>
                    <span slot="left">显示顺序</span>
                    <a-radio-group @change="e => setDom('_setClockwise', e.target.value)" :options="ds.orderOptions" class="mxlMin" v-model="dataForm.clockwise"/>
                </t-list-item>
            </a-collapse-panel>
        </a-collapse>
    </chart-layout>
</template>


<script>
import chartLayout from './layout';
import common from 'pages/report/options/common'
export default {
    mixins: [common],
    components: {chartLayout},
    data(){
        return {
            dataForm: {
                label: {
                    show: false,
                    formatter: []
                },
                clockwise: true,
                radius: [0, 75],
                tooltip: {
                    show: true
                }
            },
            ds: {
                viewOptions: [
                    {label: '数据名', value: '{b}'}, 
                    {label: '数值', value: '{c}'}, 
                    {label: '百分比', value: '{d}'}
                ],
                orderOptions: [
                    {label: '顺时针', value: true},
                    {label: '逆时针', value: false}
                ]
            }
        }
    },
    methods: {
        input(){
            this.$emit('change', this.dataForm);
        },
        setLabelFormatter(v){
            let is_empty = v.length === 0 ? '' : ', '
            let res = [
                v.includes('{b}') ? '{b}'+is_empty : '',
                v.includes('{c}') ? '{c}'+is_empty : '',
                v.includes('{d}') ? '{d}%' : '',
            ].join('');
            this.setDom('_setLabelFormatter', res);
        },
        setRadiusN(v){
            this.setDom('_setRadius', [v+'%', this.dataForm.radius[1]]);
        },
        setRadiusW(v){
            this.setDom('_setRadius', [this.dataForm.radius[0], v+'%']);
        }
    }
};
</script>
