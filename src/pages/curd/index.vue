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
                <mxl-btn @click="toPermission(props.view)">权限</mxl-btn>
            </mxl-btn-group>
        </mxl-table>
        <mxl-modal :show.sync="modal.store" ref="storeModal" :loading="loading.store">
            <mxl-form-container :groups="1" ref="store">
                <mxl-input v-model="dataForm.model_name" :rules="'required'">模型空间名</mxl-input>
            </mxl-form-container>
            <mxl-btn-group slot="footer">
                <mxl-btn @click="doStore">{{ dataMode.runTime.isInsert ? '添加' : '修改'}}</mxl-btn>
                <mxl-btn @click="$refs.storeModal.hide()">取消</mxl-btn>
            </mxl-btn-group>  
        </mxl-modal> 
        <mxl-modal :show.sync="modal.permission" ref="permissionModal" :loading="loading.permission">
            <h4 slot="header">{{ ds.curd.model_name }}</h4>
            <mxl-row>
                <mxl-cols cols="5-7">
                    <mxl-tree 
                        :url="_api.ROLE"
                        ref="roleTree" 
                        :alias="{title: v => v.name}"
                        :useCache="true"
                        :spreadLevel="2"
                        @touch="toFieldPermission"
                        :init="false"
                        nodeRenderName="example-slot"
                        :async="{responseFormat: d => d.data, params: {cid: ds.curd.id}}">
                        <template slot="example-slot" slot-scope="props">
                            <mxl-emotion-text style="cursor:pointer" @click="toggle(props.treeNode, 'c')" :type="props.treeNode.curd_items && props.treeNode.curd_items.c ? 'success' : 'secondary'">C</mxl-emotion-text>
                            <mxl-emotion-text style="cursor:pointer" @click="toggle(props.treeNode, 'u')" :type="props.treeNode.curd_items && props.treeNode.curd_items.u ? 'success' : 'secondary'">U</mxl-emotion-text>
                            <mxl-emotion-text style="cursor:pointer" @click="toggle(props.treeNode, 'r')" :type="props.treeNode.curd_items && props.treeNode.curd_items.r ? 'success' : 'secondary'">R</mxl-emotion-text>
                            <mxl-emotion-text style="cursor:pointer" @click="toggle(props.treeNode, 'd')" :type="props.treeNode.curd_items && props.treeNode.curd_items.d ? 'success' : 'secondary'">D</mxl-emotion-text>
                        </template>
                    </mxl-tree>
                    <mxl-row-col v-if="ds.node">
                        <mxl-list-in-line>
                            <mxl-select :options="[{label: 'C', value: 'c'}, {label: 'U', value: 'u'}, {label: 'R', value: 'r'}]" v-model="ds.fieldOpear"></mxl-select>
                            <mxl-btn-group>
                                <mxl-btn @click="fieldToggles">+</mxl-btn>
                                <mxl-btn @click="fieldToggles(false)" type="danger">-</mxl-btn>
                            </mxl-btn-group>
                        </mxl-list-in-line>
                        <mxl-table 
                            :url="_api_schema_field" 
                            ref="fieldTable"
                            :ths="_field_ths"
                            :useCheck="true"
                            :async="{responseFormat: d => d.data}" :init="false">
                            <mxl-btn-group slot="status-slot" slot-scope="props">
                                <mxl-btn @click="fieldToggle(props.view.name, 'c')" v-if="ds.node.curd_items && ds.node.curd_items.c" :type="ds.node.curd_items.c_field.includes(props.view.name) ? 'success' : 'secondary'">C {{ ds.node.curd_items.c_field.includes(props.view.name) ? '开启' : '关闭' }}</mxl-btn>
                                <mxl-btn @click="fieldToggle(props.view.name, 'u')" v-if="ds.node.curd_items && ds.node.curd_items.u" :type="ds.node.curd_items.u_field.includes(props.view.name) ? 'success' : 'secondary'">U {{ ds.node.curd_items.u_field.includes(props.view.name) ? '开启' : '关闭' }}</mxl-btn>
                                <mxl-btn @click="fieldToggle(props.view.name, 'r')" v-if="ds.node.curd_items && ds.node.curd_items.r" :type="ds.node.curd_items.r_field.includes(props.view.name) ? 'success' : 'secondary'">R {{ ds.node.curd_items.r_field.includes(props.view.name) ? '开启' : '关闭' }}</mxl-btn>
                            </mxl-btn-group>
                        </mxl-table>
                    </mxl-row-col>
                </mxl-cols>
            </mxl-row>
            <mxl-btn-group slot="footer">
                <mxl-btn @click="$refs.viewModal.hide()">关</mxl-btn>
            </mxl-btn-group>  
        </mxl-modal>                                                                                           
    </mxl-row-col-with-wrapper>  
