ALTER TABLE tags RENAME TO _tags_old;

CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`featured_image` text,
	`og_image` text,
	`og_title` text,
	`og_description` text,
	`twitter_image` text,
	`twitter_title` text,
	`twitter_description` text,
	`meta_title` text,
	`meta_description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `tags` (`id`, `name`, `slug`, `description`, `featured_image`, `og_image`, `og_title`, `og_description`, `twitter_image`, `twitter_title`, `twitter_description`, `meta_title`, `meta_description`, `created_at`, `updated_at`)
  SELECT `id`, `name`, `slug`, `description`, `featured_image`, `og_image`, `og_title`, `og_description`, `twitter_image`, `twitter_title`, `twitter_description`, `meta_title`, `meta_description`, `created_at`, `updated_at`
  FROM _tags_old;