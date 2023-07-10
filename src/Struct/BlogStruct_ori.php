<?php

namespace TwoHatsBlogModule\Struct;

use Shopware\Core\Framework\Struct\Struct;
use TwoHatsBlogModule\Core\Content\Blog\Blog\BlogCollection;

class BlogStruct_ori extends Struct
{

    /**
     * @var string
     */
    private $blogs;

    public function __construct(BlogCollection $blogs)
    {
        $this->blogs = $blogs;
    }

    /**
     * @return array
     */
    public function getBlogs(): BlogCollection
    {
        return $this->blogs;
    }

    /**
     * @param array $blogs
     */
    public function setBlogs(BlogCollection $blogs): void
    {
        $this->blogs = $blogs;
    }
}
