import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = createRouteHandlerClient({ cookies })
    const formData = await request.formData()
    const businessId = formData.get('businessId') as string
    const currentStatus = formData.get('currentStatus') as string

    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'

    const { error } = await supabase
        .from('businesses')
        .update({ status: newStatus })
        .eq('id', businessId)

    if (error) {
        console.error('Error updating business status:', error)
    }

    return NextResponse.redirect(new URL('/dashboard', request.url))
}