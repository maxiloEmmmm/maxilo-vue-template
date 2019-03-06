<template>
    <mxl-dashboard :nav="nav">
        <template slot="footer_right">123</template>
    </mxl-dashboard>
</template>

<script>
export default {
    data(){
        return {
            items: [
                {title: '角色管理', hasChild: 1, icon: 'fa fa-check', children: [
                    {title: '角色', href: '/system/rbac/role', icon: 'fa fa-times'},
                ]},
                {title: '用户管理', hasChild: 1, children: [
                    {title: '用户', href: '/system/user'},
                    {title: '用户组', href: '/system/user-group'}
                ]},
                {title: '通用模型', href: '/curd'},
                {title: '测试业务 - 文章', href: '/post'},
                {title: '待开发 - 权限管理'}
            ]
        };
    },
    computed: {
        nav() {
            return {
                items: this.items
            }
        }
    }
}
</script>

