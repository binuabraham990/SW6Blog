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
    
    private $authors;

    public function __construct(EntitySearchResult $blogs, EntitySearchResult $authors)
    {
        $this->blogs = $blogs;
        $this->authors = $authors;
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
    
    /**
     * @return array
     */
    public function getAuthors(): EntitySearchResult
    {
        return $this->authors;
    }

    /**
     * @param array $authors
     */
    public function setAuthors(EntitySearchResult $authors): void
    {
        $this->authors = $authors;
    }
}
