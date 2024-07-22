'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function logReviewClick(businessId: string, shortUrlId: string, feedbackId: string | null, platform: string, ipAddress: string) {
    const supabase = createServerActionClient({ cookies })

    const { error } = await supabase
        .from('analytics')
        .insert({
            business_id: businessId,
            short_url_id: shortUrlId,
            customer_feedback_id: feedbackId,
            platform: platform,
            ip_address: ipAddress,
            clicks: 1
        })

    if (error) {
        console.error('Error logging review click:', error)
        throw error
    }
}