<template>
    <div style="height:100vh" @click="hide">
        <button @click="toggleMode">切换模式: {{alone ? '单' : '多'}}</button>
        <button @click="empty">清空</button>
        <div @click.stop="toggleOpear" class="wrapper">
            <span v-if="alone">{{_view[0] ? _view[0].label : ''}}</span>
            <span v-else v-for="(c, index) in _view" :key="index">{{ c.label  }} <button @click="del(c)">shan</button></span>
        </div>
        <ul v-show="is_opear">
            <li 
                v-for="(item, index) in items" 
                :key="index"
                :class="core.includes(index) ? 'selected' : ''"
                @click="touch(index)">{{ item.label }}</li>
        </ul>
    </div>
</template>
<style >
    .selected {
        background: #cecece;
    }
    .wrapper {
        width: 500px;
        height: 32px;
        border: 3px dashed #cecece;
        border-radius: 4px;
    }
</style>
<script>
export default {
    data(){
        return {
            items: [
                {label: '选项1', value: 1},
                {label: '选项2', value: 2},
                {label: '选项3', value: 3}
            ],
            core: [],
            is_opear: false,
            alone: true
        }
    },
    computed: {
        _view(){
            return this.items.filter((v, i) => this.core.includes(i));
        }
    },
    methods: {
        toggleOpear(){
            this.is_opear = !this.is_opear;
        },
        touch(index){
            if(this.core.includes(index)) {
                return 
            }
            if(this.alone) {
                this.core = [index];
            }else {
                this.core.push(index)
            }
        },
        toggleMode(){
            this.alone = !this.alone;
        },
        del(d){
            let index = this.items.findIndex(v => v.value == d.value);
            this.core = this.core.filter(v => v != index);
        },
        empty(){
            this.core = [];
        },
        hide(){
            this.is_opear = false
        }
    }
}
</script>
