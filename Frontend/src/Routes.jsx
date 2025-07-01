import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, useNavigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import LandingPage from "pages/landing-page";
import EventBookingForm from "pages/event-booking-form";
import EventPackages from "pages/event-packages";
import UserDashboard from "pages/user-dashboard";
import ContactPage from "pages/contact-page";
import Login from "pages/login";
import { useAuth } from '@clerk/clerk-react';

// SSO Callback handler with redirect
const SsoCallback = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate('/user-dashboard', { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);
  return <div />;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Header />
        <RouterRoutes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/event-booking-form" element={<EventBookingForm />} />
          <Route path="/event-packages" element={<EventPackages />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/contact-page" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/sso-callback" element={<SsoCallback />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;