/*
 * @package inventory
 */

import template from './twohats-author-list.html.twig';
//import './sw-property-list.scss';

const {Mixin} = Shopware;
const {Criteria} = Shopware.Data;
export default {
    template,
    inject: [
        'repositoryFactory',
        'acl',
    ],
    mixins: [
        Mixin.getByName('listing'),
    ],
    data() {
        return {
            authors: null,
            sortBy: 'name',
            isLoading: false,
            sortDirection: 'ASC',
            showDeleteModal: false,
            searchConfigEntity: 'twohats_blog_author',
        };
    },
    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },
    computed: {
        authorRepository() {
            return this.repositoryFactory.create('twohats_blog_author');
        },
        defaultCriteria() {
            const criteria = new Criteria(this.page, this.limit);
            criteria.setTerm(this.term);
            criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection, this.useNaturalSorting));
            return criteria;
        },
        useNaturalSorting() {
            return this.sortBy === 'twohats_blog_author.name';
        },
    },
    methods: {

        onChangeLanguage() {
            this.getList();
        },
        async getList() {
            this.isLoading = true;
            const criteria = await this.addQueryScores(this.term, this.defaultCriteria);
            if (!this.entitySearchable) {
                this.isLoading = false;
                this.total = 0;
                return false;
            }

            if (this.freshSearchTerm) {
                criteria.resetSorting();
            }

            return this.authorRepository.search(criteria).then((items) => {
                this.total = items.total;
                this.authors = items;
                this.isLoading = false;
                return items;
            }).catch(() => {
                this.isLoading = false;
            });
        },

        onDelete(itemId) {
            this.showDeleteModal = itemId;
        },

        onCloseDeleteModal() {
            this.showDeleteModal = false;
        },
        onConfirmDelete(itemId) {

            this.showDeleteModal = false;
            this.authorRepository.delete(itemId).then(() => {
                this.getList();
            });
        },

        getAuthorColumns() {
            return [{
                    property: 'name',
                    label: 'twohats-author.page.list.column-name',
                    routerLink: 'sw.property.detail',
                    inlineEdit: 'string',
                    allowResize: true,
                    primary: true,
                }, {
                    property: 'nickname',
                    label: 'twohats-author.page.list.column-nickname',
                    allowResize: true,
                }
            ];
        }
    }
};
