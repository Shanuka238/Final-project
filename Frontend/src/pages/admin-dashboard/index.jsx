import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../../components/AppIcon';
import CenterPopup from '../../components/CenterPopup';
import CalendarWidget from '../user-dashboard/components/CalendarWidget';
import AddStaffMember from './AddStaffMember';
import { fetchClerkUsers } from 'api/admin';

const summaryData = [
	{
		label: 'Total Users',
		value: 1240,
		icon: 'Users',
		color: 'bg-purple-100',
		iconColor: 'text-purple-600',
	},
	{
		label: 'Upcoming Events',
		value: 32,
		icon: 'CalendarDays',
		color: 'bg-pink-100',
		iconColor: 'text-pink-500',
	},
	{
		label: 'Total Bookings',
		value: 210,
		icon: 'ClipboardList',
		color: 'bg-blue-100',
		iconColor: 'text-blue-500',
	},
	{
		label: 'Saved Packages',
		value: 58,
		icon: 'Heart',
		color: 'bg-rose-100',
		iconColor: 'text-rose-500',
	},
	{
		label: 'Messages',
		value: 12,
		icon: 'MessageCircle',
		color: 'bg-yellow-100',
		iconColor: 'text-yellow-500',
	},
	{
		label: 'Service Providers',
		value: 14,
		icon: 'Briefcase',
		color: 'bg-green-100',
		iconColor: 'text-green-600',
	},
];

const tabs = ['Overview', 'Users', 'Events', 'Bookings', 'Packages', 'Messages'];

const AdminDashboard = () => {
	const [activeTab, setActiveTab] = useState('Overview');
	const [popupMessage, setPopupMessage] = useState('');
	const [showAddStaff, setShowAddStaff] = useState(false);
	const [staffMembers, setStaffMembers] = useState([]);

	// Fetch staff from Clerk
	const loadStaff = useCallback(() => {
		fetchClerkUsers()
			.then(users => {
				// Filter users with role 'staff' (case-insensitive, Clerk publicMetadata)
				const staff = users.filter(
					u => (u.publicMetadata?.role || u.public_metadata?.role) === 'staff'
				);
				setStaffMembers(staff);
			})
			.catch(() => setStaffMembers([]));
	}, []);

	useEffect(() => {
		loadStaff();
	}, [loadStaff]);

	// Avatar initials
	const adminName = 'Ashen Charuka';
	const adminEmail = 'admin@partynest.com';
	const initials = adminName.split(' ').map((n) => n[0]).join('');

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-white px-2 pb-10">
			{/* Header */}
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
						className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg shadow transition-all text-base"
						onClick={() => setPopupMessage('New Event clicked!')}
					>
						<Icon name="PlusCircle" size={20} />
						New Event
					</button>
					<button
						className="flex items-center gap-2 border-2 border-purple-600 text-purple-700 font-semibold py-2 px-5 rounded-lg hover:bg-purple-50 transition-all text-base"
						onClick={() => setPopupMessage('Manage Packages clicked!')}
					>
						<Icon name="Package" size={20} />
						Manage Packages
					</button>
					<button
						className="flex items-center gap-2 bg-green-100 text-green-700 font-semibold py-2 px-5 rounded-lg border border-green-300 hover:bg-green-200 transition-all text-base"
						onClick={() => setShowAddStaff(true)}
					>
						<Icon name="UserPlus" size={20} />
						Add Staff Member
					</button>
				</div>
			</div>

			{/* Navigation Tabs */}
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

			{/* Main Content */}
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left: Profile & KPIs */}
				<div className="col-span-1 flex flex-col gap-8">
					{/* Admin Profile Card */}
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
								Member since July 2025
							</span>
						</div>
					</div>
					{/* Summary Cards */}
					<div className="grid grid-cols-2 gap-4">
						{summaryData.map((card) => (
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
										{card.value}
									</div>
									<div className="text-xs text-gray-500 font-medium">
										{card.label}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Center: Service Providers & Calendar */}
				<div className="col-span-2 flex flex-col gap-8">
					{/* Staff Member Management */}
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
													{(staff.emailAddresses &&
														staff.emailAddresses[0]?.emailAddress) ||
														(staff.email_addresses &&
															staff.email_addresses[0]?.email_address) ||
														'N/A'}
												</td>
												<td className="py-2 px-4">
													{staff.publicMetadata?.staffRole ||
														staff.public_metadata?.staffRole ||
														'Staff'}
											</td>
											<td className="py-2 px-4">
												<button
													className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded transition-all border border-red-200 hover:bg-red-50"
													title="Delete Staff Member"
													onClick={async () => {
														const confirmed = window.confirm('Do you want to delete this user? This action cannot be undone.');
														if (confirmed) {
															try {
																const userId = staff.id;
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
														}
													}}
												>
													<Icon name="Trash2" size={18} /> Delete
												</button>
											</td>
										</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
						{showAddStaff && (
							<AddStaffMember onClose={() => setShowAddStaff(false)} onAdd={loadStaff} />
						)}
					</div>
					{/* Calendar Widget */}
					<div className="bg-white rounded-2xl shadow p-6">
						<h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
							<Icon name="CalendarDays" size={22} /> Calendar
						</h2>
						<CalendarWidget />
					</div>
				</div>
			</div>

			{/* Popup for button actions */}
			{popupMessage && (
				<CenterPopup
					message={popupMessage}
					onClose={() => setPopupMessage('')}
				/>
			)}
			{/* Add Staff Member Modal */}
			{showAddStaff && (
				<AddStaffMember onClose={() => setShowAddStaff(false)} />
			)}
		</div>
	);
};

export default AdminDashboard;
