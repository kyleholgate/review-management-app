'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useIpAddress } from '../hooks/useIpAddress';

interface RatingClientProps {
    businessId: number;
    shortUrlId: number;
    shortCode: string;
    submitRating: (businessId: number, shortUrlId: number, rating: number, ipAddress: string, email: string, phone: string) => Promise<number>;
}

export default function RatingClient({ businessId, shortUrlId, shortCode, submitRating }: RatingClientProps) {
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const phone = searchParams.get('phone') || '';
    const ipAddress = useIpAddress();

    const handleRating = async (value: number) => {
        try {
            const feedbackId = await submitRating(businessId, shortUrlId, value, ipAddress, email, phone);
            if (value <= 3) {
                router.push(`/${shortCode}/feedback?id=${feedbackId}`);
            } else {
                router.push(`/${shortCode}/review?id=${feedbackId}`);
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
                        <FaStar
                            className="h-10 w-10 sm:h-16 sm:w-16 transition-colors duration-200 text-star-gold"
                        />
                    ) : (
                        <FaRegStar
                            className="h-10 w-10 sm:h-16 sm:w-16 transition-colors duration-200 text-star-gold"
                        />
                    )}
                </button>
            ))}
        </div>
    );
}