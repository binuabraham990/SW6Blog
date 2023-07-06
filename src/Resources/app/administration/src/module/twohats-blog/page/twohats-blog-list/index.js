
import template from './twohats-blog-list.html.twig';

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
            blogs: null,
            sortBy: 'title',
            isLoading: false,
            sortDirection: 'ASC',
            showDeleteModal: false,
            searchConfigEntity: 'twohats_blog_blog',
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },

    computed: {
        blogRepository() {
            return this.repositoryFactory.create('twohats_blog_blog');
        },

        defaultCriteria() {
            const criteria = new Criteria(this.page, this.limit);

            criteria.setTerm(this.term);
            criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection, this.useNaturalSorting));
            criteria.addAssociation('author');

            return criteria;
        },

        useNaturalSorting() {
            return this.sortBy === 'twohats_blog_blog.title';
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

            return this.blogRepository.search(criteria).then((items) => {
                this.total = items.total;
                this.blogs = items;
                this.isLoading = false;

                return items;
            }).catch(() => {
                this.isLoading = false;
            });
        },

        onDelete(itemId) {
            this.showDeleteModal = itemId;
        },
        
        onCloseDeleteModal()    {
            this.showDeleteModal = false;
        },
        
        onConfirmDelete(itemId) {
            this.blogRepository.delete(itemId).then(() =>   {
                this.showDeleteModal = false;
                
                this.getList();
            });
        },

        getBlogColumns() {
            return [{
                    property: 'title',
                    label: 'twohats-blog.page.list.column-name',
                    routerLink: 'sw.property.detail',
                    inlineEdit: 'string',
                    allowResize: true,
                    primary: true,
                }, {
                    property: 'description',
                    label: 'twohats-blog.page.list.column-description',
                    allowResize: true,
                }, {
                    property: 'author.name',
                    label: 'twohats-blog.page.list.column-author',
                    allowResize: true
                },
            ];
        }
    }
};
