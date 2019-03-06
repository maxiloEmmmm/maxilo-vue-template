<template>
    <div style="width: 100%;height:100%" ref="core"></div>
</template>

<script>
import echarts from 'test/echarts';
import chart_option from 'test/echarts/example';
export default {
    methods: {
        setInstance(i){
            this.clear();
            this.instance = i;
            this.render();
        },
        render(){
            this.e_instance = echarts.init(this.$refs.core);
            this.e_instance.setOption(chart_option[this.instance.type]);
        },
        resize(){
            this.e_instance.resize();
        },
        clear(){
            this.e_instance && this.e_instance.clear();
        },
        init(i){
            this.setInstance(i);
        },
        sourceHandler(d){
            this.e_instance.setOption(d);
        },
        getSheetData(){
            return {};
        },
        getOtherData(){
            return this.e_instance.getOption();
        },

        //---------------
        _setLabelShow(show){
            this.e_instance.setOption(this.$utils._.set({}, 'series[0].label.show', show));
        },
        _setLabelFormatter(formatter){
            this.e_instance.setOption(this.$utils._.set({}, 'series[0].label.formatter', formatter));
        },
        _setClockwise(clockwise){
            this.e_instance.setOption(this.$utils._.set({}, 'series[0].clockwise', clockwise));
        },
        _setRadius(radius){
            this.e_instance.setOption(this.$utils._.set({}, 'series[0].radius', radius));
        },
        _setTooltipShow(show){
            this.e_instance.setOption(this.$utils._.set({}, 'tooltip.show', show));
        },
        _setMarkPointData(v){
            this.e_instance.setOption(this.$utils._.set({}, 'series[0].markPoint.data', v));
        }
    },
    data(){
        return {
            instance: null,
            e_instance: null
        }
    }
}
</script>

