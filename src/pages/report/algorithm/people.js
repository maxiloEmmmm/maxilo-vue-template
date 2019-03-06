import moment from 'moment'
export default {
    p_nums(d){
        let depts = {};
        d.forEach(v => {
            if(depts[v.dept_name] === undefined) {
                depts[v.dept_name] = 1;
                return;
            }else {
                depts[v.dept_name]++;
            }
        });
        return {
            chart_option: {
                series: [
                    {
                        data: Object.keys(depts).map(v => {
                            return {
                                name: v,
                                value: depts[v]
                            }
                        })
                    }
                ]
            }
        }
    },
    p_percent(d){
        let level = [];
        d.forEach(v => {
            if(!level.includes(v.level)) {
                level.push(v.level)
            }
        });
        let quarter = {};
        d.forEach(v => {
            let m = moment(v.created_at);
            if(m.isValid()) {
                let q = '第'+m.quarter()+'季度';
                if(quarter[q] === undefined) {
                    quarter[q] = {};
                }
                if(quarter[q][v.level] === undefined) {
                    quarter[q][v.level] = 1;
                }else {
                    quarter[q][v.level]++;
                }
            }
        });
        return {
            chart_option: {
                xAxis: {
                    data: level
                },
                series: Object.keys(quarter).map(v => {
                    let tmp = quarter[v];
                    return {
                        name: v,
                        type: 'bar',
                        data: Object.keys(tmp).map(x => {
                            return {
                                value: tmp[x],
                                name: x
                            }
                        })
                    }
                })
            }
        };
    },
    getMeteData(){
        return {
            label: '人力资源',
            fields: [
                {title: '姓名', field: 'name', type: 'input', default_value: '张安'},
                {title: '入职时间', field: 'created_at', type: 'date', default_value: '2018-01-01'},
                {title: '所在部门', field: 'dept_name', type: 'input', default_value: '软件部'},
                {title: '等级', field: 'level', type: 'input', default_value: '高级'}
            ]
        };
    }
}