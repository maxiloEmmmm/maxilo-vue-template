<template>
    <div class="core" ref="core">
        <div class="area">
            <a-skeleton :loading="active" active :paragraph="{rows: 14}" style="height: 100vh">
                <component 
                    :is="item.metedata.is_group ? 'mxl-report-group-item' : 'mxl-report-item'" 
                    :ref="'item'+i" 
                    :style="{zIndex: item.metedata.__z_index, outline: 'none'}"
                    v-for="(item, i) in items" 
                    :key="i" :instance="item.metedata"></component>
            </a-skeleton>
        </div>
    </div>
</template>

<script>
import draft from 'api/wbd/draft';
import item from './item'
import group_item from './group_item'
import { mapActions } from 'vuex';
export default {
    components: {
        mxlReportItem: item,
        mxlReportGroupItem: group_item
    },
    data(){
        return {
            items: [],
            active: true
        }
    },
    mounted(){
        setTimeout(this.fetch, 500);
        this.setViewScale(this.$refs.core.clientWidth / 480);
    },
    methods: {
        ...mapActions('report/view/wrapper', [
            'setViewScale'
        ]),
        fetch(){
            this.$http.get(draft.SHOW).then(({code, data}) => {
                if(code == 0) {
                    this.active = false;
                    this.items = data.items;
                }else { 
                    console.log('有点问题.');
                    this.fetch();
                }
            });
        }
    }
}
</script>

<style>
body {
    background: #cecece;
}
</style>

<style lang="scss" scoped>
    .core {
        width: 100%;
        margin: 0 auto;
        height: 2000px;
        position: relative;
        background: #fff;

        .area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>
