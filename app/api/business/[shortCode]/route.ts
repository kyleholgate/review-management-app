import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function GET(
    request: Request,
    { params }: { params: { shortCode: string } }
) {
    const { shortCode } = params;

    const { data, error } = await supabase
        .from('short_urls')
        .select(`
      id,
      short_code,
      qr_code_url,
      businesses (
        id,
        name,
        google_maps_url,
        facebook_url,
        yelp_url
      )
    `)
        .eq('short_code', shortCode)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    return NextResponse.json(data);
}