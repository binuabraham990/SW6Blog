<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Core\Content\Blog\Author\Aggregate\AuthorTranslation;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use TwoHatsBlogModule\Core\Content\Blog\Author\Aggregate\AuthorTranslation\AuthorTranslationEntity;

#[Package('content')]
class AuthorTranslationCollection extends EntityCollection {

    /**
     * @return list<string>
     */
    public function getAuthorIds(): array {
        return $this->fmap(fn(AuthorTranslationEntity $authorTranslation) => $authorTranslation->getAuthorId());
    }

    public function filterByAuthorId(string $id): self {
        return $this->filter(fn(AuthorTranslationEntity $authorTranslation) => $authorTranslation->getAuthorId() === $id);
    }

    /**
     * @return list<string>
     */
    public function getLanguageIds(): array {
        return $this->fmap(fn(AuthorTranslationEntity $authorTranslation) => $authorTranslation->getLanguageId());
    }

    public function filterByLanguageId(string $id): self {
        return $this->filter(fn(AuthorTranslationEntity $authorTranslation) => $authorTranslation->getLanguageId() === $id);
    }

    public function getApiAlias(): string {
        return 'author_translation_collection';
    }

    protected function getExpectedClass(): string {
        return AuthorTranslationEntity::class;
    }
}
