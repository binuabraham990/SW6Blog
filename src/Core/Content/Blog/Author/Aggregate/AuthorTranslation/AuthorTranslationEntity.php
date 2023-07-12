<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Core\Content\Blog\Author\Aggregate\AuthorTranslation;

use Shopware\Core\Framework\DataAbstractionLayer\TranslationEntity;
use TwoHatsBlogModule\Core\Content\Blog\Author\AuthorEntity;

#[Package('content')]
class AuthorTranslationEntity extends TranslationEntity {

    /**
     * @var string
     */
    protected $authorId;

    /**
     * @var AuthorEntity|null
     */
    protected $author;

    /**
     * @var string|null
     */
    protected $name;

    public function getAuthorId(): string {
        return $this->authorId;
    }

    public function setAuthorId(string $authorId): void {
        $this->authorId = $authorId;
    }

    public function getAuthor(): ?AuthorEntity {
        return $this->author;
    }

    public function setAuthor(AuthorEntity $author): void {
        $this->author = $author;
    }

    public function getName(): ?string {
        return $this->name;
    }

    public function setName(?string $name): void {
        $this->name = $name;
    }
}
