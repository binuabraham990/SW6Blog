import template from './twohats-author-create.html.twig';

const {Mixin} = Shopware;
const {Criteria} = Shopware.Data;

export default {
    template,

    data() {
        return  {
            newAuthorId: null,
            author: null,
            isLoading: false,
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            if (!Shopware.State.getters['context/isSystemDefaultLanguage']) {
                Shopware.Context.api.languageId = Shopware.Context.api.systemLanguageId;
            }
            this.isLoading = true;
            this.author = this.authorRepository.create();
            this.newAuthorId = this.author.id;

            this.isLoading = false;
        },

        saveFinish() {
            this.isSaveSuccessful = true;
            this.isLoading = false;
            this.$router.push({ name: 'twohats.author.detail', params: { id: this.newAuthorId } });
        },

        onSave() {
            
            this.$super('onSave');
            this.loadEntityData();
        }
    }
}