</template>  

<script>
    import {CURD, ROLE, SCHEMA} from 'api/maxiloPhp/admin.js';
    export default {
        data(){
            return {
                modal: {
                    permission: false,
                    store: false
                },
                loading: {
                    permission: false,
                    store: false
                },
                ds: {
                    curd: {},
                    node: null,
                    fieldOpear: ''
                },
                dataForm: {},
                dataMode: {}
            }
        },
        created() {
            this.dataMode = new this.$utils.mode.data(this);
            this.dataMode.attribute = [
                'model_name', 'id', 'content'
            ];
            this.dataMode.modeOmit.store = ['id'];
        },
        computed: {
            _api(){
                return CURD;
            },
            _api_role(){
                return ROLE;
            },
            _api_schema_field(){
                return SCHEMA.FIELD + '/' + encodeURIComponent(this.ds.curd.model_name);
            },
            _ths(){
                return [
                    {title: 'ID', tdSlot: 'id-slot'},
                    {field: 'model_name', title: '模型空间名'},
                    {title: '操作', tdSlot: 'opear-slot'}
                ]
            },
            _field_ths(){
                return [
                    {title: '字段', field: 'name'},
                    {title: '状态', tdSlot: 'status-slot'}
                ];
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
            },
            async toFieldPermission(node){
                this.$set(this.ds, 'node', node);
                await this.$nextTick();
                this.$refs.fieldTable.refresh();
            },
            async toPermission(curd){
                this.$set(this.ds, 'curd', curd);
                await this.$nextTick();
                this.$refs.roleTree.refresh();
                this.$set(this.modal, 'permission', true);
            },
            async toggle(node, action){
                let isInit = !!node.curd_items;
                let isOpen = isInit ? !!node.curd_items[action] : false;
                this.putCurdPriv('确认「' + (isOpen ? '关闭' : '开启') + {
                    c: '创建',
                    u: '更新',
                    r: '浏览',
                    d: '删除'
                }[action] + '」 ?', {
                    [action]: !isOpen ? 1 : 0, 
                    curd_item_id: this.ds.curd.id, 
                    role_id: node.id, 
                    id: isInit ? node.curd_items.id : 0
                });
            },
            fieldToggle(field, action){
                let ds = this.$utils._.cloneDeep(this.ds.node.curd_items[action+'_field']);
                let exist = true;
                if(ds.includes(field)) {
                    ds = ds.filter(v => v!=field);
                }else {
                    exist = false;
                    ds.push(field);
                }
                this.putCurdPriv('确认' + (exist ? '移除' : '添加') + '「' + field + '」字段?', {
                    curd_item_id: this.ds.curd.id, 
                    role_id: this.ds.node.id, 
                    id: this.ds.node.curd_items.id,
                    [action+'_field']: ds
                });
            },
            async putCurdPriv(msg, payload){
                if(await this.$utils.diy.alert.confirm(msg)) {
                    await this.$utils.async.alert(await this.$http.put(this._api.PRIV, {
                        payload
                    }));
                    this.$refs.roleTree.refresh();
                    this.$set(this.ds, 'node', null);
                }
            },
            fieldToggles(open = true){
                if(!this.ds.fieldOpear) {
                    this.$utils.diy.alert.info('请选择要操作的行为');
                    return false;
                }

                let fields = this.$refs.fieldTable.getCheckData('name', true);
                if(fields.length == 0) {
                    this.$utils.diy.alert.info('请选择要操作的字段');
                    return false;
                }

                let ds = this.$utils._.cloneDeep(this.ds.node.curd_items[this.ds.fieldOpear+'_field']);
                if(open) {
                    fields.forEach(v => {
                        !ds.includes(v) ? ds.push(v) :'';
                    });
                }else {
                    ds = ds.filter(v => !fields.includes(v));
                }
                this.putCurdPriv('确认批量' + (open ? '开启' : '关闭') + '「' + this.ds.fieldOpear + '」操作?', {
                    curd_item_id: this.ds.curd.id, 
                    role_id: this.ds.node.id, 
                    id: this.ds.node.curd_items.id,
                    [this.ds.fieldOpear+'_field']: ds
                });
            }
        }
    };
</script>