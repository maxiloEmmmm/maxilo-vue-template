export default {
    name: '内容',
    icon: 'edit',
    items: {
        text: {
            name: '文本',
            items: {
                big_title: {
                    name: '大标题',
                    icon: 'edit',
                    option_tpl: 'title',
                    data: {
                        sheet: {
                            fontSize: '36px'
                        }
                    }
                },
                title: {
                    name: '标题',
                    icon: 'edit',
                    data: {
                        sheet: {
                            fontSize: '24px'
                        }
                    }
                },
                small_title: {
                    name: '小标题',
                    icon: 'edit',
                    option_tpl: 'title',
                    data: {
                        sheet: {
                            fontSize: '12px'
                        }
                    }
                },
                content: {
                    name: '正文',
                    icon: 'edit',
                    option_tpl: 'title',
                    data: {
                        sheet: {
                            fontSize: '24px'
                        }
                    }
                }
            }
        }
    }
}