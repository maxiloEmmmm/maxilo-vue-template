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
                    v-if="_hasMenu"
                    :data="ds.menu" 
                    ref="tree" 
                    :itemRender="itemRender"
                    :alias="{title: v => v.name}">
                </mxl-tree>
                <mxl-loading ref="treeLoading" v-model="loading.tree">123</mxl-loading>
            </mxl-panel>
            <mxl-modal :show.sync="modal.store" ref="storeModal">
                <mxl-form-container :groups="2" ref="store">
                    <mxl-input v-model="assets.parentNodeName" :disabled="true">上级菜单名</mxl-input>
                    <mxl-input v-model="dataForm.name" :rules="'required'">菜单名</mxl-input>
                    <mxl-select :options="assets.status" v-model="dataForm.status" rules="required">状态</mxl-select>
                </mxl-form-container>
                <mxl-btn-group slot="footer">
                    <mxl-btn @click="doStore">添加</mxl-btn>
                    <mxl-btn @click="$refs.storeModal.hide()">取消</mxl-btn>
                </mxl-btn-group>
            </mxl-modal>
            <mxl-modal :show.sync="modal.role" ref="roleModal">
                <mxl-panel>
                    <mxl-tree :data="ds.role" ref="roleDs" :alias="{title: v => v.name}" :useCheck="true">
                    </mxl-tree>
                    <mxl-btn-group slot="footer" class="pull-right">
                        <mxl-btn @click="doChooseSome">确定</mxl-btn>
                        <mxl-btn @click="$refs.roleModal.hide()">取消</mxl-btn>
                    </mxl-btn-group>
                </mxl-panel>
            </mxl-modal>
        </mxl-row-col>
    </div>
</template>

<script>
import {ROLE} from 'api/maxiloPhp/rbac';
import {MENU} from 'api/maxiloPhp/admin';
import menuSection from './menu_section';
export default {
    data(){
        return {
            modal: {
                store: false,
                role: false
            },
            ds: {
                menu: [],
                role: [],
                menu_opear_id: 0
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
            api: { 
                MENU,
                ROLE
            }
        };
    },
    methods: {
        async toggleAdd(treeNode){
            await this.resetComponent(this.$refs.store);
            this.dataMode.change('insert', {pid : treeNode.id});
            this.$set(this.assets, 'parentNodeName', treeNode.name);
            this.$set(this.modal, 'store', true);
        },
        async toggleUpdate(treeNode, parentTreeNode){
            await this.resetComponent(this.$refs.store);
            this.dataMode.change('update', treeNode);
            console.log(parentTreeNode);
            this.$set(this.assets, 'parentNodeName', parentTreeNode.name ? parentTreeNode.name : '');
            this.$set(this.modal, 'store', true);
        },
        async doStore(){
            if(await this.areaValidate(this.$refs.store)) {
                await this.$utils.async.normalNotice(await this.$http.post(this.api.MENU.STORE, this.dataForm));
                this.getMenu();
                this.$set(this.modal, 'store', false);
            }
        },
        async getMenu(){
            await this.$refs.treeLoading.wait(async () =>{
                let {data} = await this.$http.get(this.api.MENU.INDEX);
                this.$set(this.ds, 'menu', data);
            });
        },
        itemRender(h, d){
            return h(menuSection, {
                props: {
                    status: d.treeNode.status
                },
                on: {
                    managerRole: (loading) => this.toggleRole(d.treeNode, loading),
                    change: () => this.toggleUpdate(d.treeNode, d.parentTreeNode),
                    add: () => this.toggleAdd(d.treeNode),
                    del: () => this.doDel(d.treeNode)
                }
            });
        },
        async doDel(treeNode){
            if(await this.$utils.diy.alert.confirm((treeNode.hasChild ? '其下菜单将会全部删除, ' : '') + '确认删除?')) {
                    await this.$http.delete(this.api.MENU.DELETE + '/' + treeNode.id);
                    this.$utils.diy.alert.base('删除成功');
                    this.getMenu();
            }
        },
        async toggleRole(treeNode, loading){
            this.$set(this.ds, 'menu_opear_id', treeNode.id);
            await loading.wait(async () => {
                await this.refreshRole();
            });
            this.$set(this.modal, 'role', true);
        },
        async doChooseSome(){
            this.$utils.diy.alert.confirm(
                '确定给他们换上厚厚的马甲?',
                async (ds) => {
                    await this.$utils.async.normalNotice(await this.$http.post(
                            '/menus/' + this.ds.menu_opear_id + '/roles/change', 
                            {roles: this.$refs.roleDs.getChecksList('id', true)}
                        )
                    );
                    await this.refreshRole();
                }
            );
        },
        async refreshRole(){
            await this.$nextTick();
            let {data} = await this.$http.get(this.api.ROLE.INDEX + '?active=1');
            this.$set(this.ds, 'role', data);
            let {data:role} =  await this.$http.get('/menus/' + this.ds.menu_opear_id + '/roles');
            this.$refs.roleDs.setCheck(role.map(v => v.role_id));
        }
    },
    computed: {
        _hasMenu(){
            return this.ds.menu.length != 0;
        }
    },
    created(){
        this.dataMode = new this.$utils.mode.data(this);
        this.dataMode.attribute = [
            'name', 'status', 'id', 'pid'
        ];
        this.dataMode.modeOmit.insert = ['id'];
        this.$utils.diy.alert.base('删除成功');
        setTimeout(() => {
            this.$utils.diy.alert.base('删除成功');
        }, 5000)
    },
    async mounted () {
        this.getMenu();
    },
}
</script>




