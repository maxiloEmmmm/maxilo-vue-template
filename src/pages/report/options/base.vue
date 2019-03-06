<template>
<div style="padding:10px" class="mxlRepairAntdInput">
    <p>画布尺寸</p>
    <div style="display:flex; justify-content: space-around; margin-bottom:10px;">
        <!-- <div style="display:inline-block;flex: 1 1 auto">
            <mxl-checkbox :radio="true" :model="dataForm.wrapper">
                <input type="radio" value="0" label="小" v-model="dataForm.wrapper" @change="wrapperChange">
                <input type="radio" value="1" label="中" v-model="dataForm.wrapper" @change="wrapperChange">
                <input type="radio" value="2" label="大" v-model="dataForm.wrapper" @change="wrapperChange">
            </mxl-checkbox>
        </div> -->
        <i @click="changeTypeAction(wrapper_type.sm)" class="wrapper-type fa fa-mobile fa-2x" :class="_is_sm ? 'active': ''"></i>
        <i @click="changeTypeAction(wrapper_type.md)" class="wrapper-type fa fa-laptop fa-2x" :class="_is_md ? 'active': ''"></i>
        <i @click="changeTypeAction(wrapper_type.lg)" class="wrapper-type  fa fa-tv fa-2x" :class="_is_lg ? 'active': ''"></i>
    </div>
    <t-list-item class="right-item-end">
        <span slot="left">页面宽度</span>
        <a-input v-model="_area_w" />
    </t-list-item>
    <t-list-item class="right-item-end">
        <span slot="left">页面高度</span>
        <a-input v-model="_area_h" />
    </t-list-item>
    <t-list-item class="right-item-end">
        <span slot="left">网格线</span>
        <mxl-switch v-model="_use_grid_line" size="xs"></mxl-switch>
    </t-list-item>
    <t-list-item-top :mix="true">
        <t-list-item slot="top" class="no-p right-item-end">
            <span slot="left">底纹透明度</span>
            <a-input-number size="small" :min="1" :max="100" v-model="todo" class="mxlAntINRepair" />
        </t-list-item>
        <a-slider v-model="todo" class="mxlAntSiderRepair"/>
    </t-list-item-top>
</div>
        
</template>
<style>
    .wrapper-type{
        padding: 3px 6px;
        border-radius: 4px;
    }
    .wrapper-type:hover, .wrapper-type.active  {
        background: #cecece;
    }
    .wrapper-type.active{
        border: 1px solid #000;
    }
    .mxlRepairAntdInput .ant-input {
        width: 120px;
        height: 25px;
    }
</style>


<script>
import common from 'pages/report/options/common'
import { mapState, mapActions } from 'vuex';
export default {
    mixins: [common],
    methods: {
        changeTypeAction(w){
            this.setWrapperWidth(w);
        },
        ...mapActions('report/view/wrapper', [
            'setWrapperWidth',
            'setWrapperHeight',
            'setUseGridLine'
        ]),
        _setOption(d){
            if(this.$utils._.get(d, 'area.w', false) !== false) {
                this._area_w = d.area.w;
            }
            if(this.$utils._.get(d, 'area.h', false) !== false) {
                this._area_h = d.area.h;
            }
            if(d.use_grid_line !== undefined) {
                this._use_grid_line = !!d.use_grid_line;
            }
        }
    },
    computed: {
        _area_w: {
            get() {
               return this.$store.state.report.view.wrapper.area.w
            },
            set(val){this.setWrapperWidth(val)}
        },
        _area_h: {
            get() {
               return this.$store.state.report.view.wrapper.area.h
            },
            set(val) {this.setWrapperHeight(val)}
        },
        _use_grid_line: {
            get() {
               return this.$store.state.report.view.wrapper.use_grid_line
            },
            set(val) {this.setUseGridLine(val)}
        },
        _is_sm(){
            return this._area_w == this.wrapper_type.sm;
        },
        _is_md(){
            return this._area_w == this.wrapper_type.md;
        },
        _is_lg(){
            return this._area_w == this.wrapper_type.lg;
        }
    },
    data(){
        return {
            wrapper_type: {
                sm: 480,
                md: 800,
                lg: 1920
            },
            todo: 50
        }
    }
};
</script>
