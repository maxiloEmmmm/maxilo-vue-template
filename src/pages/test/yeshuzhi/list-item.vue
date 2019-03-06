<template>
    <div>
        <div>
            <h4>ysz-list-item</h4>
            <div class="block">
                <t-list>
                    <div>
                        <h5>基本</h5>
                        <div class="ysz-list-item">
                            <div class="ysz-list-item__left-item">1</div>
                            <div class="ysz-list-item__right-item">2</div>
                        </div>
                    </div>
                    <div>
                        <h5>.left 偏左</h5>
                        <div class="ysz-list-item ysz-list-item__left">
                            <div class="ysz-list-item__left-item">1</div>
                            <div class="ysz-list-item__right-item">2</div>
                        </div>
                        <h5>.center 中间</h5>
                        <div class="ysz-list-item ysz-list-item__center">
                            <div class="ysz-list-item__left-item">1</div>
                            <div class="ysz-list-item__right-item">2</div>
                        </div>
                    </div>
                    <div>
                        <h5>.start/end 垂直对齐 - 默认居中</h5>
                        <div class="ysz-list-item ysz-list-item__start">
                            <div class="ysz-list-item__left-item">.start</div>
                            <div class="ysz-list-item__right-item">
                                <div style="height:40px">2</div>
                            </div>
                        </div>
                        <hr>
                        <div class="ysz-list-item ysz-list-item__end">
                            <div class="ysz-list-item__left-item">.end</div>
                            <div class="ysz-list-item__right-item">
                                <div style="height:40px">2</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5>.left/right-item-center/end 内容对齐 - 默认起始</h5>
                        <div class="ysz-list-item ysz-list-item__right-item-center">
                            <div class="ysz-list-item__left-item">1</div>
                            <div class="ysz-list-item__right-item">.right-item-center</div>
                        </div>
                        <hr>
                        <div class="ysz-list-item ysz-list-item__right-item-end">
                            <div class="ysz-list-item__left-item">1</div>
                            <div class="ysz-list-item__right-item">.right-item-end</div>
                        </div>
                    </div>
                    <div>
                        <h5>.no-p 去除预留填充</h5>
                        <div class="ysz-list-item ysz-list-item__no-p">
                            <div class="ysz-list-item__left-item">1</div>
                            <div class="ysz-list-item__right-item">2</div>
                        </div>
                    </div>
                </t-list>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'yszListItem'
}
</script>

