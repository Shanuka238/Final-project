import React from "react";

export default function MyTasks({ requests = [] }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-purple-800 mb-2">My Tasks / Service Requests</h2>
      {requests.length === 0 ? (
        <div className="text-gray-400">No service requests.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map(req => (
            <div key={req.id} className="p-4 rounded-lg border bg-yellow-50 flex flex-col gap-2">
              <div className="font-semibold">{req.task}</div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : req.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                  {req.status}
                </span>
                <button className="ml-auto text-xs text-purple-700 hover:underline">Mark as Complete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
