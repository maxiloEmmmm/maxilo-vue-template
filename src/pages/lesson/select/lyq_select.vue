<template>
        <section class="wrap">
            <div class="searchIpt clearFix">
                <div class="clearFix">
                    <input type="text"
                           class="keyWord"
                           :value="_view"
                           :placeholder="placeholder"
                           @click="show()"/>
                    <input type="button" value="重置" @click="reset()" :disabled="disabled"/>
                    <input type="button" style="display: none;"/>
                    <input type="button" :value="_text" @click="toggle()"/>
                    <span></span>
                </div>
                <div>
                    <ul class="list">
                        <li
                            v-show="selectShow"
                            v-for="(index,list) in lists"
                            :key="index"
                            @click="selectValueHandle(index)"
                        >{{index}}</li>
                    </ul>
                </div>
            </div>
        </section>
</template>

<script>
    export default {
        data() {
            return {
                disabled:false,
                selectShow: false,
                active:false,
                btnText:"单选",
                val: [],
                more: false,
                dataKeyCache: {},
            }
        },
        computed:{
            _view(){
                return this.val.join(' ')
            },
            _text(){
                return (this.more ? '多' : '单') + '选';
            }
        },
        props: {
            placeholder: {
                default: ''
            },
            lists: {
                default(){
                    return [{
                        text: '无选项'
                    }];
                }
            },
        },
    methods:{
            selectValueHandle(value){
                if(this.more) {
                    this.val.push(value);
                }else {
                    this.val = [value];
                }
                this.hide();
            },
            //重置
            reset(){
                this.val = [];
            },
            //隐藏下拉框
            hide(){
                this.selectShow = false;
            },
            //显示下拉框
            show(){
                this.selectShow = true;
            },
            //多选单选切换
            toggle(){
                this.more = !this.more;
            }
        }
    }
</script>

<style>
    body{margin:0;font-family:"微软雅黑"}ul li{margin:0;padding:0;list-style:none}input{outline:0;cursor:pointer}.clearFix:after{display:block;content:"";clear:both}.wrap{width:420px;margin:30px;padding: 10px;background:#d9534f;box-shadow:2px 2px 10px #acabac}.searchIpt{position:relative;width:100%;border:1px solid #3736ae;padding:5px;border-radius:24px;background:#e4e4fe}.searchIpt input{line-height:34px;border-radius:18px}.searchIpt input:nth-of-type(1){float:left;width:228px;padding-left:40px;border:1px solid #c9c9d5;background:#d9d9e2}.searchIpt input:nth-of-type(2),.searchIpt input:nth-of-type(4){margin-left: 5px;color:#fff;font-size:17px;float:right;width:58px;height:36px;line-height:26px;border:1px solid #d9534f;background:#d9534f}.searchIpt span{position:absolute;top:12px;left:15px;width:23px;height:23px;background:#28a745}.searchIpt input:nth-of-type(1):focus{background:#fff;border-color:#d9534f}.list{margin-top:9px}.list li{margin:3px 0;color:#333;line-height:30px;padding-left:16px;width:270px;box-sizing:border-box;border-radius:14px}.list li.active,.list li:hover{color:#fff;background:#d9534f;cursor:pointer}
</style>


