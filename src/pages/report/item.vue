<template>
    <div @dblclick="dbAction" @click="toC($event)" 
        @mousedown="$emit('mousedown', instance, _self, $event)"
        ref="wrapper" class="chart-box" :style="_style.wrapper">
        <component v-if="_active" @resize="itemResize" :is="_item_type" ref="content" style="width:100%; height:100%;position:relative;"> 
        </component>
    </div>
</template>


<script>
import itemMix from './libs/itemMix'
export default {
    mixins: [itemMix],
    // watch: {
    //     instance: {
    //         async handler(){
    //             if(this._active) {
    //                 this.setArea(this.instance.area);
    //                 await this.$nextTick();
    //                 this.$refs.content.init && this.$refs.content.init(this.instance, this.getArea());
    //             }
    //         },
    //         deep: true,
    //         immediate: true
    //     }
    // },
    methods: {
        groupClick(){
            this.$refs.content.groupClick && this.$refs.content.groupClick();
        },
        toC(e){
            this.$emit('touchItem', this.instance, this, e)
        },
        reset(){
            this.$refs.content.reset && this.$refs.content.reset();
        },
        triggleClick(){
            this.$refs.content.triggleClick && this.$refs.content.triggleClick();
        },
        sourceHandler(d){
            this.$refs.content.sourceHandler && this.$refs.content.sourceHandler(d);
        },
        itemResize(obj){
            this.setArea(obj, false);
            this.$emit('resize', obj)
        }
    }
}
</script>

