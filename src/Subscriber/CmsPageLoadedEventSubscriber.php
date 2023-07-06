<?php

namespace TwoHatsBlogModule\Subscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Content\Cms\CmsPageEvents;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityLoadedEvent;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use TwoHatsBlogModule\Struct\BlogStruct;

class CmsPageLoadedEventSubscriber implements EventSubscriberInterface {

    /**
     * @var EntityRepository
     */
    private $blogRepository;

    public function __construct(EntityRepository $blogRepository) {
        $this->blogRepository = $blogRepository;
    }

    public static function getSubscribedEvents(): array {
        return [
            CmsPageEvents::PAGE_LOADED_EVENT => 'onCmsPageLoadedEvent'
        ];
    }

    public function onCmsPageLoadedEvent(EntityLoadedEvent $event) {

        $criteria = new Criteria();
        $criteria->addAssociation('author');
        $criteria->addAssociation('media.media');
        $criteria->setLimit(24);
        $criteria->addSorting(new FieldSorting('createdAt', FieldSorting::DESCENDING));

        $entities = $this->blogRepository->search($criteria, $event->getContext())->getEntities();
        $blogStruct = new BlogStruct($entities);
        $event->getContext()->addExtension('twohats_blogs', $blogStruct);
    }
}
