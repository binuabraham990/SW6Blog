<?php

namespace TwoHatsBlogModule\Struct;

use Shopware\Core\Framework\Struct\Struct;
use Shopware\Core\Framework\DataAbstractionLayer\Search\EntitySearchResult;

class BlogStruct extends Struct
{

    /**
     * @var string
     */
    private $blogs;

    public function __construct(EntitySearchResult $blogs)
    {
        $this->blogs = $blogs;
    }

    /**
     * @return array
     */
    public function getBlogs(): EntitySearchResult
    {
        return $this->blogs;
    }

    /**
     * @param array $blogs
     */
    public function setBlogs(EntitySearchResult $blogs): void
    {
        $this->blogs = $blogs;
    }
}
