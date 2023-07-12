<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1689067626AuthorTranslation extends MigrationStep {

    public function getCreationTimestamp(): int {
        return 1689067626;
    }

    public function update(Connection $connection): void {
        $query = <<<SQL
        CREATE TABLE IF NOT EXISTS `twohats_blog_author_translation` (
            `twohats_blog_author_id` binary(16) NOT NULL,
            `language_id` binary(16) NOT NULL,
            `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
            `created_at` datetime(3) NOT NULL,
            `updated_at` datetime(3) DEFAULT NULL,
            PRIMARY KEY (`twohats_blog_author_id`,`language_id`),
            KEY `language_id` (`language_id`),
            KEY `twohats_blog_author_id` (`twohats_blog_author_id`),
            CONSTRAINT `twohats_blog_author_translation_ibfk_1` FOREIGN KEY (`twohats_blog_author_id`) 
            REFERENCES `twohats_blog_author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT `twohats_blog_author_translation_ibfk_2` FOREIGN KEY (`language_id`) 
            REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        SQL;

        $connection->executeStatement($query);
    }

    public function updateDestructive(Connection $connection): void {
        
    }
}
