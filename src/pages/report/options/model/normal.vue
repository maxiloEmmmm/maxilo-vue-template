<template>
    <div style="background:#fff;height:100vh;">
        <component v-for="(item, i) in _items" :key="i" :ref="'item'+i" :is="item._option_tpl" :instance="{param: item}"></component>
    </div>
</template>

<script>
import common from 'pages/report/options/common'
export default {
    mixins: [common],
    computed: {
        _items(){
            return this._instance_param.metedata.items.map(v => {
                v._option_tpl = v.kind && v.type ? `r-${v.kind}-`+(v.option_tpl !== undefined ? v.option_tpl : v.type) : null
                return v;
            });
        }
    },
    methods: {
        input(d){
            this.$emit('change', d);
        },
        setOption(){

        }
    },
    components: {
        rChartBar, 
        rChartPie,
        rBaseWrapper: rBase, 
        rSectionTitle,
        rShapeLine,
    },
};
import rChartBar from '../charts/bar';
import rChartPie from '../charts/pie';
import rBase from '../base';
import rSectionTitle from '../sections/title';
import rShapeLine from '../shape/line';
</script>

