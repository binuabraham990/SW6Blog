<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Core\Content\Blog\Blog;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use TwoHatsBlogModule\Core\Content\Blog\Blog\BlogMediaCollection;

class BlogEntity extends Entity {

    use EntityIdTrait;

    /**
     * @var string|null
     */
    protected $title;

    /**
     * @var string|null
     */
    protected $description;

    /**
     * @var string
     */
    protected $authorId;

    /**
     * @var MediaEntity|null
     */
    protected $author;

    /**
     * @var BlogMediaCollection|null
     */
    protected $media;

    public function getTitle(): ?string {
        return $this->title;
    }

    public function setTitle(?string $title): void {
        $this->title = $title;
    }

    public function getDescription(): ?string {
        return $this->description;
    }

    public function setDescription(string $description): void {
        $this->description = $description;
    }

    public function getAuthorId(): string {
        return $this->authorId;
    }

    public function setAuthorId(string $authorId): void {
        $this->authorId = $authorId;
    }

    public function getAuthor(): AuthorEntity {
        return $this->author;
    }

    public function setAuthor(AuthorEntity $author): void {
        $this->author = $author;
    }

    public function getMedia(): ?BlogMediaCollection {
        return $this->media;
    }

    public function setMedia(BlogMediaCollection $media): void {
        $this->media = $media;
    }
}
