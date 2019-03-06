<template>
    <mxl-row-col-with-wrapper>
        <div class="page-header mb-1">
            <mxl-btn @click="toStore">添加</mxl-btn>
        </div>
        <mxl-table ref="table" :ths="_ths" :url="_api.INDEX" :async="{responseFormat: d => d.data}">
            <span slot="id-slot" slot-scope="props">{{ props.index+1 }}</span>
            <mxl-btn-group slot="opear-slot" slot-scope="props">
                <mxl-btn @click="toEdit(props.view)">修改</mxl-btn>
                <mxl-btn @click="del(props.view.id)">删除</mxl-btn>
                <mxl-btn @click="toTable(props.view)">分配权限</mxl-btn>
            </mxl-btn-group>
        </mxl-table>
        <mxl-modal :show.sync="modal.store" ref="storeModal" :loading="loading.store">
            <mxl-form-container :groups="2" ref="store">
                <mxl-input v-model="dataForm.name" :rules="'required|existPrimary:'+_api.EXIST"
                    :disabled="dataMode.mode === 'update'">行为名</mxl-input>
            </mxl-form-container>
            <mxl-btn-group slot="footer">
                <mxl-btn @click="doStore">{{ dataMode.runTime.isInsert ? '添加' : '修改'}}</mxl-btn>
                <mxl-btn @click="$refs.storeModal.hide()">取消</mxl-btn>
            </mxl-btn-group>  
        </mxl-modal> 
        <mxl-modal :show.sync="modal.permissionTable" ref="permissionTableModal" :loading="loading.permissionTable">
            <span slot="header">分配行为 `{{ ds.action.name }}` 表</span>
            <mxl-row-col v-show="!ds.tableGeneral">
                <mxl-btn @click="toAddTable()">添加管理表</mxl-btn>
                <mxl-table :init="false" :useCheck="true" ref="permissionTable" :ths="_ths" :url="_api.PERMISSION_TABLE + '/' + ds.action.id" :async="{responseFormat: d => d.data}">
                    <span slot="id-slot" slot-scope="props">{{ props.index+1 }}</span>
                    <mxl-btn-group slot="opear-slot" slot-scope="props">
                        <mxl-btn @click="toTableField(props.view)">分配字段</mxl-btn>
                    </mxl-btn-group>
                </mxl-table> 
            </mxl-row-col>
            <mxl-row-col v-show="ds.tableGeneral">
                <mxl-table :init="false" :useCheck="true" ref="permissionTableGeneral" :ths="_ths_no_opear" :url="_api.PERMISSION_TABLE_GENERAL" :async="{responseFormat: d => d.data, params: {action_id: ds.action.id}}">
                    <span slot="id-slot" slot-scope="props">{{ props.index+1 }}</span>
                </mxl-table> 
                <mxl-btn @click="doAddTable">变更</mxl-btn>
            </mxl-row-col>
        </mxl-modal>  
        <mxl-modal :show.sync="modal.permissionTableField" ref="permissionTableFieldModal" :loading="loading.permissionTableField">
            <span slot="header">分配行为 `{{ ds.action.name }}` 的 `{{ ds.table.name }}` 表的字段</span>
            <mxl-btn @click="toAddTableField()">添加管理字段</mxl-btn>
            <mxl-table :init="false" :useCheck="true" ref="permissionTableField" :ths="_ths" :url="_api.PERMISSION_TABLE_FIELD + '/' + ds.action.id + '/' + ds.table.id" :async="{responseFormat: d => d.data}">
                <span slot="id-slot" slot-scope="props">{{ props.index+1 }}</span>
            </mxl-table>  
        </mxl-modal>                                                                                         
    </mxl-row-col-with-wrapper>  
</template>  

<script>
    import {FIELD_ACTION} from 'api/maxiloPhp/admin.js';
    export default {
        data(){
            return {
                modal: {
                    store: false,
                    permissionTable: false,
                    permissionTableField: false
                },
                loading: {
                    store: false,
                    permissionTable: false,
                    permissionTableField: false
                },
                ds: {
                    action: {},
                    table: {},
                    tableGeneral: false
                },
                dataForm: {},
                dataMode: {}
            }
        },
        created() {
            this.dataMode = new this.$utils.mode.data(this);
            this.dataMode.attribute = [
                'name', 'id'
            ];
            this.dataMode.modeOmit.insert = ['id'];
        },
        computed: {
            _api(){
                return FIELD_ACTION;
            },
            _ths(){
                return [
                    {title: 'ID', tdSlot: 'id-slot'},
                    {field: 'name', title: '名'},
                    {title: '操作', tdSlot: 'opear-slot'}
                ]
            },
            _ths_no_opear(){
                return this._ths.slice(0, 2);
            }
        },
        methods: {
            toStore(){
                this.dataMode.change('store');
                this.$set(this.modal, 'store', true);
            },
            toEdit(ds){
                this.dataMode.change('edit', ds);
                this.$set(this.modal, 'store', true);
            },
            async toTable(action){
                this.$set(this.ds, 'action', action);
                await this.$nextTick();
                this.$refs.permissionTable.refresh();
                this.$set(this.modal, 'permissionTable', true);
            },
            async toTableField(table){
                this.$set(this.ds, 'table', table);
                await this.$nextTick();
                this.$set(this.ds, 'permissionTableField', true);
            },
            toAddTable(){
                this.$set(this.ds, 'tableGeneral', true);
                this.$refs.permissionTableGeneral.refresh();
            },
            async doAddTable(){
                let items = this.$refs.permissionTableGeneral.getCheckData('name', true);
                /* todo 生产树 再删除的时候 直观的让操作者确认要操作的项 */
                if(await this.$utils.diy.alert.confirm('确认操作?' )) {
                    this.$refs.permissionTableModal.$refs.loading.mxlLoadingInstance.wait(async () => {
                        await this.$utils.async.alert(await this.$http.put(this._api.PERMISSION_TABLE_STORE, {action_id: this.ds.action.id, items}));
                        this.$refs.permissionTable.refresh();
                        this.$set(this.ds, 'tableGeneral', false);
                    });
                }
            },
            toAddTableField(){

            },
            async doStore(){
                if(await this.areaValidate(this.$refs.store)) {
                    this.$refs.storeModal.$refs.loading.mxlLoadingInstance.wait(async () => {
                        let target = this.dataMode.runTime.isStore ? 'post' : 'put';
                        await this.$utils.async.alert(await this.$http[target](this._api.STORE, {payload: this.dataForm}));
                        this.$set(this.modal, 'store', false);
                        this.$refs.table.refresh();
                    });
                }
            },
            async del(id){
                if(await this.$utils.diy.alert.confirm('将会删除!')) {
                    await this.$utils.async.alert(await this.$http.delete(this._api.DELETE + '/' + id));
                    this.$refs.table.refresh();
                }
            }
        }
    };
</script>