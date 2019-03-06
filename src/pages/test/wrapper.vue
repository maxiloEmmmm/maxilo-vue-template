<template>
    <div class="core">
        <t-active :level="5" v-model="x" class="wrapper">
            <mxl-btn model="hi">1</mxl-btn>
            <h2 class="x" model="xi">5</h2>
        </t-active>
        <span v-show="x.hi">1</span>
        <span v-show="x.xi">2</span>
    </div>
</template>
<script>
export default {
    data(){
        return {
            x: {}
        }
    }
}
</script>

<style lang="scss" scoped>
    .core {
        width: 500px;
        height: 600px;
        border: 3px solid #000;
        margin: 10px auto;
        img {
            height: 200px;
            width: 100%;
        }
    }
    .wrapper {
        .active {
            color: green;
        }
    }
</style>
