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

    public function __construct(
            PluginService $service,
            EntityRepository $cmsSlotRepository,
            EntityRepository $blogRepository
    ) {

        $this->service = $service;
        $this->cmsSlotRepository = $cmsSlotRepository;
        $this->blogRepository = $blogRepository;
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

    #[Route(path: '/twohats/blog/filter', name: 'twohats.blog.frontend.filter', defaults: ['XmlHttpRequest' => true, '_routeScope' => ['storefront'], '_httpCache' => true], methods: ['GET', 'POST'])]
    public function filter(Request $request, SalesChannelContext $context): Response {

        $nextPage = $request->query->get('p');
        $slotId = $request->query->get('slots');
        
        $slot = $this->cmsSlotRepository->search(new Criteria([$slotId]), $context->getContext())->first();
        $slotConfig = $slot->getConfig();
        $limitPerPage = $slotConfig['numberOfBlogs']['value'];
        $offSet = $limitPerPage * ($nextPage - 1) + 1;
        
        // Allows to fetch only aggregations over the gateway.
        $request->request->set('only-aggregations', true);

        // Allows to convert all post-filters to filters. This leads to the fact that only aggregation values are returned, which are combinable with the previous applied filters.
        $request->request->set('reduce-aggregations', true);

        $criteria = new Criteria();
        $criteria->addAssociation('author');
        $criteria->addAssociation('author.media');
        $criteria->addAssociation('media.media');
        $criteria->addSorting(new FieldSorting('createdAt', FieldSorting::DESCENDING));
        $criteria->setOffset($offSet);
        $criteria->setLimit($limitPerPage);
        $criteria->setTotalCountMode(Criteria::TOTAL_COUNT_MODE_EXACT);
        $blogDetail = $this->blogRepository->search($criteria, $context->getContext())->first();

        $response = new JsonResponse($blogDetail);

        $response->headers->set('x-robots-tag', 'noindex');

        return $response;
    }
}
