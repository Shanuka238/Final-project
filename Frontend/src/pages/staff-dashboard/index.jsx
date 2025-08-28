import React, { useState, useEffect } from "react";
import StaffCalendarWidget from './components/StaffCalendarWidget';
import ManagePackages from './components/ManagePackages';
import ManageServices from './components/ManageServices.jsx';
import { useState as useServicesState, useEffect as useServicesEffect } from 'react';
import { fetchStaffServices } from '../../api/staff';
import { CalendarDays, Mail } from "lucide-react";
import { fetchUserEvents } from 'api/dashboard';
import StaffMessagesModal from "./StaffMessagesModal";
import { fetchStaffMessages } from 'api/admin';
import { fetchAllPackages } from 'api/admin';
import { useAuth } from 'contexts/AuthContext';

const tabs = [
  "Overview",
  "Manage Packages",
  "Manage Services"
];

export default function StaffDashboard() {
  const [serviceCount, setServiceCount] = useServicesState(0);
  useServicesEffect(() => {
    fetchStaffServices()
      .then(data => setServiceCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setServiceCount(0));
  }, []);
  const [activeTab, setActiveTab] = useState("Overview");
  const { user } = useAuth();
  const [staff, setStaff] = useState(null);
  const [events, setEvents] = useState([]);
  const [packages, setPackages] = useState([]);
  const [newAdminMessages, setNewAdminMessages] = useState(0);
  const [showMessagesModal, setShowMessagesModal] = useState(false);

  useEffect(() => {
    if (user) {
      setStaff({
        name: user.fullName || user.username || user.firstName || 'Staff',
        role: user.role || 'Staff',
        email: user.email || '',
        since: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '',
      });

      fetchAllPackages().then(setPackages).catch(() => setPackages([]));
      fetchStaffMessages(user.id).then(messages => {
        const adminMsgs = Array.isArray(messages) ? messages.filter(m => m.sender === 'admin') : [];
        setNewAdminMessages(adminMsgs.length);
      }).catch(() => setNewAdminMessages(0));
    }
  }, [user]);

  const summary = [
    { label: "Active Packages", value: packages.length, icon: <span className="text-purple-500">📦</span>, bg: "bg-purple-50" },
    { label: "New Admin Messages", value: newAdminMessages, icon: <Mail className="text-blue-500" />, bg: "bg-blue-50" },
    { label: "Total Services", value: serviceCount, icon: <span className="text-green-500">🛠️</span>, bg: "bg-green-50" },
  ];

  if (!staff) {
    return <div className="min-h-screen flex items-center justify-center text-lg text-gray-400">Loading staff dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between px-8 py-6 border-b bg-white shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-purple-800 mb-1">
            Welcome back, {staff.name}!
          </h1>
          <p className="text-gray-500">
            Manage and coordinate assigned events and vendor interactions.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            className="flex items-center gap-2 border border-purple-600 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 transition"
            onClick={() => setShowMessagesModal(true)}
          >
            <Mail size={18} /> Messages
          </button>
        </div>
        {showMessagesModal && (
          <StaffMessagesModal staff={{
            id: user?.id,
            name: staff?.name,
            email: staff?.email
          }} onClose={() => setShowMessagesModal(false)} />
        )}
      </header>

      <nav className="flex gap-4 px-8 pt-6 pb-2 border-b bg-white">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg font-medium transition shadow-sm ${activeTab === tab ? "text-purple-700 bg-purple-100" : "text-gray-500 hover:bg-purple-50"}`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 py-8 px-4">
        <div className="col-span-1 flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center text-3xl font-bold text-purple-700 mb-3">
              <span className="text-4xl">
                {(staff.name && staff.name[0]?.toUpperCase()) || (staff.username && staff.username[0]?.toUpperCase()) || 'S'}
              </span>
            </div>
            <div className="font-semibold text-lg text-purple-900">{staff.name}</div>
            <div className="text-gray-500 text-sm mb-1">{staff.email}</div>
            <div className="text-purple-700 text-xs font-medium mb-1">{staff.role}</div>
            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
              Staff Member since {staff.since}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {summary.map(card => (
              <div
                key={card.label}
                className={`rounded-xl p-4 flex items-center gap-3 shadow-sm ${card.bg}`}
              >
                <div className="rounded-full p-2 bg-white shadow">{card.icon}</div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{card.value}</div>
                  <div className="text-xs text-gray-500 font-medium">{card.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-8">
          {activeTab === "Overview" && (
            <div className="bg-white rounded-2xl shadow p-6 mb-2">
              <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                <CalendarDays size={22} /> Calendar
              </h2>
              <StaffCalendarWidget events={events} />
            </div>
          )}
          {activeTab === "Manage Packages" && <ManagePackages packages={packages} setPackages={setPackages} />}
          {activeTab === "Manage Services" && <ManageServices />}
        </div>
      </div>
    </div>
  );
}
