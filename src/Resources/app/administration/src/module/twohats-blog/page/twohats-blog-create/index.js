import template from './twohats-blog-create.html.twig';

const {Mixin} = Shopware;
const {Criteria} = Shopware.Data;

export default  {
    template,

    inject: [
        'repositoryFactory',
        'acl',
    ],

    data() {
        return {
            newBlogId: null,
            blog: null,
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {

            this.isLoading = true;
            this.blog = this.blogRepository.create();
            this.newBlogId = this.blog.id;
            this.isLoading = false;
        },
        
        saveFinish()    {
            this.isSaveSuccessful = false;
            this.$router.push({ name: 'twohats.blog.detail', params: { id: this.newBlogId } });
        },
        
        onSave()    {
            this.$super('onSave');
        }
    }

}