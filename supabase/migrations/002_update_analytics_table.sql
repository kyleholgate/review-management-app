-- Modify analytics table
ALTER TABLE analytics
DROP COLUMN unique_visitors,
ADD COLUMN customer_feedback_id UUID REFERENCES customer_feedback(id),
ADD COLUMN platform TEXT,
ADD COLUMN ip_address TEXT;

-- Create index for the new column
CREATE INDEX idx_analytics_customer_feedback_id ON analytics(customer_feedback_id);