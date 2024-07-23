'use client';

import { useState } from 'react';
import { FaGoogle, FaFacebook, FaYelp, FaCheck } from 'react-icons/fa';
import { useIpAddress } from '../../hooks/useIpAddress';
import { logReviewClick } from './actions';
import { useFeedback } from '../../context/FeedbackContext';
import { Business, ShortUrl } from '../../../types/supabase';

interface ReviewClientProps {
    business: Business;
    shortUrlId: ShortUrl['id'];
}

export default function ReviewClient({ business, shortUrlId }: ReviewClientProps) {
    const [clickedButtons, setClickedButtons] = useState<{ [key: string]: boolean }>({});
    const ipAddress = useIpAddress();
    const { feedbackId } = useFeedback();

    const handleButtonClick = async (platform: string, url: string | null) => {
        if (!url) return;

        window.open(url, '_blank');
        setClickedButtons(prev => ({ ...prev, [platform]: true }));

        try {
            await logReviewClick(business.id, shortUrlId, feedbackId || '', platform, ipAddress);
        } catch (error) {
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

    return (
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
    );
}