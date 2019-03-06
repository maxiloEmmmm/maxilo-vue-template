<template>
    <div class="mxl-drop-menu">
        <mxl-list-item
            @click.stop="toggle()"
            :lc="lc"
            rc="fa fa-chevron-down flex-self mxl-drop-menu-toggle">
            <slot name="target"></slot>
        </mxl-list-item>
        <mxl-rely-on-box v-show="active" class="drop-menu" :class="cc">
            <slot></slot>
        </mxl-rely-on-box>
    </div>
</template>

<style>
    .mxl-drop-menu {position: relative;}
    .mxl-drop-menu-toggle {width:1.3rem; text-align: right;}
</style>


<script>
export default {
    name: 'dropMenu',
    data(){
        return {
            /* 是否展开 */
            active: false,
        };
    },
    mounted(){
        /* 加入全局组件管理器 */
        // this.$store.commit('maxilo-bootstrap-component/addDropMenu', {
        //     uuid: this._uid,
        //     instance: this
        // });
        this.initBodyToggle();
    },
    props: {
        single: {
            default: true
        },
        autoClickHide: {
            default: true
        },
        type: {
            default: 'primary',
            type: String
        },
        cc: {
            default: ''
        },
        lc: {
            default: ''
        }
    },
    methods: {
        toggle(){
            this.active = !this.active;

            /* 单例展开: 是否全局只展开一个 */
            if(this.active && this.single) {
                // let dropMenus = this.$store.getters['maxilo-bootstrap-component/manager'].dropMenu;
                // /* 关闭其他实例 */
                // Object.keys(dropMenus).forEach(($v) => {
                //     if($v != this._uid){
                //         dropMenus[$v].hide();
                //     }
                // });
            }
        },
        initBodyToggle(){
            /* 全局监听失去焦点 */
            window.addEventListener('click', ($e) => {
                this.active = false;
            });
        },
        hide(){
            this.active = false;
        },
        show(){
            this.active = true;
        }
    }
};
</script>
