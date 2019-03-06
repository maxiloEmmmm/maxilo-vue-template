<template>
    <div class="container-fluid">
        <mxl-row-col>
            <mxl-inline-form>
                <mxl-list-in-line>
                    <mxl-inline-form-group>
                        <mxl-select :options="[{label: '男生', value: 1}, {label: '女生', value: 2}]" @change="test" v-model="hi" placeholder="请输入">性别</mxl-select>
                    </mxl-inline-form-group>
                </mxl-list-in-line>
            </mxl-inline-form>
            <mxl-table :ths="ths" :url="api" toolColWidth="10%" ref="table"></mxl-table>
        </mxl-row-col>
    </div>
</template>


<script>
export default {
    data(){
        return {
            hi: null,
            ths: [
                {field: 'id', title: 'ID'},
                {field: 'name', title: '学生Ming', },
                {field: 'sex', title: '性别', }
            ],
        }
    },
    computed: {
        api(){
            return '/students?sex=' + this.hi;
        }
    },
    methods: {
        async test(){
            await this.$nextTick();
            this.$refs.table.refresh();
        }
    },
    mounted () {
        let textMaskCore = require('text-mask-core')
        console.log(textMaskCore, textMaskCore.conformToMask('', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/], {guide: true}));
    }
}
</script>
