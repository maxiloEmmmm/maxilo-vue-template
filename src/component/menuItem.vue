<template>
    <li :class="_class.li"
        :draggable="_is_drag_mode" 
        @mousedown.stop="dragRepairIe8"
        @dragstart.stop="dragStart($event)"
        @dragend="dragEnd($event)"
        @drag.stop="drag($event)"
        @dragenter.prevent="dragEnter($event)"
        @dragleave.prevent="dragLeave($event)"
        @dragover.prevent="dragOver($event)"
        @drop.prevent="drop($event)"
    >
        <mxl-list-item 
            v-if="!_is_space_mode" :lc="_class.icon" :c="_class.text" :rc="_class.toggle" :class="_class.item" @click.stop.prevent="touch">
            <template slot="left">
                <!-- todo v-if="_has_render.icon"  -->
                <span v-if="_is_sub_no_icon" class="mxl-menu-item-sub-icon"></span>
            </template>
            <template v-if="_has_render.name">
                <mxl-render></mxl-render>
            </template>
            <template v-else>{{ _name_vue }}</template>
            <template slot="right">
                <i :class="_class.toggle_direction" v-if="_has_child" @click.stop.prevent="toggleOpen($event)"></i>
            </template>
        </mxl-list-item>
        <component 
            v-if="_has_child" 
            v-show="_open"
            :is="_is_drop_menu ? 'mxl-rely-on-box' : 'div'"
            ref="subContainer"
            :class="_class.sub">
            <component :is="_is_list ? 'mxl-box' : 'ul'" :groups="_list_col_num" :class="_class.sub_container">
                <mxl-menu-item 
                    @touch="(a, b) => $emit('touch', a, b)"
                    :level="level+1"
                    :instance="child" 
                    v-for="(child, i) in _children" 
                    :class="_class.sub_item"
                    :parentIsList="_is_list"
                    :key="i"></mxl-menu-item>
            </component>
        </component>
    </li>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name: 'menuItem',
    data(){
        return {
            open: false
        }
    },
    inject: ['parentPrimaryKey'],
    computed: {
        /* hasChild 为true、1、'true'及'1'都计算为存在子节点 */
        _has_child(){
            let val = this.instance.hasChild;
            let type = this.$utils.base.getType(val);
            return (type === 'Boolean' && val)
                || (type === 'Number' && val === 1)
                || (type === 'String' && (parseInt(val) === 1 || val.toLowerCase() === 'true'));
        },
        _children(){
            let val = this.instance.children;
            return this._has_child && Array.isArray(val) ? val : [];
        },
        _name_vue(){
            return this.instance.name;
        },
        _has_render(){
            return {
                icon: false,
                name: false,
                toggle: false
            }
        },
        _has_section_icon(){
            return this._has_render.icon || !!this.instance.icon_class
        },
        _icon_class(){
            return (this._global_icon_class ? this._global_icon_class + ' ' : '')  + 
            (this.instance.icon_class ? this.instance.icon_class : '')
        },
        _item_class(){
            return this._global_icon_class ? this._global_icon_class + ' ' : ''
        },
        _sub_container_list_class(){
            return this._is_list ? [this._global_sub_container_class, this.instance.sub_container_class] : [];
        },
        _class(){
            /*
                存在icon块或icon样式类信息
                    mxl-menu-item-icon-pr 菜单独有所有icon与文字距离
                否则
                    mxl-menu-item-no-icon 消除icon所占空间
            */
            let icon = this._has_section_icon
                ? ['mxl-menu-item-icon-pr', this._icon_class]
                : ['mxl-menu-item-no-icon'];
            let text = [this._is_list_not_drop_menu ? 'flex-self-min' : '', this._global_text_class];
            let toggle = (this.parentIsList && this._has_child) ? ['mxl-menu-item-list-header-toggle'] : [];
            let toggle_direction = ['fa', 'fa-chevron-down'];
            let item = [
                this._class_name.item,
                this._level, 
                text,
                (this.parentIsList && this._has_child ? 'mxl-menu-item-list-header' : ''),
                this._global_item_class,
                this.instance.item_class
            ]
            let li = [this._is_drop_menu ? 'mxl-menu-item-container-drop-menu' : ''];
            let sub = [
                this._is_drop_menu ? 'mxl-menu-item-sub-drop-menu' : '',
                this._is_list_and_drop_menu ? 'mxl-menu-drop-mode-box-top' : ''
            ];
            //todo list flex-fill do space between is bad please fix in /test/menu/menu-sub/level/2.
            let sub_item = [];
            let sub_container = ['mxl-menu-container'];
            if(this._is_list) {
                sub_container.push('d-flex', 'justify-content-between', 'flex-wrap', 'mxl-menu-item-list' + (this._has_child ? '-last' : ''));
                sub_container.push(...this._sub_container_list_class);
            }
            return {
                icon,
                text,
                toggle,
                toggle_direction,
                item,
                li,
                sub,
                sub_item,
                sub_container
            };
        },
        _class_name(){
            return {
                item: 'mxl-menu-item-'
            }
        },
        _open(){
            return this.open;
        },
        _is_section(){
            return this.instance.type === 'section';
        },
        _level(){
            return this.level <= 4 ? this.level : 4;
        },
        _is_drop_menu(){
            return this.instance.drop_menu_mode;
        },
        _is_list(){
            return !!this.instance.list;
        },
        _is_list_not_drop_menu(){
            return this._is_list && !this._is_drop_menu;
        },
        _is_list_and_drop_menu(){
            return this._is_list && this._is_drop_menu;
        },
        _dorp_menu_single(){
            return this.instance.single !== undefined ? !!this.instance.single : true;
        },
        _is_sub(){
            return this._level > 1;
        },
        _is_sub_no_icon(){
            return this._icon_class == '' && this._is_sub;
        },
        _is_space_mode(){
            return this.instance.space_mode;
        },
        _list_col_num(){
            return parseInt(this.instance.list_col_num ? this.instance.list_col_num : 4);
        },
        ...mapState('maxilo-bootstrap-component', {
            _global(state){
                return state.manager.menu[this.parentPrimaryKey] ? 
                    state.manager.menu[this.parentPrimaryKey] : {}
            }
        }),
        _global_icon_class(){
            return this._global.class.icon
        },
        _global_text_class(){
            return this._global.class.text
        },
        _global_toggle_class(){
            return this._global.class.toggle
        },
        _global_item_class(){
            return this._global.class.item
        },
        _global_sub_container_class(){
            return this._global.class.sub_container
        },
        _global_func_drag_start(){
            return this.instance.drag_start_func ? 
                this.instance.drag_start_func : this._global.func.drag_start;
        },
         _global_func_mousedown(){
            return this.instance.mousedown_func ? 
                this.instance.mousedown_func : this._global.func.mousedown;
        },
        _global_func_drag(){
            return this.instance.drag_func ? 
                this.instance.drag_func : this._global.func.drag;
        },
        _global_func_drag_end(){
            return this.instance.drag_end_func ? 
                this.instance.drag_end_func : this._global.func.drag_end
        },
        _is_drag_mode(){
            return this.instance.drag_mode === undefined 
                ? this._global.mode.drag
                : this.instance.drag_mode;
        }
    },
    props: {
        instance: {
            default(){
                return {};
            }
        },
        level: {
            default: 1
        },
        parentIsList: {
            default: false
        }
    },
    created() {
        this.subDropDown();
        if(this.parentIsList || this.instance.open) {
            this.open = true;
        }
    },
    methods: {
        /* async end */
        dragRepairIe8: function(e){
            let ev = e;
            if(this.dragDrop){
                this.dragDrop();
            }
            
            if(this._global_func_mousedown) {
                this._global_func_mousedown(this, ev)
            }
        },
        dragRepairFirfox(e){
            e.dataTransfer.setData("infoName"," ");
        },
        dragStart(e, i){
            let ev = e;
            if(this._global_func_drag_start) {
                this._global_func_drag_start(this, ev)
            }
            let bInfo = this.$utils.tool.getBroswer();
            if(bInfo.broswer == 'Firefox') {
                this.dragRepairFirfox(ev);
            }
            this.$utils.mxlvbc.setDrag({
                instance: this,
                event: ev
            });
        },
        dragEnd(e){
            let ev = e;
            if(this._global_func_drag_end) {
                this._global_func_drag_end(this, ev)
            }
        },
        drag(e){
            let ev = e;
            if(this._global_func_drag) {
                this._global_func_drag(this, ev)
            }
        },
        dragEnter(e){
        },
        dragLeave(e){
            
        },
        dragOver(){
            
        },
        drop(){
        },
        toggleOpen(e){
            let ev = e;
            this.open = !this.open;
            if(this.open) {
                this.subDropDown();
            }
        },
        subDropDown(){
            if(this._is_drop_menu) {
                this.$store.commit('maxilo-bootstrap-component/hideDropMenu', this);
            }
        },
        hideDropMenu(){
            this.open = false;
        },
        touch(){
            if(!this._has_child) {
                this.$emit('touch', this.instance, this);
            }
        }
    }
};
</script>

