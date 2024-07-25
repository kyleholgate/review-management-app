import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = createRouteHandlerClient({ cookies })
    const formData = await request.formData()
    const name = formData.get('name') as string
    const logo_url = formData.get('logo_url') as string

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const { error } = await supabase
        .from('businesses')
        .insert({ name, logo_url, user_id: user.id, status: 'active' })

    if (error) {
        console.error('Error adding business:', error)
    }

    return NextResponse.redirect(new URL('/dashboard', request.url))
}