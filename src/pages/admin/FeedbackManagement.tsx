import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { useAdminStore } from '../../store/adminStore';

const FeedbackManagement: React.FC = () => {
  const { fetchFeedbacks, feedbacks } = useAdminStore();

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Feedback Management</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.feedbackId}
                className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {feedback.user.name} {feedback.user.surname}
                        </h3>
                        <p className="text-sm text-gray-500">
                          User ID: {feedback.user.userId}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-gray-600">{feedback.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default FeedbackManagement;