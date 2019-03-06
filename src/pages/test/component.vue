<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <form>
                    <tree 
                        :data="dsTree" 
                        :useCheck="true"
                        :rightMenu="rightMenu"
                        @touch="touch"
                        :spreadLevel="0"></tree>
                    <mxl-table :ths="ths" url="/rbac" ref="table" :async="{responseFormat: v => v.data}">
                        <span slot="thIdSlot" slot-scope="slotProps">
                            <i class="fa fa-times"></i>{{ slotProps.th.title }}
                        </span>
                        <span slot="thUuidSlot" slot-scope="slotProps">
                            <i class="fa fa-clock"></i>{{ slotProps.th.title }}
                        </span>
                        <span slot="name" slot-scope="slotProps">
                            <mxl-btn-group size="xs">
                                <mxl-btn>更新</mxl-btn>
                                <mxl-btn>删除</mxl-btn>
                                <mxl-btn>新增</mxl-btn>
                                <mxl-btn>查看自用户</mxl-btn>
                            </mxl-btn-group>
                        </span>
                    </mxl-table>
                    <button type="button" @click="test">123123</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
    .mxl-tree-first-item table thead{
        display: table-header-group !important;
    }
</style>


<script>
import {MANAGE} from 'api/maxiloPhp/service';
import treeViewTest from 'components/treeViewTest.vue';
export default {
    data(){
        return {
            ds: [],
            dsTree: [],
            rightMenu: {
                '世界第我记得我': function(){alert(1)},
                q: function(n){console.log(n);}
            },
            d: {},
            t: {},
            f: '',
            c: []
        };
    },
    methods: {
        test(){
            console.log(this.$refs.table.getCheckData(['name']));
        },
        touch(d, data, ds){
            console.log(d, data, ds);
        },
        itemRender(h, d){
            let self = this;
            let instance = d.instance;
            d = d.ds;
            return h(treeViewTest, {
                props: {
                    value: self.d[d['id']]
                },
                on: {
                    input: function(v) {
                        self.$set(self.d, d['id'], v);
                        //self.$utils.treeTableEdit.number(self, instance);
                    }
                }
            });
        }
    },
    computed: {
        ths(){
            return [
                {field: 'id', title: 'ID', thSlot: 'thIdSlot', sort: true},
                {field: 'name', title: 'uuID', hide: true, thSlot: 'thUuidSlot'},
                {title: 'opear', tdSlot: 'name'}
            ];
        }
    },
    async created(){
        let { data:dataTree } = await this.$http.get(MANAGE.TREE);
        this.dsTree = dataTree.tree;
        let {data} = await this.$http.get('/rbac');
        this.ds = data.data.rows;
    },
}
</script>




