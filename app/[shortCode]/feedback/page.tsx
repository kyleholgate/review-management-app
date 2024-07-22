'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function FeedbackPage({ params }: { params: { shortCode: string } }) {
    const [feedback, setFeedback] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically submit the feedback to your API
        console.log('Feedback submitted:', feedback);
        // Redirect back to the main page or a thank you page
        router.push(`/${params.shortCode}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">What can we do better?</h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full p-2 border rounded"
                        rows={4}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Please provide your feedback here..."
                    />
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
}