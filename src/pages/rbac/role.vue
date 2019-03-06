<template>
    <mxl-row-col-with-wrapper>
        <mxl-card ref="treeLoading">
            <div class="page-header mb-1">
                <mxl-btn-group>
                    <mxl-btn @click="toggle('insert', {id: -1})">添加顶级</mxl-btn>
                </mxl-btn-group>
            </div>
            <mxl-tree
                ref="tree" 
                nodeRenderName="example-slot"
                :alias="{title: v => v.name}"
                :url="api.ROLE.INDEX"
                :useCache="true"
                :spreadLevel="2"
                :async="{responseFormat: d => d.data, params: {all: 1}}">
                <mxl-list-in-line slot="example-slot" slot-scope="props">
                    <mxl-emotion-text>{{ props.treeNode.status != 1 ? '已开启' : '已关闭' }}</mxl-emotion-text>
                    <mxl-btn-group>
                        <mxl-btn @click="toggle('insert', props.treeNode)"><i class="fa fa-plus"></i></mxl-btn>
                        <mxl-btn 
                            @click="toggle('edit', props.treeNode, props.parentTreeNode)">
                            <i class="fa fa-edit"></i>
                        </mxl-btn>
                        <mxl-btn @click="del(props.treeNode)"><i class="fa fa-times"></i></mxl-btn>
                        <mxl-btn @click="refs(props.treeNode)"><i class="fa fa-user"></i></mxl-btn>
                        <mxl-btn @click="userGroupRef(props.treeNode)"><i class="fa fa-users"></i></mxl-btn>
                    </mxl-btn-group>
                </mxl-list-in-line>
            </mxl-tree>
        </mxl-card>
        <mxl-modal :show.sync="modal.store" ref="storeModal" :loading="loading.modal">
            <mxl-form-container :groups="2" ref="store">
                <mxl-input v-model="assets.parentNodeName" :disabled="true" v-if="assets.parentNodeName">上级节点名</mxl-input>
                <mxl-input v-model="dataForm.name" :rules="'required' + _rule_name"
                    :disabled="dataMode.mode === 'update'">节点名</mxl-input>
                <mxl-select :options="assets.status" v-model="dataForm.status" rules="required">状态</mxl-select>
            </mxl-form-container>
            <mxl-btn-group slot="footer">
                <mxl-btn @click="doStore">{{ dataMode.runTime.isInsert ? '添加' : '修改'}}</mxl-btn>
                <mxl-btn @click="$refs.storeModal.hide()">取消</mxl-btn>
            </mxl-btn-group>
        </mxl-modal>
        <mxl-modal :show.sync="modal.user" ref="userModal" :loading="loading.userModal">
            <mxl-row>
                <mxl-cols cols="5-2-5">
                    <mxl-table :useCheck="true" :ths="_user_ths" :url="_api_user"  :init="false" ref="userTable"></mxl-table>
                    <mxl-list-group align="center">
                        <mxl-btn @click="refStore('userTable')">&gt;</mxl-btn>
                        <mxl-btn @click="refStore('userExceptTable')">&lt;</mxl-btn>
                    </mxl-list-group>
                    <mxl-table :useCheck="true" :ths="_user_ths" :url="_api_user_except" :init="false" ref="userExceptTable"></mxl-table>
                </mxl-cols>
            </mxl-row>
        </mxl-modal>
        <mxl-modal :show.sync="modal.userGroup" ref="userGroupModal" :loading="loading.userGroupModal">
            <mxl-row>
                <mxl-cols cols="5-2-5">
                    <mxl-tree
                        ref="userGroupTree" 
                        :alias="{title: v => v.name}"
                        :url="_api_user_group"
                        :init="false"
                        :useCheck="true"
                        :useCache="true"
                        :spreadLevel="2"
                        :async="{responseFormat: d => d.data}">
                    </mxl-tree>
                </mxl-cols>
            </mxl-row>
            <mxl-btn-group slot="footer">
                <mxl-btn @click="userGroupStore">{{ '好了'}}</mxl-btn>
            </mxl-btn-group>
        </mxl-modal>
    </mxl-row-col-with-wrapper>
</template>

