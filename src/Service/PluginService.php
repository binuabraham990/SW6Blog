<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Service;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;

class PluginService {

    /**
     * 
     * @var type EntityRepository
     */
    private $blogRepository;

    public function __construct(EntityRepository $blogRepository) {

        $this->blogRepository = $blogRepository;
    }

    public function getBlogDetails($id, $context) {

        $criteria = new Criteria([$id]);
        $criteria->addAssociation('author');
        $criteria->addAssociation('author.media');
        $criteria->addAssociation('media.media');
        $blog = $this->blogRepository->search($criteria, $context)->first();
        
        return $blog;
    }
}
