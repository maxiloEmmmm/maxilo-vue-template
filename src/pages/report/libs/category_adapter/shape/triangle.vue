<template>
    <svg style="width:100%;height:100%;" ref="core" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" opacity="1">
        <polygon :points="points" fill="rgba(96,186,243,1)" stroke-width="0" stroke="rgba(122,197,245,1)"></polygon>
    </svg>
</template>

<script>
    export default {
        methods: {
            resize(d){
                if(!d) {
                    d = {
                        w: this.$refs.core.clientWidth,
                        h: this.$refs.core.clientHeight
                    };
                }
                this.x = this.$utils.tool.pf(d.w);
                this.y = this.$utils.tool.pf(d.h);
            },
            init(instance, area){
                this.resize(area);
            }
        },
        computed: {
            points(){
                return [
                    [this.x/2, 0],
                    [0, this.y],
                    [this.x, this.y]
                ].map(v => v.join(',')).join(' ');
            }
        },
        data(){
            return {
                x: 0,
                y: 0
            }
        }
    }
</script>