<template>
    <mxl-list-in-line>
        <mxl-emotion-text>{{ _status }}</mxl-emotion-text>

        <mxl-btn-group size="xs">
            <mxl-btn @click="$emit('add')">新增</mxl-btn>
            <mxl-btn @click="$emit('change')">修改</mxl-btn>
            <mxl-btn @click="$emit('del')">删除</mxl-btn>
            <mxl-btn @click="$emit('managerRole', $refs.roleLoading)">
                划分角色
                <mxl-loading :block="false" size="xs" ref="roleLoading"></mxl-loading>
            </mxl-btn>
        </mxl-btn-group>
    </mxl-list-in-line>
</template>

<script>
export default {
    props: {
        status: {
            type: Number
        }
    },
    computed: {
        _status(){
            return (this.status == 1 ? '已' : '未') + '开启';
        }
    }
}
</script>



