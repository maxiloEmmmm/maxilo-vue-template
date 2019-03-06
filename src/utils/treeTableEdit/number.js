import maxiloVue from 'maxilo-vue';
maxiloVue.utils.add('treeTableEdit.number', function treeTableEditNumber(core, target, eq = true){
    if (target._name !== '<TreeItem>') {
        return ;
    }
    let alias = target._alias;
    let count = 0;

    target.data.forEach(v => {
        count += core.d[v[alias.primaryKey]] === undefined || core.d[v[alias.primaryKey]] === '' ? 0 : parseFloat(core.d[v[alias.primaryKey]]);
    });

    let pCount = core.d[target.instance[alias.primaryKey]] === undefined ? 0 : core.d[target.instance[alias.primaryKey]];
    if ((count < pCount) || eq) {
        core.$set(core.d, target.instance[alias.primaryKey], count);
        treeTableEditNumber(core, target.$parent, eq);
    }
});