'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function submitRating(businessId: number, shortUrlId: number, rating: number, ipAddress: string, email: string, phone: string) {
    const supabase = createServerComponentClient({ cookies });

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