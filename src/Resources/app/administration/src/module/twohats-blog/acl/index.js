/*
 * @package inventory
 */

Shopware.Service('privileges')
        .addPrivilegeMappingEntry({
            category: 'permissions',
            parent: 'catalogues',
            key: 'blog',
            roles: {
                viewer: {
                    privileges: [
                        'twohats_blog_author:read',
                        'twohats_blog_author:create',
                        'twohats_blog_blog:read',
                        'twohats_blog_blog:create',
                        'twohats_blog_blog_media:read',
                        'twohats_blog_blog_media:create',
                        'media_default_folder:read',
                        'media_folder:read',
                        'media:read',
                        'user_config:read',
                        'user_config:create',
                        'user_config:update'
                    ],
                    dependencies: [],
                },
                editor: {
                    privileges: [
                        'twohats_blog_author:read',
                        'twohats_blog_author:create',
                        'twohats_blog_blog:read',
                        'twohats_blog_blog:create',
                        'twohats_blog_blog_media:read',
                        'twohats_blog_blog_media:create',
                        'media_default_folder:read',
                        'media_folder:read',
                        'media:read',
                        'user_config:read',
                        'user_config:create',
                        'user_config:update'
                    ],
                    dependencies: [
                    ]
                },
                creator: {
                    privileges: [
                        'twohats_blog_author:create',
                        'twohats_blog_blog:create',
                        'twohats_blog_blog_media:create'
                    ],
                    dependencies: [
                        'twohats_blog_author.viewer',
                        'twohats_blog_author.editor',
                        'twohats_blog_blog.viewer',
                        'twohats_blog_blog.editor',
                        'twohats_blog_blog_media.viewer',
                        'twohats_blog_blog_media.editor'
                    ],
                },
                deleter: {
                    privileges: [
                        'twohats_blog_author:delete',
                        'twohats_blog_blog:delete',
                        'twohats_blog_blog_media:delete'
                    ],
                    dependencies: [
                        'twohats_blog_author.viewer',
                        'twohats_blog_blog.viewer',
                        'twohats_blog_blog_media.viewer'
                    ],
                },
            },
        });
