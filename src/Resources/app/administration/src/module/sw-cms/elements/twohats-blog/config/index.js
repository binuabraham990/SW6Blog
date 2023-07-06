import template from './sw-cms-el-config-twohats-blog.html.twig';

const { Mixin } = Shopware;

Shopware.Component.register('sw-cms-el-config-twohats-blog', {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        numberOfBlogs: {
            get() {
                return this.element.config.numberOfBlogs.value;
            },

            set(value) {
                this.element.config.numberOfBlogs.value = value;
            }
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('twohats-blog');
        },

        onElementUpdate(value) {
            this.element.config.numberOfBlogs.value = value;

            this.$emit('element-update', this.element);
        }
    }
});