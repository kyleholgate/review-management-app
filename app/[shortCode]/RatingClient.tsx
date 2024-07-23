'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useFeedback } from '../context/FeedbackContext';
import { submitRating } from './actions'; // Import the server action
import { useIpAddress } from '../hooks/useIpAddress'; // Assuming you have this hook

interface RatingClientProps {
    businessId: string;
    shortUrlId: string;
    shortCode: string;
}

export default function RatingClient({ businessId, shortUrlId, shortCode }: RatingClientProps) {
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);
    const router = useRouter();
    const { setFeedbackId } = useFeedback();
    const ipAddress = useIpAddress(); // Get the IP address

    const handleRating = async (value: number) => {
        try {
            const feedbackId = await submitRating(businessId, shortUrlId, value, ipAddress, '', '');
            setFeedbackId(feedbackId);
            if (value <= 3) {
                router.push(`/${shortCode}/feedback`);
            } else {
                router.push(`/${shortCode}/review`);
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="flex justify-center space-x-4 sm:space-x-6">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    className="focus:outline-none transform transition-transform duration-200 hover:scale-110"
                >
                    {hoveredStar && star <= hoveredStar ? (
                        <FaStar className="h-10 w-10 sm:h-16 sm:w-16 transition-colors duration-200 text-star-gold" />
                    ) : (
                        <FaRegStar className="h-10 w-10 sm:h-16 sm:w-16 transition-colors duration-200 text-star-gold" />
                    )}
                </button>
            ))}
        </div>
    );
}