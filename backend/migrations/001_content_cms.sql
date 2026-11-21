-- Additive migration for Stream.Store CMS. Select the existing database first.
-- This script does not drop, truncate, or rewrite existing content records.
-- The API's ensureSchema() also checks and adds these columns idempotently.

CREATE TABLE IF NOT EXISTS content (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(20) NOT NULL DEFAULT 'Movie',
  title VARCHAR(150) NOT NULL,
  genre VARCHAR(255) NULL,
  year SMALLINT NULL,
  released DATE NULL,
  rating DECIMAL(3,1) NOT NULL DEFAULT 0,
  quality VARCHAR(20) NOT NULL DEFAULT 'HD',
  info TEXT NULL,
  image TEXT NULL,
  video_url TEXT NULL,
  download_base TEXT NULL,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  trending TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS episodes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  content_id BIGINT UNSIGNED NOT NULL,
  season_number INT UNSIGNED NOT NULL,
  episode_number INT UNSIGNED NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT NULL,
  duration VARCHAR(40) NULL,
  video_url TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_episode_order (content_id, season_number, episode_number),
  KEY idx_episode_content_order (content_id, season_number, episode_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
