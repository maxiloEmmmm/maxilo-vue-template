<template>
    <select></select>
</template>

<script>
export default {
    async mounted(){
        let q = await this.$http.get('')
    }
}
</script>
