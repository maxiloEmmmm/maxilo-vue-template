<template>
    <mxl-btn-group size="xs">
        <mxl-btn @click="change">{{ _is_active_txt }}</mxl-btn>
        <mxl-btn @click="$emit('managerUser', ds)">划分用户</mxl-btn>
    </mxl-btn-group>
</template>

<script>
export default {
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
            this.$utils.async.normalNotice(await this.$http.post('/rbac/roleGroups/' + this.ds.id + '/change', {s: !this._is_active}));
            this.$emit('change');
        }
    }
}
</script>

