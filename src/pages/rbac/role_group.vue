<template>
    <div class="container-fluid">
        <mxl-row-col>
            <mxl-panel>
                <div class="page-header" v-if="!loading.tree">
                    <mxl-btn-group>
                        <mxl-btn @click="toggleAdd({id: 1})">添加顶级</mxl-btn>
                    </mxl-btn-group>
                </div>
                <mxl-tree
                    v-if="_hasRoleGroup"
                    :data="ds.tree" 
                    ref="tree" 
                    :itemRender="itemRender"
                    :alias="{title: v => v.name}"
                    :rightMenu="{
                        '添加': toggleAdd,
                    }">
                </mxl-tree>
                <mxl-loading ref="treeLoading" v-model="loading.tree">123</mxl-loading>
            </mxl-panel>
            <mxl-modal :show.sync="modal.store" ref="storeModal">
                <mxl-form-container :groups="2" ref="store">
                    <mxl-input v-model="assets.parentNodeName" :disabled="true">上级角色组名</mxl-input>
                    <mxl-input v-model="dataForm.name" :rules="'required|existPrimary:' + api.EXIST"
                        :disabled="dataMode.mode === 'update'">角色组名</mxl-input>
                    <mxl-select :options="assets.status" v-model="dataForm.status" rules="required">状态</mxl-select>
                </mxl-form-container>
                <mxl-btn-group slot="footer">
                    <mxl-btn @click="doStore">添加</mxl-btn>
                    <mxl-btn @click="$refs.storeModal.hide()">取消</mxl-btn>
                </mxl-btn-group>
            </mxl-modal>
            <mxl-modal :show.sync="modal.userGroup" ref="userGroupModal">
                <mxl-panel>
                    <mxl-table :ths="_ths" :url="user_api" ref="userDs" :init="false">
                    </mxl-table>
                    <mxl-btn-group slot="footer" class="pull-right">
                        <mxl-btn @click="doChooseSome">确定</mxl-btn>
                        <mxl-btn @click="$refs.userGroupModal.hide()">取消</mxl-btn>
                    </mxl-btn-group>
                </mxl-panel>
            </mxl-modal>
        </mxl-row-col>
    </div>
</template>

<script>
import {ROLE_GROUP} from 'api/maxiloPhp/rbac';
import insertUpdate from 'test/insertUpdate';
import roleGroupSection from './role_group_section';
export default {
    data(){
        return {
            modal: {
                store: false,
                userGroup: false
            },
            ds: {
                tree: [],
                role_group_opear_id: 0
            },
            loading: {
                tree: false
            },
            assets: {
                status: [
                    {label: '开启', value: 1},
                    {label: '未开启', value: 2},
                ],
                parentNodeName: ''
            },
            dataForm: {},
            dataView: {},
            dataMode: null,
            api: ROLE_GROUP,
        };
    },
    methods: {
        async toggleAdd(treeNode, parentNode){
            await this.resetComponent(this.$refs.store);
            this.dataMode.change('insert', {pid : treeNode.id});
            this.$set(this.assets, 'parentNodeName', parentNode ? parentNode.name : '');
            this.$set(this.modal, 'store', true);
        },
        async doStore(){
            if(await this.areaValidate(this.$refs.store)) {
                await this.$utils.async.normalNotice(await this.$http.post(ROLE_GROUP.STORE, this.dataForm));
                this.getRoleGroup();
                this.$set(this.modal, 'store', false);
            }
        },
        async getRoleGroup(){
            await this.$refs.treeLoading.wait(async () =>{
                let {data} = await this.$http.get(ROLE_GROUP.INDEX);
                this.$set(this.ds, 'tree', data);
            });
        },
        itemRender(h, d){
            return h(roleGroupSection, {
                props: {
                    ds: d.treeNode
                },
                on: {
                    managerUser: this.toggleUser,
                    change: this.getRoleGroup
                }
            });
        },
        async toggleUser(treeNode){
            this.$set(this.ds, 'role_group_opear_id', treeNode.id);
            await this.refreshUser();
            this.$set(this.modal, 'userGroup', true);
        },
        async doChooseSome(){
            if(await this.$utils.diy.alert.confirm('确定给他们换上厚厚的马甲?')) {
                await this.$utils.async.normalNotice(await this.$http.post(
                        '/rbac/roleGroups/' + this.ds.role_group_opear_id + '/users/change', 
                        {users: this.$refs.userDs.getCheckData('id', true)}
                    )
                );
                await this.refreshUser();
            }
        },
        async refreshUser(){
            await this.$nextTick();
            console.log(this.$refs);
            this.$refs.userDs.refresh();
        }
    },
    computed: {
        _hasRoleGroup(){
            return this.ds.tree.length != 0;
        },
        _ths(){
            return [
                {field: 'id', title: 'ID', sort: true},
                {field: 'username', title: '用户名', width: '80%'},
            ];
        },
        user_api(){
            return '/rbac/roleGroups/' + this.ds.role_group_opear_id + '/users';
        }
    },
    created(){
        this.dataMode = new insertUpdate(this);
        this.dataMode.attribute = [
            'name', 'status', 'id', 'pid'
        ];
        this.dataMode.modeOmit.insert = ['id'];
    },
    async mounted () {
        this.getRoleGroup();
    },
}
</script>




