<template>
    <div>
        <h1>测试i18n: {{ $t('base.key1') }} (看到value1 而不是base.key1)</h1>
        <button @click="t">测试store: 点击后填充store 刷新页面, store内容依旧存在.</button>
        <div>
            测试验证1: 
            <input 
                type="text" 
                v-model="d" 
                data-vv-name="测试验证"
                v-validate="'required|numeric|min_value:5'"
                @input="testH"
            />
            <div v-show="errors.has('测试验证')" class="warning">{{ errors.first('测试验证') }}.</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            d: '',
            response: '',
        };
    },
    beforeRouteLeave(to, from, next){
        let answer = true;
        if (answer) {
            alert('ok');
            next()
        } else {
            next(false)
        }
    },
    beforeRouteEnter(to, from, next){
        console.log('route enter');
        next();
    },
    beforeResolve(to, from, next){
        console.log('route resolve');
        next();
    },
    beforeCreate(){
        console.log('before create');
    },
    created(){
        console.log('create');
    },
    methods: {
        t(){
            this.$store.dispatch('testAuth/test', {u:123});
        }
    }
}
</script>

<style>
    .warning {
        color: red;
    }
</style>


