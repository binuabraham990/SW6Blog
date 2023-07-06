<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Core\Content\Blog\Blog;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void               add(ExampleEntity $entity)
 * @method void               set(string $key, ExampleEntity $entity)
 * @method ExampleEntity[]    getIterator()
 * @method ExampleEntity[]    getElements()
 * @method ExampleEntity|null get(string $key)
 * @method ExampleEntity|null first()
 * @method ExampleEntity|null last()
 */
class BlogCollection extends EntityCollection {

    public function getApiAlias(): string {
        return 'twohats_blog_collection';
    }

    protected function getExpectedClass(): string {
        return BlogEntity::class;
    }
}
