-- Update user_profiles table
ALTER TABLE user_profiles
ADD COLUMN subscription_tier TEXT,
ADD COLUMN max_businesses INTEGER;

-- Update businesses table
ALTER TABLE businesses
ADD COLUMN status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive'));

-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id),
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  tier TEXT NOT NULL,
  max_businesses INTEGER NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);