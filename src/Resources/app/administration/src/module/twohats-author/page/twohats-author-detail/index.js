/*
 * @package inventory
 */

import template from './twohats-author-detail.html.twig';

const {Mixin} = Shopware;
const {Criteria} = Shopware.Data;

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
        authorId: {
            type: String,
            default: null,
        },
        allowEdit: {
            type: Boolean,
            required: false,
            default: true,
        },
    },

    data() {
        return  {
            author: null,
            isLoading: false,
            isSaveSuccessful: false,
            showMediaModal: false,
        }
    },
    watch: {
        authorId() {
            this.loadEntityData();
        },
    },

    created() {
        this.createdComponent();
    },

    computed: {

        authorRepository() {
            return this.repositoryFactory.create('twohats_blog_author');
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        tooltipCancel() {
            return {
                message: 'ESC',
                appearance: 'light',
            };
        },

        tooltipSave() {
            const systemKey = this.$device.getSystemKey();

            return {
                message: `${systemKey} + S`,
                appearance: 'light',
            };
        },
        defaultCriteria() {
            const criteria = new Criteria(this.page, this.limit);
            criteria.addAssociation('media');
            criteria.setTerm(this.term);

            return criteria;
        },
        mediaItem() {
            return this.author !== null ? this.author.media : null;
        },
    },
    methods: {
        createdComponent() {
            this.loadEntityData();
        },

        onCancel() {
            return this.$router.push({name: 'twohats.author.index'});
        },

        loadEntityData() {
            this.isLoading = true;

            this.authorRepository.get(this.authorId, Shopware.Context.api, this.defaultCriteria)
                    .then((currentAuthor) => {
                        this.author = currentAuthor;
                        this.isLoading = false;
                    }).catch(() => {
                this.isLoading = false;
                console.log('Error on finding the author');
            });
        },

        saveFinish() {
            this.isSaveSuccessful = true;
        },
        
        onSave() {
            this.isSaveSuccessful = false;
            this.isLoading = true;

            return this.authorRepository.save(this.author).then(() => {
                this.loadEntityData();
                this.isSaveSuccessful = true;
                this.isLoading = false;
            }).catch((exception) => {
                this.createNotificationError({
                    message: this.$tc('twohats-author.detail.messageSaveError'),
                });
                this.isLoading = false;
                throw exception;
            });
        },

        saveOnLanguageChange() {
            this.onSave();
        },

        onChangeLanguage() {
            this.loadEntityData();
        },

        onSetMediaItem( { targetId }) {
            
            this.mediaRepository.get(targetId).then((updatedMedia) => {
                this.author.mediaId = targetId;
                this.author.media = updatedMedia;
            });
        },
        onMediaDropped(dropItem) {
            // to be consistent refetch entity with repository
            this.onSetMediaItem({targetId: dropItem.id});
        },
        onRemoveMediaItem() {
            this.author.mediaId = null;
            this.author.media = null;
        },
        onMediaSelectionChange(mediaItems) {
            const media = mediaItems[0];
            if (!media) {
                return;
            }

            this.mediaRepository.get(media.id).then((updatedMedia) => {
                this.author.mediaId = updatedMedia.id;
                this.author.media = updatedMedia;
            });
        },
    }
}