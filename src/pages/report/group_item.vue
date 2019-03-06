<template>
    <div class="chart-box-group chart-box" @click="touchGroupItem" 
        tabindex="1"
        ref="wrapper" :style="_style.wrapper">
        <mxl-report-item @resize="itemResize" @touchItem="(a, b, c) => itemClick(c, index)" :class="select == index ? 'mxl-report-group-item-select':''" :instance="item" :ref="'item'+item.group_item_key" v-for="(item, index) in _items" :key="index"></mxl-report-item>
    </div>
</template>
<style>
    .active .mxl-report-group-item-select {
        border: 1px dashed #cecece;
    }
</style>
<script>
import itemMix from './libs/itemMix'
import item from './item'
import { mapState } from 'vuex';
export default {
    components: {
        mxlReportItem: item
    },
    // watch: {
    //     instance: {
    //         async handler(){
    //             if(this._active) {
    //                 this.setArea(this.$utils._.cloneDeep(this.instance.area));
    //                 //await this.$nextTick();
    //                 //this.$refs.content.init(this.instance, this.getArea());
    //             }
    //         },
    //         deep: true,
    //         immediate: true,
    //     }
    // },
    methods: {
        getOption(){
            return {
                content: this._items.map(v => {
                    return this.$refs['item'+v.group_item_key][0].getOption()
                }),
                metedata: this.$utils._.merge({}, this.$utils._.omit(this.instance, [
                    'icon_class',
                    'drop_event'
                ]), {area: this.area})
            };
        },
        touchGroupItem(e){
            //防止
            this.$emit('touchItem', this.instance, this, e);
        },
        changeItemOption(e, item){
            this.$emit('changeOption', item.getInstance(), item, e);
        },
        itemClick(e, index){
            //选中后再进行内部操作
            if(this._opear_child) {
                this.select = index;
                this.changeItemOption(e, this.$refs['item'+this._items[index].group_item_key][0]);
            }
        },
        dbAction(){
        },
        editAction(d){
            let p_area = this.getArea();
            this._items.forEach((v, i) => {
                let q = {p: {}};
                let area = this.$refs['item'+this._items[i].group_item_key][0].getArea();
                if(d.w !== undefined) {
                    q.w = this.pf(area.w)/this.pf(p_area.w)*this.pf(d.w)
                    if(this.pf(area.p.l) != 0) {
                        q.p.l = this.pf(area.p.l)/this.pf(p_area.w)*this.pf(d.w);
                    }
                }

                if(d.h !== undefined) {
                    q.h = this.pf(area.h)/this.pf(p_area.h)*this.pf(d.h);
                    if(this.pf(area.p.t) != 0) {
                        q.p.t = this.pf(area.p.t)/this.pf(p_area.h)*this.pf(d.h);
                    }
                }

                (d.h !== undefined || d.w !== undefined) && this.$refs['item'+this._items[i].group_item_key][0].editAction(q);
            });
            this._editAction(d);
        },
        triggleClick(e){
            let ev = e;
            //base h
            let base_h = ev.pageY - this.$utils.tool.pf(this.area.p.t) - this._design_content_t
            //find current h rang in items
            let item_len = this._items.length;
            for(let i = 0; i < item_len; i++) {
                let area = this.$refs['item'+this._items[i].group_item_key][0].getArea();
                let t = this.$utils.tool.pf(area.p.t);
                let h = this.$utils.tool.pf(area.h);
                if(base_h >= t && base_h <= (h+t)) {
                    //hook current h group click handler
                    this.$refs['item'+this._items[i].group_item_key][0].groupClick();
                    this.changeItemOption(ev, this.$refs['item'+this._items[i].group_item_key][0]);
                    this.select = i;
                    break;
                }
            }
        },
        reset(){
            this.select = -1;
        },
        changeSource(d){
            this._items.forEach((v, i) => {
                if(this.$utils._.get(v, 'data.source.key', false) !== false) {
                    this.$refs['item'+this._items[i].group_item_key][0].sourceHandler(d[v.data.source.key]);
                }
            });
        },
        _do_editAction(){},
        itemResize(obj){
            //transform for self.
            //but banber group is not care item
            // if(obj.h !== undefined) {
            //     let h = 0;
            //     this._items.forEach((v, i) => {
            //         let area = this.$refs['item'+this._items[i].group_item_key][0].getArea();
            //         h += this.pf(area.h);
            //     });
            //     this.setAreaH(h+'px');
            //     this.$emit('resize', {h: h+'px'});
            // }
        },
        init(){
            console.log('item group will init')
        }
    },
    data(){
        return {
            air: false,
            select: -1,
        }
    },
    computed: {
        _items(){
            return this.instance.items;
        },
        _opear_child(){
            return this.select !== -1;
        },
        ...mapState('report/view/wrapper', {
            _design_content_t: state => state.content.area.p.t,
        }),
    },
    mixins: [itemMix]
}
</script>
