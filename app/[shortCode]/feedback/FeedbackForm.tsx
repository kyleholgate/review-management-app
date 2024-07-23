'use client';

import { useState } from 'react';
import { useFeedback } from '../../context/FeedbackContext';
import { submitFeedback } from './actions';

export default function FeedbackForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { feedbackId } = useFeedback();
    console.log('feedbackId:', feedbackId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedback.trim() || !feedbackId) {
            alert('Please provide feedback before submitting.');
            return;
        }

        try {
            await submitFeedback(feedbackId, feedback, name, email, phone);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('An error occurred while submitting your feedback. Please try again.');
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Thank You!</h1>
                <p className="text-xl">Your feedback has been submitted successfully.</p>
                <p className="mt-4">We appreciate your time and input.</p>
            </div>
        );
    }

    return (
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
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Submit
            </button>
        </form>
    );
}