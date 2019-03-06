export default {
    name: '模型',
    icon: 'edit',
    items: {
        people: {
            name: '人资分析',
            items: {
                p_nums: {
                    name: '各部门人数比例',
                    icon: 'edit',
                    is_group: true,
                    is_model: true,
                    option_tpl: 'normal',
                    area: {
                        h: '300px'
                    },
                    items: [
                        {is_group_item: true, group_item_key: 'title', kind: 'section', type: 'title', area: {
                            h: '30px'
                        }, data: {
                            sheet: {
                                fontSize: '16px'
                            },
                            content: '各部门人数比例'
                        }},
                        {is_group_item: true, group_item_key: 'chart', kind: 'chart', type: 'pie', area: {
                            h: '270px',
                            p: {
                                t: '30px'
                            }
                        }, data: {
                            source: {
                                key: 'chart_option'
                            }
                        }}
                    ],
                },
                p_percent: {
                    name: '人员结构占比对比',
                    icon: 'edit',
                    is_model: true,
                    is_group: true,
                    option_tpl: 'normal',
                    area: {
                        h: '300px'
                    },
                    items: [
                        {is_group_item: true, group_item_key: 'title', kind: 'section', type: 'title', area: {
                            h: '30px'
                        }, data: {
                            sheet: {
                                fontSize: '16px'
                            },
                            content: '人员结构占比对比'
                        }},
                        {is_group_item: true, group_item_key: 'chart', kind: 'chart', type: 'bar_chart', area: {
                            h: '270px',
                            p: {
                                t: '30px'
                            }
                        }, data: {
                            source: {
                                key: 'chart_option'
                            }
                        }}
                    ]
                }
            }
        },
        money: {
            name: '资产分析 - 测试',
            items: {
                m_sy: {
                    name: '存款趋势 - 测试',
                    icon: 'edit',
                    is_group: true,
                    is_model: true,
                    option_tpl: 'normal',
                    area: {
                        h: '300px'
                    },
                    items: [
                        {is_group_item: true, group_item_key: 'title', kind: 'section', type: 'title', area: {
                            h: '30px'
                        }, data: {
                            sheet: {
                                fontSize: '16px'
                            },
                            content: '存款趋势 - 测试'
                        }},
                        {is_group_item: true, group_item_key: 'chart', kind: 'chart', type: 'pie', area: {
                            h: '270px',
                            p: {
                                t: '30px'
                            }
                        }, data: {
                            source: {
                                key: 'chart_option'
                            }
                        }}
                    ],
                },
            }
        }
    }
}