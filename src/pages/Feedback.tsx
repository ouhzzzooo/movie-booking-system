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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col">
      <div className="max-w-3xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent mb-8">
          Submit Feedback
        </h1>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg animate-fadeIn">
            {successMessage}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-soft p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-sky-700 mb-2">
                Your Feedback
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-sky-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-sky-50 text-sky-700 placeholder-sky-400"
                placeholder="Share your thoughts with us..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full relative group overflow-hidden px-4 py-3 rounded-lg font-semibold text-white shadow-lg shadow-sky-400/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-500 transition-transform duration-300 group-hover:scale-105"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent 50%)]"></div>
              <span className="relative">Submit Feedback</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;