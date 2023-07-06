import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'twohats-blog',
    label: 'twohats-blog-cms.elements.twohats-blog.label',
    component: 'sw-cms-el-twohats-blog',
    configComponent: 'sw-cms-el-config-twohats-blog',
    previewComponent: 'sw-cms-el-preview-twohats-blog',
    defaultConfig: {
        numberOfBlogs: {
            source: 'static',
            value: '4'
        }
    }
});