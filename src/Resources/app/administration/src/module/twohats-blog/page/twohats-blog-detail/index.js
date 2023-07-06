/*
 * @package inventory
 */

import template from './twohats-blog-detail.html.twig';

const {Mixin} = Shopware;
const {Criteria} = Shopware.Data;

// eslint-disable-next-line sw-deprecation-rules/private-feature-declarations
export default {
    template,

    inject: [
        'repositoryFactory',
        'acl',
    ],

    mixins: [
        Mixin.getByName('notification'),
        Mixin.getByName('placeholder'),
    ],

    props: {
        blogId: {
            type: String,
            default: null,
        },
    },

    data() {
        return {
            blog: null,
            isLoading: false,
            isSaveSuccessful: false,
            showMediaModal: false,
        };
    },

    computed: {
        blogRepository() {
            return this.repositoryFactory.create('twohats_blog_blog');
        },

        blogMediaRepository() {
            return this.repositoryFactory.create('twohats_blog_blog_media');
        },

        tooltipSave() {
            if (!this.acl.can('blog.editor')) {
                return {
                    message: this.$tc('sw-privileges.tooltip.warning'),
                    disabled: this.acl.can('blog.editor'),
                    showOnDisabledElements: true,
                };
            }

            const systemKey = this.$device.getSystemKey();

            return {
                message: `${systemKey} + S`,
                appearance: 'light',
            };
        },

        tooltipCancel() {
            return {
                message: 'ESC',
                appearance: 'light',
            };
        },

        defaultCriteria() {
            const criteria = new Criteria(this.page, this.limit);
            criteria.addAssociation('author');
            criteria.setTerm(this.term);

            return criteria;
        },
    },

    watch: {
        blogId() {
            this.loadEntityData();
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.loadEntityData();
        },

        loadEntityData() {
            this.isLoading = true;

            this.blogRepository.get(this.blogId, Shopware.Context.api, this.defaultCriteria)
                    .then((currentBlog) => {
                        this.blog = currentBlog;
                        this.isLoading = false;
                    }).catch(() => {
                this.isLoading = false;
            });
        },

        saveFinish() {
            this.isSaveSuccessful = false;
        },

        saveOnLanguageChange() {
            return this.onSave();
        },

        onChangeLanguage() {
            this.loadEntityData();
        },

        onSave() {
            this.isSaveSuccessful = false;
            this.isLoading = true;

            return this.blogRepository.save(this.blog).then(() => {
                this.loadEntityData();
                this.isLoading = false;
                this.isSaveSuccessful = true;
            }).catch((exception) => {
                this.createNotificationError({
                    message: this.$tc('sw-property.detail.messageSaveError'),
                });
                this.isLoading = false;
                throw exception;
            });
        },

        onCancel() {
            this.$router.push({name: 'twohats.blog.index'});
        },

        onOpenMediaModal() {
            this.showMediaModal = true;
        },

        onCloseMediaModal() {
            this.showMediaModal = false;
        },

        onMediaSelectionChange(mediaItems) {
            mediaItems.forEach(function (mediaItem, index) {
                console.log(mediaItem.id);
                const blogMedia = this.createBlogMediaAssociation(mediaItem.id);
                this.blog.media.add(blogMedia);
            });
        },

        createBlogMediaAssociation(targetId) {

            const blogMedia = this.blogMediaRepository.create();
            blogMedia.blogId = this.blog.id;
            blogMedia.mediaId = targetId;
            if (this.blog.media.length <= 0) {
                blogMedia.position = 0;
            } else {
                blogMedia.position = this.blog.media.length + 1;
            }

            return blogMedia;
        },
    },
};
