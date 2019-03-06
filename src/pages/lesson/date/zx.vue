<template>
<div  class="big-box" >
  <div class="date-picker" ref="userInfo">
     <!-- 展示台 -->
     <div class="show-area">
      <span class="blank-area" @click="showCalender()"><span v-show="showDate">{{year}}-{{month}}-{{dday}}</span></span>
      <span class="icon">
        <img src="./zx.png" height="35" width="35">
      </span>
    </div>
    <div v-show="calendar" class="show-date">
      <!-- 头 -->
      <div class="date-head">
        <div class="operat-box">
          <span class="operat-top" @click=" minusYear()">&laquo;</span>
          <span class="operat-top" @click=" minusMouth()">&lt;</span>
          <span class="chois-operat" @click="choiceDate()">{{year}}-{{month}}-{{dday}}</span>
          <span class="operat-top" @click="addMouth()">&gt;</span>
          <span class="operat-top" @click="addYear()">&raquo;</span>
        </div>
      </div>
      <!-- 中间 -->
      <div class="date">
        <!-- 中间年份 -->
        <div class="date-year" v-show="showYear">
          <ul class="all-year">
            <li
              class="every-year"
              @click="changeYear(index)"
              v-for="(syear,index) in syears"
              :key="index"
            >{{syear}}</li>
          </ul>
        </div>
        <!--中间月份 -->
         <div class="date-month" v-show="showMonth">
          <ul class="all-month">
            <li
              class="every-month"
              @click="changeMonth(index)"
              v-for="(smonth,index) in smonths"
              :key="index"
            >{{smonth.sm}}</li>
          </ul>
        </div>
        <!-- 中间日期 -->
        <div  class="date-body" v-show="showDay">
                <ul  class="ul-week">
                    <li class="week">日</li>
                    <li class="week">一</li> 
                    <li class="week">二</li>
                    <li class="week">三</li>
                    <li class="week">四</li>
                    <li class="week">五</li>
                    <li class="week">六</li>
                </ul>
                
                <ul class="dayList">
                  <!-- 1号之前 -->
                    <li class="surplus-day li-day"
                        v-for="(exDay,exIndex) in exDays" 
                        :key="'o'+exIndex" >
                      {{exDay}}
                    </li>
                    <!-- 正式日期 -->
                    <li class="every-day li-day" 
                        v-for="(swDay,dayIndex) in swDays" 
                        :key="dayIndex"
                        :class="{active:dday==swDay,}"
                        @click="choiceDay(dayIndex)" 
                       >{{swDay}}
                    </li>
                    <!-- 下个月 -->
                    <li class="surplus-day li-day"
                        v-for="(nextDay,nextIndex) in nextDays" 
                        :key="'p'+nextIndex" >
                      {{nextDay}}
                    </li>
                </ul>
              
        </div>
        
      </div>
      <!-- 尾部 -->
      <div class="date-foot">
        <div class="operat-box">
          <span class="operat-buttom">取消</span>
          <span class="operat-buttom" @click="current()">今天</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  data() {
    return {
        
        year: "1970",
        month: "01",
        dday: "01",
        smonths :[
            {sm:"01"},{sm:"02"},{sm:"03"},{sm:"04"}, {sm:"05"},{sm:"06"},
            {sm:"07"},{sm:"08"},{sm:"09"}, {sm:"10"},{sm:"11"},{sm:"12"},
            ],
        calendar: false,
        showDate:false,
        showYear:false,
        showMonth:false,
        showDay:true,
       //要展示和绑定的数据
        exDays:[],
        swDays:[],
        nextDays:[],
        prevDay:-1,//第1行占多少天
        weekDay:7,//星期天数
        monthDay:[],//保存当前年每月的天数
    };  
  },
