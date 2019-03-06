<template>
    <div>
        <custom-select placeholder="==请选择内容==" :lists="list"></custom-select>
        <custom-select :lists="list"></custom-select>
    </div>
</template>

<script>
    import customSelect from './lyq_select.vue';
    export default {
        components: {
            customSelect,
        },
        data(){
            return {
                list :[
                    "北京","上海","深圳","郑州","南阳"
                ],
            }
        }
    }
</script>

<style>
    .warning {
        color: red;
    }
</style>


