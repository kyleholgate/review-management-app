import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function insertTestData() {
    // Insert a test business
    const { data: business, error: businessError } = await supabase
        .from('businesses')
        .insert({
            name: 'Test Business',
            google_maps_url: 'https://goo.gl/maps/test',
            facebook_url: 'https://facebook.com/testbusiness',
            yelp_url: 'https://yelp.com/biz/testbusiness'
        })
        .select()
        .single();

    if (businessError) {
        console.error('Error inserting business:', businessError);
        return;
    }

    // Insert a short URL for the test business
    const { data: shortUrl, error: shortUrlError } = await supabase
        .from('short_urls')
        .insert({
            business_id: business.id,
            short_code: 'testcode',
            qr_code_url: 'https://example.com/qr/testcode'
        })
        .select()
        .single();

    if (shortUrlError) {
        console.error('Error inserting short URL:', shortUrlError);
        return;
    }

    console.log('Test data inserted successfully:');
    console.log('Business:', business);
    console.log('Short URL:', shortUrl);
}

insertTestData();