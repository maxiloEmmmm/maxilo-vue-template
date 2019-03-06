<template>
    <div>
        <div :style="_style.target" ref="target">
            <slot></slot>
        </div>
        <div :style="_style.window" ref="window">
            <slot name="sub"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tFixed',
    data(){
        return {
            d: {
                v_width: 200,
                v_height: 300,
                w_width: 50,
                w_height: 50,
                t_top: 70,
                t_left: 70,
                t_bottom: 70,
                t_width: 0,
                t_height: 0
            },
            no_s: false
        };
    },
    mounted(){
        this.$set(this.d, 'v_width', document.body.clientWidth);
        this.$set(this.d, 'v_height', document.body.clientHeight);
        window.addEventListener('resize', () => {
            this.$set(this.d, 'v_width', document.body.clientWidth);
            this.$set(this.d, 'v_height', document.body.clientHeight);
        });
        this.$utils.tool.resize(this.$refs.window, (obj) => {
            this.$set(this.d, 'w_width', obj.width);
            this.$set(this.d, 'w_height', obj.height);
        });
        let rect = this.$refs.target.getBoundingClientRect();
        console.log(rect);
        this.$set(this.d, 't_width', rect.width);
        this.$set(this.d, 't_height', rect.height);
        this.$set(this.d, 't_left', rect.left);
        this.$set(this.d, 't_top', rect.top);
        this.$set(this.d, 't_bottom', rect.bottom);
    },
    methods: {
        r(s){
            console.log('resize: ', s)
        },
        getPosition(w){
            let top = 0;
            let left = 0;
            switch(w){
                case 't': {
                    left = this.d.t_left;
                    top = this._space_max.t.h - this.d.w_height;
                }break;
                case 'b': {
                    left = this.d.t_left;
                    top = this.d.v_height - this._space_max.b.h;
                }break;
                case 'l': {
                    left = this._space_max.l.w - this.d.w_width;
                    top = this.d.t_top;
                }break;
                case 'r': {
                    left = this.d.v_width - this._space_max.r.w;
                    top = this.d.t_top;
                }break;
                case 'tl': {
                    left = this.d.t_left - this.d.w_width;
                    top = this._space_max.tl.h - this.d.w_height;
                }break;
                case 'tr': {
                    left = this.d.t_left + 16;
                    top = this._space_max.tr.h - this.d.w_height;
                }break;
                case 'bl': {
                    left = this._space_max.bl.w - this.d.w_width;
                    top = this.d.t_top + 16;
                }break;
                case 'br': {
                    left = this.d.t_left + 16;
                    top = this.d.t_top + 16;
                }
            }
            return {
                left,
                top
            }
        }
    },
    computed: {
        _space_max(){
            let right = this.d.v_width - this.d.t_left - 16,
            left = this.d.t_left,
            top = this.d.t_top,
            bottom = this.d.v_height - this.d.t_top -16;
            return {
                tl: {
                    w: left,
                    h: top
                },
                tr: {
                    w: right,
                    h: top
                },
                bl: {
                    w: left,
                    h: bottom
                },
                br: {
                    w: right,
                    h: bottom
                },
                t: {
                    h: top,
                    w: this.d.v_width
                },
                l: {
                    h: this.d.v_height,
                    w: left
                },
                r: {
                    w: right,
                    h: this.d.v_height
                },
                b: {
                    w: this.d.v_width,
                    h: bottom
                }
            }
        },
        _ok_space(){
            return Object.keys(this._space_max).filter(v => {
                return this._space_max[v].w >= this.d.w_width
                && this._space_max[v].h >= this.d.w_height
            });
        },
        _one_space(){
            let res = ['tr', 'tl', 'bl', 'br'].filter(v => this._ok_space.includes(v)).shift();
            return this.getPosition(res === undefined ? 'r' : res)
        },
        _style(){
            return {
                target: {
                    position: 'absolute',
                    top: 70 + 'px',
                    left: 70 + 'px',
                },
                window: {
                    border: '3px solid #000',
                    width: this.d.w_width + 'px',
                    height: this.d.w_height + 'px',
                    position: 'fixed',
                    top: this._one_space.top + 'px',
                    left: this._one_space.left + 'px',
                }
            }
        }
    }
};
</script>

<style>
    input {
        width: 120px !important;
    }
    .no_s {
        width: 100px;
        height: 100px;
    }
</style>


