<template>
    <t-list-item>
        <span slot="left"><slot name="avatar"></slot></span>
        <t-list-item :left="true">
            <t-list-item-top :no-tm="true" slot="left">
                <slot slot="top" name="title"></slot>
                <slot></slot>
            </t-list-item-top>
            <slot name="action"></slot>
        </t-list-item>
    </t-list-item>
</template>

<script>
export default {
    name: 'tListItemMedia'
}
</script>

