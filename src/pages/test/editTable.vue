<template>
    <table border="1">
        <thead>
            <tr>
                <th v-for="(th, i) in _ths" :key="i">{{th.label}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="i in tr_num" :key="i">
                <td contenteditable="true" @keyup="change(i-1, th.key, $event)" v-for="(th, j) in _ths" :key="'td'+j"></td>
            </tr>
            <tr>
                <td :colspan="_th_len" style="text-align:center">
                    <mxl-btn @click="add">+</mxl-btn>
                    <mxl-btn @click="output">o</mxl-btn>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data(){
        return {
            tr_num: 0,
            data: []
        }
    },
    props: {
        ths: {
            default(){
                return [
                    {label: '姓名', key: 'name'},
                    {label: '入职日期', key: 'created_at'}
                ];
            }
        }
    },
    computed: {
        _th_len(){
            return this.ths.length;
        },
        _ths(){
            return this.ths;
        }
    },
    methods: {
        add(){
            let tmp = {};
            this.ths.forEach(v => {
                tmp[v.key] = '';
            });
            this.$set(this.data, this.tr_num, tmp);
            this.tr_num++;
        },
        change(row, key, e){
            this.$set(this.data[row], key, e.srcElement.innerText);
        },
        output(){
            console.log(JSON.stringify(this.data));
        }
    }
}
</script>