<script>
import {ROLE, USER_GROUP} from 'api/maxiloPhp/admin.js';
export default {
    data(){
        return {
            modal: {
                store: false,
                user: false,
                userGroup: false
            },
            ds: {
                opear_id: 0
            },
            loading: {
                modal: false,
                userModal: false,
                userGroupModal: false
            },
            assets: {
                status: [],
                parentNodeName: ''
            },
            dataForm: {},
            dataView: {},
            dataMode: null,
            api: {
                ROLE,
                USER_GROUP
            }
        };
    },
    methods: {
        async toggle(mode, treeNode, parentNode){
            await this.resetComponent(this.$refs.store);
            this.dataMode.change(mode, mode == 'insert' ? {pid : treeNode.id} : treeNode);
            this.$set(this.assets, 'parentNodeName', mode == 'insert' ? treeNode.name : parentNode.name);
            this.$set(this.modal, 'store', true);
        },
        async doStore(){
            if(await this.areaValidate(this.$refs.store)) {
                this.$refs.storeModal.$refs.loading.mxlLoadingInstance.wait(async () => {
                    let target = this.dataMode.runTime.isInsert ? 'post' : 'put';
                    await this.$utils.async.alert(await this.$http[target](this.api.ROLE.STORE, {payload: this.dataForm}));
                    this.$set(this.modal, 'store', false);
                    this.$refs.tree.refresh();
                });
            }
        },
        async del(treeNode){
            if(await this.$utils.diy.alert.confirm('将会删除当前节点及所有子节点!')) {
                await this.$utils.async.alert(await this.$http.delete(this.api.ROLE.DELETE + '/' + treeNode.id));
                this.$refs.tree.refresh();
            }
        },
        async refs(treeNode){
            this.$set(this.ds, 'opear_id', treeNode.id);
            await this.$nextTick();
            this.refRefresh();
            this.$set(this.modal, 'user', true);
        },
        async refStore(ref){
            let items = this.$refs[ref].getCheckData('id', true);
            if(items.length === 0) {
                this.$utils.diy.alert.base({text: '请至少选择一项!', icon: 'warning'});
            }else {
                if(await this.$utils.diy.alert.confirm('确认' + ((ref=='userTable')?'移除':'加入') + '?' )) {
                    this.$refs.userModal.$refs.loading.mxlLoadingInstance.wait(async () => {
                        await this.$utils.async.alert(await this.$http.put(this.api.ROLE.USER, {role_id: this.ds.opear_id, items}));
                        this.refRefresh();
                    });
                }
            }
        },
        refRefresh(){
            this.$refs.userTable.refresh();
            this.$refs.userExceptTable.refresh();
        },
        async userGroupRef(treeNode){
            this.$set(this.ds, 'opear_id', treeNode.id);
            await this.$nextTick();
            this.$refs.userGroupTree.refresh();
            this.$set(this.modal, 'userGroup', true);
        },
        async userGroupStore() {
            let items = this.$refs.userGroupTree.getChecksList('id', true, false, true);
            /* todo 生产树 再删除的时候 直观的让操作者确认要操作的项 */
            if(await this.$utils.diy.alert.confirm('确认操作?' )) {
                this.$refs.userModal.$refs.loading.mxlLoadingInstance.wait(async () => {
                    await this.$utils.async.alert(await this.$http.put(this.api.ROLE.USER_GROUP, {role_id: this.ds.opear_id, items}));
                    this.$refs.userGroupTree.refresh();
                });
            }
        }
    },
    created(){
        this.dataMode = new this.$utils.mode.data(this);
        this.dataMode.attribute = [
            'name', 'status', 'id', 'pid'
        ];
        this.dataMode.modeOmit.insert = ['id'];
    },
    computed: {
        _rule_name(){
            return this.dataMode.runTime.isInsert ? ('|existPrimary:' + this.api.ROLE.EXIST) : ''
        },
        _api_user(){
            return this.api.ROLE.INDEX + '/' + this.ds.opear_id + '/user';
        },
        _api_user_except(){
            return this._api_user + '?except=1';
        },
        _api_user_group(){
            return this.api.ROLE.INDEX + '/' + this.ds.opear_id + '/user_group';
        },
        _user_ths(){
            return [
                {field: 'id', title: 'ID'},
                {field: 'name', title: '名'}
            ]
        }
    },
    async mounted () {
        this.$http.get('/enum', {params: {group: 'common_status'}}).then(({data}) => {
            this.$set(this.assets, 'status', data.rows);
        });
    }
}
</script>




