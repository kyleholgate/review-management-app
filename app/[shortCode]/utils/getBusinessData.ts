import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../../types/database';
import { ShortUrlQueryResult } from '../../types/supabase';

export async function getBusinessData(shortCode: string): Promise<ShortUrlQueryResult> {
    const supabase = createServerComponentClient<Database>({ cookies });

    console.log('Getting business data for shortCode:', shortCode);

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

    console.log('data:', data);
    console.log('error:', error);

    if (error) throw new Error(error.message);
    if (!data) throw new Error('No data found');

    return data as ShortUrlQueryResult;
}