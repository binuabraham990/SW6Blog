<?php

namespace TwoHatsBlogModule\DataResolver;

use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use \Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use TwoHatsBlogModule\Core\Content\Blog\Blog\BlogDefinition;
use TwoHatsBlogModule\Struct\BlogStruct;

class BlogCmsDataResolver extends AbstractCmsElementResolver {

    public function getType(): string {
        return 'twohats-blog';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): CriteriaCollection {

        $elementConfig = $slot->getConfig();
        $limitPerPage = $elementConfig['numberOfBlogs']['value'];
        $criteria = $this->getBlogCriteria($limitPerPage);

        $criteriaCollection = new CriteriaCollection();
        $criteriaCollection->add('blog_' . $slot->getUniqueIdentifier(), BlogDefinition::class, $criteria);

        return $criteriaCollection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void {

        $searchResult = $result->get('blog_' . $slot->getUniqueIdentifier());
        $elementConfig = $slot->getConfig();
        $limitPerPage = $elementConfig['numberOfBlogs']['value'];
        if (!$searchResult) {
            return;
        }

        $searchResult->getCriteria()->setLimit($limitPerPage);
        $blogStruct = new BlogStruct($searchResult);
        $blogStruct->setBlogs($searchResult);

        $slot->setData($blogStruct);
    }

    private function getBlogCriteria($limitPerPage) {
        
        $criteria = new Criteria();
        $criteria->addAssociation('author');
        $criteria->addAssociation('author.media');
        $criteria->addAssociation('media.media');
        $criteria->addSorting(new FieldSorting('createdAt', FieldSorting::DESCENDING));
        $criteria->setLimit($limitPerPage);
        $criteria->setTotalCountMode(Criteria::TOTAL_COUNT_MODE_EXACT);
        
        return $criteria;
    }
}
