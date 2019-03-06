<template>
    <div class="wrapper" @click="w1c" @mousedown="w1d">
        <div @click="w2c" @mousedown="w2d" style="width:500px;height:400px;border: 1px solid red;">
            <div @click="w3c" @mousedown="w3d" style="width:500px;height:300px;border: 1px solid blue;">
                <button @click="w4c" @mousedown="w4d">x111</button>
            </div>
            <div ref="c" style="position: absolute;top:0;left:0;"></div>
        </div>
    </div>
</template>

<style>
    .wrapper {
        width: 500px;
        height: 500px;
        border: 1px solid #cecece;
    }
</style>

<script>
    export default {
        data(){
            return {
            }
        },
        methods: {
            w1c(){console.log('1 click')},
            w1d(){console.log('1 mousedown')},
            w2c(){console.log('2 click')},
            w2d(){console.log('2 mousedown')},
            w3c(){console.log('3 click')},
            w3d(){
                console.log('3 mousedown');
                this.$refs.c.style.width = '500px'
                this.$refs.c.style.height = '300px'
            },
            w4c(){console.log('4 click')},
            w4d(){console.log('4 mousedown')}
        }
    }
</script>