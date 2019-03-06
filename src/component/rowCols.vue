<template>
    <mxl-row>
        <mxl-cols :cols="cols" :layoutModel="layoutModel" :limit="limit"><slot></slot></mxl-cols>
    </mxl-row>
</template>

<script>
export default {
    name: 'rowCols',
    props: {
        cols: {
            type: String,
            default: '12'
        },
        layoutModel: {
            type: String,
            default: 'md'
        },
        limit: {
            type: Boolean,
            default: true
        }
    },
};
</script>
