<style>
    .menu-container-scroll {
        overflow: hidden;
        flex: 0 0 auto;
        background-color: #2c2e3e;
        transition: width .2s ease;
        width: 255px;
        position: relative;
    }

    .menu-container-scroll-bar {
        position: absolute;
        right: 4px!important;
        width: 4px!important;
        top: 0;
    }

    .menu-container-scroll-target {
        position: absolute;
        right: 0!important;
        width: 4px!important;
        background: #fff;
        top: 0px;
        border-radius: 6px;
        opacity: 0;
        transition: background-color .2s linear,width .2s ease-in-out;
    }

    .menu-container-scroll:hover .menu-container-scroll-target {
        opacity: 1;
        background: #5f6386;
    }
</style>

<style>
    .mxl-dashboard-header {
        flex: none;
        position: fixed;
        top:0;
        left:0;
        right: 0;
        background-color: #fff;
    }
    .mxl-dashboard-header-band {
        transition: width .2s ease;
        height: 70px;
        width: 255px;
        padding: 0 30px;
        display: flex;
        align-items: center;
        background: #282a3c;
    }
    .mxl-dashboard-header-band-logo {
        flex: auto;
        color: #8c8ea4;
        margin: 0;
    }
    .mxl-dashboard-header-menu-toggle {
        background: #5d5f77;
    }
    .mxl-dashboard-header-nav {
        box-shadow: 0 1px 15px 1px rgba(69,65,78,.1);
        flex: auto;
        display: flex;
        justify-content: space-between;
    }
    .mxl-dashboard-header-nav-menu, .mxl-dashboard-header-nav-bar {
        display: flex;
        justify-content: space-around;
    }
    .mxl-dashboard-header-nav-menu {
        margin: 0 0 0 10px;
    }
    .mxl-dashboard-header-nav-menu-item{
        display:flex;
        align-items:center;
    }
    .mxl-dashboard-header-nav-menu-item-menu{
        width: 275px;
    }
    .mxl-dashboard-header-nav-menu-item-menu-large {
        width: 600px;
    }
    .mxl-dashboard-header-nav-menu-item-menu,
    .mxl-dashboard-header-nav-menu-item-menu-large {
        left: 50px;
    }
    .mxl-dashboard-header-nav-menu-item-menu-larger-content > div {
        border-right: 1px solid #f6f7fa;
        padding: 0 0 20px 0;
    }
    .mxl-dashboard-header-nav-menu-item-menu-larger-content > div:last-child {
        border-right: 0!important;
    }
    .mxl-dashboard-header-nav-menu-item:hover > i, .mxl-dashboard-header-nav-menu-item:hover > span {
        color: #2739c1 !important;
    }
    .mxl-dashboard-header-nav-menu-item.show > * , {
        color: #716aca;
    }
    .mxl-dashboard-header-nav-menu-icon {
        font-size: 1.4rem;
        width: 30px;
        text-align: left;
        padding: 0;
        line-height: 0;
        color: #b8bece;
    }
    .mxl-dashboard-header-nav-bar {

    }
    .mxl-dashboard-body {
        flex: 1 0 auto;
        flex-direction: row;
        padding-left: 255px;
        padding-top: 70px!important;
        display: flex;
        flex-direction: row;
    }
    .mxl-dashboard-footer {
        flex: none;
    }
    .mxl-dashboard-body-left {
        left: 0;
        top: 70px;
        position: fixed;
        height: auto!important;
    }
    .mxl-dashboard-body-content {
        flex: 1 auto;
    }
    .mxl-menu-link, .mxl-menu-link-2, .mxl-menu-link-3, .mxl-menu-link-4 {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: start;
    }
    .mxl-menu-link {
        height: 44px;
        padding: 9px 30px !important;
        color: #5867dd;
    }
    .mxl-menu-link-2, .mxl-menu-link-3, .mxl-menu-link-4 {
        padding: 0 30px !important;
        height: 40px;
        color: #686c89;
    }
    .mxl-menu-link-2{
        padding-left: 45px !important;
    }
    .mxl-menu-link-3{
        padding-left: 60px !important;
    }
    .mxl-menu-link-4{
        padding-left: 75px !important;
    }
    .mxl-menu-text {
        color: #868aa8;
        font-weight: 400;
        font-size: 1.02rem;
        text-transform: initial;
    }
    .mxl-menu-icon {
        color: #525672;
        text-align: left;
        width: 35px;
        font-size: 1.4rem;
    }
    .mxl-menu-toggle {
        text-align: right;
        width: 20px;
        font-size: .7rem;
        flex: 1;
        color: #525672;
    }
    .mxl-dashboard-left-mini-menu .mxl-menu-text, 
    .mxl-dashboard-left-mini-menu .mxl-menu-toggle,
    .mxl-dashboard-left-mini-menu .mxl-menu-sub,
    .mxl-dashboard-left-mini-menu .mxl-menu-section-text,
    .mxl-dashboard-mini-menu .mxl-dashboard-header-band-logo {
        display: none !important;
    }
    .mxl-dashboard-left-mini-menu .menu-container-scroll,
    .mxl-dashboard-mini-menu .mxl-dashboard-header-band {
        width: 78px;
    }
    .mxl-dashboard-mini-menu .mxl-dashboard-body {
        padding-left: 78px;
    }
    .mxl-menu-icon-sub {
        text-align: left;
        width: 20px;
        display: flex;
        align-items: center;
    }
    .mxl-menu-icon-sub span {
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #525672;
        display: inline-block;
    }
    .mxl-menu-link:hover .mxl-menu-icon{
        color: #8c8ea4;
    }
    .mxl-menu-section {
        margin: 20px 0 0 0;
        height: 40px;
        padding: 0 27px;
        display: flex;
        align-items: center;
    }
    .mxl-menu-section-text {
        color: #464b66;
        font-size: .83rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: .3px;
        margin: 0;
        padding: 0;
    }
    .mxl-menu {
        list-style: none;
        padding: 30px 0 30px 0;
        margin-top: 0;
        margin-bottom: 1rem;
    }
    .mxl-menu-sub {
        padding: 0;
        width: 100%;
        margin: 0;
        list-style: none!important;
    }
    .mxl-container {
        width: 100%;
        margin-right: auto;
        margin-left: auto;

        /* full height. */
        position: relative;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
    }
    .larger-menu-header {
        padding: 30px 30px 10px 30px;
        color: #5f6281;
        font-weight: 500;
        font-size: 1.07rem;
        text-transform: initial;
    }
    .mxl-dashboard-header-nav-bar-menu-list {
        width: 400px;
    }
