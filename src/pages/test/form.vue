<template>
    <div style="width: 255px;">
        <a-collapse defaultActiveKey="1" :bordered="false">
            <a-collapse-panel header="图标属性" key="1" style="border:0">
                <t-list-item>
                    <span slot="left">显示标签</span>
                    <mxl-switch size="xs"></mxl-switch>
                </t-list-item>
                <t-list-item-top>
                    <span slot="top">名称</span>
                    <a-checkbox-group v-model="test" :options="ds.viewOptions" class="optionText"/>
                </t-list-item-top>
                <t-list-item-top>
                    <t-list-item slot="top">
                        <span slot="left">内径</span>
                        <a-input-number size="small" :min="1" :max="100" :defaultValue="3" class="mxlAntINRepair" />
                    </t-list-item>
                    <a-slider :defaultValue="30" class="mxlAntSiderRepair"/>
                </t-list-item-top>
                <t-list-item-top>
                    <t-list-item slot="top">
                        <span slot="left">外径</span>
                        <a-input-number size="small" :min="1" :max="100" :defaultValue="3" class="mxlAntINRepair" />
                    </t-list-item>
                    <a-slider :defaultValue="50" class="mxlAntSiderRepair"/>
                </t-list-item-top>
                <t-list-item>
                    <span slot="left">悬停提示</span>
                    <mxl-switch size="xs"></mxl-switch>
                </t-list-item>
                <t-list-item>
                    <span slot="left">显示顺序</span>
                    <a-radio-group :options="ds.orderOptions" class="optionText"/>
                </t-list-item>
            </a-collapse-panel>
            <a-collapse-panel header="旋转" key="2" style="border:0">
                <t-list-item-top>
                    <t-list-item slot="top">
                        <span slot="left">水平翻转</span>
                        <a-input-number size="small" :min="1" :max="100" :defaultValue="3" class="mxlAntINRepair" />
                    </t-list-item>
                    <a-slider :defaultValue="30" class="mxlAntSiderRepair"/>
                </t-list-item-top>
                <t-list-item-top>
                    <t-list-item slot="top">
                        <span slot="left">垂直翻转</span>
                        <a-input-number size="small" :min="1" :max="100" :defaultValue="3" class="mxlAntINRepair" />
                    </t-list-item>
                    <a-slider :defaultValue="30" class="mxlAntSiderRepair"/>
                </t-list-item-top>
            </a-collapse-panel>
        </a-collapse>
        
    </div>
</template>

<script>
    export default {
        data(){
            return {
                ds: {
                    viewOptions: [
                        {label: '系列', value: '{a}'}, 
                        {label: '数值', value: '{c}'}, 
                        {label: '百分比', value: '{d}'}
                    ],
                    orderOptions: [
                        {label: '顺时针', value: 0},
                        {label: '逆时针', value: 1}
                    ]
                },
                test: []
            }
        }
    }
</script>

<style>
    .mxlAntINRepair {
        width: 60px;
    }
    .mxlAntSiderRepair {
        margin: 0;
    }
    .optionText * {
        font-size: 12px !important;
    }
</style>