computed: {
   //计算年份选择 
    syears: function() {
       return [
            this.year - 4 ,
            this.year - 3 ,
            this.year - 2 ,
            this.year - 1 ,
            this.year ,
            Number(this.year) + 1 ,
            Number(this.year) + 2 ,
            Number(this.year) + 3 ,
            Number(this.year) + 4 
        ];
    },
    // 计算每年的第一天
    _week(){
       var _arrw=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        var a = new Date(this.year+","+1+","+1);
        var week = a.toString().split(" ")[0];
        console.log(',', _arrw.indexOf(week));
        return _arrw.indexOf(week);
    },
    // /计算每个月的第一天
    _start(){
       var _arrw=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        var b = new Date(this.year+","+this.month +","+1);
        console.log(b)
        var st = b.toString().split(" ")[0];
        console.log('这个月的第一天是星期：', _arrw.indexOf(st));
        return _arrw.indexOf(st);
    },
    // 计算每个月的最后一天
     _lastDay(){
       var _arrw=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            if(this._xy){
                if(this.month=="02"){
                    // 闰年
                    if(this._r){
                        var a = new Date(this.year+","+this.month+","+29);
                        var last = a.toString().split(" ")[0];
                        console.log('2,,', _arrw.indexOf(last));
                        return _arrw.indexOf(last);
                    }
                    // 平年
                    else{
                        var a = new Date(this.year+","+this.month+","+28);
                        var last = a.toString().split(" ")[0];
                        console.log('2,,', _arrw.indexOf(last));
                        return _arrw.indexOf(last);
                    }   
                }else{
                    var a = new Date(this.year+","+this.month+","+30);
                    var last = a.toString().split(" ")[0];
                    console.log(',,,', _arrw.indexOf(last));
                    return _arrw.indexOf(last);
            }
          }else{
                var a = new Date(this.year+","+this.month+","+31);
                var last = a.toString().split(" ")[0];
                console.log(',,,', _arrw.indexOf(last));
                return _arrw.indexOf(last);
          }   
    },
    // 计算闰年公式
    _r(){
      return this.year%4==0 && this.year%100!=0 ||this.year%400==0;
    },
    // 计算小月
    _xy(){
      return this.month=="02"||this.month=="04"||this.month=="06"||this.month=="09"||this.month=="11";
    }
},
created:function(){
                var date = new Date();
                this.monthDay = this.getMonthDay(this.year);
                //初始化数据
                this.changeDay();
},
// 点击空白消失
mounted(){
    let _this = this;
    document.addEventListener('click',function(e){
            if(!!_this.$refs.userInfo.contains(e.target)) return;
            _this.calendar=false;
    })
},
methods: {
    //当前年的每月天数 
    getMonthDay:function(){
        var _arrm=[31,31,30,31,30,31,31,30,31,30,31];
        if(this._r){
            //闰年    
            _arrm.splice(1,0,29);
            return _arrm; 
        }else{
            //平年
            _arrm.splice(1,0,28);
        return _arrm;
        }
    },
    //修改当前月天数
    changeDay:function(){
      var _arrex=[];
      var _arrd=[];
      var _arrnext=[];
      var index = Number(this.month-1);
        //初始化
      
      console.log('最后一天的星期：'+this._lasDay);
        if(index == 0 ){
            //1月
            this.prevDay = this._week
            console.log("this.prevDay="+this.prevDay)
            this.$set(this,"prevDay",this._week);
        }else{
            var allPrevDay=0;
            for(var i=0;i<index;i++){
                allPrevDay+=this.monthDay[i];
            }
            this.prevDay = (allPrevDay+this._week) % this.weekDay;
        }
        
        // 前期
        for(i=0;i<this._start;i++){
          if(this._xy){
               _arrex.push( 31-this._start+i+1);
          }else{
              if(this.month-1 =='2'){
                if(this._r){
                    _arrex.push( 29-this._start +i+1);
                }else{
                    _arrex.push( 28-this._start +i+1);
                }
              }
              else{
                    _arrex.push( 30-this._start +i+1);
              }
        }

        }
          this.$set(this,"exDays",_arrex);
        // 中间
      
        if(this._xy){ 
            // 判断是不是2月
              if(this.month=="02"){
                // 闰年29天
                 if(this._r){
                    for(var c=1;c<30;c++){
                    _arrd.push(c);
                    }
                    this.$set(this,"swDays",_arrd)
                }else{
                     for(var c=1;c<29;c++){
                    _arrd.push(c);
                    }
                this.$set(this,"swDays",_arrd)
                }
              }else{
                for(var j=1;j<31;j++){
                  _arrd.push(j);
                }
                this.$set(this,"swDays",_arrd)
              }  
        }else{
            for(var k=1;k<32;k++){
                _arrd.push(k);
            } this.$set(this,"swDays",_arrd)
        }
    
        // 如果是平年
       
        // 后期
        if(this._lastDay==6){
            this._arrnext=[];
            return  this.$set(this,"nextDays", _arrnext) ;
        }else{
            for(var q=1;q<7-this._lastDay;q++){
                _arrnext.push(q);
            }
            this.$set(this,"nextDays", _arrnext);
        }
        
       
    },
    // 日历的显示
   showCalender:function(){
      this.calendar =!this.calendar;
      
   },
    //加一年
    addYear: function() {
      this.year++;
      if(!this._r&&this.month==2&&this.dday==29){
              this.month="03";
              this.dday="01";
      }
      this.getMonthDay();
      this.changeDay();
    },
    //加一月
    addMouth: function() {
      this.month++;
      if (this.month < 10) {
        this.month = "0" + this.month;
      } else {
        if (this.month > 12) {
          this.month = "01";
          this.year++;
        } else {
          this.month = this.month;
        }
      }
      
      this.getMonthDay();
      this.changeDay();
    },
    // 减一月
    minusMouth: function() {
      this.month--;
      if (this.month < 10 && this.month >= 1) {
        this.month = "0" + this.month;
      } else {
        if (this.month < 1) {
          this.month = "12";
          this.year--;
        } else {
        }
      }
      this.getMonthDay();
      this.changeDay();
    },
    // 减一年
    minusYear: function() {
      this.year--;
      this.getMonthDay();
      this.changeDay();
    }, 
    // 点击年份赋值
    changeYear: function(index) {
      this.year = this.syears[index];
      this.showYear = !this.showYear;
      this.showMonth = !this.showMonth;
      this.getMonthDay();
      this.changeDay();
    },
    // 点击中间年月日选择
    choiceDate:function(){
        this.showYear = true;
        this.showMonth =false;
        this.showDay = false;
    },
     // 点击月份赋值
    changeMonth:function(index){
        this.month =this.smonths[index].sm;
        this.showMonth = !this.showMonth;
        this.showDay = !this.showDay;
        this.changeDay();
    },
    //  点击日期赋值
    choiceDay:function(dayIndex){
      if(this.swDays[dayIndex]<10){
        this.dday ="0"+ this.swDays[dayIndex];
      }else{
        this.dday = this.swDays[dayIndex];
      }
        
        console.log(this.dday);
        this.showDate= true;
        this.calendar = !this.calendar;
    },
    // 点击获取当前日期
    current: function() {
      let date = new Date();
      this.showDay = true;    this.showMonth = false;   this.showYear = false;
      this.year = date.getFullYear();      this.month = date.getMonth() + 1;
      this.month = this.month < 10 ? "0" + this.month : this.month;
      this.dday = date.getDate();
      this.dday = this.day < 10 ? "0" + this.dday : this.dday;
      this.changeDay();
      
    }
  }
};
</script>


