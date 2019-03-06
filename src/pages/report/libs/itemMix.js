import reportCategoryAdapter from './category_adapter';
import { mapState } from 'vuex';
import merge from 'lodash/merge';
import default_config from './default';
export default {
    components: reportCategoryAdapter,
    data(){
        return {
            primary_key: null,
            area: {
                w: 0,
                h: 0,
                p: {
                    t: 0,
                    r: 0,
                    b: 0,
                    l: 0
                }
            }
        }
    },
    methods: {
        // 获取设置
        getOption(){
            return {
                content: {
                    sheet: this.$refs.content.getSheetData(),
                    otherData: this.$refs.content.getOtherData()
                },
                metedata: this.$utils._.merge({}, this.instance.metedata, {
                    area: this.area
                })
            }
        },
        // 填充设置
        setOption(){

        },
        pf(d, de = 0){
            d = parseFloat(d);
            return isNaN(d) ? de : d;
        }, 
        editAction(d){
            this._editAction(d);
            this._do_editAction();
        },
        _do_editAction(){
            this.$refs.content.resize && this.$refs.content.resize(this.getArea());
        },
        _editAction(d) {
            if(d.w !== undefined) {
                this.setAreaW(this.pf(this._a_w) + d.w + 'px');
            }

            if(d.h !== undefined) {
                this.setAreaH(this.pf(this._a_h) + d.h + 'px');
            }

            if(d.p !== undefined) {
                if(d.p.l !== undefined) {
                    this.setAreaPL(this.pf(this._a_p_l) + d.p.l + 'px');
                }

                if(d.p.t !== undefined) {
                    this.setAreaPT(this.pf(this._a_p_t) + d.p.t + 'px');
                }
            }
        },
        dbAction(){
            this.$refs.content.dbAction && this.$refs.content.dbAction();
        },
        isNo(a){
            return a === null || a === undefined || a === ''
        },
        setAreaPT(t){
            this.$set(this.area.p, 't', t);
        },
        setAreaPR(r){
            this.$set(this.area.p, 'r', r);
        },
        setAreaPB(b){
            this.$set(this.area.p, 'b', b);
        },
        setAreaPL(l){
            this.$set(this.area.p, 'l', l);
        },
        setAreaW(w){
            this.$set(this.area, 'w', w);
        },
        setAreaH(h){
            this.$set(this.area, 'h', h);
        },
        setArea(area, init = true){
            if(init) {
                if(!area) area = {}
                area = merge(this._default_area_s_config, area)
            }else if(!area) {
                return ;
            }
            if(area.w !== undefined) {
                this.setAreaW(area.w);
            }
            if(area.h !== undefined) {
                this.setAreaH(area.h);
            }
            if(area.p !== undefined) {
                if(area.p.t !== undefined) {
                    this.setAreaPT(area.p.t);
                }
                if(area.p.r !== undefined) {
                    this.setAreaPR(area.p.r);
                }
                if(area.p.b !== undefined) {
                    this.setAreaPB(area.p.b);
                }
                if(area.p.l !== undefined) {
                    this.setAreaPL(area.p.l);
                }
            }
        },
        getArea(){
            return {
                w: this._a_w,
                h: this._a_h,
                p: {
                    l: this._a_p_l,
                    t: this._a_p_t
                }
            }
        },
        getInstance(){
            return this.instance
        },
        init(nativeEvent){
            console.log('item will init')
            this.setArea(this.instance.metedata.area)
            // 根据鼠标及画布计算偏移量
            this.setAreaPL(nativeEvent.pageX - this._design_content_l + 'px')
            this.setAreaPT(nativeEvent.pageY - this._design_content_t + 'px');
            this.$refs.content.init && this.$refs.content.init(this.instance.content, this.getArea());
        }
    },
    computed: {
        _style(){
            return {
                wrapper: {
                    width: this.pf(this._a_w)*this._g_s+'px',
                    height: this.pf(this._a_h)*this._g_s+'px',
                    left: this.pf(this._a_p_l)*this._g_s+'px',
                    top: this.pf(this._a_p_t)*this._g_s+'px'
                }
            };
        },
        _a_w(){
            return !this.area.w 
            ? this._g_a_w
            : this.area.w
        },
        _a_h(){
            return this.area.h;
        },
        _a_p_t(){
            return this.area.p.t;
        },
        _a_p_l(){
            return this.area.p.l;
        },
        _item_type(){
            return 'r' + '-' + this.instance.metedata.kind + '-' + (this.instance.metedata.kind == 'chart' ? 'normal' : this.instance.metedata.type);
        },
        _default_config(){
            let t = default_config[this.instance.metedata.kind][this.instance.metedata.type]
            return !t ? default_config[this.instance.metedata.kind].default : t
        },
        _default_area_s_config(){
            return this._default_config.area ? this._default_config.area.s : {}
        },
        _active(){
            return !!this.instance && Object.keys(this.instance).length != 0
        },
        ...mapState('report/view/wrapper', {
            _g_a_w: state => state.area.w,
            _g_s: state => state.scale,
            _design_content_t: state => state.content.area.p.t,
            _design_content_l: state => state.content.area.p.l,
        })
    },
    watch: {
        async _g_s(){
            await this.$nextTick();
            this._do_editAction();
        }
    },
    props: {
        instance: {
            default(){
                return false;
            }
        }
    }
}