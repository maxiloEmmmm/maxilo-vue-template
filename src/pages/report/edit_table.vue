<template>
    <!-- <table border="1" ref="core">
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
    </table> -->
    <div>
        <a-tabs defaultActiveKey="0" v-show="!report_export">
            <a-tab-pane v-for="(metedata, key, index) in mode_metedata"
                        :key="index.toString()"
                        :tab="metedata.label">
                <mxl-table tableClass="report_export_table_border" newRowBtnClass="lg-btn" :ref="'table'+key" :ths="metedata.fields" :is_edit="true">
                    <button class="lg-btn ml-2" slot="edit-area">从数据源导入</button>
                </mxl-table>
            </a-tab-pane>
        </a-tabs>
        <div v-show="report_export" style="display: flex;">
            <t-list-item style="width:75% !important;margin: 1.75em auto;align-items:start !important;">
                <div slot="left">
                    <a-upload>
                        <t-list-item-top align="center">
                            <div slot="top" class="mxl-upload-avatar-box">
                                <div class="ltrb"></div>
                                <div class="rtlb"></div>
                                <div class="info">
                                    <span>封面</span>
                                </div>
                            </div>
                            <mxl-btn class="lg-btn">上传封面图片</mxl-btn>
                        </t-list-item-top>
                    </a-upload>
                </div>
                <div style="margin-left:10px;width:100%">
                    <t-list-item>
                        <span style="font-weight: 700;padding: 0 10px;" slot="left">标题</span>
                        <a-input/>
                    </t-list-item>
                    <t-list-item>
                        <span style="font-weight: 700;padding: 0 10px;" slot="left">作者</span>
                        <a-input/>
                    </t-list-item>
                    <t-list-item class="start">
                        <span style="font-weight: 700;padding: 0 10px;" slot="left">摘要</span>
                        <a-textarea/>
                    </t-list-item>
                    <t-list-item>
                        <span style="font-weight: 700;padding: 0 10px;" slot="left">
                            查看需要密码
                            <a-checkbox/>
                        </span>
                        <a-input type="password"/>
                    </t-list-item>
                </div>
            </t-list-item>
        </div>
        <div style="display:flex;justify-content: space-between;align-items: center;">
            <div>
                <div style="color: #000;font-weight: 700;" v-show="!report_export">请完善所有的数据, 然后点击下一步</div>
            </div>
            <div>
                <mxl-btn class="lg-btn" @click="next_step" v-show="!report_export">下一步</mxl-btn>
                <div v-show="report_export" class="export-wrapper">
                    <mxl-btn class="lg-btn" @click="return_step">上一步</mxl-btn>
                    <mxl-btn class="lg-btn" @click="return_step"><a-li-font icon="bofang"></a-li-font> 预览</mxl-btn>
                    <mxl-btn class="lg-btn" @click="end"><a-li-font icon="fabu"></a-li-font> 发布</mxl-btn>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    data(){
        return {
            tr_num: 0,
            data: [],
            ths: [],
            instance: null,
            dataGridLib: null,
            mode_metedata: {},
            report_export: false
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
        next_step(){
            this.report_export = true;
            
        },
        end(){
            let data = {};
            Object.keys(this.mode_metedata).forEach(v => {
                data[v] = this.$refs['table'+v][0].getData();
            });
            this.$emit('end', data);
        },
        addMode(mode_key, metedata){
            this.$set(this.mode_metedata, mode_key, metedata);
        },
        init(){
        },
        setData(data){
        },
        return_step(){
            this.report_export = false;
        }
    },
    async mounted(){
    }
}
</script>

<style lang="scss">
    @mixin lg_border {
        border: 3px solid #000;
    }
    .report_export_table_border {
        @include lg_border;
        .alert-info {
            color: #fff;
            font-weight: 700;
            background-color: #000;
            border-color: #000;
        }
    }
    .mxl-upload-avatar-box {
        position: relative;
        @include lg_border;
        height: 124px;
        width: 130px;
        margin-bottom: 11px;
        .ltrb, .rtlb {
            width: 150px;
            height: 3px;
            background: #000;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
        }
        .ltrb {
            transform: rotate(43deg) translateY(49px) translateX(27px);
        }
        .rtlb {
            transform: rotate(137deg) translateY(-34px) translateX(46px);
        }
        .info {
            display: flex;
            justify-content: center;
            height: 100%;
            z-index:2;
            position: relative;
            span {
                margin: auto;
                width: 48px;
                text-align: center;
                border: 1px solid #cecece;
                border-radius: 4px;
                background: #fff;
                opacity: 0.9;
            }
        }
    }
    .export-wrapper > * {
        margin: 0 10px;
    }
</style>
