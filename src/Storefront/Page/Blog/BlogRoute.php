<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Storefront\Page\Blog;

use Shopware\Core\Checkout\Customer\Aggregate\CustomerWishlist\CustomerWishlistEntity;
use Shopware\Core\Checkout\Customer\CustomerEntity;
use Shopware\Core\Checkout\Customer\Event\CustomerWishlistLoaderCriteriaEvent;
use Shopware\Core\Checkout\Customer\Event\CustomerWishlistProductListingResultEvent;
use Shopware\Core\Checkout\Customer\Exception\CustomerWishlistNotActivatedException;
use Shopware\Core\Checkout\Customer\Exception\CustomerWishlistNotFoundException;
use Shopware\Core\Content\Product\SalesChannel\AbstractProductCloseoutFilterFactory;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\EntitySearchResult;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\MultiFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Plugin\Exception\DecorationPatternException;
use Shopware\Core\System\SalesChannel\Entity\SalesChannelRepository;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use TwoHatsBlogModule\Storefront\Page\Blog\AbstractBlogRoute;

#[Route(defaults: ['_routeScope' => ['store-api']])]
#[Package('customer-order')]
class BlogRoute extends AbstractBlogRoute {

    /**
     * @internal
     */
    public function __construct(
            private readonly EntityRepository $blogRepository,
    ) {
        
    }

    public function getDecorated(): AbstractBlogRoute {
        throw new DecorationPatternException(self::class);
    }

    #[Route(path: '/store-api/blog/load', name: 'store-api.blog.load', methods: ['GET', 'POST'], defaults: ['_entity' => 'twohats_blog_blog'])]
    public function load(Request $request, SalesChannelContext $context, Criteria $criteria): BlogRouteResponse {

        $nextPage = $request->query->get('p');
        $limitPerPage = 2;
        $offset = ($limitPerPage * ($nextPage - 1)) + 1;
        $criteria = new Criteria();
        $criteria->addAssociation('author');
        $criteria->addAssociation('author.media');
        $criteria->addAssociation('media.media');
        $criteria->addSorting(new FieldSorting('createdAt', FieldSorting::DESCENDING));
        $criteria->setOffset($offset);
        $criteria->setLimit($limitPerPage);
        $criteria->setTotalCountMode(Criteria::TOTAL_COUNT_MODE_EXACT);
        
        $blogs = $this->blogRepository->search($criteria, $context->getContext());

        return new BlogRouteResponse($blogs);
    }
}
