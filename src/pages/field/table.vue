<template>
    <mxl-row-col-with-wrapper>
        <mxl-table :ths="_ths" :url="_api_user" :async="{responseFormat: d => d.data}">
            <span slot="id-slot" slot-scope="props">{{ props.index+1 }}</span>
            <mxl-btn-group slot="opear-slot" slot-scope="props">
                <mxl-btn></mxl-btn>
            </mxl-btn-group>
        </mxl-table>
    </mxl-row-col-with-wrapper>
</template>

<script>
    import {FIELD_ACTION} from 'api/maxiloPhp/admin.js';
    export default {
        computed: {
            _api_user(){
                return FIELD_ACTION.INDEX;
            },
            _ths(){
                return [
                    {title: 'ID', tdSlot: 'id-slot'},
                    {field: 'name', title: '表名'},
                    {title: '操作', tdSlot: 'opear-slot'}
                ]
            }
        }
    };
</script>