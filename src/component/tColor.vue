<template>
    <t-fixed class="t-color" style="position:relative">
        <i class="view" @click="toggleView" :style="{backgroundColor: colors.hex}"></i>
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            slot="sub"
        >
            <t-card v-show="open" style="width: 325px;" @close="end">
                <span slot="header"><a-li-font style="font-size:22px;" icon="mxl_color_tiaosepan-copy"></a-li-font> 选择颜色</span>
                <t-list-item class="diy" style="margin: 1.75em auto;align-items:start !important;">
                    <template slot="left">
                        <div style="display:flex;flex-direction: column;">
                            <sketch-picker v-if="add" v-model="colors_add" :presetColors="[]" @input="change"/>
                            <template v-else>
                                <compact-picker v-model="colors" @input="change" style="width:205px;"/>
                                <t-list-item-top v-if="list.length!=0">
                                    <span slot="top">自定义</span>
                                    <compact-picker style="margin-top:5px;width:195px;" v-model="colors" :palette="list"/>
                                </t-list-item-top>
                            </template>
                            <button class="lg-btn" style="width: 50px;margin-top: 20px;" @click="end">好了</button>
                        </div><br>
                    </template>
                    <button class="lg-btn" @click="doAdd">{{ add ? '好的' : '新增一个' }}</button>
                </t-list-item>
            </t-card>
        </transition>
    </t-fixed>
</template>

<script>
import { Sketch, Compact } from 'components/vue_color'
export default {
    name: 'tColor',
    components: {
        'sketchPicker': Sketch,
        'compactPicker': Compact
    },
    props: {
        value: {
            default: ''
        }
    },
    data(){
        return {
            colors: {hex8: '#FFFFFFFF', hex: '#FFFFFF'},
            colors_add:{hex8: '#FFFFFFFF', hex: '#FFFFFF'},
            add: false,
            list: [],
            open: false
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    methods: {
        doAdd(){
            if(this.add) {
                this.list.push(this.colors_add.hex);
            }
            this.add = !this.add;
        },
        toggleView(){
            this.open = !this.open;
        },
        show(){
            this.open = true;
        },
        hide(){
            this.open = false;
        },
        end(){
            this.hide();
        },
        change(v){
            this.$emit('input', v);
            this.$emit('change', v);
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
        border-radius: 4px;
        border: 2px solid #000;
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