<style>
* {
  padding: 0px;
  margin: 0px;
}
.big-box{
  margin:0;
  padding:0;
  width:100%;
  height: 100%;
}
/* 展示台 */
.date-picker {
  margin: 100px 200px;
  width: 280px;
  height: 315px;
}
.show-area {
  display: flex;
  width: 280px;
}
.blank-area {
  border: 1px solid #050505;
  width: 244px;
  height: 40px;
  line-height: 40px;
}
.icon {
  border: 1px solid #000000;
  border-left: none;
  line-height: 40px;
  height: 40px;
}
/* 日历区 */
.show-date {
  width: 282px;
  border: 1px solid #e8e8e8;
}
.date-head,.date-foot {
  margin: 0 auto;
  height: 40px;
  background-color: #000000;
  position: relative;
}
/* 日历区头部操作区 */
.operat-box {
  position: absolute;
  width: 220px;
  margin: 5px 30px 0 30px;
  cursor: pointer;
}
.operat-top {
  display: inline-block;
  width: 20px;
  border: 1px solid #000000;
  margin-right: 6px;
  color: snow;
  text-align: center;
}
.operat-top:hover {
  border: 1px solid #eeeeee;
}
.chois-operat {
  display: inline-block;
  color: #c7c7c7;
  border-radius: 3px;
  margin: 0 14px 0 8px;
  border: 1px solid #000000;
}
.chois-operat:hover {
  border: 1px solid #404040;
}
/*日历中间为年份 月份时 */
.all-year ,.all-month{
  margin: 20px 5px;
  height:150px;
}
.every-year , .every-month{
  float:left;
  width: 90px;
  height: 50px;
  line-height:50px; 
  text-align: center;
  font-size: 18px;
  color:black;
  cursor: pointer;
}
.every-month{
    height: 32px;
    line-height: 32px;
}
.every-year:hover,.every-month:hover{
    color:#ffffff ;
    border:1px solid #000000 ;
    border-radius: 3px;
    background-color: #000000;
}

/*日历中间为日期时 */
.date-body{
   margin:0;
   width:280px;
   height: 160px;
}
ul{
  margin:0;
}
.week {
    float: left;
    width: 40px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color:black;
    border: 1px solid #595959;
    text-align: center;
}
.active{
        color: #00c8c8;
    }
.surplus-day{
   color:#adadad ;
}

.li-day{
    float: left;
    list-style: none;
    width: 40px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    padding: 0;
    margin: 0;
    cursor: pointer;     
    }
.every-year:hover,.every-month:hover,.every-day:hover{
    color:#ffffff ;
    border:1px solid #000000 ;
    border-radius: 3px;
    background-color: #000000;
}
/* 日历尾部操作 */
.operat-buttom {
  display: inline-block;
  float: right;
  width: 50px;
  border: 1px solid #000000;
  margin-right: 6px;
  color: snow;
  text-align: center;
}
.operat-buttom:hover {
  border: 1px solid #eeeeee;
}
</style>