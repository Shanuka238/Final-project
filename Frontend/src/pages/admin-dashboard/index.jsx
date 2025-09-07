import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../../components/AppIcon';
import CenterPopup from '../../components/CenterPopup';
import CalendarWidget from '../user-dashboard/components/CalendarWidget';
import AddStaffMember from './AddStaffMember';
import { fetchMongoUsers, fetchDashboardSummary, fetchAllEvents, fetchAllBookings, fetchAllPackages, fetchStaffMessages, sendStaffMessage } from 'api/admin';
import { fetchUserMessages, sendAdminReply } from 'api/userMessages';

function StaffMessagesModal({ staff, onClose }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
	const staffId = staff?._id || staff?.id || staff?.email || '';
	if (staffId) {
	  setLoading(true);
	  fetchStaffMessages(staffId)
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
	  const staffId = staff?._id || staff?.id || staff?.email || '';
	  const updated = await sendStaffMessage(
		staffId,
		'admin',
		response,
		staff.username || staff.firstName || staff.first_name || '',
		(staff.emailAddresses && staff.emailAddresses[0]?.emailAddress) || (staff.email_addresses && staff.email_addresses[0]?.email_address) || staff.email || ''
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
		  <Icon name="MessageCircle" size={20} /> Messages with {staff.username || staff.firstName || staff.first_name || 'Staff'}
		</h3>
		{loading ? (
		  <div className="text-center text-gray-400 py-8">Loading messages...</div>
		) : (
		  <div className="max-h-64 overflow-y-auto mb-4 border rounded p-2 bg-purple-50">
			{messages.length === 0 ? (
			  <div className="text-center text-gray-400 py-4">No messages yet.</div>
			) : (
			  messages.map((msg, idx) => (
				<div key={idx} className={`mb-2 flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
				  <div className={`px-3 py-2 rounded-lg text-sm ${msg.sender === 'admin' ? 'bg-purple-200 text-purple-900' : 'bg-gray-200 text-gray-700'}`}>
					<span className="block font-semibold mb-1">{msg.sender === 'admin' ? 'Admin' : 'Staff'}</span>
					<span>{msg.content}</span>
					<div className="text-xs text-gray-500 mt-1">{msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ''}</div>
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
			placeholder="Type your response..."
			value={response}
			onChange={e => setResponse(e.target.value)}
			disabled={sending}
		  />
		  <button
			type="submit"
			className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition disabled:opacity-60"
			disabled={sending || !response.trim()}
		  >
			{sending ? 'Sending...' : 'Send'}
		  </button>
		</form>
		{error && <div className="text-red-600 text-sm mt-2">{error}</div>}
	  </div>
	</div>
  );
}

const summaryTemplate = [
	{
		label: 'Total Accounts',
		key: 'totalAccounts',
		icon: 'Users',
		color: 'bg-purple-100',
		iconColor: 'text-purple-600',
	},
	{
		label: 'Upcoming Events',
		key: 'upcomingEvents',
		icon: 'CalendarDays',
		color: 'bg-pink-100',
		iconColor: 'text-pink-500',
	},
	{
		label: 'Total Bookings',
		key: 'totalBookings',
		icon: 'ClipboardList',
		color: 'bg-blue-100',
		iconColor: 'text-blue-500',
	},
	{
		label: 'Saved Packages',
		key: 'savedPackages',
		icon: 'Heart',
		color: 'bg-rose-100',
		iconColor: 'text-rose-500',
	},
	
];

const tabs = [
	'Overview',
	'Users',
	'Events',
	'Bookings',
	'Packages',
	'User Messages'
];

const AdminDashboard = () => {
	const [activeTab, setActiveTab] = useState('Overview');
	const [popupMessage, setPopupMessage] = useState('');
	const [showAddStaff, setShowAddStaff] = useState(false);
	const [staffMembers, setStaffMembers] = useState([]);
	const [summary, setSummary] = useState({});
	const [deleteConfirm, setDeleteConfirm] = useState({ open: false, staff: null });
	const [allEvents, setAllEvents] = useState([]);
	const [allBookings, setAllBookings] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [showOnlyUnreplied, setShowOnlyUnreplied] = useState(true);
  const [viewMessagesStaff, setViewMessagesStaff] = useState(null);
  const [replyingId, setReplyingId] = useState(null);
  const [replyContent, setReplyContent] = useState('');

	const loadStaff = useCallback(() => {
	  fetchMongoUsers()
			.then(users => {
	const staff = users.filter(u => u.role === 'staff');
	setStaffMembers(staff);
			})
			.catch(() => setStaffMembers([]));
	}, []);

  useEffect(() => {
	const fetchAll = () => {
	  loadStaff();
	  fetchMongoUsers()
		.then(users => {
		  const arr = Array.isArray(users) ? users : (Array.isArray(users.data) ? users.data : []);
		  const filtered = arr.filter(u => u.role === 'user' || u.role === 'staff');
		  setSummary(prev => ({
			...prev,
			totalAccounts: filtered.length
		  }));
		})
		.catch(() => setSummary(prev => ({ ...prev, totalAccounts: 0 })));
	};
	fetchAll(); 
  }, [loadStaff]);

	useEffect(() => {
		fetchDashboardSummary()
			.then(data => setSummary({
				...data,
				staffCount: Array.isArray(data.staffMembers)
					? data.staffMembers.length
					: (typeof data.serviceProviders === 'number' ? data.serviceProviders : 0)
			}))
			.catch(() => setSummary({}));
	}, [loadStaff]);


	const [userList, setUserList] = useState([]);
  useEffect(() => {
	if (activeTab === 'Users') {
	  fetchMongoUsers()
		.then(users => {
		  const arr = Array.isArray(users) ? users : (Array.isArray(users.data) ? users.data : []);
		  setUserList(arr);
		})
		.catch(() => setUserList([]));
	}
  }, [activeTab]);

	useEffect(() => {
		if (activeTab === 'Events') {
			fetchAllEvents().then(setAllEvents).catch(() => setAllEvents([]));
		} else if (activeTab === 'Bookings') {
			fetchAllBookings().then(setAllBookings).catch(() => setAllBookings([]));
		} else if (activeTab === 'Packages') {
			fetchAllPackages().then(setAllPackages).catch(() => setAllPackages([]));
		} else if (activeTab === 'User Messages') {
	  fetchUserMessages().then(msgs => {
		setUserMessages(
		  showOnlyUnreplied ? msgs.filter(m => !m.replies || m.replies.length === 0) : msgs
		);
	  }).catch(() => setUserMessages([]));
	}
	}, [activeTab, showOnlyUnreplied]);

	const adminName = 'Admin';
	const adminEmail = 'admin@partynest.com';
	const initials = adminName.split(' ').map((n) => n[0]).join('');

	const handleReply = async (msgId) => {
			if (!replyContent.trim()) return;
			await sendAdminReply(msgId, replyContent);
			setReplyContent('');
			setReplyingId(null);
			fetchUserMessages().then(msgs => {
				setUserMessages(
					showOnlyUnreplied ? msgs.filter(m => !m.replies || m.replies.length === 0) : msgs
				);
			}).catch(() => setUserMessages([]));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-white px-2 pb-10">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between pt-8 pb-4 gap-4 max-w-7xl mx-auto">
				<div>
					<h1 className="text-3xl md:text-4xl font-extrabold text-purple-800 mb-1">
						Welcome back, Admin!
					</h1>
					<p className="text-gray-500 text-lg">
						Manage users, events, and bookings across the Party Nest platform.
					</p>
				</div>
				<div className="flex gap-3 flex-wrap justify-end">
					<button
						className="flex items-center gap-2 bg-green-100 text-green-700 font-semibold py-2 px-5 rounded-lg border border-green-300 hover:bg-green-200 transition-all text-base"
						onClick={() => setShowAddStaff(true)}
					>
						<Icon name="UserPlus" size={20} />
						Add Staff Member
					</button>
				</div>
			</div>

			<div className="max-w-7xl mx-auto border-b border-purple-100 mb-8">
				<div className="flex gap-2 md:gap-6">
					{tabs.map((tab) => (
						<button
							key={tab}
							className={`py-2 px-4 md:px-6 font-medium rounded-t-lg transition-all text-base md:text-lg ${
								activeTab === tab
									? 'bg-white shadow text-purple-700 border-x border-t border-purple-200 -mb-px'
									: 'text-gray-400 hover:text-purple-600'
							}`}
							onClick={() => setActiveTab(tab)}
						>
							{tab}
						</button>
					))}
				</div>
			</div>

	  {activeTab === 'Users' ? (
		<div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-6 mt-6">
		  <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
			<Icon name="Users" size={22} /> Users
		  </h2>
  {userList.filter(user => user.role === 'user' || user.role === 'staff').length === 0 ? (
	<div className="text-center text-gray-400 py-8">No users found.</div>
  ) : (
	<div className="overflow-x-auto">
	  <table className="min-w-full text-left border mt-4">
		<thead>
		  <tr className="bg-purple-50">
			<th className="py-2 px-4">Name</th>
			<th className="py-2 px-4">Email</th>
			<th className="py-2 px-4">Role</th>
			<th className="py-2 px-4">Created At</th>
		  </tr>
		</thead>
		<tbody>
		  {userList.filter(user => user.role === 'user' || user.role === 'staff').map((user, idx) => (
			<tr key={user._id || user.id || idx} className="border-t">
			  <td className="py-2 px-4">{user.username || 'N/A'}</td>
			  <td className="py-2 px-4">{user.email || 'N/A'}</td>
			  <td className="py-2 px-4">{user.role || 'N/A'}</td>
			  <td className="py-2 px-4">{user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}</td>
			</tr>
		  ))}
		</tbody>
	  </table>
	</div>
  )}
		</div>
	  ) : activeTab === 'Events' ? (
		<div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-6 mt-6">
		  <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
			<Icon name="CalendarDays" size={22} /> All Events
		  </h2>
		  {allEvents.length === 0 ? (
			<div className="text-center text-gray-400 py-8">No events found.</div>
		  ) : (
			<div className="overflow-x-auto">
			  <table className="min-w-full text-left border mt-4">
				<thead>
				  <tr className="bg-purple-50">
					<th className="py-2 px-4">Title</th>
					<th className="py-2 px-4">User ID</th>
					<th className="py-2 px-4">Date</th>
					<th className="py-2 px-4">Type</th>
					<th className="py-2 px-4">Status</th>
				  </tr>
				</thead>
				<tbody>
				  {allEvents.map((event, idx) => (
					<tr key={event._id || idx} className="border-t">
					  <td className="py-2 px-4">{event.title}</td>
					  <td className="py-2 px-4">{event.userId}</td>
					  <td className="py-2 px-4">{event.date}</td>
					  <td className="py-2 px-4">{event.type}</td>
					  <td className="py-2 px-4">{event.status}</td>
					</tr>
				  ))}
				</tbody>
			  </table>
			</div>
		  )}
		</div>
	  ) : activeTab === 'Bookings' ? (
		<div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-6 mt-6">
		  <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
			<Icon name="ClipboardList" size={22} /> All Bookings
		  </h2>
		  {allBookings.length === 0 ? (
			<div className="text-center text-gray-400 py-8">No bookings found.</div>
		  ) : (
			<div className="overflow-x-auto">
			  <table className="min-w-full text-left border mt-4">
				<thead>
				  <tr className="bg-purple-50">
					<th className="py-2 px-4">Event Title</th>
					<th className="py-2 px-4">User ID</th>
					<th className="py-2 px-4">Package</th>
					<th className="py-2 px-4">Status</th>
					<th className="py-2 px-4">Event Date</th>
				  </tr>
				</thead>
				<tbody>
				  {allBookings.map((booking, idx) => (
					<tr key={booking._id || idx} className="border-t">
					  <td className="py-2 px-4">{booking.eventTitle}</td>
					  <td className="py-2 px-4">{booking.userId}</td>
					  <td className="py-2 px-4">{booking.package}</td>
					  <td className="py-2 px-4">{booking.status}</td>
					  <td className="py-2 px-4">{booking.eventDate}</td>
					</tr>
				  ))}
				</tbody>
			  </table>
			</div>
		  )}
		</div>
	  ) : activeTab === 'Packages' ? (
		<div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-6 mt-6">
		  <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
			<Icon name="Package" size={22} /> All Packages
		  </h2>
		  {allPackages.length === 0 ? (
			<div className="text-center text-gray-400 py-8">No packages found.</div>
		  ) : (
			<div className="overflow-x-auto">
			  <table className="min-w-full text-left border mt-4">
				<thead>
				  <tr className="bg-purple-50">
					<th className="py-2 px-4">Title</th>
					<th className="py-2 px-4">Type</th>
					<th className="py-2 px-4">Price</th>
					<th className="py-2 px-4">Availability</th>
				  </tr>
				</thead>
				<tbody>
				  {allPackages.map((pkg, idx) => (
					<tr key={pkg._id || idx} className="border-t">
					  <td className="py-2 px-4">{pkg.title}</td>
					  <td className="py-2 px-4">{pkg.type}</td>
					  <td className="py-2 px-4">{pkg.price}</td>
					  <td className="py-2 px-4">{pkg.availability}</td>
					</tr>
				  ))}
				</tbody>
			  </table>
			</div>
		  )}
		</div>
	  ) : activeTab === 'User Messages' ? (
	  <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-6 mt-6">
		<h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
		  <Icon name="Mail" size={22} /> User Messages
		</h2>
		<div className="mb-4 flex items-center gap-4">
		  <label className="flex items-center gap-2 cursor-pointer">
			<input
			  type="checkbox"
			  checked={showOnlyUnreplied}
			  onChange={() => setShowOnlyUnreplied(v => !v)}
			  className="accent-purple-600"
			/>
			<span className="text-sm text-gray-700">Hide replied messages</span>
		  </label>
		</div>
		{userMessages.length === 0 ? (
		  <div className="text-center text-gray-400 py-8">No user messages found.</div>
		) : (
		  <div className="overflow-x-auto">
			<table className="min-w-full text-left border mt-4">
			  <thead>
				<tr className="bg-purple-50">
				  <th className="py-2 px-4">Name</th>
				  <th className="py-2 px-4">Email</th>
				  <th className="py-2 px-4">Phone</th>
				  <th className="py-2 px-4">Event Type</th>
				  <th className="py-2 px-4">Contact Method</th>
				  <th className="py-2 px-4">Message</th>
				  <th className="py-2 px-4">Replies</th>
				  <th className="py-2 px-4">Date</th>
				  <th className="py-2 px-4">Action</th>
				</tr>
			  </thead>
			  <tbody>
				{userMessages.map((msg, idx) => (
				  <tr key={msg._id || idx} className="border-t align-top">
					<td className="py-2 px-4">{msg.name}</td>
					<td className="py-2 px-4">{msg.email}</td>
					<td className="py-2 px-4">{msg.phone}</td>
					<td className="py-2 px-4">{msg.eventType}</td>
					<td className="py-2 px-4">{msg.contactMethod}</td>
					<td className="py-2 px-4 whitespace-pre-line">{msg.message}</td>
					<td className="py-2 px-4">
					  {msg.replies && msg.replies.length > 0 ? (
						<ul className="space-y-2">
						  {msg.replies.map((r, i) => (
							<li key={i} className="bg-purple-50 rounded p-2 text-sm">
							  <span className="font-semibold text-purple-700">Admin:</span> {r.content}
							  <div className="text-xs text-gray-400">{r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}</div>
							</li>
						  ))}
						</ul>
					  ) : <span className="text-gray-400">No replies</span>}
					</td>
					<td className="py-2 px-4">{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}</td>
					<td className="py-2 px-4">
					  {replyingId === msg._id ? (
						<div className="flex flex-col gap-2">
						  <textarea
							className="border rounded p-2 text-sm"
							rows={2}
							value={replyContent}
							onChange={e => setReplyContent(e.target.value)}
						  />
						  <div className="flex gap-2">
							<button className="bg-purple-600 text-white px-3 py-1 rounded" onClick={() => handleReply(msg._id)}>Send</button>
							<button className="bg-gray-200 px-3 py-1 rounded" onClick={() => { setReplyingId(null); setReplyContent(''); }}>Cancel</button>
						  </div>
						</div>
					  ) : (
						<button className="bg-purple-100 text-purple-700 px-3 py-1 rounded" onClick={() => setReplyingId(msg._id)}>Reply</button>
					  )}
					</td>
				  </tr>
				))}
			  </tbody>
			</table>
		  </div>
		)}
	  </div>
	) : (
		<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
		  <div className="col-span-1 flex flex-col gap-8">
			<div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
			  <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center text-3xl font-bold text-purple-700 mb-3">
				{initials}
			  </div>
			  <div className="font-semibold text-lg text-purple-900">
				{adminName}
			  </div>
			  <div className="text-gray-500 text-sm mb-1">
				{adminEmail}
			  </div>
			  <div className="flex items-center gap-2 mb-2">
				<span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">
				  Administrator
				</span>
				<span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs">
				  Admin since July 2025
				</span>
			  </div>
			</div>
			<div className="grid grid-cols-2 gap-4">
			  {summaryTemplate.map((card) => (
				<div
				  key={card.label}
				  className={`rounded-xl p-4 flex items-center gap-3 shadow-sm ${card.color}`}
				>
				  <div
					className={`rounded-full p-2 bg-white shadow ${card.iconColor}`}
				  >
					<Icon name={card.icon} size={24} />
				  </div>
				  <div>
					<div className="text-xl font-bold text-gray-800">
					  {typeof summary[card.key] === 'number' ? summary[card.key] : 0}
					</div>
					<div className="text-xs text-gray-500 font-medium">
					  {card.label}
					</div>
				  </div>
				</div>
			  ))}
			</div>
		  </div>

		  <div className="col-span-2 flex flex-col gap-8">
			<div className="bg-white rounded-2xl shadow p-6 mb-2">
			  <div className="flex items-center justify-between mb-2">
				<div>
				  <h2 className="text-xl font-bold text-purple-800 mb-1 flex items-center gap-2">
					<Icon name="Briefcase" size={22} /> Manage Staff Members
				  </h2>
				  <p className="text-gray-500 text-sm">
					Add decorators, caterers, entertainers, or any other
					professionals to your platform.
				  </p>
				</div>
				<button
				  className="flex items-center gap-2 bg-purple-100 text-purple-700 font-semibold py-2 px-4 rounded-lg border border-purple-200 hover:bg-purple-200 transition-all text-base"
				  onClick={() => setShowAddStaff(true)}
				>
				  <Icon name="UserPlus" size={18} /> Add New
				</button>
			  </div>
			  {staffMembers.length === 0 ? (
				<div className="text-center text-gray-400 py-8">
				  No Staff Members added yet.
				</div>
			  ) : (
				<div className="overflow-x-auto">
				  <table className="min-w-full text-left border mt-4">
					<thead>
					  <tr className="bg-purple-50">
						<th className="py-2 px-4">Name</th>
						<th className="py-2 px-4">Email</th>
						<th className="py-2 px-4">Role</th>
						<th className="py-2 px-4">Action</th>
						<th className="py-2 px-4">Messages</th>
					  </tr>
					</thead>
					<tbody>
					  {staffMembers.map((staff, idx) => (
						<tr key={staff.id || idx} className="border-t">
						  <td className="py-2 px-4">
							{staff.username ||
							  staff.firstName ||
							  staff.first_name ||
							  'N/A'}
						  </td>
			<td className="py-2 px-4">
			  {staff.email || 'N/A'}
			</td>
						  <td className="py-2 px-4">
			{staff.staffRole || 'Staff'}
						</td>
						<td className="py-2 px-4">
						  <button
							className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded transition-all border border-red-200 hover:bg-red-50"
							title="Delete Staff Member"
							onClick={() => setDeleteConfirm({ open: true, staff })}
						  >
							<Icon name="Trash2" size={18} /> Delete
						  </button>
						</td>
						<td className="py-2 px-4">
						  <button
							className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium px-2 py-1 rounded transition-all border border-purple-200 hover:bg-purple-50"
							title="View Staff Messages"
							onClick={() => setViewMessagesStaff(staff)}
						  >
							<Icon name="MessageCircle" size={18} /> View Messages
						  </button>
						</td>

					  </tr>
					  ))}
					</tbody>
				  </table>
				</div>
			  )}

			  {viewMessagesStaff && (
			  <StaffMessagesModal staff={viewMessagesStaff} onClose={() => setViewMessagesStaff(null)} />
			  )}
			  
			  {showAddStaff && (
		<AddStaffMember onClose={() => setShowAddStaff(false)} onAdd={() => {
		  loadStaff();
		  fetchMongoUsers()
			.then(users => {
			  const arr = Array.isArray(users) ? users : (Array.isArray(users.data) ? users.data : []);
			  const filtered = arr.filter(u => u.role === 'user' || u.role === 'staff');
			  setSummary(prev => ({
				...prev,
				totalAccounts: filtered.length
			  }));
			})
			.catch(() => setSummary(prev => ({ ...prev, totalAccounts: 0 })));
		  fetchDashboardSummary()
			.then(data => setSummary(prev => ({
			  ...prev,
			  ...data,
			  staffCount: Array.isArray(data.staffMembers)
				? data.staffMembers.length
				: (typeof data.serviceProviders === 'number' ? data.serviceProviders : 0)
			})))
			.catch(() => setSummary({}));
		}} />
			  )}
			</div>
			<div className="bg-white rounded-2xl shadow p-6">
			  <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
				<Icon name="CalendarDays" size={22} /> Calendar
			  </h2>
			  <CalendarWidget />
			</div>
		  </div>
		</div>
	  )}

	  {popupMessage && (
		<CenterPopup
		  message={popupMessage}
		  onClose={() => setPopupMessage('')}
		/>
	  )}

	  {showAddStaff && (
	<AddStaffMember onClose={() => setShowAddStaff(false)} onAdd={() => {
	  loadStaff();
	  fetchMongoUsers()
		.then(users => {
		  const arr = Array.isArray(users) ? users : (Array.isArray(users.data) ? users.data : []);
		  const filtered = arr.filter(u => u.role === 'user' || u.role === 'staff');
		  setSummary(prev => ({
			...prev,
			totalAccounts: filtered.length
		  }));
		})
		.catch(() => setSummary(prev => ({ ...prev, totalAccounts: 0 })));
	  fetchDashboardSummary()
		.then(data => setSummary(prev => ({
		  ...prev,
		  ...data,
		  staffCount: Array.isArray(data.staffMembers)
			? data.staffMembers.length
			: (typeof data.serviceProviders === 'number' ? data.serviceProviders : 0)
		})))
		.catch(() => setSummary({}));
	}} />
	  )}

	  {deleteConfirm.open && (
		<CenterPopup
		  message="Do you want to delete this user? This action cannot be undone."
		  confirm
		  onConfirm={async () => {
			try {
			  const userId = deleteConfirm.staff._id || deleteConfirm.staff.id;
			  if (!userId) throw new Error('User ID not found');
			  const { deleteClerkUser } = await import('../../api/admin');
			  await deleteClerkUser(userId);
			  setPopupMessage('Staff member deleted successfully.');
			  loadStaff();
			  setTimeout(() => setPopupMessage(''), 1500);
			} catch (err) {
			  setPopupMessage('Failed to delete staff member.');
			  setTimeout(() => setPopupMessage(''), 2000);
			}
			setDeleteConfirm({ open: false, staff: null });
		  }}
		  onCancel={() => setDeleteConfirm({ open: false, staff: null })}
		/>
	  )}
	</div>
  );
};

export default AdminDashboard;
