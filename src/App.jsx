import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Bookings from "./pages/Bookings";
import BookingAdd from "./pages/BookingAdd";
import BookingEdit from "./pages/BookingEdit";
import BookingView from "./pages/BookingView";

import Customers from "./pages/Customers";
import CustomerView from "./pages/CustomerView";
import CustomerAdd from "./pages/CustomerAdd";
import CustomerEdit from "./pages/CustomerEdit";

import Destinations from "./pages/Destinations";
import DestinationAdd from "./pages/DestinationAdd";
import DestinationEdit from "./pages/DestinationEdit";
import DestinationView from "./pages/DestinationView";

import Trips from "./pages/Trips";
import TripAdd from "./pages/TripAdd";
import TripEdit from "./pages/TripEdit";
import TripView from "./pages/TripView";

import Payments from "./pages/Payments";
import PaymentView from "./pages/PaymentView";
import PaymentAdd from "./pages/PaymentAdd";
import PaymentEdit from "./pages/PaymentEdit";

import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Bookings */}
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookings/add" element={<BookingAdd />} />
        <Route path="/bookings/edit/:id" element={<BookingEdit />} />
        <Route path="/bookings/view/:id" element={<BookingView />} />

        {/* Customers */}
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/add" element={<CustomerAdd />} />
        <Route path="/customers/edit/:id" element={<CustomerEdit />} />
        <Route path="/customers/view/:id" element={<CustomerView />} />

        {/* Destinations */}
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/add" element={<DestinationAdd />} />
        <Route path="/destinations/edit/:id" element={<DestinationEdit />} />
        <Route path="/destinations/view/:id" element={<DestinationView />} />

        {/* Trips */}
        <Route path="/trips" element={<Trips />} />
        <Route path="/trips/add" element={<TripAdd />} />
        <Route path="/trips/edit/:id" element={<TripEdit />} />
        <Route path="/trips/view/:id" element={<TripView />} />

        {/* Payments */}
        <Route path="/payments" element={<Payments />} />
        <Route path="/payments/add" element={<PaymentAdd />} />
        <Route path="/payments/edit/:id" element={<PaymentEdit />} />
        <Route path="/payments/view/:id" element={<PaymentView />} />

        {/* Calendar */}
        <Route path="/calendar" element={<Calendar />} />

        {/* Analytics */}
        <Route path="/analytics" element={<Analytics />} />

        {/* Contact Us */}
        <Route path="/contact-us" element={<ContactUs />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;