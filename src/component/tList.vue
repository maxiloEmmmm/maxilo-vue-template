<script>
export default {
    name: 'tList',
    props: {
        row: {
            type: Boolean,
            default: false
        }
    },
    functional: true,
    render(h, instance) {
        if(!instance.children) {
            instance.children = []
        }
        let child_nums = instance.children.length
        let direction = !instance.props.row ? 'column' : 'row'
        return h('div', {
            class: {
                'ysz-list':  true,
                'ysz-list__row': instance.props.row,
            }
        }, instance.children.map((val, k) => {
            let isLast = child_nums == (k+1)
            return h('div', {
            class: {
                ['ysz-list__' + direction + '-wrapper']: true,
                'ysz-list__wrapper-last': isLast
            }
        }, [instance.parent.$utils.tool.getSlot(instance.children, k, h)])
        }));
    }
}
</script>