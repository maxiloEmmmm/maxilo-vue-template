import maxiloVueBootstrapComponentInstall from 'maxilo-vue-bootstrap-component';
import maxiloVue from 'maxilo-vue';
maxiloVueBootstrapComponentInstall(maxiloVue, {
    useAlert: true
});

import rowCols from './rowCols.vue';
maxiloVue.vue.component('mxlRowCols', rowCols);

import listItem from './listItem.vue';
maxiloVue.vue.component('mxlListItem', listItem);

import relyOnBox from './relyOnBox.vue';
maxiloVue.vue.component('mxlRelyOnBox', relyOnBox);

import dropDownBox from './dropDownBox.vue';
maxiloVue.vue.component('mxlDropDownBox', dropDownBox);

import menu from './menu.vue';
maxiloVue.vue.component('mxlMenu', menu);
import menuItem from './menuItem.vue';
maxiloVue.vue.component('mxlMenuItem', menuItem);

console.log('Some components are used antd, at: https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce/.');
import aCollapse from 'ant-design-vue/lib/collapse';
maxiloVue.vue.component(aCollapse.name, aCollapse);
import aCollapsePanel from 'ant-design-vue/lib/collapse/CollapsePanel';
maxiloVue.vue.component(aCollapsePanel.name, aCollapsePanel);
import 'ant-design-vue/lib/collapse/style/index.less'; 
import aRadioGroup from 'ant-design-vue/lib/radio/Group';
maxiloVue.vue.component(aRadioGroup.name, aRadioGroup);
import 'ant-design-vue/lib/radio/style/index.less'; 
import aCheckboxGroup from 'ant-design-vue/lib/checkbox/Group';  // for js
maxiloVue.vue.component(aCheckboxGroup.name, aCheckboxGroup);
import aCheckbox from 'ant-design-vue/lib/checkbox';  // for js
maxiloVue.vue.component(aCheckbox.name, aCheckbox);
import 'ant-design-vue/lib/checkbox/style/index.less'; 
import aSlider from 'ant-design-vue/lib/slider';  // for js
maxiloVue.vue.component(aSlider.name, aSlider);
import 'ant-design-vue/lib/slider/style/index.less'; 
import aInputNumber from 'ant-design-vue/lib/input-number';  // for js
maxiloVue.vue.component(aInputNumber.name, aInputNumber);
import 'ant-design-vue/lib/input-number/style/index.less';
import aSwitch from 'ant-design-vue/lib/switch';  // for js
maxiloVue.vue.component(aSwitch.name, aSwitch);
import 'ant-design-vue/lib/switch/style/index.less';
import aInput from 'ant-design-vue/lib/input';  // for js
maxiloVue.vue.component(aInput.name, aInput);
import 'ant-design-vue/lib/input/style/index.less';
import aInputSearch from 'ant-design-vue/lib/input/Search';  // for js
maxiloVue.vue.component(aInputSearch.name, aInputSearch);
import 'ant-design-vue/lib/input/style/search-input.less';
import aTextarea from 'ant-design-vue/lib/input/TextArea';  // for js
maxiloVue.vue.component(aTextarea.name, aTextarea);
import aPopover from 'ant-design-vue/lib/popover';  // for js
maxiloVue.vue.component(aPopover.name, aPopover);
import 'ant-design-vue/lib/popover/style/index.less';
import aTab from 'ant-design-vue/lib/tabs';  // for js
maxiloVue.vue.component(aTab.name, aTab);
import 'ant-design-vue/lib/tabs/style/index.less';
import aTabPanel from 'ant-design-vue/lib/vc-tabs/src/TabPane';  // for js
maxiloVue.vue.component('A'+aTabPanel.name, aTabPanel);
import aDivider from 'ant-design-vue/lib/divider';  // for js
maxiloVue.vue.component(aDivider.name, aDivider);
import 'ant-design-vue/lib/divider/style/index.less';
import aUpload from 'ant-design-vue/lib/upload';  // for js
maxiloVue.vue.component(aUpload.name, aUpload);
import 'ant-design-vue/lib/divider/style/index.less';
import aSkeleton from 'ant-design-vue/lib/skeleton';  // for js
maxiloVue.vue.component(aSkeleton.name, aSkeleton);
import 'ant-design-vue/lib/skeleton/style/index.less';
import aSelect from 'ant-design-vue/lib/select';  // for js
maxiloVue.vue.component(aSelect.name, aSelect);
import 'ant-design-vue/lib/select/style/index.less';
import aSelectOption from 'ant-design-vue/lib/vc-select/Option';
maxiloVue.vue.component('aSelectOption', aSelectOption);

import tListItem from './tListItem.vue';
maxiloVue.vue.component(tListItem.name, tListItem);
import tListItemTop from './tListItemTop.vue';
maxiloVue.vue.component(tListItemTop.name, tListItemTop);
import tListItemCenter from './tListItemCenter.vue';
maxiloVue.vue.component(tListItemCenter.name, tListItemCenter);
import tListItemMedia from './tListItemMedia.vue';
maxiloVue.vue.component(tListItemMedia.name, tListItemMedia);
import tListCol from './tListCol.vue';
maxiloVue.vue.component(tListCol.name, tListCol);
import aLiFont from './aLiFont.vue';
maxiloVue.vue.component(aLiFont.name, aLiFont);
import tCard from './tCard.vue';
maxiloVue.vue.component(tCard.name, tCard);
import tModal from './tModal.vue';
maxiloVue.vue.component(tModal.name, tModal);
import tModalCard from './tModalCard.vue';
maxiloVue.vue.component(tModalCard.name, tModalCard);
import tToggle from './tToggle.vue';
maxiloVue.vue.component(tToggle.name, tToggle);
import tList from './tList.vue';
maxiloVue.vue.component(tList.name, tList);
import tColor from './tColor.vue';
maxiloVue.vue.component(tColor.name, tColor);
import tActive from './tActive.vue';
maxiloVue.vue.component(tActive.name, tActive);
import tFixed from './tFixed.vue';
maxiloVue.vue.component(tFixed.name, tFixed);

//scroll
console.log('Scroll is used vuescroll, at: https://github.com/YvesCoding/vuescroll.');
import vuescroll from 'vuescroll/dist/vuescroll-native';
maxiloVue.vue.use(vuescroll);
import 'vuescroll/dist/vuescroll.css';

console.log('Some icon are used iconfont, at: https://www.iconfont.cn.');
import 'assets/fonts/iconfont/iconfont.js';
//example for dep

// maxiloVue.vue.depComponent({
//     testOne, 
//     a: b, 
//     a1: [b2,b3,b4], 
//     c: {
//         d1,
//         d2,
//         d3,
//         d4: d5
//     }
// });

//like this
// maxiloVue.vue.component('testOne', testOne);
// maxiloVue.vue.component('a', b);
// maxiloVue.vue.component(b2.name, b2);
// maxiloVue.vue.component(b3.name, b3);
// maxiloVue.vue.component(b4.name, b4);
// maxiloVue.vue.component(d1, d1);
// maxiloVue.vue.component(d2, d2);
// maxiloVue.vue.component(d3, d3);
// maxiloVue.vue.component(d4, d5);