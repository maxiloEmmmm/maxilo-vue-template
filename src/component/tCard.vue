<template>
    <div class="mxl-t-card">
        <div class="header">
            <div>
                {{title}}<slot name="header"></slot>
            </div>
            <div>
                <a-li-font icon="guanbi" @click="e => $emit('close', e)"></a-li-font>
            </div>
        </div>
        <div class="body">
            <slot></slot>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
export default {
    name: 'tCard',
    props: {
        title: {default: ''},
        action_align: {default: 'right'},
    }
}
</script>

<style lang="scss">
    .mxl-t-card {
        $border: 3px solid #000;
        display: flex;
        flex-direction: column;
        border: $border;
        background: #fff;
        .header, .footer {
            height: 26px;
            color: #000;
            font-weight: 700;
        }
        .header {
            border-bottom: $border;
            display: flex;
            align-items: center;
            padding: 0 0.45em;
            justify-content: space-between;
        }
        .footer {border-top: $border;}
        .body {
            flex: 1 0 auto;
            padding: 10px;
        }
    }
</style>
