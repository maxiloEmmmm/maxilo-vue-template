<template>
    <a @click="$emit('click', $event)" class="mxl-list-item__link align-items-center">
        <span class="mxl-list-item__left flex-self" :class="lc"><slot name="left"></slot></span>
        <span class="mxl-list-item__content d-flex align-items-center" :class="c"><slot></slot></span>
        <i class="mxl-list-item__right flex-self" :class="rc"><slot name="right"></slot></i>
    </a>
</template>
<script>
export default {
    name: 'listItem',
    props: {
        lc: {
            default: ''
        },
        rc: {
            default: ''
        },
        c: {
            default: ''
        }
    }
};
</script>
<style>
    .mxl-list-item__link {cursor: pointer; display: flex;}
    .mxl-list-item__content {
        flex: 1 1 auto;
        color: #676c7b;
        font-weight: 400;
        font-size: 1.07rem;
        text-transform: initial;
        word-break: break-all;
        word-wrap: break-word;
    }
    .mxl-list-item__left, .mxl-list-item__right {width: 2rem;}
    .mxl-list-item__left {
        text-align: left; 
        color: #b8bece;
        font-size: 1.4rem;
        text-align: left;
        padding: 0;
        line-height: 0;
    }
    .mxl-list-item__right {
        text-align: right; 
        color: #b9c1d4;
        font-size: .8rem;
    }
</style>


