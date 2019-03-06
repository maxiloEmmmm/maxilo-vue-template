<template>
    <mxl-btn-group size="sm">
        <mxl-btn @click="change">{{ _is_active_txt }}<mxl-loading v-model="loading.change" size="xs" :block="false" theme="cog"></mxl-loading></mxl-btn>
        <mxl-btn>划分角色组</mxl-btn>
    </mxl-btn-group>
</template>

<script>
export default {
    data(){
        return {
            loading: {
                change: false
            }
        };
    },
    props: {
        ds: {
            type: Object,
            default(){
                return {};
            }
        }
    },
    computed: {
        _is_active(){
            return this.ds.status === 1;
        },
        _is_active_txt(){
            return this._is_active ? '禁用' : '开启';
        }
    },
    methods: {
        async change(){
            this.$set(this.loading, 'change', true);
            try {
                let {data:response} = await this.$http.put('/user_groups/' + this.ds.id, {payload: {status: !this._is_active}});
                this.$utils.async.alert(response);
            }catch(e) {}
            this.$set(this.loading, 'change', false);
            this.$emit('change');
        }
    }
}
</script>

