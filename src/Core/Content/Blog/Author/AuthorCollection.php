<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Core\Content\Blog\Author;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use TwoHatsBlogModule\Core\Content\Blog\Author\AuthorEntity;

/**
 * @extends EntityCollection<AuthorEntity>
 */
class AuthorCollection extends EntityCollection {

    public function getApiAlias(): string {
        return 'twohats_author_collection';
    }

    protected function getExpectedClass(): string {
        return AuthorEntity::class;
    }
}
