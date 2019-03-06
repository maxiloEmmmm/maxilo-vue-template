<template>
    <div class="mxl-report-grid-line" ref="core">
        <div class="mxl-report-grid-x-line" v-for="i in _x_nums" :key="'x'+i" :style="{top: step*i+'px'}"></div>
        <div class="mxl-report-grid-y-line" v-for="i in _y_nums" :key="'y'+i" :style="{left: step*i+'px'}"></div>
    </div>
</template>

<style>
    .mxl-report-grid-line {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .mxl-report-grid-x-line, .mxl-report-grid-y-line {
        position: absolute;
        background: #cecece;
    }
    .mxl-report-grid-x-line {
        height: 1px;
        width:100%;
        left: 0;
    }
    .mxl-report-grid-y-line {
        width: 1px;
        height:100%;
        top: 0;
    }
</style>

<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        props: {
            step: {
                default: 50
            }
        },
        computed: {
            ...mapState('report/view/wrapper', {
                _area_w: state => state.area.w,
                _area_h: state => state.area.h
            }),
            _x_nums(){
                let x = Math.floor(this._area_h / this.step) - 1;
                return x < 0 ? 0 : x
            },
            _y_nums(){
                let y = Math.floor(this._area_w / this.step) - 1
                return y < 0 ? 0 : y
            }
        }
    }
</script>
