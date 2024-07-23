import { getBusinessData } from './utils/getBusinessData';
import Image from 'next/image';
import RatingClient from './RatingClient';
import { ShortUrlQueryResult } from '../../types/supabase';

export default async function RatingPage({ params }: { params: { shortCode: string } }) {
    const data: ShortUrlQueryResult = await getBusinessData(params.shortCode);

    if (!data.businesses) {
        return <div>No business found for this URL</div>;
    }

    const { businesses: business, id: shortUrlId } = data;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{business.name}</h1>
                <div className="mb-6 flex justify-center">
                    <Image
                        src={business.logo_url || '/default-logo.png'}
                        alt={`${business.name} logo`}
                        width={200}
                        height={200}
                        className="max-w-[200px] w-full h-auto"
                    />
                </div>
                <p className="text-center text-gray-600 mb-4">How would you rate your service?</p>
                <RatingClient
                    businessId={business.id}
                    shortUrlId={shortUrlId}
                    shortCode={params.shortCode}
                />
            </div>
        </div>
    );
}