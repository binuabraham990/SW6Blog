<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Core\Content\Blog\BlogMedia;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ReverseInherited;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IntField;
use TwoHatsBlogModule\Core\Content\Blog\BlogMedia\BlogMediaEntity;
use TwoHatsBlogModule\Core\Content\Blog\BlogMedia\BlogMediaCollection;
use TwoHatsBlogModule\Core\Content\Blog\Blog\BlogDefinition;
use Shopware\Core\Content\Media\MediaDefinition;

class BlogMediaDefinition extends EntityDefinition {

    public const ENTITY_NAME = 'twohats_blog_blog_media';

    public function getEntityName(): string {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string {
        return BlogMediaCollection::class;
    }

    public function getEntityClass(): string {
        return BlogMediaEntity::class;
    }

    protected function defineFields(): FieldCollection {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new ApiAware(), new PrimaryKey(), new Required()),
            (new FkField('blog_id', 'blogId', BlogDefinition::class))->addFlags(new ApiAware(), new Required()),
            (new FkField('media_id', 'mediaId', MediaDefinition::class))->addFlags(new ApiAware(), new Required()),
            (new IntField('position', 'position'))->addFlags(new ApiAware()),
            (new ManyToOneAssociationField('blog', 'blog_id', BlogDefinition::class, 'id', false))->addFlags(new ReverseInherited('media')),
            (new ManyToOneAssociationField('media', 'media_id', MediaDefinition::class, 'id', true))->addFlags(new ApiAware()),
        ]);
    }
}
