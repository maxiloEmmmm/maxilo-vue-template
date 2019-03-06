<template>
    <div class="ysz-list-item-center">
        <div class="ysz-list-item-center__left"><slot name="left"></slot></div>
        <div class="ysz-list-item-center__center"><slot></slot></div>
        <div class="ysz-list-item-center__right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    name: 'tListItemCenter'
}
</script>


<style lang="scss" scoped>
    .ysz-list-item-center {
        display: flex;
        align-items: center;

        & > .ysz-list-item-center__center {
            flex-grow: 1;
            display: flex;
            justify-content: center;
        } 
    }
</style>

