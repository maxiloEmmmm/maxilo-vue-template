<template>
    <div class="mxl-rely-on-list">
        <span class="direction"></span>
        <div class="content"><slot></slot></div>
    </div>
</template>

<style>
    .mxl-rely-on-list {z-index: 1000; position: absolute; top: 100%; padding-top: 0.8rem;}
    .mxl-rely-on-list > .direction{
        height:0;
        width:0;
        position: absolute;
        border-bottom:0.8rem solid #fff;
        border-right:0.8rem solid transparent;
        border-left:0.8rem solid transparent;
        margin-top: -0.8rem;
        margin-left: 1.5rem;
    }
    .mxl-rely-on-list > .content {
        background-color: #fff; 
        box-shadow: 0 0 1.3rem 0.1rem rgba(69,65,78,.2); 
        border-radius: 0.3rem;
    }
</style>


<script>
export default {
    name: 'relayOnBox'
};
</script>

