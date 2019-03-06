<template>
    <img :src="src" ref="core" @mousedown.prevent="">
</template>

<script>
    export default {
        data(){
            return {
                src: null
            }
        },
        methods: {
            init(instance){
                this.src = instance.src
            },
        }
    }
</script>