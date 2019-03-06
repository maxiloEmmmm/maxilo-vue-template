import { mapState } from 'vuex';
export default {
    props: {
        instance: {
            default(){
                return null;
            }
        }
    },
    computed: {
        ...mapState('report/view/item', {
            _item: state => state.item
        }),
        _instance_param(){
            if(this.$utils._.get(this.instance, 'param.metedata.items', false)) {
                return this.$utils._.merge(
                    {},
                    this.$utils._.get(this.instance, 'param.metedata', {}),
                    {items: []}
                )
            }
            return this.instance.param
        },
        _is_group_item(){
            return this._instance_param.metedata.is_group_item;
        },
        _group_item_key(){
            return this._instance_param.metedata.group_item_key;
        }
    },
    methods: {
        getOption(){
            return this._getOption ? this._getOption() : {};
        },
        setOption(d){
            this._setOption && this._setOption(d);
        },
        setDom(method, ...param){
            if(this._is_group_item && this._item._name == "<MxlReportGroupItem>") {
                this._item.$refs['item'+this._group_item_key][0].$refs.content[method](...param);
            }else {
                this._item.$refs.content[method](...param);
            }
        }
    }
}