'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { FaGoogle, FaFacebook, FaYelp, FaCheck } from 'react-icons/fa';
import { useIpAddress } from '../../hooks/useIpAddress';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ReviewPage({ params }: { params: { shortCode: string } }) {
    const [business, setBusiness] = useState<any>(null);
    const [shortUrlId, setShortUrlId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [clickedButtons, setClickedButtons] = useState<{ [key: string]: boolean }>({});
    const searchParams = useSearchParams();
    const feedbackId = searchParams.get('id');
    const ipAddress = useIpAddress();

    useEffect(() => {
        const fetchBusinessAndShortUrlId = async () => {
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

            if (!error && data) {
                setBusiness(data.businesses);
                setShortUrlId(data.id);
            }
            setLoading(false);
        };

        fetchBusinessAndShortUrlId();
    }, [params.shortCode]);

    const handleButtonClick = async (platform: string, url: string) => {
        window.open(url, '_blank');
        setClickedButtons(prev => ({ ...prev, [platform]: true }));

        // Log the click to the analytics table
        const { error } = await supabase
            .from('analytics')
            .insert({
                business_id: business.id,
                short_url_id: shortUrlId,
                customer_feedback_id: feedbackId,
                platform: platform,
                ip_address: ipAddress,
                clicks: 1
            });

        if (error) {
            console.error('Error logging review click:', error);
        }
    };

    const getButtonClass = (platform: string) => {
        const baseClass = "relative text-white text-xl font-bold py-3 px-6 rounded text-center flex items-center justify-center transition-all duration-300 ease-in-out";
        if (clickedButtons[platform]) {
            return `${baseClass} bg-green-500`;
        }
        switch (platform) {
            case 'google':
                return `${baseClass} bg-blue-500 hover:bg-blue-600`;
            case 'facebook':
                return `${baseClass} bg-blue-700 hover:bg-blue-800`;
            case 'yelp':
                return `${baseClass} bg-red-500 hover:bg-red-600`;
            default:
                return baseClass;
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    if (!business) return <div className="flex justify-center items-center h-screen">Business not found</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Let Your Neighbors Know!</h1>
                <p className="text-center text-gray-600 mb-6 text-lg">
                    By sharing your experience on one of these platforms, you can help us continue to grow and serve the community.
                </p>
                <div className="flex flex-col space-y-4">
                    {business.google_maps_url && (
                        <button
                            onClick={() => handleButtonClick('google', business.google_maps_url)}
                            className={getButtonClass('google')}
                        >
                            <FaGoogle className="mr-2" />
                            Review on Google
                            <FaCheck className={`absolute right-4 transition-opacity duration-300 ease-in-out ${clickedButtons['google'] ? 'opacity-100' : 'opacity-0'}`} />
                        </button>
                    )}
                    {business.facebook_url && (
                        <button
                            onClick={() => handleButtonClick('facebook', business.facebook_url)}
                            className={getButtonClass('facebook')}
                        >
                            <FaFacebook className="mr-2" />
                            Review on Facebook
                            <FaCheck className={`absolute right-4 transition-opacity duration-300 ease-in-out ${clickedButtons['facebook'] ? 'opacity-100' : 'opacity-0'}`} />
                        </button>
                    )}
                    {business.yelp_url && (
                        <button
                            onClick={() => handleButtonClick('yelp', business.yelp_url)}
                            className={getButtonClass('yelp')}
                        >
                            <FaYelp className="mr-2" />
                            Review on Yelp
                            <FaCheck className={`absolute right-4 transition-opacity duration-300 ease-in-out ${clickedButtons['yelp'] ? 'opacity-100' : 'opacity-0'}`} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}