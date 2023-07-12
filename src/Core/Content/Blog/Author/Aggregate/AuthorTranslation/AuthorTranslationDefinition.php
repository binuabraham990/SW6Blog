<?php

namespace TwoHatsBlogModule\Core\Content\Blog\Author\Aggregate\AuthorTranslation;

use TwoHatsBlogModule\Core\Content\Blog\Author\AuthorDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityTranslationDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use TwoHatsBlogModule\Core\Content\Blog\Author\Aggregate\AuthorTranslation\AuthorTranslationEntity;
use TwoHatsBlogModule\Core\Content\Blog\Author\Aggregate\AuthorTranslation\AuthorTranslationCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;

#[Package('content')]
class AuthorTranslationDefinition extends EntityTranslationDefinition {

    final public const ENTITY_NAME = 'twohats_blog_author_translation';

    public function getEntityName(): string {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string {
        return AuthorTranslationEntity::class;
    }

    public function getCollectionClass(): string {
        return AuthorTranslationCollection::class;
    }

    public function since(): ?string {
        return '6.0.0.0';
    }

    protected function getParentDefinitionClass(): string {
        return AuthorDefinition::class;
    }

    protected function defineFields(): FieldCollection {

        return new FieldCollection([
            (new StringField('name', 'name'))->addFlags(new ApiAware()),
        ]);
    }
}
