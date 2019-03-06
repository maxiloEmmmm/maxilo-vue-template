<template>
    <div style="background:#fff;height:calc(100% - 60px);" class="mxl-report-option">
        <vue-scroll :ops="{bar: {onlyShowBarOnScroll: false}}">
            <component ref="core" :is="_component" :instance="_instance"></component>
        </vue-scroll>
    </div>
</template>

<script>
export default {
    computed: {
        _component(){
            return this._kind && this._type ? `r-${this._kind}-${this._type}` : null;
        },
        _instance(){
            return this.instance ? this.instance : {
                param: {
                    metedata: {},
                    content: {}
                },
                item: {}
            };
        },
        _kind(){
            return this._instance.param.metedata.kind;
        },
        _type(){
            return this._instance.param.metedata.option_tpl !== undefined ? this._instance.param.metedata.option_tpl : this._instance.param.metedata.type;
        }
    },
    data(){
        return {
            instance: null
        }
    },
    methods: {
        input(d){
            this.$emit('change', d);
        },
        async init(i, a){
            this.instance = {
                param: i,
                item: a
            };
            await this.$nextTick();
            await this.$refs.core.$nextTick();
            this.$refs.core.setOption(this.instance.item.getOption());
        }
    },
    components: {
        rChartBar, 
        rChartPie,
        rBaseWrapper: rBase, 
        rSectionTitle,
        rShapeLine,
        rModelNormal
    },
};
import rChartBar from './options/charts/bar';
import rChartPie from './options/charts/pie';
import rBase from './options/base';
import rSectionTitle from './options/sections/title';
import rShapeLine from './options/shape/line';
import rModelNormal from './options/model/normal';
</script>

<style lang="scss">
    .optionText * {
        font-size: 12px !important;
    }
    .mxl-report-option * {
        //color: #000;
    }
</style>

