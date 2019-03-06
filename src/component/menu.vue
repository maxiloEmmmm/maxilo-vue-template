<template>
    <ul :class="_class.container">
        <mxl-menu-item @touch="touch" :instance="item" v-for="(item, i) in _items" :key="i"></mxl-menu-item>
    </ul>
</template>

<style>
    .mxl-menu-container {padding: 0; margin: 0;}
</style>


<script>
export default {
    name: 'menu',
    provide(){
        return {
            parentPrimaryKey: this._uid
        }
    },
    computed: {
        _items(){
            return this.items;
        },
        _is_nav(){
            return this.nav;
        },
        _class(){
            return {
                container: [
                    'mxl-menu-container', 
                    this._is_nav ? 'd-flex justify-content-between' : ''
                ]
            }
        }
    },
    props: {
        items: {
            default(){
                return [];
            }
        },
        nav: {
            defualt: false
        },
        iconClass: {
            default: ''
        },
        textClass: {
            default: ''
        },
        toggleClass: {
            default: ''
        },
        itemClass: {
            default: ''
        },
        subContainerClass: {
            default: ''
        },
        useDrag: {
            default: false
        },
        drag_start_func: {
            default: false
        },
        drag_func: {
            default: false
        },
        drag_end_func: {
            default: false
        },
        mousedown_func: {
            default: false
        }
    },
    watch: {
        iconClass: {
            handler(){
                this.merge();
            },
            immediate: true
        },
        textClass: {
            handler(){
                this.merge();
            },
            immediate: true
        },
        toggleClass: {
            handler(){
                this.merge();
            },
            immediate: true
        },
        subContainerClass: {
            handler(){
                this.merge();
            },
            immediate: true
        },
        useDrag(){
            this.merge();
        },
        drag_start_func(){
            this.merge();
        },
        drag_func(){
            this.merge();
        },
        drag_end_func(){
            this.merge();
        },
        mousedown_func(){
            this.merge();
        }
    },
    methods: {
        touch(a, b){
            this.$emit('touch', a, b, this.items, this);
        },
        merge(){
            this.$store.commit('maxilo-bootstrap-component/menuMerge', {
                primaryKey: this._uid,
                data: {
                    class: {
                        icon: this.iconClass,
                        text: this.textClass,
                        toggle: this.toggleClass,
                        item: this.itemClass,
                        sub_container: this.subContainerClass
                    },
                    mode: {
                        drag: this.useDrag,
                    },
                    func: {
                        drag_start: this.drag_start_func,
                        drag: this.drag_func,
                        drag_end: this.drag_end_func,
                        mousedown: this.mousedown_func
                    }
                }
            });
        }
    }
};
</script>

