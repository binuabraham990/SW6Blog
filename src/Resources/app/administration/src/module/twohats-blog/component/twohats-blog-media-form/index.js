/*
 * @package inventory
 */

import template from './twohats-blog-media-form.html.twig';
//import './sw-product-media-form.scss';

const {Component, Mixin, Context} = Shopware;
const {mapGetters} = Component.getComponentHelper();
const {Criteria} = Shopware.Data;
// eslint-disable-next-line sw-deprecation-rules/private-feature-declarations
export default {
    template,
    data() {
        return  {
            isLoading: false,
            showMediaModal: false
        }
    },

    inject: ['repositoryFactory', 'acl'],
    mixins: [
        Mixin.getByName('notification'),
    ],
    props: {
        blog: {
            type: Object,
            required: true,
            default() {
                return {};
            },
        },
        mediaId: {
            type: String,
            required: false
        }
    },

    computed: {
        blogMediaRepository() {
            return this.repositoryFactory.create('twohats_blog_blog_media');
        },
        blogMedia() {
            if (!this.blog) {
                return [];
            }
            return this.blog.media;
        },
//        mediaItems() {
//
//            const criteria = new Criteria();
//            criteria.addFilter(Criteria.equals('blogId', this.blog.id));
//            this.blogMediaRepository.search(criteria, Context.api).then((results) => {
//                let mediaItems = [];
//                for (let i = 0; i < results.length; i += 1) {
//                    mediaItems.push(this.createPlaceholderMedia(results));
//                }
//
//                console.log(mediaItems);
//                return mediaItems;
//            });
//        },

        mediaItems() {

            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('blogId', this.blog.id));
            this.blogMediaRepository.search(criteria, Context.api).then((results) => {
                const mediaItems = results.slice();
                const placeholderCount = this.getPlaceholderCount(this.columnCount);
                if (placeholderCount === 0) {
                    return mediaItems;
                }

                for (let i = 0; i < placeholderCount; i += 1) {
                    mediaItems.push(this.createPlaceholderMedia(mediaItems));
                }

                return mediaItems;
            });
        },
        gridAutoRows() {
            return `grid-auto-rows: ${this.columnWidth}`;
        },
    },

    methods: {
        successfulUpload( { targetId }) {
            const blogMedia = this.createBlogMediaAssociation(targetId);
            this.blog.media.add(blogMedia);
        },
        
        onUploadFailed(uploadTask) {
            console.log('upload failed');
        },
        
        onOpenMedia() {
            this.$emit('media-open');
            this.showMediaModal = true;
        },

//        onOpenMediaModal() {
//            this.showMediaModal = true;
//        },
//
//        onCloseMediaModal() {
//            this.showMediaModal = false;
//        },
//
//        onMediaSelectionChange(mediaItems) {
//            mediaItems.forEach(function (mediaItem, index) {
//                console.log(mediaItem.id);
//                const blogMedia = this.createBlogMediaAssociation(mediaItem.id);
//                this.blog.media.add(blogMedia);
//            });
//        },

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
//        createPlaceholderMedia(mediaItems) {
//            return {
//                isPlaceholder: true,
//                isCover: mediaItems.length === 0,
//                media: {
//                    isPlaceholder: true,
//                    name: '',
//                },
//                mediaId: mediaItems.length.toString(),
//            };
//        },
        getPlaceholderCount(columnCount) {
            if (this.blogMedia.length + 3 < columnCount * 2) {
                columnCount *= 2;
            }

            let placeholderCount = columnCount;

            if (this.blogMedia.length !== 0) {
                placeholderCount = columnCount - ((this.blogMedia.length) % columnCount);
                if (placeholderCount === columnCount) {
                    return 0;
                }
            }

            return placeholderCount;
        },

        createPlaceholderMedia(mediaItems) {
            return {
                isPlaceholder: true,
                isCover: mediaItems.length === 0,
                media: {
                    isPlaceholder: true,
                    name: '',
                },
                mediaId: mediaItems.length.toString(),
            };
        },
    }
//
//    props: {
//        disabled: {
//            type: Boolean,
//            required: false,
//            default: false,
//        },
//
//        isInherited: {
//            type: Boolean,
//            required: false,
//            default: false,
//        },
//    },
//
//    data() {
//        return {
//            showCoverLabel: true,
//            isMediaLoading: false,
//            columnCount: 5,
//            columnWidth: 90,
//        };
//    },

//    computed: {
//        product() {
//            const state = Shopware.State.get('swProductDetail');
//
//            if (this.isInherited) {
//                return state.parentProduct;
//            }
//
//            return state.product;
//        },
//
//        mediaItems() {
//            const mediaItems = this.productMedia.slice();
//            const placeholderCount = this.getPlaceholderCount(this.columnCount);
//
//            if (placeholderCount === 0) {
//                return mediaItems;
//            }
//
//            for (let i = 0; i < placeholderCount; i += 1) {
//                mediaItems.push(this.createPlaceholderMedia(mediaItems));
//            }
//            return mediaItems;
//        },
//
//        cover() {
//            if (!this.product) {
//                return null;
//            }
//            const coverId = this.product.cover ? this.product.cover.mediaId : this.product.coverId;
//            return this.product.media.find(media => media.id === coverId);
//        },
//
//        ...mapGetters('swProductDetail', {
//            isStoreLoading: 'isLoading',
//        }),
//
//        isLoading() {
//            return this.isMediaLoading || this.isStoreLoading;
//        },
//
//        productMediaRepository() {
//            return this.repositoryFactory.create('product_media');
//        },
//
//        productMedia() {
//            if (!this.product) {
//                return [];
//            }
//            return this.product.media;
//        },
//
//        productMediaStore() {
//            return this.product.getAssociation('media');
//        },
//
//        gridAutoRows() {
//            return `grid-auto-rows: ${this.columnWidth}`;
//        },
//
//        currentCoverID() {
//            const coverMediaItem = this.productMedia.find(coverMedium => coverMedium.media.id === this.product.coverId);
//
//            return coverMediaItem.id;
//        },
//    },

