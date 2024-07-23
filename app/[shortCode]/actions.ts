'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../types/database'; // Adjust the path as needed

type Business = Database['public']['Tables']['businesses']['Row'];
type ShortUrl = Database['public']['Tables']['short_urls']['Row'];

export async function submitRating(
    businessId: Business['id'],
    shortUrlId: ShortUrl['id'],
    rating: number,
    ipAddress: string,
    email: string,
    phone: string
): Promise<string> {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase
        .from('customer_feedback')
        .insert({
            business_id: businessId,
            short_url_id: shortUrlId,
            rating: rating,
            ip_address: ipAddress,
            email: email,
            phone: phone
        })
        .select()
        .single();

    if (error) {
        console.error('Error recording rating:', error);
        throw new Error('Failed to submit rating');
    }

    return data.id;
}