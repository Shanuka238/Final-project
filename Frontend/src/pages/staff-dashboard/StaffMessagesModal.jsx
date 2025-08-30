import React, { useState, useEffect } from "react";
import { fetchStaffMessages, sendStaffMessage } from "../../api/admin";
import Icon from "../../components/AppIcon";

export default function StaffMessagesModal({ staff, onClose }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (staff?.id) {
      setLoading(true);
      fetchStaffMessages(staff.id)
        .then(setMessages)
        .catch(() => setMessages([]))
        .finally(() => setLoading(false));
    }
  }, [staff]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!response.trim()) return;
    setSending(true);
    try {
      const updated = await sendStaffMessage(
        staff.id,
        "staff",
        response,
        staff.name,
        staff.email
      );
      setMessages(updated);
      setResponse("");
    } catch (err) {
      setError("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-purple-600" onClick={onClose}>&times;</button>
        <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
          <Icon name="MessageCircle" size={20} /> Messages with Admin
        </h3>
        {loading ? (
          <div className="text-center text-gray-400 py-8">Loading messages...</div>
        ) : (
          <div className="max-h-64 overflow-y-auto mb-4 border rounded p-2 bg-purple-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-4">No messages yet.</div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`mb-2 flex ${msg.sender === "staff" ? "justify-end" : "justify-start"}`}>
                  <div className={`px-3 py-2 rounded-lg text-sm ${msg.sender === "staff" ? "bg-purple-200 text-purple-900" : "bg-gray-200 text-gray-700"}`}>
                    <span className="block font-semibold mb-1">{msg.sender === "staff" ? "You" : "Admin"}</span>
                    <span>{msg.content}</span>
                    <div className="text-xs text-gray-500 mt-1">{msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ""}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        <form onSubmit={handleSend} className="flex gap-2 mt-2">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2"
            placeholder="Type your message..."
            value={response}
            onChange={e => setResponse(e.target.value)}
            disabled={sending}
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition disabled:opacity-60"
            disabled={sending || !response.trim()}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </form>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
}
