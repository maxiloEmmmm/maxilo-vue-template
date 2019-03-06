<script>
export default {
    name: 'tActive',
    data(){
        return {
            res: {

            },
        }
    },
    props: {
        event: {
            default: 'click'
        },
        class_key: {
            default: 'active'
        },
        relation: {
            default: null
        },
        alone: {
            default: true  
        },
        value: {
            default(){
                return {};
            }
        }
    },
    render(h){
        this.$slots.default.forEach((v, i) => {
            let model = this.$utils._.get(v, 'data.attrs.model', false) ? v.data.attrs.model : i
            v.__active_model = model;
            this.$set(this.res, model, this.res[model] === undefined ? false : this.res[model]);
            if(v.data === undefined) {
                v.data = {}
            }
            if(v.data.on === undefined) {
                v.data.on = {};
            }
            let defEvent = v.data.on[this.event];
            let hasDefEvent = defEvent !== undefined;
            v.data.on[this.event] = (e) => {
                this.$set(this.res, model, !this.res[model]);
                if(this.res[model] && this.alone) {
                    Object.keys(this.res).forEach(q => {
                        if(q != model) {
                            this.$set(this.res, q, false);
                        }
                    })
                }
                if(this.relation) {
                    this.res = this.relation(model, this.res);
                }
                this.$emit('input', this.res);
                this.$emit('click', model, this.res[model]);
                this.$slots.default.forEach(p => {
                    if(this.res[p.__active_model]) {
                        p.elm.classList.add(this.class_key);
                    }else {
                        p.elm.classList.remove(this.class_key)
                    }
                });
                if(hasDefEvent) {
                    return defEvent(e);
                }
            }; 
        });
        return h('div', this.$slots.default);
    }
}
</script>
