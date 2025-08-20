import React, { useEffect, useState } from 'react';
import { fetchUserMessages } from 'api/userMessages';
import Icon from 'components/AppIcon';
import { useAuth } from 'contexts/AuthContext';

export default function UserMessagesModal({ onClose }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user && user.email) {
      fetchUserMessages({ email: user.email }).then(msgs => {
        setMessages(msgs);
        setLoading(false);
      });
    } else {
      setMessages([]);
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl relative mx-2">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-purple-600" onClick={onClose}>
          <span className="text-2xl">&times;</span>
        </button>
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <Icon name="Mail" size={22} /> All Sent Messages & Replies
        </h3>
        {loading ? (
          <div className="text-center text-gray-400 py-8">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No messages found.</div>
        ) : (
          <div className="space-y-6 max-h-[60vh] overflow-y-auto">
            {messages.map((msg, idx) => (
              <div key={msg._id || idx} className="border rounded-lg p-4 bg-purple-50">
                <div className="mb-2">
                  <span className="font-semibold text-purple-700">Message:</span> {msg.message}
                  <div className="text-xs text-gray-400">{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}</div>
                </div>
                {msg.replies && msg.replies.length > 0 && (
                  <div className="mt-2">
                    <span className="font-semibold text-primary">Replies:</span>
                    <ul className="space-y-1 mt-1">
                      {msg.replies.map((r, i) => (
                        <li key={i} className="bg-primary-100 rounded p-2 text-sm">
                          <span className="font-semibold text-primary">Admin:</span> {r.content}
                          <div className="text-xs text-gray-400">{r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