</style>

<template>
    <div class="mxl-dashboard-container">
        <header class="mxl-dashboard-header">
            <div class="mxl-container d-flex">
                <div class="mxl-dashboard-header-band">
                    <h4 class="mxl-dashboard-header-band-logo">23</h4>
                    <i class="fa fa-bars fa-2x mxl-dashboard-header-menu-toggle" @click="miniToggle"></i>
                </div>
                <div class="mxl-dashboard-header-nav">
                    <div class="mxl-dashboard-header-nav-menu">
                        <mxl-drop-down-box lc="fa fa-edit mxl-dashboard-header-nav-menu-icon" class="mxl-dashboard-header-nav-menu-item" cc="mxl-dashboard-header-nav-menu-item-menu">
                            <mxl-list-item rc="fa fa-chevron-right" lc="fa fa-edit mxl-dashboard-header-nav-menu-icon">Action 1</mxl-list-item>
                            <mxl-list-item lc="fa fa-edit mxl-dashboard-header-nav-menu-icon">Action 1</mxl-list-item>
                            <mxl-list-item rc="fa fa-chevron-right" lc="fa fa-edit mxl-dashboard-header-nav-menu-icon">Action 1</mxl-list-item>
                            <mxl-list-item rc="fa fa-chevron-right" lc="fa fa-edit mxl-dashboard-header-nav-menu-icon">Action 1</mxl-list-item>
                            <template slot="target"> AABC</template>
                        </mxl-drop-down-box>
                        <mxl-drop-down-box lc="fa fa-edit mxl-dashboard-header-nav-menu-icon" class="mxl-dashboard-header-nav-menu-item" cc="mxl-dashboard-header-nav-menu-item-menu">
                            <mxl-list-item lc="fa fa-edit mxl-dashboard-header-nav-menu-icon">Action 1</mxl-list-item>
                            <mxl-list-item lc="fa fa-edit mxl-dashboard-header-nav-menu-icon">Action 1</mxl-list-item>
                            <mxl-list-item lc="fa fa-edit mxl-dashboard-header-nav-menu-icon">Action 1</mxl-list-item>
                            <mxl-list-item lc="fa fa-edit mxl-dashboard-header-nav-menu-icon">Action 1</mxl-list-item>
                            <template slot="target"> ACTION</template>
                        </mxl-drop-down-box>
                        <mxl-drop-down-box lc="fa fa-edit mxl-dashboard-header-nav-menu-icon" class="mxl-dashboard-header-nav-menu-item" cc="mxl-dashboard-header-nav-menu-item-menu-large">
                            <div class="d-flex justify-content-around mxl-dashboard-header-nav-menu-item-menu-larger-content">
                                <div class="flex-fill">
                                    <h3 class="larger-menu-header">2323</h3>
                                    <mxl-list-item v-for="i in 5" :key="i" rc="fa fa-chevron-right" lc="fa fa-edit mxl-dashboard-header-nav-menu-icon">Action 1</mxl-list-item>
                                </div>
                                <div class="flex-fill">
                                    <h3 class="larger-menu-header">2323</h3>
                                    <mxl-list-item v-for="i in 5" :key="i" lc="fa fa-edit mxl-dashboard-header-nav-menu-icon">Action 1</mxl-list-item>
                                </div>
                                <div class="flex-fill">
                                    <h3 class="larger-menu-header">2323</h3>
                                    <mxl-list-item v-for="i in 5" :key="i" lc="fa fa-edit mxl-dashboard-header-nav-menu-icon">Action 1</mxl-list-item>
                                </div>
                            </div>
                            <template slot="target"> Apps</template>
                        </mxl-drop-down-box>
                    </div>
                    <div class="mxl-dashboard-header-nav-bar">
                        <mxl-menu :nav="true" :items="[
                            {name:1, icon_class: 'fa fa-edit mxl-dashboard-header-nav-menu-icon', hasChild: 1, drop_menu_mode: true, sub_container_class: 'mxl-dashboard-header-nav-bar-menu-list', list: true, children: [
                                {name: '11'},
                                {name: '12'}
                            ]}, 
                            {name:2, icon_class: 'fa fa-plus mxl-dashboard-header-nav-menu-icon', hasChild: 1,}, 
                            {name:3, icon_class: 'fa fa-plus mxl-dashboard-header-nav-menu-icon', hasChild: 1,}]"></mxl-menu>
                    </div>
                </div>
            </div>
        </header>
        <div class="mxl-dashboard-body">
            <div class="mxl-dashboard-body-left" ref="left">
                <div class="flex-column menu-container-scroll" v-mxl-scroll="'scrollUl'" ref="scrollTest">
                    <ul ref="scrollUl" class="mxl-menu">
                        <li v-for="i in 2" :key="i+'a'">
                            <mxl-list-item class="mxl-menu-link" 
                                lc="mxl-menu-icon fa fa-edit"
                                rc="mxl-menu-toggle fa fa-chevron-right"
                                c="mxl-menu-text">
                                {{ i }}qwdqwdqw
                            </mxl-list-item>
                            <ul class="mxl-menu-sub">
                                <li>
                                    <mxl-list-item class="mxl-menu-link-2" 
                                        lc="mxl-menu-icon-sub"
                                        rc="mxl-menu-toggle fa fa-chevron-right"
                                        c="mxl-menu-text">
                                        <span slot="left"></span>
                                        {{ i }}ddw的我单位
                                    </mxl-list-item>
                                    <ul class="mxl-menu-sub">
                                        <li>
                                            <mxl-list-item class="mxl-menu-link-3" 
                                                lc="mxl-menu-icon-sub"
                                                rc="mxl-menu-toggle fa fa-chevron-right"
                                                c="mxl-menu-text">
                                                <span slot="left"></span>
                                                {{ i }}ddw的我单位
                                            </mxl-list-item>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="mxl-menu-section">
                            <h4 class="mxl-menu-section-text">123123</h4>
                        </li>
                        <li v-for="i in 51" :key="i">
                            <mxl-list-item class="mxl-menu-link" 
                                lc="mxl-menu-icon fa fa-edit"
                                rc="mxl-menu-toggle fa fa-chevron-right"
                                c="mxl-menu-text">
                                {{ i }}qwdqwdqw
                            </mxl-list-item>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mxl-dashboard-body-content" style="padding:50px;position:relative;">
                
            </div>
        </div>
        <footer class="mxl-dashboard-footer"></footer>
    </div>
</template>
<script>
export default {
    data(){
        return {
            miniMenuItemDeloyTime: 350,
            headerTop: 70
        }
    },
    mounted() {
        this.$refs.scrollTest.style.height = window.document.body.clientHeight - this.headerTop + 'px';
    },
    methods: {
        miniToggle(){
            window.document.body.classList.toggle('mxl-dashboard-mini-menu');
            this.$refs.left.classList.toggle('mxl-dashboard-left-mini-menu');
        }
    }
}
</script>