//    methods: {
//        onOpenMedia() {
//            this.$emit('media-open');
//        },
//
//        updateColumnCount() {
//            this.$nextTick(() => {
//                if (this.isLoading) {
//                    return false;
//                }
//
//                const cssColumns = window.getComputedStyle(this.$refs.grid, null)
//                    .getPropertyValue('grid-template-columns')
//                    .split(' ');
//                this.columnCount = cssColumns.length;
//                this.columnWidth = cssColumns[0];
//
//                return true;
//            });
//        },
//
//        getPlaceholderCount(columnCount) {
//            if (this.productMedia.length + 3 < columnCount * 2) {
//                columnCount *= 2;
//            }
//
//            let placeholderCount = columnCount;
//
//            if (this.productMedia.length !== 0) {
//                placeholderCount = columnCount - ((this.productMedia.length) % columnCount);
//                if (placeholderCount === columnCount) {
//                    return 0;
//                }
//            }
//
//            return placeholderCount;
//        },
//
//        createPlaceholderMedia(mediaItems) {
//            return {
//                isPlaceholder: true,
//                isCover: mediaItems.length === 0,
//                media: {
//                    isPlaceholder: true,
//                    name: '',
//                },
//                mediaId: mediaItems.length.toString(),
//            };
//        },
//
//        buildProductMedia(mediaId) {
//            this.isLoading = true;
//
//            const productMedia = this.productMediaStore.create();
//            productMedia.mediaId = mediaId;
//
//            if (this.productMedia.length === 0) {
//                productMedia.position = 0;
//                this.product.cover = productMedia;
//                this.product.coverId = productMedia.id;
//            } else {
//                productMedia.position = this.productMedia.length + 1;
//            }
//            this.isLoading = false;
//
//            return productMedia;
//        },
//
//        successfulUpload({ targetId }) {
//            // on replace
//            if (this.product.media.find((productMedia) => productMedia.mediaId === targetId)) {
//                return;
//            }
//
//            const productMedia = this.createMediaAssociation(targetId);
//            this.product.media.add(productMedia);
//        },
//
//        createMediaAssociation(targetId) {
//            const productMedia = this.productMediaRepository.create();
//
//            productMedia.productId = this.product.id;
//            productMedia.mediaId = targetId;
//
//            if (this.product.media.length <= 0) {
//                productMedia.position = 0;
//                this.product.coverId = productMedia.id;
//            } else {
//                productMedia.position = this.product.media.length;
//            }
//            return productMedia;
//        },
//
//        onUploadFailed(uploadTask) {
//            const toRemove = this.product.media.find((productMedia) => {
//                return productMedia.mediaId === uploadTask.targetId;
//            });
//            if (toRemove) {
//                if (this.product.coverId === toRemove.id) {
//                    this.product.coverId = null;
//                }
//                this.product.media.remove(toRemove.id);
//            }
//            this.product.isLoading = false;
//        },
//
//        removeCover() {
//            this.product.cover = null;
//            this.product.coverId = null;
//        },
//
//        isCover(productMedia) {
//            const coverId = this.product.cover ? this.product.cover.id : this.product.coverId;
//
//            if (this.product.media.length === 0 || productMedia.isPlaceholder) {
//                return false;
//            }
//
//            return productMedia.id === coverId;
//        },
//
//        removeFile(productMedia) {
//            // remove cover id if mediaId matches
//            if (this.product.coverId === productMedia.id) {
//                this.product.cover = null;
//                this.product.coverId = null;
//            }
//
//            if (this.product.coverId === null && this.product.media.length > 0) {
//                this.product.coverId = this.product.media.first().id;
//            }
//
//            this.product.media.remove(productMedia.id);
//        },
//
//        markMediaAsCover(productMedia) {
//            this.product.cover = productMedia;
//            this.product.coverId = productMedia.id;
//
//            this.product.media.moveItem(productMedia.position, 0);
//            this.updateMediaItemPositions();
//        },
//
//        onDropMedia(dragData) {
//            if (this.product.media.find((productMedia) => productMedia.mediaId === dragData.id)) {
//                return;
//            }
//
//            const productMedia = this.createMediaAssociation(dragData.mediaItem.id);
//            if (this.product.media.length === 0) {
//                // set media item as cover
//                productMedia.position = 0;
//                this.product.cover = productMedia;
//                this.product.coverId = productMedia.id;
//            }
//
//            this.product.media.add(productMedia);
//        },
//
//        onMediaItemDragSort(dragData, dropData, validDrop) {
//            if (validDrop !== true
//                || (dragData.id === this.product.coverId && dragData.position === 0)
//                || (dropData.id === this.product.coverId && dropData.position === 0)) {
//                return;
//            }
//
//            this.product.media.moveItem(dragData.position, dropData.position);
//
//            this.updateMediaItemPositions();
//        },
//
//        updateMediaItemPositions() {
//            this.productMedia.forEach((medium, index) => {
//                medium.position = index;
//            });
//        },
//    },
};
