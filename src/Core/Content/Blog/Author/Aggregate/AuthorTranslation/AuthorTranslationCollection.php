<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Core\Content\Blog\Author\Aggregate\AuthorTranslation;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use TwoHatsBlogModule\Core\Content\Blog\Author\Aggregate\AuthorTranslation\AuthorTranslationEntity;

/**
 * @method void                          add(AuthorTranslationEntity $entity)
 * @method void                          set(string $key, AuthorTranslationEntity $entity)
 * @method AuthorTranslationEntity[]    getIterator()
 * @method AuthorTranslationEntity[]    getElements()
 * @method AuthorTranslationEntity|null get(string $key)
 * @method AuthorTranslationEntity|null first()
 * @method AuthorTranslationEntity|null last()
 */
class AuthorTranslationCollection extends EntityCollection {

    public function getApiAlias(): string {
        return 'author_translation_collection';
    }

    protected function getExpectedClass(): string {
        return AuthorTranslationEntity::class;
    }
}
