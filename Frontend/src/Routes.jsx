import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import LandingPage from "pages/landing-page";
import EventBookingForm from "pages/event-booking-form";
import EventPackages from "pages/event-packages";
import UserDashboard from "pages/user-dashboard";
import ContactPage from "pages/contact-page";
import Login from "pages/login";

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
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;