<template>
    <div>
        <div>
            <h4>ysz-list-item-top</h4>
            <div class="block">
                <h5>基本</h5>
                <div class="ysz-list-item-top">
                    <div class="ysz-list-item-top__top-item">1</div>
                    <div class="ysz-list-item-top__bottom-item">2</div>
                </div>
            </div>
            <div class="block">
                <h5>.no-p 去除预留填充</h5>
                <div class="ysz-list-item-top ysz-list-item-top__no-p">
                    <div class="ysz-list-item-top__top-item">1</div>
                    <div class="ysz-list-item-top__bottom-item">2</div>
                </div>
                <h5>.no-tm 去除预留中间填充</h5>
                <div class="ysz-list-item-top ysz-list-item-top__no-tm">
                    <div class="ysz-list-item-top__top-item">1</div>
                    <div class="ysz-list-item-top__bottom-item">2</div>
                </div>
            </div>
            <div class="block">
                <h5>.top/bottom-item-center 内容对齐 - 默认起始</h5>
                <div class="ysz-list-item-top ysz-list-item-top__top-item-center">
                    <div class="ysz-list-item-top__top-item">.top-item-center</div>
                    <div class="ysz-list-item-top__bottom-item">2</div>
                </div>
                <hr>
                <div class="ysz-list-item-top ysz-list-item-top__top-item-end">
                    <div class="ysz-list-item-top__top-item">.top-item-end</div>
                    <div class="ysz-list-item-top__bottom-item">2</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'yszListItemTop'
}
</script>

