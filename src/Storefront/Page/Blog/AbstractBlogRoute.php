<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Storefront\Page\Blog;

use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Symfony\Component\HttpFoundation\Request;
use TwoHatsBlogModule\Storefront\Page\Blog\BlogRouteResponse;

#[Package('customer-order')]
abstract class AbstractBlogRoute {

    abstract public function getDecorated(): AbstractBlogRoute;

    abstract public function load(Request $request, SalesChannelContext $context, Criteria $criteria): BlogRouteResponse;
}
