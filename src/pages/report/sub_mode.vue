<template>
    <div style="width: 100%;">
        <mxl-menu :items="models"></mxl-menu>
    </div>
</template>

<script>
    import reportCategoryAdapter from './libs/category_adapter';
    export default {
        components: reportCategoryAdapter,
        data(){
            return {
                models: []
            }
        }
    }
</script>