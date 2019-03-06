<template>
    <svg style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg" version="1.1" ref="core">
        <line x1="0" :y1="y" :x2="x" :y2="y" 
            stroke="rgba(96,186,243,1)" 
            stroke-width="2" 
            stroke-linecap="butt"></line>
    </svg>
</template>

<script>
    export default {
        methods: {
            resize(){
                this.x = this.$refs.core.clientWidth;
                this.y = this.$refs.core.clientHeight/2;
            },
            init(){
                this.resize();
            }
        },
        data(){
            return {
                x: 0,
                y: 0
            }
        }
    }
</script>