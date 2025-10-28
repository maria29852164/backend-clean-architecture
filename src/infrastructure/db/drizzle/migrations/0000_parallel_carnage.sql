CREATE TABLE `plans` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`price_cents` int NOT NULL,
	`duration_days` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `plans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`plan_id` varchar(36) NOT NULL,
	`start_at` datetime NOT NULL,
	`end_at` datetime NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'active',
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_plan_id_plans_id_fk` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE no action ON UPDATE no action;