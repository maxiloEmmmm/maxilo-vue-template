<template>
    <div 
        ref="core" 
        :contenteditable="_is_edit"
        class="mxl-report-item-section-title"
        :class="other_class"
        :placeholder="placeholder"
        v-text="content"
        @keyup="change"
        :style="_class.core"></div>
</template>

<style lang="scss">
    .mxl-report-item-section-title {
        text-align: center;
        //border: 3px dashed #cecece;
        outline: none;
        &.bold {
            font-weight: 650;
        }
        &.italic {
            font-style: italic;
        }
        &.underline {
            text-decoration: underline;
        }
        &.del_through {
            text-decoration: line-through;
        }
    }
    .mxl-report-item-section-title:empty:before{
        content:attr(placeholder);
        font-size: 16px;
        color: green;
    }
    .mxl-report-item-section-title:focus{
        content:none;
    }
</style>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    data(){
        return {
            isEdit: false,
            instance: null,
            placeholder: '请输入',
            sheet: {
                fontSize: '',
                textStroke: '',
                letterSpacing: '',
                lineHeight: 1.5,
                textAlign: '',
                textShadow: '',
                border: 0
            },
            sheet_sub: {
                borderColor: '',
                borderStyle: '',
                borderWidth: 0,
                borderRadiusWidth: 0
            },
            enable: {
                borderTop: false,
                borderBottom: false,
                borderLeft: false,
                borderRight: false,
                borderTopLeftRadius: false,
                borderTopRightRadius: false,
                borderBottomLeftRadius: false,
                borderBottomRightRadius: false,
            },
            other_class: [],
            content: ''
        }
    },
    computed: {
        _sheet(){
            let border = `${this.sheet_sub.borderWidth}px ${this.sheet_sub.borderStyle} ${this.sheet_sub.borderColor}`
            let borderR = `${this.sheet_sub.borderRadiusWidth}px`;
            return this.$utils._.merge({}, this.sheet, {
                borderLeft: this.enable.borderLeft ? border: '',
                borderRight: this.enable.borderRight ? border: '',
                borderTop: this.enable.borderTop ? border: '',
                borderBottom: this.enable.borderBottom ? border: '',
                borderTopLeftRadius: this.enable.borderTopLeftRadius ? borderR : '' ,
                borderTopRightRadius: this.enable.borderTopRightRadius ? borderR : '' ,
                borderBottomLeftRadius: this.enable.borderBottomLeftRadius ? borderR : '' ,
                borderBottomRightRadius: this.enable.borderBottomRightRadius ? borderR : '' ,
            })
        },
        _is_edit(){
            return this.isEdit;
        },
        _class(){
            return {
                core: this._sheet
            }
        }
    },
    mounted() {

    },
    methods: {
        ...mapActions('report/view/section_title', [
            'setSheetFontSize',
            'setPlaceholder',
            'setContent'
        ]),
        async change(e){
            this.content = e.srcElement.innerText;
            this.setContent(this.content);
            await this.$nextTick();
            this.repairSelection();
        },
        init(instance){
            this.instance = instance;
            if(this.instance !== undefined) {
                this.setData(this.instance);
            }
        },
        resize(d){

        },
        dbAction(){
            this.isEdit = true;
            this.$refs.core.focus()
        },
        setData(data){
            console.log(data)
            if(this.$utils._.get(data, 'sheet.fontSize', false) !== false) {
                this._setSheetFontSize(data.sheet.fontSize);
                this.setSheetFontSize(data.sheet.fontSize);
            }
            if(data.placeholder) {
                this._setPlaceholder(data.placeholder);
                this.setPlaceholder(data.placeholder);
            }
            if(data.content) {
                this._setContent(data.content);
                this.setContent(data.content);
            }
        },
        _toggleClass(x){
            let index = this.other_class.findIndex(v => v==x);
            if(index != -1) {
                this.other_class = this.other_class.filter(v => v!=x)
            }else {
                this.other_class.push(x);
            }
        },
        _setSheet(s){
            this.sheet = this.$utils._.merge({}, this.sheet, s);
        },
        _setSheetFontSize(d){
            this.$set(this.sheet, 'fontSize', d);
            this.$emit('resize', {
                h:this.$utils.tool.pf(d)*this.sheet.lineHeight+'px'
            });
        },
        _setSheetTextStroke(d){
            this.$set(this.sheet, 'textStroke', d);
        },
        _setSheetLetterSpacing(d){
            this.$set(this.sheet, 'letterSpacing', d);
        },
        _setSheetLineHeight(d){
            this.$set(this.sheet, 'lineHeight', d);
            this.$emit('resize', {
                h:d*this.$utils.tool.pf(this.sheet.fontSize)+'px'
            });
        },
        _setSheetTextShadow(obj){
            this.$set(this.sheet, 'textShadow', `${obj.v}px ${obj.h}px ${obj.blur}px`);
        },
        _setSheetBorder(obj){
            Object.keys(obj).forEach(v => {
                this.$set(this.enable, v, !!obj[v]);
            });
        },
        _setSheetBorderColor(v){
            this.$set(this.sheet_sub, 'borderColor', v);
        },
        _setSheetBorderStyle(v){
            this.$set(this.sheet_sub, 'borderStyle', v);
        },
        _setSheetBorderWidth(v){
            this.$set(this.sheet_sub, 'borderWidth', v);
        },
        _setSheetBorderRadius(obj){
            Object.keys(obj).forEach(v => {
                this.$set(this.enable, v, !!obj[v]);
            });
        },
        _setSheetBorderRadiusWidth(v){
            this.$set(this.sheet_sub, 'borderRadiusWidth', v);
        },
        _setPlaceholder(d){
            this.placeholder = d;
        },
        _setContent(d){
            this.content = d;
        },
        getSheetData(){
            return this._sheet
        },
        getOtherData(){
            return {
                placeholder: this.placeholder,
                content: this.content,
                sheet_sub: this.sheet_sub,
                other_class: this.other_class
            }
        },
        groupClick(){
            this.dbAction();
        },
        triggleClick(){
            this.dbAction();
        },
        reset(){
            this.isEdit = false;
        },
        repairSelection(){
            if (window.getSelection) {
                this.$refs.core.focus();
                let range = window.getSelection();
                range.selectAllChildren(this.$refs.core);
                range.collapseToEnd();
            } else if (document.selection) {
                let range = document.selection.createRange();
                range.moveToElementText(this.$refs.core);
                range.collapse(false);
                range.select();
            }
        },
        sourcehandler(){
            
        }
    }
}
</script>

