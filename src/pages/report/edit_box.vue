<template>
    <div @dblclick="dbAction" tabindex="1" @click.stop="toC" class="mxl-edit-box" :class="[editing ? 'editing' : '', air ? 'mxl-air' : '']" :style="_style.area" @mousedown="toM">
        <span class="mxl-edit-box-point r" @mousedown="toR($event, 'r')"></span>
        <span class="mxl-edit-box-point b" @mousedown="toR($event, 'b')"></span>
        <span class="mxl-edit-box-point br" @mousedown="toR($event, 'br')"></span>
    </div>
</template>

<style>

</style>


<script>
import { mapState } from 'vuex';
export default {
    data(){
        return {
            area: {
                w: 0,
                h: 0,
                p: {
                    l: 0,
                    t: 0
                }
            },
            move: {
                x: 0,
                y: 0
            },
            mode: '',
            resing: false,
            draging: false,
            editing: false,
            air: false
        }
    },
    computed: {
        _style(){
            return {
                area: {
                    width: this.$utils.tool.pf(this.area.w)*this._g_s+10+'px',
                    height: this.$utils.tool.pf(this.area.h)*this._g_s+10+'px',
                    left: this.$utils.tool.pf(this.area.p.l)*this._g_s-5+'px',
                    top: this.$utils.tool.pf(this.area.p.t)*this._g_s-5+'px',
                    outline: 'none',
                    zIndex: 99999
                },
            }
        },
        ...mapState('report/view/item', {
            _item: state => state.item
        }),
        ...mapState('report/view/wrapper', {
            _g_s: state => state.scale
        })
    },
    methods: {
        toC(){
        },
        init(nativeEvent){
            this.addView()
            this.setArea()
            //this.toM(e);
        },
        addAir(){
            this.air = true;
        },
        removeAir(){
            this.air = false
        },
        dbAction(){
            this.$emit('dbClick');
        },
        removeView(){
            this.editing = false
            this.$set(this.area, 'h', 0);
        },
        addView(){
            this.editing = true
        },
        setArea(){
            this.area = this.$utils._.merge({}, this.area, this._item.getArea());
        },
        toR(e, mode){
            this.mode = mode
            let ev = e;
            this.move = {
                x: ev.pageX,
                y: ev.pageY
            };
            window.addEventListener('mousemove', this.tranformR);
            window.addEventListener('mouseup', this.removeR);
        },
        toM(e){
            let ev = e;
            this.move = {
                x: ev.pageX,
                y: ev.pageY
            };
            console.log('will move');
            window.addEventListener('mousemove', this.doM);
            window.addEventListener('mouseup', this.removeM);
        },
        tranformR(e){
            this.resing = true;
            let ev = e;
            switch(this.mode) {
                case 'r': {
                    this.doR(ev);
                }break;
                case 'b': {
                    this.doB(ev);
                }break;
                case 'br': {
                    this.doBR(ev);
                }break;
            }
        },
        removeR(e){
            let instance = this._item.getInstance();
            if(!this.resing) {
                this.editing = false;
                this.$set(this.area, 'h', 0);
                this._item.triggleClick(e);
            }
            window.removeEventListener('mousemove', this.tranformR);
            window.removeEventListener('mouseup', this.removeR);
            this.resing = false;
        },
        removeM(e){
            let instance = this._item.getInstance();
            if(!this.draging) {
                this.editing = false;
                this.$set(this.area, 'h', 0);
                this._item.triggleClick(e);
            }
            window.removeEventListener('mousemove', this.doM);
            window.removeEventListener('mouseup', this.removeM);
            this.draging = false;
        },
        doR(e){
            let ev = e;
            let range = ev.pageX - this.move.x;
            this.$set(this.area, 'w', this.$utils.tool.pf(this.area.w) + range + 'px');
            this.$set(this.move, 'x', ev.pageX);
            this.change({w: range});
        },
        doB(e){
            let ev = e;
            let range = ev.pageY - this.move.y;
            this.$set(this.area, 'h', this.$utils.tool.pf(this.area.h) + range + 'px');
            this.$set(this.move, 'y', ev.pageY);
            this.change({h: range});
        },
        doBR(e){
            this.doR(e);
            this.doB(e);
        },
        doM(e){
            this.draging = true;
            let ev = e;
            let rangeX = ev.pageX - this.move.x;
            let rangeY = ev.pageY - this.move.y;
            this.$set(this.area.p, 'l', this.$utils.tool.pf(this.area.p.l) + rangeX + 'px');
            this.$set(this.area.p, 't', this.$utils.tool.pf(this.area.p.t) + rangeY + 'px');
            this.move = {
                x: ev.pageX,
                y: ev.pageY
            };
            this.change({p: {
                t: rangeY,
                l: rangeX
            }});
        },
        change(d = {}){
            this.$emit('change', this.$utils._.merge({}, {
                w: 0,
                h: 0,
                p: {
                    t: 0,
                    l: 0
                }
            }, d))
        }
    }
};
</script>
