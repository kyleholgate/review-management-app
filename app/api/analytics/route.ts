import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(request: Request) {
    const { shortUrlId, isUnique } = await request.json();

    if (!shortUrlId) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { data: shortUrl, error: shortUrlError } = await supabase
        .from('short_urls')
        .select('business_id')
        .eq('id', shortUrlId)
        .single();

    if (shortUrlError || !shortUrl) {
        return NextResponse.json({ error: 'Short URL not found' }, { status: 404 });
    }

    const { data, error } = await supabase
        .from('analytics')
        .upsert(
            {
                business_id: shortUrl.business_id,
                short_url_id: shortUrlId,
                clicks: 1,
                unique_visitors: isUnique ? 1 : 0,
            },
            {
                onConflict: 'business_id,short_url_id',
                count: 'exact',
            }
        )
        .select();

    if (error) {
        return NextResponse.json({ error: 'Failed to update analytics' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
}