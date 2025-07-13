import React, { useEffect, useState } from 'react';
import Icon from 'components/AppIcon';
import PackageManagement from './PackageManagement';
import { fetchUserPackages } from 'api/dashboard';
import { Link } from 'react-router-dom';

const MyPackagesSection = ({ user }) => {
  const [bookedPackages, setBookedPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      fetchUserPackages(user.id)
        .then((packages) => {
          setBookedPackages(packages);
        })
        .catch(() => setBookedPackages([]))
        .finally(() => setLoading(false));
    } else {
      setBookedPackages([]);
      setLoading(true);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-8">Loading your booked packages...</div>;
  }

  return (
    <div className="card">
      <h2 className="font-heading text-2xl font-semibold mb-4 flex items-center gap-2">
        <Icon name="Package" size={24} className="text-primary" strokeWidth={2} />
        My Packages
      </h2>
      {bookedPackages.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-secondary mb-4">You have not booked any packages yet.</p>
          <Link to="/event-packages" className="btn-primary">Browse Packages</Link>
        </div>
      ) : (
        <PackageManagement packages={bookedPackages} />
      )}
    </div>
  );
};

export default MyPackagesSection;
