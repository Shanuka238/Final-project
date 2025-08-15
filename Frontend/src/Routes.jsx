import React, { Suspense } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, useNavigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import LandingPage from "pages/landing-page";
import AboutPage from "pages/about-page";
import EventBookingForm from "pages/event-booking-form";
import EventPackages from "pages/event-packages";
import UserDashboard from "pages/user-dashboard";
import ContactPage from "pages/contact-page";
import Login from "pages/login";
const Register = React.lazy(() => import('pages/register'));
import AdminDashboard from "pages/admin-dashboard";
import ServiceList from "pages/services/ServiceList";
import ProtectedRoute from 'components/ProtectedRoute';
// ...removed Clerk import...



const Routes = () => {
  return (
    <BrowserRouter>
      {/* <ErrorBoundary> */}
        <ScrollToTop />
        <Header />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>}>
          <RouterRoutes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/event-booking-form" element={<EventBookingForm />} />
            <Route path="/event-packages" element={<EventPackages />} />
            <Route path="/user-dashboard" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/contact-page" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/login/sso-callback" element={<SsoCallback />} /> */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/services" element={<ServiceList />} />
            {/* Correct lazy loading for StaffDashboard */}
            {(() => {
              const StaffDashboard = React.lazy(() => import('pages/staff-dashboard'));
              return <Route path="/staff-dashboard" element={
                <ProtectedRoute role="staff">
                  <StaffDashboard />
                </ProtectedRoute>
              } />;
            })()}
          </RouterRoutes>
        </Suspense>
      {/* </ErrorBoundary> */}
    </BrowserRouter>
  );
};

export default Routes;