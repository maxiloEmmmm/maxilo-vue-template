<template>
    <div id="container">
        <div class="box dropdown">
            <input type="text" @click="getOpts()" v-model="_str">
            <button type="button" class="btn btn-primary" @click="clear()">清空</button>
            <button type="button" class="btn btn-primary" @click="change()">{{selectModel}}</button><br>

            <!-- opts -->
            <ol v-show="showOpts" v-for="(item,index) in opts" :key="index">
                <li @click="getInputValue(index)">{{item.text}}</li>
            </ol>
        </div>
    </div>
</template>

<style>
    #container {
        margin: 100px 200px 0;
        border: 1px solid gray;
        height: 600px;

    }

    .box {
        margin: 20px 0 0 20px;

    }

    .opt {
        width: 174px;
        border: 1px solid gray;
        border-radius: 3px;
    }
    ol{
        border:1px solid gray;
        list-style:none;
         margin:0px;
         padding:0px;
         width: 174px;
    }
    li{
        height: 25px;
        text-align: center;
    }
    li:hover{
        background-color: gray;
    }
    input{
        width: 300px;
    }
</style>

<script>
    export default {
        data() {
            return {
                showOpts: false,
                opts: [
                    {text:'opt1',value:1},
                    {text:'opt2',value:2},
                    {text:'opt3',value:3},
                    {text:'opt4',value:4},
                ],
                inputValue:[],
                selectModel:'想多选',
            }
        },
        computed: {
            _str(){
                return this.inputValue.join();
            }
        },
        methods: {
            getOpts(){
                this.showOpts=!this.showOpts;
            },
            getInputValue(index){
                //如果已不被选中则删除
                //判断inputValue中是否包含
                var selected = false;
                for(let v in this.inputValue){
                    if(this.inputValue[v] === this.opts[index].text){
                        this.inputValue.splice(v,1);
                        selected = true;
                        break;
                    }
                }
                if(selected){
                    return;
                }
                
                if(this.selectModel==='想多选'){
                    this.inputValue = [this.opts[index].text];
                    this.showOpts=false;
                }else{
                    this.inputValue.push(this.opts[index].text);
                }
                
            },
            change(){
                if(this.selectModel==='想多选'){
                    this.selectModel='想单选';
                }else{
                    this.selectModel='想多选';
                }
                //当多选时
                if(this.selectModel==='想多选'){
                    
                }
            },
            clear(){
                this.inputValue=[];
            }

            
        }
    }
</script>