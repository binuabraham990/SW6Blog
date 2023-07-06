import template from './sw-cms-el-twohats-blog.html.twig';
import './sw-cms-el-twohats-blog.scss';
Shopware.Component.register('sw-cms-el-twohats-blog', {
    template,

    mixins: [
        'cms-element'
    ],

    computed: {
        numberOfBlogs() {
            return `${this.element.config.numberOfBlogs.value}`;
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('twohats-blog');
        }
    }
});