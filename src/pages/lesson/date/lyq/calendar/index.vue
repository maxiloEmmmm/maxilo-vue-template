<template>
    <div>
        <calendar></calendar>
    </div>
</template>

<script>
    import calendar from './calendar.vue';
    export default {
        components: {
            calendar,
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


