<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1688381199BlogMedia extends MigrationStep {

    public function getCreationTimestamp(): int {
        return 1688381199;
    }

    public function update(Connection $connection): void {
        $query = <<<SQL
        CREATE TABLE IF NOT EXISTS `twohats_blog_blog_media` (
            `id` binary(16) NOT NULL,
            `position` int NOT NULL DEFAULT '1',
            `blog_id` binary(16) NOT NULL,
            `media_id` binary(16) NOT NULL,
            `created_at` datetime(3) NOT NULL,
            `updated_at` datetime(3) DEFAULT NULL,
            PRIMARY KEY (`id`),
            KEY `fk.blog_media.media_id` (`media_id`),
            KEY `fk.blog_media.blog_id` (`blog_id`),
            CONSTRAINT `fk.blog_media.media_id` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT `fk.blog_media.blog_id` FOREIGN KEY (`blog_id`) REFERENCES `twohats_blog_blog` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
