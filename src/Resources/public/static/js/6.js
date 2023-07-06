(this["webpackJsonpPlugintwo-hats-blog-module"]=this["webpackJsonpPlugintwo-hats-blog-module"]||[]).push([[6],{MBFL:function(t,n,e){"use strict";e.r(n);var o=Shopware.Mixin,a=Shopware.Data.Criteria;n.default={template:'{% block twohats_blog_detail %}\n    <sw-page class="twohats-blog-detail">\n\n        {% block twohats_blog_detail_smart_bar_header %}\n            <template #smart-bar-header>\n\n                {% block twohats_blog_detail_smart_bar_header_title %}\n                    <h2>{{ placeholder(blog, \'title\', $tc(\'twohats-blog.detail.textHeadline\')) }}</h2>\n                {% endblock %}\n\n            </template>\n        {% endblock %}\n\n        {% block twohats_blog_detail_smart_bar_actions %}\n            <template #smart-bar-actions>\n                {% block twohats_blog_detail_smart_bar_actions_cancel %}\n                    <sw-button\n                        v-tooltip.bottom="tooltipCancel"\n                        class="twohats-blog-detail__back-action"\n                        :disabled="isLoading"\n                        @click="onCancel"\n                        >\n                        {{ $tc(\'twohats-blog.detail.buttonCancel\') }}\n                    </sw-button>\n                {% endblock %}\n\n                {% block twohats_blog_detail_smart_bar_actions_save %}\n                    <sw-button-process\n                        v-tooltip="tooltipSave"\n                        class="twohats-blog-detail__save-action"\n                        :is-loading="isLoading"\n                        :process-success="isSaveSuccessful"\n                        :disabled="isLoading || !acl.can(\'blogs.editor\')"\n                        variant="primary"\n                        @process-finish="saveFinish"\n                        @click.prevent="onSave"\n                        >\n                        {{ $tc(\'twohats-blog.detail.buttonSave\') }}\n                    </sw-button-process>\n                {% endblock %}\n            </template>\n        {% endblock %}\n\n        {% block twohats_blog_detail_language_switch %}\n            <template #language-switch>\n                <sw-language-switch\n                    :save-changes-function="saveOnLanguageChange"\n                    :save-permission="acl.can(\'blogs.editor\')"\n                    @on-change="onChangeLanguage"\n                    />\n            </template>\n        {% endblock %}\n\n        {% block twohats_blog_detail_content %}\n            <template #content>\n                <sw-card-view>\n\n                    <div v-show="!isLoading">\n\n                        {% block twohats_blog_detail_content_language_info %}\n                            <sw-language-info\n                                :entity-description="placeholder(blog, \'name\', $tc(\'twohats-blog.detail.textHeadline\'))"\n                                />\n                        {% endblock %}\n\n                        {% block twohats_blog_detail_content_detail_base %}\n                            {% block twohats_blog_detail_content_blog %}\n                                <twohats-blog-detail-base\n                                    v-if="blog"\n                                    :blog="blog"\n                                    :allow-edit="acl.can(\'twohats_blog_blog.editor\')"\n                                    />\n                            {% endblock %}\n\n                            {% block twohats_blog_detail_content_media_form %}\n                                <twohats-blog-media-form\n                                    v-if="blog"\n                                    :blog="blog"\n                                    :key="blog.id   "\n                                    :blog-id="blog.id"\n                                    :is-inherited="false"\n                                    :disabled="!acl.can(\'blog.editor\')"\n                                    @media-open="onOpenMediaModal"\n                                    />\n                            {% endblock %}\n\n                            {% block sw_category_detail_menu_media_modal %}\n                                <sw-media-modal-v2\n                                    v-if="showMediaModal"\n                                    :allow-multi-select="false"\n                                    :entity-context="blog.getEntityName()"\n                                    @media-modal-selection-change="onMediaSelectionChange"\n                                    @modal-close="showMediaModal = false"\n                                    />\n                            {% endblock %}\n                        {% endblock %}\n                    </div>\n                </sw-card-view>\n            </template>\n        {% endblock %}\n    </sw-page>\n{% endblock %}\n',inject:["repositoryFactory","acl"],mixins:[o.getByName("notification"),o.getByName("placeholder")],props:{blogId:{type:String,default:null}},data:function(){return{blog:null,isLoading:!1,isSaveSuccessful:!1,showMediaModal:!1}},computed:{blogRepository:function(){return this.repositoryFactory.create("twohats_blog_blog")},blogMediaRepository:function(){return this.repositoryFactory.create("twohats_blog_blog_media")},tooltipSave:function(){if(!this.acl.can("blog.editor"))return{message:this.$tc("sw-privileges.tooltip.warning"),disabled:this.acl.can("blog.editor"),showOnDisabledElements:!0};var t=this.$device.getSystemKey();return{message:"".concat(t," + S"),appearance:"light"}},tooltipCancel:function(){return{message:"ESC",appearance:"light"}},defaultCriteria:function(){var t=new a(this.page,this.limit);return t.addAssociation("author"),t.setTerm(this.term),t}},watch:{blogId:function(){this.loadEntityData()}},created:function(){this.createdComponent()},methods:{createdComponent:function(){this.loadEntityData()},loadEntityData:function(){var t=this;this.isLoading=!0,this.blogRepository.get(this.blogId,Shopware.Context.api,this.defaultCriteria).then((function(n){t.blog=n,t.isLoading=!1})).catch((function(){t.isLoading=!1}))},saveFinish:function(){this.isSaveSuccessful=!1},saveOnLanguageChange:function(){return this.onSave()},onChangeLanguage:function(){this.loadEntityData()},onSave:function(){var t=this;return this.isSaveSuccessful=!1,this.isLoading=!0,this.blogRepository.save(this.blog).then((function(){t.loadEntityData(),t.isLoading=!1,t.isSaveSuccessful=!0})).catch((function(n){throw t.createNotificationError({message:t.$tc("sw-property.detail.messageSaveError")}),t.isLoading=!1,n}))},onCancel:function(){this.$router.push({name:"twohats.blog.index"})},onOpenMediaModal:function(){this.showMediaModal=!0},onCloseMediaModal:function(){this.showMediaModal=!1},onMediaSelectionChange:function(t){var n=this;t.forEach((function(t,e){var o=new a(1,1);o.addFilter(a.equals("blogId",n.blog.id)),o.addFilter(a.equals("mediaId",t.id)),n.blogMediaRepository.search(o,Shopware.Context.api).then((function(e){if(e.length<=0){var o=n.createBlogMediaAssociation(t.id);n.blog.media.add(o)}}))}))},createBlogMediaAssociation:function(t){var n=this.blogMediaRepository.create();return n.blogId=this.blog.id,n.mediaId=t,this.blog.media.length<=0?n.position=0:n.position=this.blog.media.length+1,n}}}}}]);