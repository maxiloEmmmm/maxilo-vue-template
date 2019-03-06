<template>
    <mxl-row-col-with-wrapper>
        <div class="page-header mb-1">
            <mxl-btn-group>
                <mxl-btn @click="toggle('insert', {id: -1})">添加顶级</mxl-btn>
            </mxl-btn-group>
        </div>
        <mxl-tree
            :data="ds.tree" 
            ref="tree" 
            nodeRenderName="example-slot"
            :alias="{title: v => v.name}"
            :url="api.INDEX"
            :async="{responseFormat: d => d.data.rows}">
            <mxl-list-in-line slot="example-slot" slot-scope="props">
                <mxl-emotion-text>{{ props.treeNode.status != 1 ? '已开启' : '已关闭' }}</mxl-emotion-text>
                <mxl-btn-group>
                    <mxl-btn @click="toggle('insert', props.treeNode)"><i class="fa fa-plus"></i></mxl-btn>
                    <mxl-btn 
                        @click="toggle('edit', props.treeNode, props.parentTreeNode)">
                        <i class="fa fa-edit"></i>
                    </mxl-btn>
                    <mxl-btn @click="del(props.treeNode)"><i class="fa fa-times"></i></mxl-btn>
                </mxl-btn-group>
            </mxl-list-in-line>
        </mxl-tree>
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
    </mxl-row-col-with-wrapper>
</template>

<script>
import {USER_GROUP as API} from 'api/maxiloPhp/admin.js';
export default {
    data(){
        return {
            modal: {
                store: false
            },
            ds: {
                opear_id: 0
            },
            loading: {
                modal: false
            },
            assets: {
                status: [],
                parentNodeName: ''
            },
            dataForm: {},
            dataView: {},
            dataMode: null,
            api: API,
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
                    await this.$utils.async.alert(await this.$http[target](this.api.STORE, {payload: this.dataForm}));
                    this.$set(this.modal, 'store', false);
                    this.$refs.tree.refresh();
                });
            }
        },
        async del(treeNode){
            if(await this.$utils.diy.alert.confirm('将会删除当前节点及所有子节点!')) {
                await this.$utils.async.alert(await this.$http.delete(this.api.DELETE + '/' + treeNode.id));
                this.$refs.tree.refresh();
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
            return this.dataMode.runTime.isInsert ? ('|existPrimary:' + this.api.EXIST) : ''
        }
    },
    async mounted () {
        this.$http.get('/enum', {params: {group: 'common_status'}}).then(({data}) => {
            this.$set(this.assets, 'status', data.rows);
        });
    }
}
</script>




