export default {
    m_sy(d){
        let actions = {};
        d.forEach(v => {
            if(actions[v.action] === undefined) {
                actions[v.action] = v.money;
                return;
            }else {
                actions[v.action] += v.money;
            }
        });
        return {
            chart_option: {
                series: [
                    {
                        data: Object.keys(actions).map(v => {
                            return {
                                name: v,
                                value: actions[v]
                            }
                        })
                    }
                ]
            }
        }
    },
    getMeteData(){
        return {
            label: '资产分析',
            fields: [
                {title: '时间', field: 'created_at', type: 'date', default_value: '2018-1-1'},
                {title: '金额', field: 'money', type: 'input', default_value: '20'},
                {title: '行为', field: 'action', type: 'input', default_value: '支出'},
            ]
        };
    }
}