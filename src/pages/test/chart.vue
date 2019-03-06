<template>
    <div>
        <div ref="core" style="width:1000px;height:450px;margin:0px auto;" ></div>
    </div>


</template>

<script>
    let echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/bar')
    require("echarts/lib/component/legend")
    require("echarts/lib/component/tooltip")
    export default {
        data() {
            return {
                mychart:null,
                ds: []
            }
        },
        computed: {
            chartNL(){
                return this.ds[0] === undefined ? [] : Object.keys(this.ds[0].value);
            },

            nameY(){
                let qname = [];
                this.ds.forEach(q =>{
                    qname.push(q.name);
                })
                return qname
            },
            series(){
                let tmp = [];
                this.chartNL.forEach(k =>{
                    let t = {
                        data:[],
                        name:k,
                        type:'bar',
                        stack:'人数',
                        barWidth:50,
                        label: {show: false, position: 'insideRight'}
                    };
                    this.ds.forEach(v =>{
                        t.data.push(v.value[k]);

                    });
                    tmp.push(t);
                });
                return tmp;
            },
            sunx(){
                var sx = 0;
                this.chartNL.forEach(k =>{
                    this.ds.forEach(v =>{
                        sx = sx+ v.value[k];
                        console.log(sx,v.value[k],1111);
                    });
                });

                return sx
            }
        },
        async  mounted() {
            this.myChart = echarts.init(this.$refs.core);
            let d = await this.$http.get('http://192.168.2.174:13133/platform/do.go?api=student.getStuFigureDisplay&juid=d114dd6e482e40ab928021acd5710932')
            this.ds = d.data;
            this.drawLine();

        },
        watch: {
            ds: {
                handler(){
                    this.myChart.setOption({
                        legend:{data:this.chartNL,
                            x:90,
                            y:3,
                            textStyle:{
                                color:'#000',
                            },
                        },
                        yAxis:{
                            name:'单位:人',
                            type: 'value',
                            // max:this.sunx,
                            axisLine:{
                                lineStyle:{
                                    color:'#000',
                                    width:1,
                                }
                            }

                        },
                        xAxis:[
                            {
                                type: 'category',
                                data:this.nameY,
                                // data : ['男','女','男','女','男','女','男','女','男','女','男','女','男','女','男','女'],
                                position:'bottom',
                            },
                            {
                                type: 'category',
                                data : ['机电分院','','动能分院','','护理分院','','药学分院','','建筑分院','','经管分院','','学前分院','','中职分院',''],
                                position:'bottom',
                                offset:25,
                                axisLabel:{interval: 0}
                            },
                            {
                                type: 'category',
                                data : ['','','','主校区','','','','','','','','','','分校区','',''],
                                position:'bottom',
                                offset:53,
                            },

                        ],
                        series: this.series,
                    });
                },
            }
        },
        methods: {
            drawLine() {
                this.myChart.setOption({
                    textStyle:{
                        color:'#000',
                    },
                    legend:{
                        data : [],
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true,
                    },
                    tooltip : {},
                    xAxis: {

                    },
                    yAxis: {
                        axisLine:{
                            lineStyle:{
                                color:'#000',
                                width:1,
                            }
                        },
                    },
                    series: [{

                    }],
                    color:['rgba(255,0,51,0.9)','#00c1fa','#FFCC00','#FF9999','#99CC33','#66CCCC','#FF9933','#666699','#99CC66','#99CCFF','#006699','#CC3366','#99CCFF']
                });
            }
        },

    }
</script>

