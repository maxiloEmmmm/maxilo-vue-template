<template>
    <mxl-row-col-with-wrapper>
        <mxl-table :ths="_ths" :url="_api_user" :async="{responseFormat: d => d.data}">
            <mxl-btn-group slot="opear-slot" slot-scope="props" size="sm">
                <mxl-btn><i class="fa fa-user"></i></mxl-btn>
            </mxl-btn-group>
            <template slot="user-group-slot" slot-scope="props">
                <template v-for="group in props.view.groups">
                    <mxl-emotion-text>
                        {{ group.name }}
                    </mxl-emotion-text>&nbsp;
                </template>
                <mxl-emotion-text v-if="props.view.groups.length === 0" type="danger">暂无</mxl-emotion-text>
            </template>
            <template slot="user-role-slot" slot-scope="props">
                <template v-for="role in props.view.roles">
                    <mxl-emotion-text>
                        {{ role.name }}
                    </mxl-emotion-text>&nbsp;
                </template>
                <mxl-emotion-text v-if="props.view.roles.length === 0" type="danger">暂无</mxl-emotion-text>
            </template>
        </mxl-table>
    </mxl-row-col-with-wrapper>
</template>

<script>
    import {USER as API_USER} from 'api/maxiloPhp/admin.js';
    export default {
        computed: {
            _api_user(){
                return API_USER.INDEX;
            },
            _ths(){
                return [
                    {field: 'id', title: 'ID', sort: true},
                    {field: 'name', title: '用户名'},
                    {field: 'groups', title: '用户组', tdSlot: 'user-group-slot'},
                    {field: 'roles', title: '角色', tdSlot: 'user-role-slot'},
                    {field: 'created_at', title: '注册时间'},
                    {title: '操作', tdSlot: 'opear-slot'}
                ]
            }
        }
    };
</script>