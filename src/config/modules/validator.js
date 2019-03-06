import maxiloVue from 'maxilo-vue';

/* 
添加验证器
maxiloVue.validator.addRule('test', {
    getMessage: (v, args) => 'Error.',
    validate: (value, args) => {
        return !!value;
    }
}); */

maxiloVue.validator.addRule('existPrimary', {
    getMessage: (v, args) => '已存在.',
    validate: (value, args) => {
        return new Promise(async (ok, nok) => {
            let response = await maxiloVue.http.instance.get(args[0] + '/' + value + '/exist');
            ok(response.status !== 404);
        });
    }
});

maxiloVue.validator.addRule('tel', {
    getMessage: (v, args) => '必须为电话.',
    validate: (value, args) => {
        return /^[0-9]{13}$/.test(value)
    }
});

maxiloVue.validator.addLocalize('zh_cn', {
    length: (v, args) => '长度必须为' + args[0] + '个字符',
    min: (v, args) => '长度至少' + args[0] + '个字符',
    max: (v, args) => '长度不可以超过' + args[0] + '个字符',
    required: (v) => '必填',
    email: v => v + '格式错误, 应该就像是something@org.com',
    checked: (v) => '未选择',
    select: (v) => '未选择',
    alpha_num: v => '只为英文字母或数字',
    existPrimary: v => '已存在',
    tel: v => '必须为电话'
});