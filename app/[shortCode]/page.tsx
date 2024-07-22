import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import RatingClient from './RatingClient';
import { submitRating } from './actions';

export default async function RatingPage({ params }: { params: { shortCode: string } }) {
    const supabase = createServerComponentClient({ cookies });

    const { data: business, error } = await supabase
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
        yelp_url,
        logo_url
      )
    `)
        .eq('short_code', params.shortCode)
        .single();

    if (error) {
        console.error('Error fetching business:', error);
        return <div className="flex justify-center items-center h-screen">
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Oops!</strong>
                <span className="block sm:inline"> No business found for this URL</span>
            </div>
        </div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{business.businesses.name}</h1>
                <div className="mb-6 flex justify-center">
                    <Image
                        src={business.businesses.logo_url || '/default-logo.png'}
                        alt={`${business.businesses.name} logo`}
                        width={200}
                        height={200}
                        className="rounded-full max-w-[200px] w-full h-auto"
                    />
                </div>
                <p className="text-center text-gray-600 mb-4">How would you rate your service?</p>
                <RatingClient
                    businessId={business.businesses.id}
                    shortUrlId={business.id}
                    shortCode={params.shortCode}
                    submitRating={submitRating}
                />
            </div>
        </div>
    );
}