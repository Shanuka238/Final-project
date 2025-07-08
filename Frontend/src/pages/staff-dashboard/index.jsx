// Remove duplicate ContactAdminForm definition (keep only one, above StaffDashboard)
import React, { useState, useEffect } from "react";
import StaffCalendarWidget from './components/StaffCalendarWidget';
import ManagePackages from './components/ManagePackages';
import { CalendarDays, Mail } from "lucide-react";
import { useUser } from '@clerk/clerk-react';
import { fetchUserEvents, fetchUserBookings } from 'api/dashboard';
import StaffMessagesModal from "./StaffMessagesModal";
import { fetchStaffMessages } from 'api/admin';
import { fetchAllPackages } from 'api/admin';

const tabs = [
  "Overview",
  "Manage Packages",
];

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const { user, isLoaded } = useUser();
  const [staff, setStaff] = useState(null);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [newAdminMessages, setNewAdminMessages] = useState(0);
  // Staff messaging modal state
  const [showMessagesModal, setShowMessagesModal] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      setStaff({
        name: user.fullName || user.username || user.firstName || 'Staff',
        role: user.publicMetadata?.staffRole || user.publicMetadata?.role || 'Staff',
        email: user.emailAddresses?.[0]?.emailAddress || '',
        since: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '',
        avatar: user.imageUrl,
      });
      fetchUserEvents(user.id).then(setEvents).catch(() => setEvents([]));
      fetchUserBookings(user.id).then(setBookings).catch(() => setBookings([]));
      // Fetch all packages
      fetchAllPackages().then(setPackages).catch(() => setPackages([]));
      // Fetch staff messages and count new admin messages
      fetchStaffMessages(user.id).then(messages => {
        // Count all messages from admin (no read-tracking yet)
        const adminMsgs = Array.isArray(messages) ? messages.filter(m => m.sender === 'admin') : [];
        setNewAdminMessages(adminMsgs.length);
      }).catch(() => setNewAdminMessages(0));
    }
  }, [isLoaded, user]);

  // Summary cards (replace with real data if available)
  const summary = [
    { label: "Active Packages", value: packages.length, icon: <span className="text-purple-500">📦</span>, bg: "bg-purple-50" },
    { label: "New Admin Messages", value: newAdminMessages, icon: <Mail className="text-blue-500" />, bg: "bg-blue-50" },
  ];

  if (!staff) {
    return <div className="min-h-screen flex items-center justify-center text-lg text-gray-400">Loading staff dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between px-8 py-6 border-b bg-white shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-purple-800 mb-1">
            Welcome back, {staff.name}!
          </h1>
          <p className="text-gray-500">
            Manage and coordinate assigned events, bookings, and vendor interactions.
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
        {/* Staff Messages Modal */}
        {showMessagesModal && (
          <StaffMessagesModal staff={{
            id: user?.id,
            name: staff?.name,
            email: staff?.email
          }} onClose={() => setShowMessagesModal(false)} />
        )}
      </header>

      {/* Navigation Tabs */}
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
        {/* Left: Profile & Summary */}
        <div className="col-span-1 flex flex-col gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center text-3xl font-bold text-purple-700 mb-3">
              {staff.avatar ? (
                <img src={staff.avatar} alt="avatar" className="w-full h-full rounded-full" />
              ) : (
                staff.name[0]
              )}
            </div>
            <div className="font-semibold text-lg text-purple-900">{staff.name}</div>
            <div className="text-gray-500 text-sm mb-1">{staff.email}</div>
            <div className="text-purple-700 text-xs font-medium mb-1">{staff.role}</div>
            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
              Staff Member since {staff.since}
            </span>
          </div>
          {/* Summary Cards */}
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

        {/* Center: Tab Content */}
        <div className="col-span-3 flex flex-col gap-8">
          {activeTab === "Overview" && (
            <>
              <div className="bg-white rounded-2xl shadow p-6 mb-2">
                <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                  <CalendarDays size={22} /> Calendar
                </h2>
                <StaffCalendarWidget events={events} />
              </div>
              <ManagePackages packages={packages} setPackages={setPackages} />
            </>
          )}
          {activeTab === "Manage Packages" && <ManagePackages packages={packages} setPackages={setPackages} />}
        </div>
      </div>
    </div>
  );
}
