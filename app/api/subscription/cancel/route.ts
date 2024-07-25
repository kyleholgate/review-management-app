import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '../../../lib/database.types'

export async function POST(request: Request) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { data, error } = await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('user_id', request.searchParams.get('userId') || '')
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.redirect(new URL('/dashboard', request.url))
}