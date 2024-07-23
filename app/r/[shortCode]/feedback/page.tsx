import FeedbackForm from './FeedbackForm'

export default function FeedbackPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-gray-700">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <FeedbackForm />
            </div>
        </div>
    )
}