import NodeCache from 'node-cache';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../../types/database';
import { ShortUrlQueryResult } from '../../types/supabase';


const cache = new NodeCache({ stdTTL: 60 * 10 });

export async function getBusinessData(shortCode: string): Promise<ShortUrlQueryResult> {
    // Check if data is in cache
    const cachedData = cache.get<ShortUrlQueryResult>(shortCode);
    if (cachedData) {
        console.log('Returning cached data for shortCode:', shortCode);
        return cachedData;
    }

    console.log('Fetching business data for shortCode:', shortCode);

    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase
        .from('short_urls')
        .select(`
            id,
            businesses (
                id,
                name,
                google_maps_url,
                facebook_url,
                yelp_url,
                logo_url
            )
        `)
        .eq('short_code', shortCode)
        .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('No data found');

    // Store the result in cache
    cache.set(shortCode, data);

    return data as ShortUrlQueryResult;
}