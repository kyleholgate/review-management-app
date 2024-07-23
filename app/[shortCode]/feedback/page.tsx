import { FeedbackProvider } from '../../context/FeedbackContext'
import FeedbackForm from './FeedbackForm'

export default function FeedbackPage() {
    return (
        <FeedbackProvider>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-gray-700">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">What can we do better?</h1>
                    <FeedbackForm />
                </div>
            </div>
        </FeedbackProvider>
    )
}