const insertUpdate = function (vue, fieldsKey = 'dataForm', viewKey = 'dataView'){
    this.vueInstance = vue;
    this.mode = 'insert';
    this.attribute = [];
    this.modeOmit = [];

    this.fill = async (ds) => {
        await this.vueInstance.$nextTick();
        Object.keys(this.vueInstance[fieldsKey]).forEach(v => {
            this.vueInstance.$set(this.vueInstance[fieldsKey], v, ds[v]);
        });
        return this;
    }

    this.change = async (mode, data = {}) => {
        await this.vueInstance.$nextTick();
        this.mode = mode;
        /* 表单存储 */
        let filter = this.modeOmit[mode] !== undefined ? this.modeOmit[mode] : [];
        let attrs = this.attribute.filter(v => filter.indexOf(v) === -1);
        attrs.forEach(v => {
            this.vueInstance.$set(this.vueInstance[fieldsKey], v, data[v] !== undefined ? data[v] : '');
        });
        await this.vueInstance.$nextTick();

        /* 表单显示 */
        // this.vueInstance[viewKey] = {};
        // Object.keys(this.vueInstance[fieldsKey]).forEach(v => {
        //     this.vueInstance.$set(this.vueInstance[viewKey], v, true);
        // });
        return this;
    };
};

export default insertUpdate;