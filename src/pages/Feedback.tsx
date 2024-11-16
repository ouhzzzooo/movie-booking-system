import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';

const Feedback: React.FC = () => {
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user, submitFeedback } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await submitFeedback(message);
      setMessage('');
      setSuccessMessage('Thank you for your feedback!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit Feedback</h1>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Feedback
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Share your thoughts with us..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;