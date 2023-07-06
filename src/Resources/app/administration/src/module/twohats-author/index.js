import './acl';
import deDE from './snippet/de-DE';
import enGB from './snippet/en-GB';

const {Module} = Shopware;

import defaultSearchConfiguration from './default-search-configuration';

Shopware.Component.register('twohats-author-list', () => import('./page/twohats-author-list'));
Shopware.Component.register('twohats-author-detail', () => import('./page/twohats-author-detail'));
Shopware.Component.extend('twohats-author-create', 'twohats-author-detail', () => import('./page/twohats-author-create'));

Shopware.Module.register('twohats-author', {

    type: 'plugin',
    name: 'blog-module-author',
    color: '#ff3d58',
    icon: 'default-shopping-paper-bag-product',
    title: 'twohats-author.module.title',
    description: 'twohats-blog.module.description',
    entity: 'twohats_blog_author',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        index: {
            components: {
                default: 'twohats-author-list',
            },
            path: 'index',
            alias: '/',
            meta: {
                privilege: 'blog.viewer',
            }
        },
        detail: {
            component: 'twohats-author-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'twohats.author.index'
            },
            props: {
                default: (route) => {
                    return {
                        authorId: route.params.id
                    }
                }
            }
        },
        create: {
            component: 'twohats-author-create',
            path: 'create',
            meta: {
                parentPath: 'twohats.author.index'
            }
        },
        update: {
            component: 'twohats-author-update',
            path: 'edit/:id',
            meta: {
                parentPath: 'twohats.author.index'
            }
        },
        remove: {
            component: 'twohats-author-remove',
            path: 'remove/:id',
            meta: {
                parentPath: 'twohats.author.index'
            }
        }
    },
    navigation: [{
            id: 'twohats-author-list',
            label: 'twohats-author.label',
            color: '#ff3d58',
            path: 'twohats.author.index',
            icon: 'default-shopping-paper-bag-product',
            parent: 'sw-catalogue',
            privilege: 'blog.viewer',
            position: 100
        }],

    defaultSearchConfiguration

});