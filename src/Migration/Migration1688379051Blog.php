<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1688379051Blog extends MigrationStep {

    public function getCreationTimestamp(): int {
        return 1688379051;
    }

    public function update(Connection $connection): void {
        $query = <<<SQL
        CREATE TABLE IF NOT EXISTS `twohats_blog_blog` (
            `id` binary(16) NOT NULL,
            `title` varchar(256) COLLATE 'utf8mb4_unicode_ci' NOT NULL,
            `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
            `author_id` binary(16) NULL,
            `created_at` datetime(3) NOT NULL,
            `updated_at` datetime(3) NULL,
            PRIMARY KEY (`id`),
            KEY `fk.twohats_blog_blog.author_id` (`author_id`),
            CONSTRAINT `fk.twohats_blog_blog.author_id` FOREIGN KEY (`author_id`) REFERENCES `twohats_blog_author` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
          ) ENGINE='InnoDB' 
            DEFAULT CHARSET=utf8mb4 
            COLLATE=utf8mb4_unicode_ci;
        SQL;

        $connection->executeStatement($query);
    }

    public function updateDestructive(Connection $connection): void {
        // implement update destructive
    }
}
