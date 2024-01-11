SELECT name FROM sqlite_master WHERE type='table';

DROP TABLE IF EXISTS d1_migrations;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_subscriptions;
DROP TABLE IF EXISTS users_accounts;
