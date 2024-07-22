'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function submitFeedback(feedbackId: string, feedback: string, name: string, email: string, phone: string) {
    const supabase = createServerActionClient({ cookies })

    const { error } = await supabase
        .from('customer_feedback')
        .update({
            feedback: feedback,
            name: name,
            email: email,
            phone: phone
        })
        .eq('id', feedbackId)

    if (error) {
        console.error('Error submitting feedback:', error)
        throw error
    }
}