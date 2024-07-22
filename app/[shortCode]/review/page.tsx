'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { FaGoogle, FaFacebook, FaYelp, FaCheck } from 'react-icons/fa';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ReviewPage({ params }: { params: { shortCode: string } }) {
    const searchParams = useSearchParams();
    const rating = parseInt(searchParams.get('rating') || '4');
    const [business, setBusiness] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [clickedButtons, setClickedButtons] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchBusiness = async () => {
            const { data, error } = await supabase
                .from('short_urls')
                .select(`
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
            }
            setLoading(false);
        };

        fetchBusiness();
    }, [params.shortCode]);

    const handleButtonClick = (platform: string, url: string) => {
        window.open(url, '_blank');
        setClickedButtons(prev => ({ ...prev, [platform]: true }));
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
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
                    {rating >= 4 ? "Let Your Neighbors Know!" : "Thank You for Your Feedback"}
                </h1>
                <p className="text-center text-gray-600 mb-6 text-lg">
                    {rating === 5
                        ? <>We're so happy we were able to give you <span className="font-bold">5-star service</span>!</>
                        : rating === 4
                            ? "We're so happy we were able to give you excellent service!"
                            : `We value your feedback and will use it to improve our services. Thank you for taking the time to share your thoughts with us.`
                    }
                    {rating >= 4 && " By sharing your experience on one of these platforms, you can help us continue to grow and serve the community."}
                </p>
                {rating >= 4 && (
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
                )}
            </div>
        </div>
    );
}