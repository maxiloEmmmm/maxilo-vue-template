<template>
    <chart-layout>
        <a-collapse class="optionText" defaultActiveKey="1" :bordered="false">
            <a-collapse-panel header="图标属性" key="1" style="border:0">
                <t-list-item>
                    <span slot="left">显示标签</span>
                    <a-switch @change="v => setDom('_setLabelShow', v)" size="small" v-model="dataForm.label.show"></a-switch>
                </t-list-item>
                <t-list-item>
                    <span slot="left">悬停提示</span>
                    <a-switch @change="v => setDom('_setTooltipShow', v)" size="small" v-model="dataForm.tooltip.show"></a-switch>
                </t-list-item>
                <t-list-item-top>
                    <span slot="top">标注</span>
                    <a-checkbox-group @change="setMarkPointData" class="mxlMin" :options="ds.viewOptions" v-model="dataForm.makePoint.data"/>
                </t-list-item-top>
            </a-collapse-panel>
        </a-collapse>
    </chart-layout>
</template>


<script>
import chartLayout from './layout';
import { mapState, mapActions } from 'vuex';
import common from 'pages/report/options/common'
export default {
    mixins: [common],
    components: {chartLayout},
    data(){
        return {
            dataForm: {
                label: {
                    show: true
                },
                tooltip: {
                    show : true
                },
                makePoint: {
                    data: []
                }
            },
            ds: {
                viewOptions: [
                    {label: '最大值', value: 'max'},
                    {label: '最小值', value: 'min'},
                    {label: '平均值', value: 'average'},
                ]
            }
        }
    },
    methods: {
        input(){
            this.$emit('change', this.dataForm);
        },
        setMarkPointData(v){
            let option = this.ds.viewOptions;

            this.setDom('_setMarkPointData', v.map(q => {
                return {
                    name: option[option.findIndex(h => h.value == q)].label,
                    type: q
                }
            }));
        }
    }
};
</script>
