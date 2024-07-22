import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ReviewClient from './ReviewClient';

export default async function ReviewPage({ params }: { params: { shortCode: string } }) {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
        .from('short_urls')
        .select(`
      id,
      businesses (
        id,
        name,
        google_maps_url,
        facebook_url,
        yelp_url
      )
    `)
        .eq('short_code', params.shortCode)
        .single();

    if (error) {
        console.error('Error fetching business:', error);
        return <div className="flex justify-center items-center h-screen">Business not found</div>;
    }

    const { businesses: business, id: shortUrlId } = data;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Let Your Neighbors Know!</h1>
                <p className="text-center text-gray-600 mb-6 text-lg">
                    By sharing your experience on one of these platforms, you can help us continue to grow and serve the community.
                </p>
                <ReviewClient business={business} shortUrlId={shortUrlId} />
            </div>
        </div>
    );
}