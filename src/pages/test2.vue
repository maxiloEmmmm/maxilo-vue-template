<template>
    <div class="container-fluid">
        <mxl-row-col>
            <mxl-inline-form>
                <mxl-list-in-line>
                    <div>1</div>
                    <div>1</div>
                    <mxl-inline-form-group>
                        <mxl-input>dwjidjiwjdiw</mxl-input>
                    </mxl-inline-form-group>
                </mxl-list-in-line>
            </mxl-inline-form>
        </mxl-row-col>
    </div>
</template>


<script>
export default {
    data(){
        return {
            s: 0,
            hi: null
        }
    },
    mounted () {
        setInterval(() => {
            this.s++;
        }, 500);
    },
    methods: {
        test(){
            console.log(arguments, 1);
        }
    }
}
</script>
