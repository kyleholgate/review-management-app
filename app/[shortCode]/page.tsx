'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useIpAddress } from '../hooks/useIpAddress';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RatingPage({ params }: { params: { shortCode: string } }) {
  const [business, setBusiness] = useState<any>(null);
  const [shortUrlId, setShortUrlId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';
  const ipAddress = useIpAddress();

  useEffect(() => {
    const fetchBusinessAndShortUrlId = async () => {
      try {
        const { data, error } = await supabase
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

        if (error) throw error;
        setBusiness(data);
        setShortUrlId(data.id);
      } catch (err) {
        console.error('Error fetching business:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessAndShortUrlId();
  }, [params.shortCode]);

  const handleRating = async (value: number) => {
    setRating(value);
    const { data, error } = await supabase
      .from('customer_feedback')
      .insert({
        business_id: business.businesses.id,
        short_url_id: shortUrlId,
        rating: value,
        ip_address: ipAddress,
        email: email,
        phone: phone
      })
      .select()
      .single();

    if (error) {
      console.error('Error recording rating:', error);
      return;
    }

    if (value <= 3) {
      router.push(`/${params.shortCode}/feedback?id=${data.id}`);
    } else {
      router.push(`/${params.shortCode}/review?id=${data.id}`);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  </div>;

  if (!business) return <div className="flex justify-center items-center h-screen">
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Oops!</strong>
      <span className="block sm:inline"> No business found for this URL</span>
    </div>
  </div>;

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
      </div>
    </div>
  );
}