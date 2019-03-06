<template>
    <mxl-row-col-with-wrapper>
        <div class="page-header mb-1">
            <mxl-btn @click="toStore">添加</mxl-btn>
        </div>
        <mxl-table ref="table" :ths="_ths" :url="_api.INDEX" :async="{responseFormat: d => d.data}">
            <span slot="id-slot" slot-scope="props">{{ props.index+1 }}</span>
            <mxl-btn-group slot="opear-slot" slot-scope="props">
                <mxl-btn @click="toEdit(props.view)">修改</mxl-btn>
                <mxl-btn @click="toView(props.view)">内容</mxl-btn>
                <mxl-btn @click="del(props.view.id)">删除</mxl-btn>
            </mxl-btn-group>
        </mxl-table>
        <mxl-modal :show.sync="modal.store" ref="storeModal" :loading="loading.store">
            <mxl-form-container :groups="1" ref="store">
                <mxl-input v-model="dataForm.title" :rules="'required|existPrimary:'+_api.EXIST"
                    :disabled="dataMode.mode === 'update'">文章名</mxl-input>
                <mxl-editor v-model="dataForm.content" height="200px">内容</mxl-editor>
            </mxl-form-container>
            <mxl-btn-group slot="footer">
                <mxl-btn @click="doStore">{{ dataMode.runTime.isInsert ? '添加' : '修改'}}</mxl-btn>
                <mxl-btn @click="$refs.storeModal.hide()">取消</mxl-btn>
            </mxl-btn-group>  
        </mxl-modal> 
        <mxl-modal :show.sync="modal.view" ref="viewModal" :loading="loading.view">
            <h4 slot="header">{{ ds.post.title }}</h4>
            <p v-html="ds.post.content"></p>
            <mxl-btn-group slot="footer">
                <mxl-btn @click="$refs.viewModal.hide()">关</mxl-btn>
            </mxl-btn-group>  
        </mxl-modal>                                                                                           
    </mxl-row-col-with-wrapper>  
</template>  

<script>
    import {POST} from 'api/maxiloPhp/admin.js';
    export default {
        data(){
            return {
                modal: {
                    view: false
                },
                loading: {
                    view: false
                },
                ds: {
                    post: {}
                },
                dataForm: {},
                dataMode: {}
            }
        },
        created() {
            this.dataMode = new this.$utils.mode.data(this);
            this.dataMode.attribute = [
                'title', 'id', 'content'
            ];
            this.dataMode.modeOmit.store = ['id'];
        },
        computed: {
            _api(){
                return POST;
            },
            _ths(){
                return [
                    {title: 'ID', tdSlot: 'id-slot'},
                    {field: 'title', title: '文章名'},
                    {title: '操作', tdSlot: 'opear-slot'}
                ]
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
            toView(post) {
                this.$set(this.ds, 'post', post);
                this.$set(this.modal, 'view', true)
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