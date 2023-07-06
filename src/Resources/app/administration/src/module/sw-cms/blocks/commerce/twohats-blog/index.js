import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'twohats-blog',
    category: 'commerce',
    label: 'Blog',
    component: 'sw-cms-block-twohats-blog',
    previewComponent: 'sw-cms-preview-twohats-blog',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        twoHatBlog: 'twohats-blog'
    }
});