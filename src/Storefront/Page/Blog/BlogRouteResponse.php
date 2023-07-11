<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Storefront\Page\Blog;

use Shopware\Core\Checkout\Customer\Aggregate\CustomerWishlist\CustomerWishlistEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Search\EntitySearchResult;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Struct\ArrayStruct;
use Shopware\Core\System\SalesChannel\StoreApiResponse;
use TwoHatsBlogModule\Core\Content\Blog\Blog\BlogEntity;

#[Package('customer-order')]
class BlogRouteResponse extends StoreApiResponse {

    /**
     * @var EntitySearchResult
     */
    protected $blogListing;

    public function __construct(
            EntitySearchResult $listing
    ) {
        $this->blogListing = $listing;
//        parent::__construct(new ArrayStruct([
//                    'wishlist' => $wishlist,
//                    'products' => $listing,
//                        ], 'wishlist_products'));
    }

    public function getBlogListing(): EntitySearchResult {
        return $this->blogListing;
    }

    public function setBlogListing(EntitySearchResult $blogListing): void {
        $this->blogListing = $blogListing;
    }
}
