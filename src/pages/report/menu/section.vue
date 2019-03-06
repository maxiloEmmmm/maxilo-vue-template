<template>
    <t-list class="column wrapper">
        <t-list class="column title">
            <div 
                v-for="(config, index) in _out_configs" 
                :key="index"
                :style="{fontSize: config.content.sheet.fontSize}"
                @mousedown.stop="$emit('makeItem', {
                    instance: config
                }, $event)">
                {{ config.metedata.name }}</div>
        </t-list>
        <div class="search">
            <a-input-search
                @search="doSearch"
                />
        </div>
        <a-tabs class="content" defaultActiveKey="all" size="small" :tabBarGutter="0">
            <a-tab-pane class="" tab="全部" key="all">全部</a-tab-pane>
            <a-tab-pane class="" tab="简约" key="simple">简约</a-tab-pane>
            <a-tab-pane class="" tab="现在" key="now">现在</a-tab-pane>
        </a-tabs>
    </t-list>
</template>

<script>
export default {
    methods: {
        doSearch(v){
            //do delay 200ms.
        }
    },
    computed: {
        _out_configs(){
            return this._configs.map(v => {
                v.metedata.kind = 'section'
                v.metedata.type = 'title'
                return v;
            });
        },
        _configs(){
            return [
                {
                    metedata: {
                        name: '大标题',
                        area: {
                            w: '480px',
                            h: '32px'
                        }
                    },
                    content: {
                        sheet: {
                            fontSize: '45px',
                        }
                    }
                },
                {
                    metedata: {
                        name: '标题',
                        area: {
                            w: '480px',
                            h: '32px'
                        }
                    },
                    content: {
                        sheet: {
                            fontSize: '32px',
                        }
                    }
                },
                {
                    metedata: {
                        name: '小标题',
                        area: {
                            w: '480px',
                            h: '32px'
                        }
                    },
                    content: {
                        sheet: {
                            fontSize: '22px',
                        }
                    }
                },
                {
                    metedata: {
                        name: '正文内容',
                        area: {
                            w: '480px',
                            h: '32px'
                        }
                    },
                    content: {
                        sheet: {
                            fontSize: '12px',
                        }
                    }
                }
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
    .wrapper {
        & > * {
            width: 100%;
        }
        & > .content > .ant-tabs-content {
            & > .ant-tabs-tabpane {
                padding: 4px !important;
            }
        }
        & > .title {
            text-align: center;
            font-weight:700;
        }
        & > .search {
            padding: 4px 10px;
        }
    }
</style>

