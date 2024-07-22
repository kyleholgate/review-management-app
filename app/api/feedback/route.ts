import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(request: Request) {
    const { businessId, rating, feedback } = await request.json();

    if (!businessId || !rating || !feedback || rating < 1 || rating > 5) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('customer_feedback')
        .insert({ business_id: businessId, rating, feedback })
        .select();

    if (error) {
        return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
}