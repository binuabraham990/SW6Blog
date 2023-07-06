<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Core\Content\Blog\Blog;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use TwoHatsBlogModule\Core\Content\Blog\Author\AuthorDefinition;
use TwoHatsBlogModule\Core\Content\Blog\BlogMedia\BlogMediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\CascadeDelete;

class BlogDefinition extends EntityDefinition {

    public const ENTITY_NAME = 'twohats_blog_blog';

    public function getEntityName(): string {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string {
        return BlogEntity::class;
    }

    public function getCollectionClass(): string {
        return BlogCollection::class;
    }

    protected function defineFields(): FieldCollection {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),
            (new StringField('title', 'title'))->addFlags(new Required()),
            (new StringField('description', 'description')),
            (new FkField('author_id', 'authorId', AuthorDefinition::class))->addFlags(new ApiAware()),
            (new ManyToOneAssociationField('author', 'author_id', AuthorDefinition::class, 'id'))->addFlags(new ApiAware()),
            (new OneToManyAssociationField('media', BlogMediaDefinition::class, 'blog_id'))->addFlags(new ApiAware(), new CascadeDelete()),
        ]);
    }
}
