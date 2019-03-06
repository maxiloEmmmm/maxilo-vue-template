<template>
    <div :class="['panel',panel ? panelStyle : '']" v-show="isDel">
        <div class="panel-heading" >
            <div class="title">
                <slot name="panel-heading"></slot>
            </div>
            <div class="tools" v-show="toolsShow">
                <a class="collapse-link" @click="showTogge">
                    <i :class="[isShow ? 'fa-chevron-up':'fa-chevron-down','fa']"></i>
                </a>
                <a class="close-link" @click="delPanel">
                    <i :class="[isDel ? 'fa-times':'','fa']"></i>
                </a>
            </div>
        </div>
        <transition-group name="slide-fade">
            <div class="panel-body" :key="1" v-show="isShow">
                <slot name="panel-body"></slot>
            </div>
            <div :key="2" v-show="isFooter"
                 :class="['panel-footer',panel ? panelFooterStyle : '']">
                <slot name="panel-footer"></slot>
            </div>
        </transition-group>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                isShow:{
                    default:true,
                },
                isDel:{
                    default:true,
                },
            };
        },
        props:{
            toolsShow:{
                default:true,
            },
            isFooter:{
                default:false,
            },
            panel:{
                default:true,
            },
            panelStyle:{
                default:'panel-default',
            },
            panelFooterStyle:{
                default:'footer-default',
            },
        },
        methods:{
            showTogge(){
                this.isShow = !this.isShow;
            },
            delPanel(){
                this.isDel = !this.isDel;
            },
        },
    };
</script>
<style scoped>
    /* @import '../../../assets/sass/common/bootstrap.css'; */
    @import '../olive/panel.css';
    .panel-heading{background: #67c23a;}
    .panel-body{display: table-header-group;}
</style>


