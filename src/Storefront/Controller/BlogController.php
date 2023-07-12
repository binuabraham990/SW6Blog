<?php

namespace TwoHatsBlogModule\Storefront\Controller;

use Shopware\Storefront\Controller\StorefrontController;
use Symfony\Component\Routing\Annotation\Route;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TwoHatsBlogModule\Service\PluginService;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use Symfony\Component\HttpFoundation\JsonResponse;
use TwoHatsBlogModule\Storefront\Page\Blog\BlogPageLoader;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsAnyFilter;

/**
 * @Route(defaults={"_routeScope"={"storefront"}})
 */
class BlogController extends StorefrontController {

    /**
     * 
     * @var type PluginService
     */
    private $service;

    /**
     * @var type EntityRepository
     */
    private $cmsSlotRepository;

    /**
     * @var type EntityRepository
     */
    private $blogRepository;

    /**
     * 
     * @var type BlogPageLoader
     */
    private $blogPageLoader;

    public function __construct(
            PluginService $service,
            EntityRepository $cmsSlotRepository,
            EntityRepository $blogRepository,
            BlogPageLoader $blogPageLoader
    ) {

        $this->service = $service;
        $this->cmsSlotRepository = $cmsSlotRepository;
        $this->blogRepository = $blogRepository;
        $this->blogPageLoader = $blogPageLoader;
    }

    /**
     * @Route("/twohats/blog/{id}/detail", name="twohats.blog.frontend.detail",  options={"seo"="false"}, methods={"GET"})
     * @param string|null $id
     * @param Request $request
     * @param SalesChannelContext $context
     */
    public function blogDetail(string $id, Request $request, SalesChannelContext $context): Response {

        $blogDetail = $this->service->getBlogDetails($id, $context->getContext());

        $response = $this->renderStorefront('@SwagBasicExample/storefront/page/twohats/detail.html.twig', [
            'blog' => $blogDetail
        ]);
        $response->headers->set('x-robots-tag', 'noindex');

        return $response;
    }

    #[Route(path: '/widget/twohats/blog/data/{limit}', name: 'widget.twohats.blog.data', options: ['seo' => false], defaults: ['XmlHttpRequest' => true], methods: ['GET', 'POST'])]
    public function data($limit, Request $request, SalesChannelContext $context): Response {

//        $page = $this->blogPageLoader->load($request, $context);
//        $response = $this->renderStorefront('@Storefront/storefront/component/blog/_listing.html.twig', ['page' => $page]);
//        $response->headers->set('x-robots-tag', 'noindex');
//
//        return new Response($response->getContent());
        $nextPage = $request->query->get('p');
        $limitPerPage = $limit;
        $offSet = $limitPerPage * ($nextPage - 1);
        $filterAuthor = $request->query->get('blog-author');

        // Allows to fetch only aggregations over the gateway.
        $request->request->set('only-aggregations', true);

        // Allows to convert all post-filters to filters. This leads to the fact that only aggregation values are returned, which are combinable with the previous applied filters.
        $request->request->set('reduce-aggregations', true);

        $criteria = new Criteria();
        $criteria->addAssociation('author');
        $criteria->addAssociation('author.media');
        $criteria->addAssociation('media.media');
        $criteria->addSorting(new FieldSorting('createdAt', FieldSorting::DESCENDING));

        if ($filterAuthor) {
            $authorIds = explode('|', $filterAuthor);
            $criteria->addFilter(new EqualsAnyFilter('author.id', $authorIds));
        }
        $criteria->setOffset($offSet);
        $criteria->setLimit($limitPerPage);
        $criteria->setTotalCountMode(Criteria::TOTAL_COUNT_MODE_EXACT);
        $blogDetails = $this->blogRepository->search($criteria, $context->getContext());

        $response = $this->renderStorefront('@SwagBasicExample/storefront/component/blog/_listing.html.twig', [
            'searchResult' => $blogDetails
        ]);

        $response = new Response($response);

        $response->headers->set('x-robots-tag', 'noindex');

        return $response;
    }
}
