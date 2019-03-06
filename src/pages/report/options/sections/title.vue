<template>
    <a-collapse class="optionText mxlRepairAntdInput" defaultActiveKey="1" :bordered="false">
        <a-collapse-panel header="xx" key="1" style="border:0">
            <t-active @click="oneAlign" v-model="data_form.is_align" class="mxl-list title-justify">
                <a-li-font model="justify" icon="alignjustify"></a-li-font>
                <a-li-font model="left" icon="alignleft"></a-li-font>
                <a-li-font model="center" icon="aligncenter"></a-li-font>
                <a-li-font model="right" icon="alignright"></a-li-font>
            </t-active>
            <t-active @click="oneStyle" :relation="styleRelation" :alone="false" v-model="data_form.is_style" class="mxl-list title-justify">
                <a-li-font model="bold" icon="fontbold"></a-li-font>
                <a-li-font model="italic" icon="fontitalic"></a-li-font>
                <a-li-font model="underline" icon="underline"></a-li-font>
                <a-li-font model="del_through" icon="strikethrough"></a-li-font>
            </t-active>
            <t-list-item-top>
                <t-list-item slot="top" class="no-p right-item-end">
                    <span slot="left">字体大小</span>
                    <a-input-number size="small" :min="1" :max="100" v-model="data_form.font_size" class="mxlAntINRepair" />
                </t-list-item>
                <a-slider @change="d => setDom('_setSheetFontSize', d+'px')" v-model="data_form.font_size" class="mxlAntSiderRepair"/>
            </t-list-item-top>
            <t-list-item-top>
                <t-list-item slot="top" class="no-p right-item-end">
                    <span slot="left">文字轮廓</span>
                    <a-input-number :step=".1" size="small" :min="1" :max="4" v-model="data_form.text_stroke" class="mxlAntINRepair" />
                </t-list-item>
                <a-slider :min="1" :step=".1" :max="4" @change="val => setDom('_setSheetTextStroke', val+'px')" v-model="data_form.text_stroke" class="mxlAntSiderRepair"/>
            </t-list-item-top>
            <t-list-item-top>
                <t-list-item slot="top" class="no-p right-item-end">
                    <span slot="left">文字距离</span>
                    <a-input-number size="small" :min="1" :max="15" v-model="data_form.letter_spacing" class="mxlAntINRepair" />
                </t-list-item>
                <a-slider :min="1" :max="15" @change="val => setDom('_setSheetLetterSpacing', val+'px')" v-model="data_form.letter_spacing" class="mxlAntSiderRepair"/>
            </t-list-item-top>
            <t-list-item-top>
                <t-list-item slot="top" class="no-p right-item-end">
                    <span slot="left">文字行距</span>
                    <a-input-number :step=".1" size="small" :min="1" :max="2" v-model="data_form.line_height" class="mxlAntINRepair" />
                </t-list-item>
                <a-slider :min="1" :step=".1" :max="2" @change="d => setDom('_setSheetLineHeight', d)" v-model="data_form.line_height" class="mxlAntSiderRepair"/>
            </t-list-item-top>
            <t-list-item class="right-item-end">
                <span slot="left">文字阴影</span>
                <a-switch size="small" v-model="data_form.is_text_shadow" @change="use_text_shadow_change"/>
            </t-list-item>
            <transition
                enter-active-class="animated fadeInRight"
                leave-active-class="animated fadeOutRight"
            >
                <div class="title-shadow" v-show="data_form.is_text_shadow">
                    <t-list-item-top>
                        <t-list-item slot="top" class="no-p right-item-end">
                            <span slot="left">横向</span>
                            <a-input-number size="small" :min="1" :max="35" v-model="data_form.text_shadow.h" class="mxlAntINRepair" />
                        </t-list-item>
                        <a-slider :min="1" :max="35" @change="setDom('_setSheetTextShadow', data_form.text_shadow)" v-model="data_form.text_shadow.h" class="mxlAntSiderRepair"/>
                    </t-list-item-top>
                    <t-list-item-top>
                        <t-list-item slot="top" :mix="true" class="right-item-end">
                            <span slot="left">纵向</span>
                                <a-input-number size="small" :min="1" :max="35" v-model="data_form.text_shadow.v" class="mxlAntINRepair" />
                            </t-list-item>
                            <a-slider :min="1" :max="35" @change="setDom('_setSheetTextShadow', data_form.text_shadow)" v-model="data_form.text_shadow.v" class="mxlAntSiderRepair"/>
                        </t-list-item-top>
                    <t-list-item-top>
                        <t-list-item slot="top" :mix="true" class="right-item-end">
                            <span slot="left">模糊</span>
                            <a-input-number size="small" :min="1" :max="35" v-model="data_form.text_shadow.blur" class="mxlAntINRepair" />
                        </t-list-item>
                        <a-slider :min="1" :max="35" @change="setDom('_setSheetTextShadow', data_form.text_shadow)" v-model="data_form.text_shadow.blur" class="mxlAntSiderRepair"/>
                    </t-list-item-top>
                </div>
            </transition>
            <t-list-item class="right-item-end">
                <span slot="left">预提示</span>
                <a-input v-model="_placeholder"/>
            </t-list-item>
            <t-list-item class="right-item-end">
                <span slot="left">内容</span>
                <a-input class="mxlMin" v-model="_content"/>
            </t-list-item>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="文本框" style="border:0">
            <t-list-item class="right-item-end">
                <span slot="left">边框</span>
                <t-active 
                    class="mxl-list __text_border_list"
                    :relation="borderRelation"
                    :alone="false"
                    @click="oneBorder"
                    v-model="data_form.border">
                    <a-li-font 
                        v-for="(item, index) in _border_item" 
                        :key="index" 
                        :model="item.mode" 
                        :icon="item.icon"></a-li-font>
                </t-active>
            </t-list-item>
            <transition
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
            >
                <div class="title-shadow" v-show="_has_border">
                    <t-list-item-top>
                        <t-list-item slot="top" class="no-p right-item-end">
                            <t-list-item slot="left">
                                <span slot="left">颜色</span>
                                <t-color v-model="data_form.border_color" @change="v => setDom('_setSheetBorderColor', v.hex)"></t-color>
                            </t-list-item>
                            <a-select
                                style="width:115px;"
                                size="small"
                                class="text-center"
                                defaultValue="dashed"
                                v-model="data_form.border_style"
                                @change="v => setDom('_setSheetBorderStyle', v)"
                                >
                                <a-select-option v-for="(s, i) in assets.border_style" :key="i" class="text-center" :value="s.value">
                                    {{ s.label }}
                                </a-select-option>
                            </a-select>
                        </t-list-item>
                        <t-list-item-top  class="no-p">
                            <t-list-item slot="top" class="right-item-end">
                                <span slot="left">边框粗细</span>
                                <a-input-number size="small" :min="1" :max="35" v-model="data_form.border_width" class="mxlAntINRepair" />
                            </t-list-item>
                            <a-slider :min="1" :max="35" @change="v => setDom('_setSheetBorderWidth', v)" v-model="data_form.border_width" class="mxlAntSiderRepair"/>
                        </t-list-item-top>
                    </t-list-item-top>
                </div>
            </transition>
            <t-list-item>
                <span slot="left">圆角</span>
                <t-active 
                    class="mxl-list __text_border_radius_list"
                    :relation="borderRelation"
                    :alone="false"
                    @click="oneBorderRadius"
                    v-model="data_form.border_radius">
                    <a-li-font 
                        v-for="(item, index) in _border_radius_item" 
                        :key="index" 
                        :model="item.mode" 
                        :icon="item.icon"></a-li-font>
                </t-active>
            </t-list-item>
            <transition
                enter-active-class="animated fadeInRight"
                leave-active-class="animated fadeOutRight"
            >
                <div class="title-shadow" v-show="_has_border_radius">
                    <t-list-item-top>
                        <t-list-item slot="top" class="no-p right-item-end">
                            <span slot="left">圆角大小</span>
                            <a-input-number size="small" :min="1" :max="20" v-model="data_form.border_radius_width" class="mxlAntINRepair" />
                        </t-list-item>
                        <a-slider :min="1" :max="20" @change="setDom('_setSheetBorderRadiusWidth', data_form.border_radius_width)" v-model="data_form.border_radius_width" class="mxlAntSiderRepair"/>
                    </t-list-item-top>
                </div>
            </transition>
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
import common from 'pages/report/options/common'
import { mapState, mapActions } from 'vuex';
export default {
    mixins: [common],
    data(){
        return {
            data_form: {
                font_size: 0,
                text_stroke: 0,
                letter_spacing: 0,
                line_heigt: 1.5,
                is_text_shadow: false,
                text_shadow: {
                    v: 0,
                    h: 0,
                    blur: 0
                },
                border: {},
                border_style: '',
                border_width: 0,
                border_color: '',
                border_radius: {},
                border_radius_width: 0,
                is_align: {},
                is_style: {}
            },
            assets: {
                border_style: [
                    {label: '————', value: 'solid'},
                    {label: '- - - - - -', value: 'dashed'},
                    {label: '...............', value: 'dotted'}
                ]
            }
        }
    },
    computed: {
        _has_border(){
            return Object.keys(this.data_form.border).some(v => this.data_form.border[v]);
        },
        _has_border_radius(){
            return Object.keys(this.data_form.border_radius).some(v => this.data_form.border_radius[v]);
        },
        _border_item(){
            return [
                {mode: 'all', icon: 'border-outer'},
                {mode: 'borderTop', icon: 'border-top'},
                {mode: 'borderRight', icon: 'border-right'},
                {mode: 'borderBottom', icon: 'border-bottom'},
                {mode: 'borderLeft', icon: 'border-left'},
            ];
        },
        _border_radius_item(){
            return [
                {mode: 'all', icon: 'radius'},
                {mode: 'borderTopLeftRadius', icon: 'radius-upleft'},
                {mode: 'borderTopRightRadius', icon: 'radius-upright'},
                {mode: 'borderBottomRightRadius', icon: 'radius-bottomright'},
                {mode: 'borderBottomLeftRadius', icon: 'radius-bottomleft'},
            ];
        },
        _placeholder: {
            get() {
               return this.$store.state.report.view.section_title.placeholder
            },
            set(val){
                this.setPlaceholder(val);
                this.setDom('_setPlaceholder', val);
            }
        },
        _content: {
            get() {
               return this.$store.state.report.view.section_title.content
            },
            set(val){
                this.setContent(val);
                this.setDom('_setContent', val);
            }
        },
    },
    methods: {
        oneBorder(){
            this.setDom('_setSheetBorder', this.$utils._.omit(this.data_form.border, 'all'));
        },
        borderRelation(key, res){
            if(key=='all') {
                Object.keys(res).forEach(v => {
                    if(v != 'all') {
                        res[v]=res.all
                    }
                });
            }else if(!res[key]) {
                res.all = false;
            }else {
                let tag = true;
                Object.keys(res).forEach(v => {
                    if(v != 'all' && !res[v]) {
                        tag = false;
                    }
                });
                res.all = tag;
            }
            return res;
        },
        oneBorderRadius(tag, b){
            this.setDom('_setSheetBorderRadius', this.$utils._.omit(this.data_form.border_radius, 'all'));
        },
        use_text_shadow_change(q){
            this.setDom('_setSheetTextShadow', q 
            ? this.data_form.text_shadow 
            : {
                v: 0,
                h: 0,
                blur: 0
            });
        },
        oneAlign(tag, b){
            if(b) {
                ['justify', 'left', 'right', 'center'].forEach(v => {
                    this.$set(this.data_form, 'is_align_'+v, v==tag)
                })
            } 
            this.setDom('_setSheet', {
                textAlign: tag
            });
        },
        oneStyle(x){
            this.setDom('_toggleClass', x);
        },
        styleRelation(key, res){
            if(res[key] && ['underline', 'del_through'].includes(key)){
                res[key == 'underline' ? 'del_through' : 'underline'] = false
            }
            return res;
        },
        ...mapActions('report/view/section_title', [
            'setPlaceholder',
            'setContent'
        ]),
        _setOption(option){
            if(this.$utils._.get(option, 'content.sheet.fontSize', false) !== false) {
                this.$set(this.data_form, 'font_size', parseFloat(option.content.sheet.fontSize));
            }
            if(this.$utils._.get(option, 'content.otherData.placeholder', false) !== false) {
                this.setPlaceholder(option.content.otherData.placeholder);
            }
            if(this.$utils._.get(option, 'content.otherData.content', false) !== false) {
                this.setContent(option.content.otherData.content);
            }
        }
    }
}
</script>

<style lang="scss">
    .mxlRepairAntdInput .ant-input {
        width: 120px;
        height: 25px;
    }
    .title-justify {
        display: flex;
        justify-content: space-around;
        .icon {
            width: 1.5em;
            height: 2em;
            background: #fff;
            color: #000;
        }
        .active {
            .icon {
                background: #cecece;
                border-radius: 4px;
                border: 2px dashed #000;
            }
        }
    }
    .title-shadow {
        padding-left:5px;
        animation-duration: 0.7s;
        border-left: 3px solid #000;
        background-image: url(~assets/images/report_sub_option_bk.jpeg);
    }
    .__text_border_list, .__text_border_radius_list {
        width: 165px;
        .icon {
            font-size:24px !important;
        }
        .active {
            .icon {
                background: #000;
                border-radius: 4px;
                color: #fff;
            }
        }
    }
</style>
