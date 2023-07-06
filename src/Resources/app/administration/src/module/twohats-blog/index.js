import './acl';
import deDE from './snippet/de-DE';
import enGB from './snippet/en-GB';

const {Module} = Shopware;

import defaultSearchConfiguration from './default-search-configuration';

Shopware.Component.register('twohats-blog-list', () => import('./page/twohats-blog-list'));
Shopware.Component.register('twohats-blog-detail', () => import('./page/twohats-blog-detail'));
Shopware.Component.extend('twohats-blog-create', 'twohats-blog-detail', () => import('./page/twohats-blog-create'));
Shopware.Component.register('twohats-blog-detail-base', () => import('./component/twohats-blog-detail-base'));
Shopware.Component.register('twohats-blog-media-form', () => import('./component/twohats-blog-media-form'));

Shopware.Module.register('twohats-blog', {

    type: 'plugin',
    name: 'blog-module',
    color: '#ff3d58',
    icon: 'default-shopping-paper-bag-product',
    title: 'twohats-blog.label',
    description: 'twohats-blog.module.description',
    entity: 'twohats_blog_blog',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        index: {
            components: {
                default: 'twohats-blog-list',
            },
            path: 'index',
            alias: '/',
            meta: {
                privilege: 'blog.viewer',
            }
        },
        detail: {
            component: 'twohats-blog-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'twohats.blog.index'
            },
            props: {
                default: (route) => {
                    return {
                        blogId: route.params.id,
                    };
                },
            },
        },
        create: {
            component: 'twohats-blog-create',
            path: 'create',
            meta: {
                parentPath: 'twohats.blog.index'
            }
        },
        update: {
            component: 'twohats-blog-update',
            path: 'edit/:id',
            meta: {
                parentPath: 'twohats.blog.index'
            }
        },
        remove: {
            component: 'twohats-blog-remove',
            path: 'remove/:id',
            meta: {
                parentPath: 'twohats.blog.index'
            }
        },
    },
    navigation: [{
            id: 'twohats-blog-list',
            label: 'twohats-blog.label',
            color: '#ff3d58',
            path: 'twohats.blog.index',
            icon: 'default-shopping-paper-bag-product',
            parent: 'sw-catalogue',
            privilege: 'blog.viewer',
            position: 100
        },
    ],

    defaultSearchConfiguration

});