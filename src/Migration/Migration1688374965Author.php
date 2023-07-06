<?php

declare(strict_types=1);

namespace TwoHatsBlogModule\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1688374965Author extends MigrationStep {

    public function getCreationTimestamp(): int {
        return 1688374965;
    }

    public function update(Connection $connection): void {
        $query = <<<SQL
        CREATE TABLE IF NOT EXISTS `twohats_blog_author` (
            `id` binary(16) NOT NULL,
            `name` varchar(50) COLLATE 'utf8mb4_unicode_ci' NOT NULL,
            `nickname` varchar(50) COLLATE 'utf8mb4_unicode_ci' NULL,
            `media_id` binary(16) NULL,
            `created_at` datetime(3) NULL,
            `updated_at` datetime(3) NULL,
             PRIMARY KEY (`id`)
            ) ENGINE='InnoDB'
              DEFAULT CHARSET = utf8mb4
            COLLATE = utf8mb4_unicode_ci;
        SQL;

        $connection->executeStatement($query);
    }

    public function updateDestructive(Connection $connection): void {
        // implement update destructive
    }
}
