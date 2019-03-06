<template>
    <t-list class="column wrapper">
        <t-list class="example">
            <div v-for="(shape, i) in _shapes" 
                    :key="i" 
                    class="shape-menu-example"
                    @mousedown.stop="$emit('makeItem', {
                        instance: shape
                    }, $event)">
                <component :ref="'item'+i" :is="'r-shape-'+shape.type"></component>    
            </div>
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
import shape from '../libs/category_adapter/shape';

export default {
    components: {
        ...shape
    },
    data(){
        return {
            shapes: [
                {type: 'line'},
                {type: 'triangle'},
                {type: 'line'},
                {type: 'triangle'},
                {type: 'line'},
                {type: 'triangle'}
            ]
        }
    },
    computed: {
        _shapes(){
            return this.shapes.map(v => {
                v.kind = 'shape';
                return v;
            })
        }
    },
    mounted(){
        this.shapes.forEach((v, i) => {
            this.$refs['item'+i][0].init();
        });
    },
    methods: {
        doSearch(v){
            //do delay 200ms.
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        & > .example {
            flex-wrap: wrap;
            justify-content: start;
        }
        & > * {
            width: 100%;
        }
        & > .content > .ant-tabs-content {
            & > .ant-tabs-tabpane {
                padding: 4px !important;
            }
        }
        & > .search {
            padding: 4px 10px;
            margin-top: 10px;
        }
        .shape-menu-example {
            position: relative;
            flex: 0 0 20%;
            height: 25px;
            padding: 8px;
        }
    }
</style>

