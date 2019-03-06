<template>
    <div class="report-container" ref="wrapper">
        <!-- 头部开始 -->
        <t-list-item-center class="report-header">
            <div class="report-header__logo" slot="left">
            </div>
            <div class="report-header__title"></div>
            <div class="report-header__bar" slot="right">
                <mxl-btn @click="getItemData" class="lg-btn">测试</mxl-btn>
                <mxl-btn @click="showTpl" class="lg-btn"><a-li-font icon="tuanduixiezuo"></a-li-font> 协作</mxl-btn>
                <mxl-btn @click="showTpl" class="lg-btn"><a-li-font icon="fabu"></a-li-font> 发布</mxl-btn>
            </div>
        </t-list-item-center>
        <!-- 头部结束 -->

        <!-- 左侧菜单开始 -->
        <div class="menu-wrapper" ref="wrapperMenu">
            <vue-scroll>
                <t-list class="menu-container column pt-2">
                    <t-list-item-top class="item-center" @click="categoryTouch(nav.componment)" v-for="(nav, i) in nav_list" :key="i">
                        <div slot="top" class="report-menu-nav-item">
                            <i :class="nav.icon" class="fa-2x"></i>
                        </div>
                        <span>{{ nav.label }}</span>
                    </t-list-item-top>
                </t-list>
            </vue-scroll>
        </div>
        <div :class="_class.menu_sub_container">
            <div class="sub">
                <component @makeItem="drag_start" :is="scroll_item+'Menu'" :mousedown_func="drag_start"></component>  
            </div>
            <div class="report-menu-sub-bar" @click="sub_active=!sub_active"></div>
        </div>
        <!-- 左侧菜单结束 -->

        <!-- 画布开始 -->
        <vue-scroll class="design-content-scroll" :ops="{bar: {keepShow: true, onlyShowBarOnScroll: false}}">
            <div class="design-container" 
                @click="baseWrapperOption" ref="designWrapper" :style="_style._design_wrapper">
                <div class="content" ref="content" 
                    @click="contentClick"
                    :style="_style._design_wrapper_type" >
                    <div class="tip_where_bar" ref="tipWhereBar" :class="_class.tipWhereBar"></div>
                    <div class="design-wrapper-bar"></div>
                    <component 
                        :is="chart.is_group ? 'mxl-report-group-item' : 'mxl-report-item'" 
                        :ref="'item'+i" 
                        @resize="itemResize"
                        :style="{zIndex: chart.__z_index}"
                        @touchItem="(a,b,e) => touchItem(a, b, e, i)"
                        @changeOption="(a,b, e) => changeOption(a, b, e)" 
                        v-for="(chart, i) in chartViewInstance" 
                        :class="editItem == i ? 'active' : ''"
                        :key="i" :instance="chart"></component>
                    <mxl-report-gridline v-show="_use_grid_line"></mxl-report-gridline>
                    <component 
                        @resize="itemResize"
                        :is="drag_instance.is_group ? 'mxl-report-group-item' : 'mxl-report-item'"
                        class="chart-example" ref="chartExample" :instance="drag_instance"></component>
                    <mxl-edit-box @dbClick="itemDbAction" @change="editAction" ref="edit_box"></mxl-edit-box>
                </div>
            </div>
        </vue-scroll>
        <!-- 画布结束 -->

        <!-- 工具条开始 -->
        <div class="report-edit-bar">
            <span>
                <a-li-font icon="chexiao" @click="delChart"></a-li-font>
            </span>
            <span>
                <a-li-font icon="zhongzuo" @click="delChart"></a-li-font>
            </span>
            <span>
                <a-li-font icon="yemian" @click="delChart"></a-li-font>
            </span>
            <span>
                <a-li-font icon="list-2-copy" @click="delChart"></a-li-font>
            </span>
            <span>
                <a-li-font icon="fuzhi" @click="delChart"></a-li-font>
            </span>
            <span>
                <a-li-font icon="lajitong" @click="delChart"></a-li-font>
            </span>
            <span>
                <a-li-font icon="shangyiyiceng" @click="barActionLayerOne(1)"></a-li-font>
            </span>
            <span>
                <a-li-font icon="xiayiyiceng" @click="barActionLayerOne(-1)"></a-li-font>
            </span>
            <span>
                <a-li-font icon="charufu-shang" @click="setWrapperScale(0.1)"></a-li-font>
            </span>
            <span>
                {{ (_scale*100).toFixed(0) }} %
            </span>
            <span>
                <a-li-font icon="charufu-xia" @click="setWrapperScale(-0.1)"></a-li-font>
            </span>
            <span><i @click="getItemData" class="fa fa-edit fa-2x"></i></span>
        </div>
        <!-- 工具条结束 -->

        <!-- 选项区域 -->
        <edit-menu class="edit-menu" ref="option"></edit-menu>

        <!-- 发布窗口 -->
        <t-modal-card :show.sync="modal.model" title="发布准备">        
            <mxl-export-data ref="edit_table" @end="modelEnd"></mxl-export-data>
        </t-modal-card>
    </div>
