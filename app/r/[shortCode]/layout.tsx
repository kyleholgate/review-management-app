import { getBusinessData } from './utils/getBusinessData';
import { FeedbackProvider } from '../context/FeedbackContext';
import { ShortUrlQueryResult } from '../../types/supabase';

export default async function ShortCodeLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { shortCode: string };
}) {
    const data: ShortUrlQueryResult = await getBusinessData(params.shortCode);

    if (!data.businesses) {
        return <div>No business found for this URL</div>;
    }

    return (
        <FeedbackProvider>
            {children}
        </FeedbackProvider>
    );
}

export async function generateMetadata({ params }: { params: { shortCode: string } }) {
    const data: ShortUrlQueryResult = await getBusinessData(params.shortCode);
    return {
        title: data.businesses?.name + ' - Leave a Review' || 'Leave a Review',
        description: 'Help ' + data.businesses?.name + ' by giving your feedback!' || 'Leave a Review',
    };
}