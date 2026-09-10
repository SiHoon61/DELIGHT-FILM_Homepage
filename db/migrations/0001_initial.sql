CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('video', 'shorts')),
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (section, slug)
);

CREATE TABLE IF NOT EXISTS contents (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('video', 'shorts')),
  category_id TEXT NOT NULL REFERENCES categories(id),
  youtube_video_id TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'hidden')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contents_section_status_idx
  ON contents (section, status);

CREATE INDEX IF NOT EXISTS contents_category_idx
  ON contents (category_id);

CREATE TABLE IF NOT EXISTS layout_sets (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('video', 'shorts')),
  category_id TEXT NULL REFERENCES categories(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS layout_sets_all_unique_idx
  ON layout_sets (section)
  WHERE category_id IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS layout_sets_category_unique_idx
  ON layout_sets (section, category_id)
  WHERE category_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS layout_items (
  layout_set_id TEXT NOT NULL REFERENCES layout_sets(id) ON DELETE CASCADE,
  content_id TEXT NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
  desktop_position INTEGER NOT NULL,
  mobile_position INTEGER NOT NULL,
  desktop_column_span SMALLINT NOT NULL DEFAULT 1 CHECK (desktop_column_span BETWEEN 1 AND 4),
  desktop_row_span SMALLINT NOT NULL DEFAULT 1 CHECK (desktop_row_span BETWEEN 1 AND 4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (layout_set_id, content_id),
  CONSTRAINT layout_items_desktop_position_unique
    UNIQUE (layout_set_id, desktop_position) DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT layout_items_mobile_position_unique
    UNIQUE (layout_set_id, mobile_position) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX IF NOT EXISTS layout_items_content_idx
  ON layout_items (content_id);
