<?php declare(strict_types=1);

namespace TwoHatsBlogModule\Storefront\Page\Blog;

use Shopware\Core\Checkout\Customer\SalesChannel\LoadWishlistRouteResponse;
use TwoHatsBlogModule\Storefront\Page\Blog\BlogRouteResponse;
use Shopware\Core\Framework\Log\Package;
use Shopware\Storefront\Page\Page;

#[Package('storefront')]
class BlogPage extends Page
{
    /**
     * @var LoadWishlistRouteResponse
     */
    protected $blog;

    public function getBlog(): BlogRouteResponse
    {
        return $this->blog;
    }

    public function setBlog(BlogRouteResponse $blog): void
    {
        $this->blog = $blog;
    }
}
