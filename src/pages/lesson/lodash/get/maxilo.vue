<template>
    <div>
        <p>
            <h2>原有对象：</h2>
            <pre style="height: 70vh;" v-html="syntaxHighlight(JSON.stringify(test_obj, null, 2))">
            </pre>
        </p>
        <p>
            <h2>结果对象：</h2>
            <pre style="height: 70vh;" v-html="syntaxHighlight(JSON.stringify(test_result_obj, null, 2))">
            </pre>
        </p>
    </div>
</template>

<style>
    pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
    .string { color: green; }
    .number { color: darkorange; }
    .boolean { color: blue; }
    .null { color: magenta; }
    .key { color: red; }
</style>

<script>
export default {
    data(){
        return {
            test_obj: {
                area: {
                    w: 0,
                    h: 0,
                    p: {
                        t: 0,
                        b: 0,
                        l: 0,
                        r: 0
                    }
                },
                tmp: {
                    test: {
                        a: [
                            {
                                b: {
                                    a: 1
                                }
                            }
                        ]
                    }
                }
            },
            test_result_obj: {}
        }
    },
    mounted(){
        this.test_result_obj = this.merge({
            tmp: {
                test: {
                    a: [
                        {
                            b: {
                                a: 2
                            }
                        }
                    ]
                }
            }
        })
    },
    methods: {
        parse_obj(path){
            return path.match(/([^.]+)/g);
        },
        parse_array(path){
            let res = path.match(/(\[([0-9]+)\])/g);
            return res === null ? [] : res;
        },
        q(option, path, d = false){
            let path_info = path.match(/([^.]+)/g);
            let tmp = null;
            for(let i = 0; i < path_info.length; i++) {
                tmp = tmp === null ? option : tmp;
                let obj_path = path_info[i].replace(/\[.*?\]/g, '');
                tmp = tmp[obj_path];

                if(tmp === undefined) {
                    break;
                }else {
                    let res = path_info[i].match(/(\[([0-9]+)\])/g);
                    let array_path_info = res === null ? [] : res;
                    for(let j = 0; j < array_path_info.length; j++) {
                        tmp = tmp[array_path_info[j].replace(/[\[\]]/g, '')];
                        if(tmp === undefined) {
                            break;
                        }
                    }
                    if(tmp === undefined) {
                        break;
                    }
                }
            }
            return tmp === undefined ? d : tmp;
        },
        syntaxHighlight( json ){
            json = json.replace( /&/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
            return json.replace( /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function ( match )
            {
                var cls = 'number';
                if ( /^"/.test( match ) )
                {
                    if ( /:$/.test( match ) )
                    {
                        cls = 'key';
                    } else
                    {
                        cls = 'string';
                    }
                } else if ( /true|false/.test( match ) )
                {
                    cls = 'boolean';
                } else if ( /null/.test( match ) )
                {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            } );
        },
        merge(option){
            if(this.q(option, 'tmp.test.a[0].b.a', null) !== null) {
                option.tmp.test.a[0].b.a *= 2;
            }
            return this.$utils._.merge({}, this.test_obj, option);
        }
    }
};
</script>
