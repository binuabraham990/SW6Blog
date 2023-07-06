<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Core\Content\Blog\Author;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use Shopware\Core\Content\Media\MediaEntity;

class AuthorEntity extends Entity {

    use EntityIdTrait;

    /**
     * @var string|null
     */
    protected ?string $name;

    /**
     * @var string|null
     */
    protected ?string $nickname;

    /**
     * @var string|null
     */
    protected $mediaId;

    /**
     * @var MediaEntity|null
     */
    protected $media;

    public function getName(): ?string {
        return $this->name;
    }

    public function setName(?string $name): void {
        $this->name = $name;
    }

    public function getNickname(): ?string {
        return $this->nickname;
    }

    public function setNickname(?string $nickname): void {
        $this->nickname = $nickname;
    }

    public function getMediaId(): ?string {
        return $this->mediaId;
    }

    public function setMediaId(?string $mediaId): void {
        $this->mediaId = $mediaId;
    }

    public function getMedia(): ?MediaEntity {
        return $this->media;
    }

    public function setMedia(MediaEntity $media): void {
        $this->media = $media;
    }
}
