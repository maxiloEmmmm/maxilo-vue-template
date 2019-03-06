<template>
    <div style="width: 325px;" class="t-color">
        <i class="view" @click="toggleView"></i>
        <transition
                enter-active-class="animated fadeInRight"
                leave-active-class="animated fadeOutRight"
            >
            <t-card v-show="show">
                <span slot="header"><a-li-font style="font-size:22px;" icon="mxl_color_tiaosepan-copy"></a-li-font> 选择颜色</span>
                <t-list-item class="diy" style="margin: 1.75em auto;align-items:start !important;">
                    <template slot="left">
                        <sketch-picker v-if="add" v-model="colors_add" :presetColors="[]"/>
                        <div v-else style="display:flex;flex-direction: column;">
                            <compact-picker v-model="colors" style="width:205px;"/>
                            <t-list-item-top v-if="list.length!=0">
                                <span slot="top">自定义</span>
                                <compact-picker style="margin-top:5px;width:195px;" v-model="colors" :palette="list"/>
                            </t-list-item-top>
                        </div>
                    </template>
                    <button class="lg-btn" @click="doAdd">{{ add ? '好的' : '新增一个' }}</button>
                </t-list-item>
            </t-card>
        </transition>
    </div>
</template>

<script>
import { Sketch, Compact } from 'components/vue_color'
export default {
    components: {
        'sketchPicker': Sketch,
        'compactPicker': Compact
    },
    data(){
        return {
            colors: {hex8: '#FFFFFF'},
            colors_add:{hex8: '#FFFFFF'},
            add: false,
            list: [],
            show: false
        }
    },
    methods: {
        doAdd(){
            if(this.add) {
                this.list.push(this.colors_add.hex);
            }
            this.add = !this.add;
        },
        toggleView(){
            this.show = !this.show;
        }
    }
}
</script>
<style lang="scss">
    .t-color .view{
        width: 16px;
        height: 16px;
        display: block;
        background: red;
        margin-bottom: 10px;
        border-radius: 4px;
    }
    .diy {
        width: 320px;
        .vc-sketch {
            box-shadow: none;
            padding-top: 0;
            .vc-sketch-saturation-wrap {
                border: 3px solid #000;
            }
        }  
        .vc-sketch-field--single, .vc-sketch-presets, .vc-input__label {
            display: none;
        }
        .vc-sketch-field .vc-input__input {
            box-shadow: none;
            border: 3px solid #000
        }
    }
</style>

