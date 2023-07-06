(this["webpackJsonpPlugintwo-hats-blog-module"]=this["webpackJsonpPlugintwo-hats-blog-module"]||[]).push([[1],{Ndt4:function(t,a,e){"use strict";e.r(a);var n=Shopware.Mixin,o=Shopware.Data.Criteria;a.default={template:'\n{% block twohats_author_detail %}\n    <sw-page class="twohats-author-detail">\n\n        \n        {% block twohats_author_detail_smart_bar_header %}\n            <template #smart-bar-header>\n\n                \n                {% block twohats_author_detail_smart_bar_header_title %}\n                    <h2>{{ placeholder(author, \'name\', $tc(\'twohats-author.detail.textHeadline\')) }}</h2>\n                {% endblock %}\n\n            </template>\n        {% endblock %}\n\n        \n        {% block twohats_author_detail_smart_bar_actions %}\n            <template #smart-bar-actions>\n                \n                {% block twohats_author_detail_smart_bar_actions_cancel %}\n                    <sw-button\n                        v-tooltip.bottom="tooltipCancel"\n                        class="twohats-author-detail__back-action"\n                        :disabled="isLoading"\n                        @click="onCancel"\n                        >\n                        {{ $tc(\'twohats-author.detail.buttonCancel\') }}\n                    </sw-button>\n                {% endblock %}\n\n                \n                {% block twohats_author_detail_smart_bar_actions_save %}\n                    <sw-button-process\n                        v-tooltip="tooltipSave"\n                        class="twohats-author-detail__save-action"\n                        :is-loading="isLoading"\n                        :process-success="isSaveSuccessful"\n                        :disabled="isLoading || !acl.can(\'blogs.editor\')"\n                        variant="primary"\n                        @process-finish="saveFinish"\n                        @click.prevent="onSave"\n                        >\n                        {{ $tc(\'twohats-author.detail.buttonSave\') }}\n                    </sw-button-process>\n                {% endblock %}\n            </template>\n        {% endblock %}\n\n        \n        {% block twohats_author_detail_language_switch %}\n            <template #language-switch>\n                <sw-language-switch\n                    :save-changes-function="saveOnLanguageChange"\n                    :save-permission="acl.can(\'blogs.editor\')"\n                    @on-change="onChangeLanguage"\n                    />\n            </template>\n        {% endblock %}\n\n        {% block twohats_author_detail_content %}\n            <template #content>\n                <sw-card-view>\n\n                    <div v-show="!isLoading">\n\n                        \n                        {% block twohats_author_detail_content_language_info %}\n                            <sw-language-info\n                                :entity-description="placeholder(author, \'name\', $tc(\'twohats-author.detail.textHeadline\'))"\n                                />\n                        {% endblock %}\n\n                        \n                        {% block twohats_author_detail_content_detail_base %}\n                            {% block twohats_author_detail_content_blog %}\n                                <sw-card\n                                    v-if="author"\n                                    position-identifier="twohats-author-detail-base"\n                                    :title="$tc(\'twohats-author.detail.cardTitleAuthor\')"\n                                    :is-loading="isLoading"\n                                    >\n                                    \n                                    {% block twohats_author_detail_base_name %}\n                                        <sw-field\n                                            v-model="author.name"\n                                            type="text"\n                                            required\n                                            :label="$tc(\'twohats-author.detail.labelName\')"\n                                            :placeholder="placeholder(author, \'name\', $tc(\'twohats-author.detail.placeholderName\'))"\n                                            :disabled="!allowEdit"\n                                            />\n                                    {% endblock %}\n\n                                    {% block twohats_author_detail_base_nickname %}\n                                        <sw-field\n                                            v-model="author.nickname"\n                                            type="text"\n                                            required\n                                            :label="$tc(\'twohats-author.detail.labelNickname\')"\n                                            :placeholder="placeholder(author, \'name\', $tc(\'twohats-author.detail.placeholderNickname\'))"\n                                            :disabled="!allowEdit"\n                                            />\n                                    {% endblock %}\n\n                                    \n                                    {% block sw_category_detail_menu_media %}\n                                        <sw-upload-listener\n                                            :key="author.id + \'uploadListener\'"\n                                            :upload-tag="author.id"\n                                            auto-upload\n                                            @media-upload-finish="onSetMediaItem"\n                                            />\n                                        <sw-media-upload-v2\n                                            :key="author.id + \'upload\'"\n                                            :label="$tc(\'twohats-author.detail.imageLabel\')"\n                                            variant="regular"\n                                            :disabled="!acl.can(\'author.editor\')"\n                                            :source="mediaItem"\n                                            :upload-tag="author.id"\n                                            :allow-multi-select="false"\n                                            :default-folder="author.getEntityName()"\n                                            @media-drop="onMediaDropped"\n                                            @media-upload-sidebar-open="showMediaModal = true"\n                                            @media-upload-remove-image="onRemoveMediaItem"\n                                            />\n                                    {% endblock %}\n\n                                    \n                                    {% block sw_category_detail_menu_media_modal %}\n                                        <sw-media-modal-v2\n                                            v-if="showMediaModal"\n                                            :allow-multi-select="false"\n                                            :entity-context="author.getEntityName()"\n                                            @media-modal-selection-change="onMediaSelectionChange"\n                                            @modal-close="showMediaModal = false"\n                                            />\n                                    {% endblock %}\n                                </sw-card>\n                            {% endblock %}\n                        {% endblock %}\n                    </div>\n                </sw-card-view>\n            </template>\n        {% endblock %}\n    </sw-page>\n{% endblock %}',inject:["repositoryFactory","acl"],mixins:[n.getByName("notification"),n.getByName("placeholder")],props:{authorId:{type:String,default:null},allowEdit:{type:Boolean,required:!1,default:!0}},data:function(){return{author:null,isLoading:!1,isSaveSuccessful:!1,showMediaModal:!1}},watch:{authorId:function(){this.loadEntityData()}},created:function(){this.createdComponent()},computed:{authorRepository:function(){return this.repositoryFactory.create("twohats_blog_author")},mediaRepository:function(){return this.repositoryFactory.create("media")},tooltipCancel:function(){return{message:"ESC",appearance:"light"}},tooltipSave:function(){var t=this.$device.getSystemKey();return{message:"".concat(t," + S"),appearance:"light"}},defaultCriteria:function(){var t=new o(this.page,this.limit);return t.addAssociation("media"),t.setTerm(this.term),t},mediaItem:function(){return null!==this.author?this.author.media:null}},methods:{createdComponent:function(){this.loadEntityData()},onCancel:function(){return this.$router.push({name:"twohats.author.index"})},loadEntityData:function(){var t=this;this.isLoading=!0,this.authorRepository.get(this.authorId,Shopware.Context.api,this.defaultCriteria).then((function(a){t.author=a,t.isLoading=!1})).catch((function(){t.isLoading=!1,console.log("Error on finding the author")}))},saveFinish:function(){this.isSaveSuccessful=!0},onSave:function(){var t=this;return this.isSaveSuccessful=!1,this.isLoading=!0,this.authorRepository.save(this.author).then((function(){t.loadEntityData(),t.isSaveSuccessful=!0,t.isLoading=!1})).catch((function(a){throw t.createNotificationError({message:t.$tc("twohats-author.detail.messageSaveError")}),t.isLoading=!1,a}))},saveOnLanguageChange:function(){this.onSave()},onChangeLanguage:function(){this.loadEntityData()},onSetMediaItem:function(t){var a=this,e=t.targetId;this.mediaRepository.get(e).then((function(t){a.author.mediaId=e,a.author.media=t}))},onMediaDropped:function(t){this.onSetMediaItem({targetId:t.id})},onRemoveMediaItem:function(){this.author.mediaId=null,this.author.media=null},onMediaSelectionChange:function(t){var a=this,e=t[0];e&&this.mediaRepository.get(e.id).then((function(t){a.author.mediaId=t.id,a.author.media=t}))}}}}}]);