</template>

<style lang="less">
    @header_t: 60px;
    //to fix scroll content right;
    .design-content-scroll .__rail-is-vertical {
        right: 305px !important;
    }
    .report-menu-nav-item {
        border: 4px dashed #000;
        border-radius: 4px;
        width: 33px;
        height: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .report-header__bar {
        height: 100%;
        display: flex;
        & > .btn {
            margin: 0 10px;
        }
    }
    .report-header__logo {
        margin-left: 5px;
        border: 4px dashed #cecece;
        width: 120px;
        height:40px;
        border-radius: 4px;
    }
    .report-header__title {
        margin: 0 auto;
        width: 190px;
        border: 4px dashed #cecece;
        height: 40px;
        border-radius: 4px;
    }
    .report-header-title, .report-logo-wrapper, .report-header-bar .bar-wrapper {
        display: flex;
        align-items: center;
        height: 100%;
    }
    .report-header {
        height: @header_t;
        position: fixed;
        left: 0;
        width: 100%;
        box-shadow: 0 1px 10px 0 #cecece;
        border-bottom: 3px solid #000;
        background: #fff;
        z-index: 4;
        top: 0;
    }
    .design-wrapper-bar {
        position: absolute;
        top:100%;
        left:0;
        right:0;
        margin-top:12px;
    }
    .edit-menu {
        position: fixed;
        right: 0;
        width: 250px;
        top: @header_t;
        padding: 5px;
        border-right: 3px solid #000;
    }
    .report-edit-bar {
        position: fixed;
        right: 250px;
        top: @header_t;
        height: 100%;
        display: flex;
        flex-direction: column;
        width: 50px;
        align-items: center;
        border-left: 3px solid #000;
        border-right: 3px solid #000;
        & span {
            padding: 6px 0px;
        }
        & .icon {
            width: 1.5em;
            height: 2em;
            &:hover {
                color: #fff;
                background-color: #000;
                padding: 2px;
                border-radius: 4px;
            }
        }
    }
    .chart-box-group{
        outline:none;
    }
    .chart-box {
        position: absolute;top:0;left:0;
    }
    .chart-box.edit .edit-point {
        display: inline-block;
    }
    .tip_where_bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 2px;
        border: 1px dashed #000;
        width: 100%;
        opacity: 0;
    }
    .tip_where_bar.active{
        opacity: 1;
    }
    .sub {
        height: auto !important;
    }
    .chart-example {
        display: none;
        position: absolute;
    }
    .design-container {
        position: relative;
        padding-left: 265px;
        margin-left: 70px;
        padding-top: @header_t;
        margin-right: 350px;
    }
    .design-container .content {
        position: absolute;
        top: @header_t;
        height: 100%;
        z-index: 0;
        background: #fff;
    }
    .report-container {
        background: #f7f7f7;
        /*height: 100vh;
        */
        position: relative;
    }
    body {
        background: rgb(247, 247, 247);
    }
    .mxl-report-menu {
        flex-direction: column;
        align-items: center;
        height: 50px;
        padding: 3px 10px;
    }
    .mxl-report-menu-icon{
        padding-top:10px;
    }
    .mxl-report-menu-icon {margin-bottom: 1rem;width:auto !important;}
    .mxl-report-menu-icon, .mxl-report-menu-text {color: #000;}
    .menu_sub_container {z-index: 2; position: fixed; top: @header_t; height: 100%; width: 255px; background: #fff;}
    .menu_sub_container.hide {left: -185px;transition: left .5s linear}
    .menu_sub_container.active {left: 70px;transition: left .2s linear}
    .menu_sub_container .sub {height: 100%;}
    .menu-container{
        height: 100%;
        width:70px;
    }
    .menu-wrapper {
        z-index: 3;
        position: fixed;
        top: @header_t;
        left: 0px;
        border-right: 3px solid #000;
    }
    .menu, .menu_sub_container {
        border-right: 1px solid #f6f7fa;
    }
    .report-menu-sub-scroll-bar {
        background-color: #000;
        /* todo to fix menu scroll bar is not show. */
    }
    .report-menu-sub-bar{
        position: absolute;
        top: 50%;
        right: -13px;
        width: 10px;
        margin-top: -20px;
        height: 38px !important;
        background: #000;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        cursor: pointer;
    }
</style>


<script>
import algorithm from './algorithm'
import reportCategoryAdapter from './libs/category_adapter';
import editMenu from './option';
import gridline from './gridline';
import item from './item'
import groupItem from './group_item'
import default_config from './libs/default';
import echarts from 'test/echarts';
import { mapState, mapActions } from 'vuex';
import bkq from 'assets/images/bkq.png'
import items from './libs/items'
import edit_box from './edit_box'
import edit_table from './edit_table';
import menus from './menu/index.js';
export default {
    components: {
        editMenu, 
        mxlReportItem: item, 
        mxlReportGroupItem: groupItem,
        mxlReportGridline: gridline,
        mxlEditBox: edit_box,
        mxlExportData: edit_table,
        ...menus
    },
    data(){
        return {
            draging: false,
            scroll_item: '',
            sub_active: false,
            chartViewInstance: {},
            radio: 0,
            report_export: false,
            drag_instance: {},
            modal: {
                menuSub: true,
                model: false
            },
            editItem: -1,
            base: {
                wrapper: 0
            },
            area: {
                width: '',
                height: ''
            },
            algorithm: {},
            model_data: {},
            nav_list: [
                {label: '内容', componment: 'section', icon: 'fa fa-edit'},
                {label: '形状', componment: 'shape', icon: 'fa fa-edit'},
            ]
        }
    },
    methods: {
        itemResize(obj){
            console.log('item resize', obj)
            this.$refs.edit_box.setArea(obj);
        },
        barActionLayerOne(action){
            let c_z_index = this.chartViewInstance[this.editItem].__z_index;
            let keys = Object.keys(this.chartViewInstance);
            for(let i = 0; i < keys.length; i++) {
                let v = this.chartViewInstance[keys[i]];
                if(v.__z_index == c_z_index+action) {
                    this.$set(v, '__z_index', c_z_index);
                    this.$set(this.chartViewInstance[this.editItem], '__z_index', v.__z_index+action);
                    break;
                }
            }
        },
        async showTpl(){
            //get first model
            let items = Object.keys(this.chartViewInstance);
            let index = items.findIndex(v => !!this.chartViewInstance[v].is_model)
            let flag = false;
            Object.keys(this.chartViewInstance).forEach(v => {
                let instance = this.chartViewInstance[v];
                if(instance.is_model) {
                    //find model algorithm
                    this.algorithm[instance.sub_key] = algorithm[instance.sub_key];

                    //use metedata make table
                    this.$refs.edit_table.addMode(instance.sub_key, this.algorithm[instance.sub_key].getMeteData());
                    flag = true;
                }
            });
            if(!flag) {
                this.$utils.diy.alert.warn('无需录入数据.');
            }else {
                this.$set(this.modal, 'model', true);
            }
        },
        modelEnd(d){
            this.model_data = d;
            //change data;
            this.$set(this.modal, 'model', false);
            Object.keys(this.chartViewInstance).forEach(v => {
                let t = this.chartViewInstance[v];
                console.log('todo: more model, need deal.');
                if(t.is_model && d[t.sub_key] !== undefined && this.algorithm[t.sub_key] !== undefined) {
                    this.$refs['item'+v][0].changeSource(this.algorithm[t.sub_key][t.type](d[t.sub_key]));
                }
            });
        },
        contentClick(e){
            console.log('content click', e);
        },
        changeOption(a, b, e){
            console.log('changeOption 固件');

            //防止嵌套触发
            e.stopPropagation();
            //todo i think a or b should be set to store
            this.$refs.option.init(a, b);
            this.setItem(b);
        },
        touchItem(a, b, e, i){
            console.log('touchGroupItem 固件');
            this.editItem = i;
            this.$refs.edit_box.init(e, b);
            this.setItem(b);
            this.changeOption(a,b,e);
        },
        baseWrapperOption(e){
            console.log('click 设计区');
            let ev = e;
            this.$refs.edit_box.removeView();
            this.editItem = -1;
            Object.keys(this.chartViewInstance).forEach(v => this.$refs['item'+v][0].reset());
            this.$refs.option.init({metedata: {kind: 'base', type: 'wrapper'}}, this)
        },
        delChart(){
            if(this.chartViewInstance[this.editItem] !== undefined) {
                this.$delete(this.chartViewInstance, this.editItem);
                this.$refs.edit_box.removeView();
            }
        },
        editAction(d){
            this.$refs['item'+this.editItem][0].editAction(d);
        },
        itemDbAction(){
            this.$refs['item'+this.editItem][0].dbAction();
        },
        categoryTouch(a){
            this.scroll_item = a;
            this.sub_active = true;
        },
        targetChartExample(e){
            let ev = e;
            this.drag(ev);
            this.$refs.chartExample.setAreaPL(ev.pageX - this._design_content_l + 'px');
            this.$refs.chartExample.setAreaPT(ev.pageY - this._design_content_t + 'px');
            this.$refs.chartExample.$el.style.display = 'block';
            this.$refs.chartExample.$el.style.opacity = '0.5';
        },
        async drag_start(relation, dragEvent){
            if(relation.instance.children) {
                return ;
            }
            dragEvent.preventDefault();
            this.draging = true;
            let ev = dragEvent;
            relation.instance.drop_event = ev;
            this.drag_instance = this.$utils._.merge({}, relation.instance);
            await this.$nextTick();
            this.targetChartExample(dragEvent);
            window.addEventListener('mousemove', this.targetChartExample);
            let y = (e) => {
                let ev = e;
                window.removeEventListener('mousemove', this.targetChartExample);
                window.removeEventListener('mouseup', y);
                this.drop(e);
                this.$refs.chartExample.$el.style.display = 'none';
                this.draging = false;
            }
            window.addEventListener('mouseup', y)
        },
        drag(e){
            //fix -10: not between mouseY+-10.
            //fux -x: absoltue for parent.
            this.$refs.tipWhereBar.style.top = e.pageY - 10 - this._design_content_t + 'px';
        },
        async drop(e){
            if(!this.draging) {return }
            let ev = e;
            ev.stopPropagation()
            let primary_key = this.$utils.tool.random('report-chart-');
            // 生成部件
            this.$set(this.chartViewInstance, primary_key, this.drag_instance);
            this.$set(this.chartViewInstance[primary_key], '__z_index', Object.keys(this.chartViewInstance).length);
            await this.$nextTick();
            // 绑定当前部件
            this.editItem = primary_key
            this.setItem(this.$refs['item'+primary_key][0]);
            // 部件初始化
            this.$refs['item'+primary_key][0].init(ev);
            // 修改工具初始化
            this.$refs.edit_box.init(ev)
            // 选项工具初始化
            this.$refs.option.init(this.drag_instance, this.$refs['item'+primary_key][0]);
            this.draging = false;
        },
        repairHeight(){
            this.$refs.wrapper.style.height = this.$refs.designWrapper.style.height = this.$refs.wrapperMenu.style.height = window.innerHeight + 'px';
        },
        repairInstance(instance){
            if(!instance.area) {
                instance.area = {s: {}};
            }
            instance.area.s = (new area_lib).repairS(instance.area.s)
            return instance
        },
        ...mapActions('report/view/wrapper', [
            'setWrapperWidth',
            'setWrapperHeight',
            'setWrapperDesignContentTop',
            'setWrapperDesignContentLeft',
            'setWrapperScale'
        ]),
        ...mapActions('report/view/item', [
            'setItem',
        ]),
        ...mapActions('report/common', [
            'save',
        ]),
        getItems(){
            
        },
        getItemData(){
            let x = Object.keys(this.chartViewInstance).map(v => {
                return this.$refs['item'+v][0].getOption();
            });
            console.log(JSON.stringify({
                items: x,
                mode_data: this.model_data,
                wrapper: this.getOption()
            }));
        },
        getOption(){
            return {
                area: {
                    w: this._area_w,
                    h: this._area_h
                },
            }
        }
    },
    computed: {
        _class(){
            let menu_sub_container = ['menu_sub_container', this._sub_active ? 'active' : 'hide'];
            let tipWhereBar = [this.draging ? 'active' : '']
            return {
                menu_sub_container,
                tipWhereBar
            }
        },
        _sub_active(){
            return this.scrollItem != '' && this.sub_active;
        },
        _style(){
            return {
                _design_wrapper_type: {
                    width: this._area_w*this._scale + 'px',
                    height: this._area_h*this._scale + 'px',
                    marginTop: this._design_content_item_t + 'px'
                },
                _design_wrapper: {
                    //fix 185: paddingLeft 265
                    width: this._area_w*this._scale + 265 + 'px'
                }
            }
        },
        ...mapState('report/view/wrapper', {
            _area_w: state => state.area.w,
            _area_h: state => state.area.h,
            _use_grid_line: state => state.use_grid_line,
            _design_content_t: state => state.content.area.p.t,
            _design_content_l: state => state.content.area.p.l,
            _design_content_item_t: state => state.content.area.p.t - 60,
            _scale: state => state.scale
        }),
        _navs(){
            return Object.keys(items).map(v => {
                let item = items[v];
                return {
                    name: item.name,
                    icon_class: 'fa fa-'+item.icon,
                    data_type: v
                }
            });
        },
        _subs(){
            let tmp = {};
            Object.keys(items).forEach(v => {
                let item = items[v];
                tmp[v] = Object.keys(item.items).map(val => {
                    let section = item.items[val]
                    return {
                        name: section.name, 
                        hasChild: section.items !== 0, 
                        open: true, 
                        list_col_num: 3, 
                        list: true, 
                        item_class: 'flex-row', 
                        icon_class: 'mb-0', 
                        children: Object.keys(section.items).map(value => {
                            let item = section.items[value];
                            return {
                                icon_class: 'fa fa-'+item.icon,
                                kind: v,
                                type: value,
                                ...item,
                                sub_key: val
                            }
                        })
                    }
                })
            });
            return tmp;
        },
    },
    mounted() {
        this.$nextTick(() => this.repairHeight())
        window.addEventListener('resize', () => {
            this.repairHeight();
        });
        this.baseWrapperOption();
        this.setWrapperWidth(480);
        this.setWrapperHeight(2000);
        this.setWrapperDesignContentTop(110);
        //fix 335: design marginLeft + paddingLeft
        this.setWrapperDesignContentLeft(335);
        this.save();
    },
};
</script>

