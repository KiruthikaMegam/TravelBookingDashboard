import React, { useState } from "react";

import Topbar from "../components/Topbar";

import contactIcon from "../assets/contact.png";
import locationIcon from "../assets/location.png";
import WorkingHrs from "../assets/workingHrs.png";
import checkIcon from "../assets/check.png";
import closeIcon from "../assets/close.png";
import Mail from "../assets/mail.png";
import Send from "../assets/send.png";
import Message from "../assets/message.png";


import "./ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState("");

  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      question: "How can I book a trip?",
      answer:
        "You can browse available trips from the Trips page, select your preferred trip and complete the booking process with your customer and travel details.",
    },
    {
      question: "Can I change my booking after confirmation?",
      answer:
        "Yes. You can open the booking details and edit the available booking information. Changes may depend on the trip and booking status.",
    },
    {
      question: "How can I make a payment?",
      answer:
        "Travelia supports multiple payment methods including card, UPI, cash, net banking and bank transfer.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes. You can request cancellation from the booking management section. Refund eligibility depends on the booking and payment status.",
    },
    {
      question: "How do I get destination information?",
      answer:
        "Open the Destinations page to view destination details including country, price, rating, available trips and destination description.",
    },
  ];

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Mobile number must contain 10 digits";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message =
        "Message must contain at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setSuccessMessage(
      "Your message has been sent successfully. Our support team will contact you soon."
    );

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setErrors({});

    setTimeout(() => {
      setSuccessMessage("");
    }, 3500);
  };

  /* =====================================================
     FAQ
  ===================================================== */

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <div className="contact-page">

      <Topbar />

      <main className="contact-content">

        {/* =================================================
           PAGE HEADER
        ================================================= */}

        <section className="contact-header">

          <div className="contact-header-left">

            <div className="contact-page-icon">
              <img
                src={contactIcon}
                alt="Contact"
              />
            </div>

            <div>
              <h1>Contact Us</h1>

              <p>
                Have questions? Our Travelia support team
                is here to help you.
              </p>
            </div>

          </div>

        </section>

        {/* =================================================
           SUCCESS TOAST
        ================================================= */}

        {successMessage && (
          <div className="contact-success-toast">

            <div className="contact-success-icon">
              <img
                src={checkIcon}
                alt="Success"
              />
            </div>

            <div className="contact-success-text">
              <strong>Message Sent</strong>
              <span>{successMessage}</span>
            </div>

            <button
              type="button"
              onClick={() => setSuccessMessage("")}
              className="contact-success-close"
            >
              <img
                src={closeIcon}
                alt="Close"
              />
            </button>

          </div>
        )}

        {/* =================================================
           CONTACT INFO CARDS
        ================================================= */}

        <section className="contact-info-cards">

          <div className="contact-info-card">

            <div className="contact-info-icon">
              <img
                src={Mail}
                alt="Email"
              />
            </div>

            <div>
              <span>Email Support</span>

              <strong>
                support@travelia.com
              </strong>

              <small>
                We usually reply within 24 hours.
              </small>
            </div>

          </div>

          <div className="contact-info-card">

            <div className="contact-info-icon">
              <img
                src={locationIcon}
                alt="Location"
              />
            </div>

            <div>
              <span>Our Office</span>

              <strong>
                Chennai, Tamil Nadu
              </strong>

              <small>
                Visit us during support hours.
              </small>
            </div>

          </div>

          <div className="contact-info-card">

            <div className="contact-info-icon">
              <img
                src={WorkingHrs}
                alt="Support Hours"
              />
            </div>

            <div>
              <span>Support Hours</span>

              <strong>
                Mon - Sat
              </strong>

              <small>
                9:00 AM - 7:00 PM
              </small>
            </div>

          </div>

        </section>

        {/* =================================================
           MAIN CONTACT SECTION
        ================================================= */}

        <section className="contact-main">

          {/* =================================================
             FORM
          ================================================= */}

          <div className="contact-form-card">

            <div className="contact-card-heading">

              <div>
                <h2>Send Us a Message</h2>

                <p>
                  Fill in the details below and our support
                  team will get back to you.
                </p>
              </div>

              <div className="contact-form-heading-icon">
                <img
                  src={Message}
                  alt="Message"
                />
              </div>

            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              {/* FIRST NAME + LAST NAME */}

              <div className="contact-form-row">

                <div className="contact-form-group">

                  <label htmlFor="firstName">
                    First Name
                    <span>*</span>
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />

                  {errors.firstName && (
                    <small className="contact-error">
                      {errors.firstName}
                    </small>
                  )}

                </div>

                <div className="contact-form-group">

                  <label htmlFor="lastName">
                    Last Name
                    <span>*</span>
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />

                  {errors.lastName && (
                    <small className="contact-error">
                      {errors.lastName}
                    </small>
                  )}

                </div>

              </div>

              {/* EMAIL + PHONE */}

              <div className="contact-form-row">

                <div className="contact-form-group">

                  <label htmlFor="email">
                    Email Address
                    <span>*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  {errors.email && (
                    <small className="contact-error">
                      {errors.email}
                    </small>
                  )}

                </div>

                <div className="contact-form-group">

                  <label htmlFor="phone">
                    Mobile Number
                    <span>*</span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength="10"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  {errors.phone && (
                    <small className="contact-error">
                      {errors.phone}
                    </small>
                  )}

                </div>

              </div>

              {/* SUBJECT */}

              <div className="contact-form-group">

                <label htmlFor="subject">
                  Subject
                  <span>*</span>
                </label>

                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">
                    Select a subject
                  </option>

                  <option value="Booking Help">
                    Booking Help
                  </option>

                  <option value="Trip Changes">
                    Trip Changes
                  </option>

                  <option value="Payment Support">
                    Payment Support
                  </option>

                  <option value="Cancellation">
                    Cancellation
                  </option>

                  <option value="Destination Information">
                    Destination Information
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

                {errors.subject && (
                  <small className="contact-error">
                    {errors.subject}
                  </small>
                )}

              </div>

              {/* MESSAGE */}

              <div className="contact-form-group">

                <label htmlFor="message">
                  Message
                  <span>*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>

                {errors.message && (
                  <small className="contact-error">
                    {errors.message}
                  </small>
                )}

              </div>

              {/* SUBMIT */}

              <div className="contact-submit-area">

                <p>
                  <span>*</span> Required fields
                </p>

                <button
                  type="submit"
                  className="contact-submit-button"
                >
                  <img
                    src={Send}
                    alt=""
                  />

                  Send Message
                </button>

              </div>

            </form>

          </div>

          {/* =================================================
             FAQ
          ================================================= */}

          <div className="contact-faq-card">

            <div className="contact-card-heading">

              <div>
                <h2>Frequently Asked Questions</h2>

                <p>
                  Find quick answers to common travel
                  questions.
                </p>
              </div>

              <div className="contact-form-heading-icon">
                <img
                  src={checkIcon}
                  alt="FAQ"
                />
              </div>

            </div>

            <div className="contact-faq-list">

              {faqData.map((faq, index) => {

                const isOpen = openFaq === index;

                return (
                  <div
                    className={`contact-faq-item ${
                      isOpen
                        ? "contact-faq-open"
                        : ""
                    }`}
                    key={index}
                  >

                    <button
                      type="button"
                      className="contact-faq-question"
                      onClick={() =>
                        toggleFaq(index)
                      }
                    >
                      <span>
                        {faq.question}
                      </span>

                      <span className="contact-faq-arrow">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="contact-faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

            <div className="contact-help-box">

              <div className="contact-help-icon">
                <img
                  src={contactIcon}
                  alt="Support"
                />
              </div>

              <div>
                <strong>
                  Still need help?
                </strong>

                <p>
                  Send us a message and our support
                  team will assist you.
                </p>
              </div>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default ContactUs;