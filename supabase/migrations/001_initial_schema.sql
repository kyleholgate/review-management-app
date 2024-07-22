-- Create tables
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  google_maps_url TEXT,
  facebook_url TEXT,
  yelp_url TEXT
);

CREATE TABLE short_urls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  short_code TEXT NOT NULL UNIQUE,
  qr_code_url TEXT
);

CREATE TABLE customer_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  short_url_id UUID NOT NULL REFERENCES short_urls(id),
  clicks INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0
);

-- Create indexes
CREATE INDEX idx_short_urls_short_code ON short_urls(short_code);
CREATE INDEX idx_customer_feedback_business_id ON customer_feedback(business_id);
CREATE INDEX idx_analytics_business_id ON analytics(business_id);
CREATE INDEX idx_analytics_short_url_id ON analytics(short_url_id);