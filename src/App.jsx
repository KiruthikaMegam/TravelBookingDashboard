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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* Bookings */}
        <Route path="/Bookings" element={<Bookings />} />
        <Route path="/Bookings/add" element={<BookingAdd />} />
        <Route path="/Bookings/edit/:id" element={<BookingEdit />} />
        <Route path="/Bookings/view/:id" element={<BookingView />} />

        {/* Customers */}
        <Route path="/Customers" element={<Customers />} />
        <Route path="/Customers/view/:id" element={<CustomerView />} />
        <Route path="/Customers/add" element={<CustomerAdd />}/>
        <Route path="/Customers/edit/:id" element={<CustomerEdit />}/>

        {/* Destinations */}
        <Route path="/Destinations" element={<Destinations />} />
        <Route path="/Destinations/add" element={<DestinationAdd />}/>
        <Route path="/Destinations/edit/:id" element={<DestinationEdit />}/>
        <Route path="/Destinations/view/:id" element={<DestinationView />}/>

        {/* Trips */}
        <Route path="/Trips" element={<Trips />} />
        <Route path="/Trips/add" element={<TripAdd />} />
        <Route path="/Trips/edit/:id" element={<TripEdit />} />
        <Route path="/Trips/view/:id" element={<TripView />} />

        {/* Payments */}
        <Route path="/Payments" element={<Payments />} />
        <Route path="/Payments/view/:id" element={<PaymentView />} />
        <Route path="/Payments" element={<Payments />} />
        <Route path="/Payments/add" element={<PaymentAdd />} />
        <Route path="/Payments/edit/:id" element={<PaymentEdit />} />

        {/* Calendar */}
        <Route path="/Calendar" element={<Calendar />} />

        {/* Analytics */}
        <Route path="/Analytics" element={<Analytics />} />

        {/* Contact Us */}
        <Route path="/ContactUs" element={<ContactUs />} />

      </Routes>
    </BrowserRouter>
  );
}