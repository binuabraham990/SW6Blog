<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Core\Content\Blog\BlogMedia;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use TwoHatsBlogModule\Core\Content\Blog\Blog\BlogEntity;
use Shopware\Core\Content\Media\MediaEntity;

class BlogMediaEntity extends Entity {

    use EntityIdTrait;

    /**
     * @var string
     */
    protected $blogId;

    /**
     * @var string
     */
    protected $mediaId;

    /**
     * @var int
     */
    protected $position;

    /**
     * @var MediaEntity|null
     */
    protected $media;

    /**
     * @var BlogEntity|null
     */
    protected $blog;


    public function getBlogId(): string {
        return $this->blogId;
    }

    public function setBlogId(string $blogId): void {
        $this->blogId = $blogId;
    }

    public function getMediaId(): string {
        return $this->mediaId;
    }

    public function setMediaId(string $mediaId): void {
        $this->mediaId = $mediaId;
    }

    public function getPosition(): int {
        return $this->position;
    }

    public function setPosition(int $position): void {
        $this->position = $position;
    }

    public function getMedia(): ?MediaEntity {
        return $this->media;
    }

    public function setMedia(MediaEntity $media): void {
        $this->media = $media;
    }

    public function getBlog(): ?BlogEntity {
        return $this->blog;
    }

    public function setBlog(BlogEntity $blog): void {
        $this->blog = $blog;
    }

}
