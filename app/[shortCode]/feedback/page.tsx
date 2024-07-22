'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function FeedbackPage({ params }: { params: { shortCode: string } }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const searchParams = useSearchParams();
    const feedbackId = searchParams.get('id');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedback.trim() || !feedbackId) {
            alert('Please provide feedback before submitting.');
            return;
        }

        const { error } = await supabase
            .from('customer_feedback')
            .update({
                feedback: feedback,
                name: name,
                email: email,
                phone: phone
            })
            .eq('id', feedbackId);

        if (error) {
            console.error('Error submitting feedback:', error);
            alert('An error occurred while submitting your feedback. Please try again.');
        } else {
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-gray-700">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl text-center">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">Thank You!</h1>
                    <p className="text-xl">Your feedback has been submitted successfully.</p>
                    <p className="mt-4">We appreciate your time and input.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-gray-700">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">What can we do better?</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name (optional)</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (optional)</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (optional)</label>
                        <input
                            type="tel"
                            id="phone"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback (required)</label>
                        <textarea
                            id="feedback"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            rows={4}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Please provide your feedback here..."
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
}