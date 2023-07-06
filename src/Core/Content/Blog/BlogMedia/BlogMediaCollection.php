<?php declare(strict_types=1);

namespace TwoHatsBlogModule\Core\Content\Blog\BlogMedia;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use TwoHatsBlogModule\Core\Content\Blog\BlogMedia\BlogMediaEntity;

class BlogMediaCollection extends EntityCollection {

    public function getApiAlias(): string {
        return 'twohats_blog_media_collection';
    }

    protected function getExpectedClass(): string {
        return BlogMediaEntity::class;
    }
}
