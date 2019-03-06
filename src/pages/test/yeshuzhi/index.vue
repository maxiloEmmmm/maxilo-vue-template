<template>
    <div class="example">
        <t-list>
            <ysz-list-item></ysz-list-item>
            <ysz-list-item-top></ysz-list-item-top>
            <ysz-list-item-center></ysz-list-item-center>
        </t-list>
    </div>
</template>


<style lang="scss">
    .block {
        padding-left: 10px;
    }
    $borer: 1px solid #000;
    .example {
        .ysz-list-item {
            .ysz-list-item__left-item {
                border: 1px solid blue;
            }
            .ysz-list-item__right-item {
                border: 1px solid green;
            }
        }
        .ysz-list-item-top {
            .ysz-list-item-top__top-item {
                border: 1px solid blue;
            }
            .ysz-list-item-top__bottom-item {
                border: 1px solid green;
            }
        }
        .ysz-list-item-center {
            .ysz-list-item-center__left {
                border: 1px solid blue;
            }
            .ysz-list-item-center__center-item {
                border: 1px solid green;
            }
            .ysz-list-item-center__right-item {
                border: 1px solid red;
            }
        }
    } 
</style>

<script>
import listItem from './list-item'
import listItemTop from './list-item-top'
import listItemCenter from './list-item-center'
export default {
    components: {
        [listItem.name]: listItem,
        [listItemTop.name]: listItemTop,
        [listItemCenter.name]: listItemCenter,
    }
}
</script>

