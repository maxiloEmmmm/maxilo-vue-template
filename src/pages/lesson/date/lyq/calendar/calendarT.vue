<template>
    <div class="date">
        <!--输入框-->
        <div class="search">
            <input type="text" @focus="show()" vaule="" v-model="selectValue" placeholder="==请选择日期==" ref=“selsct”>
            <span class="calendar">
                <i class="fa fa-calendar fa-2x"></i>
            </span>
        </div>
        <Panel v-show="showElement" :toolsShow="toolsShow" :isFooter="isFooter">
            <span slot="panel-heading">
                <el-button type="success" icon="el-icon-arrow-left" @click="pickPre(currentYear,currentMonth)"></el-button>
                <el-button type="success" icon="el-icon-d-arrow-left" @click="yearPre(currentYear,currentMonth)"></el-button>
                <el-button type="success" @click="pickYear(currentYear,currentMonth)">{{ currentYear }}年 {{ currentMonth }}月</el-button>
                <el-button type="success" icon="el-icon-d-arrow-right" @click="yearNext(currentYear,currentMonth)"></el-button>
                <el-button type="success" icon="el-icon-arrow-right" @click="pickNext(currentYear,currentMonth)"></el-button>
                <!--星期-->
                 <ul class="weekdays">
                    <li v-for="(week,index) in weekdays" :key="index">{{week}}</li>
                 </ul>
            </span>
            <span slot="panel-body">
                <!--日期-->
               <ul class="days">
                    <li v-for="(dayobject,index) in days" :key="index" @click="select(currentYear,currentMonth,dayobject)">
                        <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
                        <span v-else>
                            <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
                            <span v-else>{{ dayobject.day.getDate() }}</span>
                        </span>
                    </li>
                </ul>
            </span>
            <span slot="panel-footer">
                <el-button type="success" @click="cancel()">取消</el-button>
                <el-button type="success" @click="todayDate(currentYear,currentMonth)">今天</el-button>&nbsp;
            </span>
        </Panel>
    </div>
</template>

<script>
    import Panel from './Panel.vue';
    import 'element-ui/lib/theme-chalk/index.css';
    import {Button} from 'element-ui'
    export default {
        components: {
            Panel,
            [Button.name]: Button
        },
        data() {
            return {
                selectValue:"",
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                currentWeek: 1,
                date: '',
                //日期
                days: [],
                //星期
                weekdays: {
                    day01: '一',
                    day02: '二',
                    day03: '三',
                    day04: '四',
                    day05: '五',
                    day06: '六',
                    day07: '七',
                },
                //panel是否显示
                showElement: false,
                //工具是否显示
                toolsShow: false,
                //panel底部是否显示
                isFooter: true,
            }
        },
        created() {
            this.initData(null);
        },
        watch:{
            selectValue: {
                handler: function (newVal, oldVal) {
                    return this.selectValue;
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            //选择日期
            select(currentYear,currentMonth,dayobject){
                this.selectValue = currentYear + "-" + currentMonth + "-" + dayobject.day.getDate();;
                this.showElement = false;
            },
            //取消
            cancel(){
                this.showElement = false;
            },
            //初始化数据
            initData: function (cur) {
                let date;
                let index = 0;
                //初始化本月的第一天
                if (cur) {
                    date = new Date(cur);
                } else {
                    let now = new Date();
                    let d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1)); //获得十一月份日期
                    //getMonth() 返回值是 0（一月） 到 11（十二月） 之间的一个整数。getFullYear()返回当前年份
                    d.setDate(35);
                    date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));  // 初始到这个月   2018年12月1日星期六
                }
                this.currentDay = date.getDate(); //1
                this.currentYear = date.getFullYear();//2018
                this.currentMonth = date.getMonth() + 1; //12
                this.currentWeek = date.getDay(); // 1...6,0  星期六
                if (this.currentWeek === 0) {
                    this.currentWeek = 7;
                }
                let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);// formatDate日期格式 2018-12-1
                this.days.length = 0; //控制日历不会新增

                //初始化本月的第一周
                for (let i = this.currentWeek - 1; i >= 0; i--) {     //6-1=5
                    let d = new Date(str);
                    console.log(d);
                    d.setDate(d.getDate() - i);//1-5=-4  十二月为例 d.setDate（-4）为十一月的26号  d.setDate（0为11.30）
                    let dayobject = {};
                    dayobject.day = d;
                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
                }
                //其他周
                for (let i = 1; i <= 35 - this.currentWeek; i++) {
                    let d = new Date(str);
                    d.setDate(d.getDate() + i);
                    let dayobject = {};
                    dayobject.day = d;
                    let now = new Date();
                    if (d.getDate() === (now.getDate()) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
                        dayobject.index = index++;
                    }
                    else if (index != 0 && index < 3)
                        dayobject.index = index++;
                    this.days.push(dayobject);
                }
            },
            //今天
            todayDate(year,month){
                this.initData();
            },
            //去年
            yearPre(year,month) {
                let d = new Date(this.formatDate(year, month, 1));
                d.setYear(year - 1);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            },
            //明年
            yearNext(year,month) {
                let d = new Date(this.formatDate(year, month,1));
                d.setYear(year + 1);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            },
            //上个月
            pickPre(year, month) {
                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                let d = new Date(this.formatDate(year, month, 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));//获取上个月的最后一天
            },
            //下个月
            pickNext(year, month) {
                let d = new Date(this.formatDate(year, month, 1));
                d.setDate(35);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));//获取下个月的最后一天
            },
            //中间字体显示
            pickYear(year, month) {
                alert(year + "," + month);
            },
            // 返回 类似 2018-12-20 格式的字符串
            formatDate(year, month, day) {
                let y = year;
                let m = month;
                if (m < 10) {m = "0" + m};
                let d = day;
                if (d < 10) {d = "0" + d};
                return y + "-" + m + "-" + d
            },
            //展示元素
            show() {
                this.showElement = !this.showElement;
            },
        },
    }
</script>
<style>
    .calendar{background:#28a745;padding: 3px 3px;color:#FFF;display: inline-block;position: relative;top: 4px;}
    .search{ text-align: center;}
    .search input{ margin: 50px auto 0px;padding: 0 10px;width: 345px;height: 34px;border: 1px solid #28a745; border-radius: 2px;background: #fff;}
    .date{width: 380px;margin: 0px auto;}
    /*.weekdays li{float:left;margin-right: 27px;text-align: center;}*/
    /*.weekdays li:last-child,.weekdays li:nth-last-child(2){color:red;}*/
    .days {padding: 0;background: #FFFFFF;margin: 0;display: flex;flex-wrap: wrap;justify-content: space-around;cursor: pointer;}
    .days li {list-style-type: none;display: inline-block;width: 14.2%;text-align: center;padding-bottom: 15px;padding-top: 15px;font-size: 1rem;color: #000;}
    .days li .active {padding: 6px 10px;background: #28a745;color: #fff;}
    .days li .other-month {padding: 5px;color: gainsboro;}
    .days li:hover {background: #e1e1e1;}
    #left{float: left;width: 20%;}
    #right {float: left;width: 80%;}
    .weekdays {margin: 0;padding: 10px 0;display: flex;flex-wrap: wrap;color: #FFFFFF;justify-content: space-around;}
    .weekdays li {display: inline-block;width: 13.6%;text-align: center;}
    .panel-heading .el-button+.el-button{margin-left:0px !important;}
    .panel-footer span .el-button{float:right !important;}
    .el-button:active{border:none;}
</style>