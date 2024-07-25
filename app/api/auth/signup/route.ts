import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '../../../types/database'

export async function POST(request: Request) {
    const { email, password } = await request.json()
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ user: data.user }, { status: 200 })
}