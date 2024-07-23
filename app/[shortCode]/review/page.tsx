import { getBusinessData } from '../utils/getBusinessData';
import ReviewClient from './ReviewClient';
import { ShortUrlQueryResult } from '../../types/supabase';

export default async function ReviewPage({ params }: { params: { shortCode: string } }) {
    const data: ShortUrlQueryResult = await getBusinessData(params.shortCode);

    if (!data || !data.businesses) {
        return <div>No business found for this URL</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Can You Help Us?</h1>
                <p className="text-center text-gray-600 mb-6 text-lg">
                    We're so proud we were able to give you great service!
                </p>
                <p className="text-center text-gray-600 mb-6 text-lg">
                    As a local small business, we rely on the support of customers like you to keep us around. Your voice matters in helping other homeowners find us.
                </p>
                <p className="text-center text-gray-600 mb-6 text-lg font-bold">
                    Can you please take a moment to share your experience with us below?
                </p>
                <ReviewClient business={data.businesses} shortUrlId={data.id} />
            </div>
        </div>
    );
}