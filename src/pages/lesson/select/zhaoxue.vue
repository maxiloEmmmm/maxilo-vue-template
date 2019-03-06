<template>
    <div class="bigBox">
        <div class="manyChoice2" ref="userInfo">
            <span>你选择了：</span>
            <button class="claerAll" @click="delAllShow()">清除</button>
            <br>
            <!-- 展示台 -->
            <div class="showArea">
                <span v-if="isMore==false">{{manyValues==""? "":manyValues[0]}}</span> 
                <span class="mVstyle" v-if="isMore==true" v-for="(manyValue,index) in  manyValues" :key="index">
                    <a style="color: #ffffff" class="clean" @click="del(index)">x |</a>{{manyValue}} 
                    <span class="kk">&nbsp;</span> 
                </span>    
            </div>  
            <br>
            <!-- 样式切换 -->
            <button  v-bind:class="{scolor: isScolor}"  @click="single()">单选</button> 
            <button  v-bind:class="{mcolor: isMcolor }"  @click="many()"  >多选</button><br>
            <input  class="tip" type="button" value="请选泽    >>" @click="showList() ">
            <!-- 下拉框选项 -->
            <div class="listBox" v-show="showL" >
                <button class="list" v-bind:class="{active: index==isActive }"  v-for="(digit,index) in digits" :key="index" 
                    @click="hitLi(index)" :disabled="digit.show">
                    {{digit.text}} 
                </button>
            </div>
            
        </div>  
    </div>
</template>

<script>
    export default {
        data(){
           return{
              digits:[
                  {text:"选A",value:"选A", show:false},
                  {text:"选B",value:"选B" ,show:false},
                  {text:"选C",value:"选C", show:false},
                  {text:"选D",value:"选D", show:false},
                  {text:"选E",value:"选E", show:false},
                  {text:"选F",value:"选F", show:false},
              ] ,
              manyValues:[],
              showL:false,
              isActive:false,
              isScolor:false,
              isMcolor:false,
              isMore: true,
           }
        },
        // 点击空白处 隐藏下拉框
        mounted(){
            let _this = this;
            document.addEventListener('click',function(e){
                    if(!!_this.$refs.userInfo.contains(e.target)) return;
                    _this.showL=false;
                })
        },
        methods:{
            //展示台的显示与隐藏
            showList:function(){
               this.showL =!this.showL;
            },
            // 点击单选 改变样式 显示选项
            single:function(){
                this.isMore = false
                this.isScolor = !this.isScolor;
                this.isMcolor = false; 
                for( var k=0; k<this.digits.length;k++){
                    this.digits[k].show =false;
                }  
             },
            // 点击多选 改变样式
             many:function(){
                this.isMore = true
                this.isMcolor = !this.isMcolor;
                this.isScolor = false;
                
             },
            //  点击选项  出现样式 往空数组中赋值
            hitLi:function(index){
                
                this.isActive =index;  
                console.log(index);
                let a = this.digits[index].text
                console.log(a);
                if(this.isMore == false)
                { 
                    this.manyValues[0] = a ; 
                }
                else{
                    this.digits[index].show = true 
                    this.manyValues.push( a)  }        
            }, 
            // 判断数值 取消禁用 从数组中删除 
            del:function(index){
                    for(var i=0; i<this.digits.length;i++){
                        if(this.digits[i].text==this.manyValues[index]){
                             this.$set(this.digits[i], 'show', false);
                         }  
                    } 
                    
                    this.manyValues.splice(index,1);
            },
           // 删除展示台所有数值    
            delAllShow:function(){
                 for( var k=0; k<this.digits.length;k++){
                    this.$set(this.digits[k], 'show', false);
                }  
                
                this.manyValues = []; 
            },  
                    
                   
        }   
    }  
       
           
    
</script>
<style >
   .manyChoice2{
       margin:100px 200px;
       width:200px;
       height:300px;
       }
    .showArea{
       width: 200px;
       height: 55px;
       border:1px solid #d8d8d8 ;
    }
    .mVstyle{
        border:#ffdddd 1px solid;
        background-color: #ffdddd;
        border-radius: 3px;
    }
    .kk{
        background-color: #ffffff ;
    }
    .tip{
        width:200px;
    }
    .listBox{
        padding: 0;
        width:200px;
         /* border:1px #e7e7e7 solid; */
    }
    .list{

        width:200px;
        border:1px #e7e7e7 solid;
    }
   .active {
        background-color: #1093cb;
        cursor: pointer;
   }
   .scolor{
        background-color: #1093cb;
        cursor: pointer;
   }
   .mcolor{
        background-color: #1093cb;
        cursor: pointer;
   }
   a{
      
       cursor: pointer;
       height: 18px;
       font-size: 18px;
       line-height: 18px;
   }
   .bigBox{
       width:800px;
       height:600px
   }
</style>
