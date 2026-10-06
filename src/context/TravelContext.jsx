import React, { createContext, useContext, useEffect, useState } from "react";

const TravelContext = createContext();

const getStoredData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    // Use default data when localStorage contains invalid JSON.
  }

  return fallback;
};

export function TravelProvider({ children }) {
  /* =====================================================
     DESTINATIONS - 20 DETAILS
  ===================================================== */

  const defaultDestinations = [
    {
      id: 1,
      name: "Paris",
      country: "France",
      image: "https://travelfrancebucketlist.com/wp-content/uploads/2020/06/Eiffel-Tower-at-Sunrise.jpg",
      rating: 4.9,
      trips: 125,
      price: 850,
      status: "Active",
      description:
        "Experience the Eiffel Tower, museums, romantic streets and famous French cuisine.",
    },
    {
      id: 2,
      name: "Dubai",
      country: "UAE",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDhOgQdikbJLlF00vaiXQoMY7jaj62B_UTFCyUDB0Wzw&s=10",
      rating: 4.8,
      trips: 180,
      price: 950,
      status: "Active",
      description:
        "Explore luxury shopping, desert safaris, modern architecture and exciting attractions.",
    },
    {
      id: 3,
      name: "Bali",
      country: "Indonesia",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK7ahKbWEVjq-9hFnzjBpAeh6GSPoVM24FpI6KTbRIog&s=10",
      rating: 4.9,
      trips: 210,
      price: 720,
      status: "Active",
      description:
        "Enjoy tropical beaches, temples, waterfalls and beautiful Balinese culture.",
    },
    {
      id: 4,
      name: "Maldives",
      country: "Maldives",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvHsUz7pWORr5zxQcplyOc9wbw_epxzjbyswzMA3h0vg&s=10",
      rating: 5.0,
      trips: 160,
      price: 1200,
      status: "Active",
      description:
        "Relax in luxury resorts surrounded by crystal clear water and white sandy beaches.",
    },
    {
      id: 5,
      name: "London",
      country: "United Kingdom",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvDbn3_5--X-Rsh0FvygOpjj5A13-OYz_i1TcTUzZt5A&s=10",
      rating: 4.7,
      trips: 145,
      price: 1050,
      status: "Active",
      description:
        "Discover Big Ben, Buckingham Palace, London Bridge and historic British culture.",
    },
    {
      id: 6,
      name: "Singapore",
      country: "Singapore",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Y9Kk1iquFDLF0U3y5zuyebXSUuqTYAfHGqPizHM7Ag&s=10",
      rating: 4.8,
      trips: 175,
      price: 780,
      status: "Active",
      description:
        "Visit Marina Bay Sands, Gardens by the Bay and experience modern city life.",
    },
    {
      id: 7,
      name: "Tokyo",
      country: "Japan",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpU-Y6ZPoFV17dyUjYJLo0_Rthms8c4FfhmEYphWhboQ&s=10",
      rating: 4.9,
      trips: 190,
      price: 1100,
      status: "Active",
      description:
        "Experience Japanese technology, traditional temples, food and vibrant city streets.",
    },
    {
      id: 8,
      name: "Switzerland",
      country: "Switzerland",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6aF-7o3z41Ibg3s2geh-d1OwbhxI6HczGRYbxzKAMiQ&s=10",
      rating: 4.9,
      trips: 135,
      price: 1400,
      status: "Active",
      description:
        "Explore the Swiss Alps, beautiful lakes, scenic trains and charming villages.",
    },
    {
      id: 9,
      name: "New York",
      country: "USA",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtdSemtSV3jBv8UM9ulAZ8W7alFl-pABo-6d65VSMnQ&s=10",
      rating: 4.8,
      trips: 220,
      price: 1350,
      status: "Active",
      description:
        "Explore Times Square, Central Park, Statue of Liberty and the city that never sleeps.",
    },
    {
      id: 10,
      name: "Sydney",
      country: "Australia",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6X2niNJ9_4VHQ0V_8zOunJtc344wLGRe5V1ArqWBz1w&s=10",
      rating: 4.8,
      trips: 115,
      price: 1450,
      status: "Active",
      description:
        "Discover the Sydney Opera House, Harbour Bridge and beautiful Australian beaches.",
    },
    {
      id: 11,
      name: "Rome",
      country: "Italy",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtXIskPNppg7CLu47EpO5gvZfXbzjFMc3jUu_8SzAICg&s=10",
      rating: 4.7,
      trips: 155,
      price: 920,
      status: "Active",
      description:
        "Visit the Colosseum, Vatican City, Trevi Fountain and enjoy authentic Italian food.",
    },
    {
      id: 12,
      name: "Santorini",
      country: "Greece",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2JO92f0mtHZ34KP25I5kk9CQs5oQb_FIR6hyatG3Cg&s=10",
      rating: 4.9,
      trips: 105,
      price: 1150,
      status: "Active",
      description:
        "Enjoy whitewashed villages, blue domes, sunsets and beautiful Mediterranean views.",
    },
    {
      id: 13,
      name: "Barcelona",
      country: "Spain",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjudjE5Q0sRPdm0WFlGmopwuBwq7ZTq3yFLNpjSbXRnQ&s=10",
      rating: 4.8,
      trips: 130,
      price: 890,
      status: "Active",
      description:
        "Explore Gaudi architecture, beaches, Spanish culture and amazing local cuisine.",
    },
    {
      id: 14,
      name: "Istanbul",
      country: "Turkey",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI2NVXEz9OJyeIFhzhmZmRlLtxBU1po7HzFMTjYcZU0Q&s=10",
      rating: 4.7,
      trips: 98,
      price: 680,
      status: "Active",
      description:
        "Experience historic mosques, bazaars, Bosphorus views and Turkish culture.",
    },
    {
      id: 15,
      name: "Cairo",
      country: "Egypt",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN-hcT-Ql2AZICeAziEWsq5KO1uNPYYYfR8WWYPS7eLw&s=10",
      rating: 4.6,
      trips: 88,
      price: 750,
      status: "Active",
      description:
        "Discover the Pyramids, Sphinx, Nile River and ancient Egyptian history.",
    },
    {
      id: 16,
      name: "Bangkok",
      country: "Thailand",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlx0RzvAKdYZbp487t4BnSQWXl27afIBVintL4SlKrDQ&s=10",
      rating: 4.6,
      trips: 175,
      price: 620,
      status: "Active",
      description:
        "Enjoy temples, street food, shopping markets and vibrant Thai culture.",
    },
    {
      id: 17,
      name: "Amsterdam",
      country: "Netherlands",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo3DhN2PloExkbGxOPO-hU_UmP7rzJ10V2qx6P924LGw&s=10",
      rating: 4.8,
      trips: 112,
      price: 980,
      status: "Active",
      description:
        "Explore canals, museums, cycling routes and beautiful Dutch architecture.",
    },
    {
      id: 18,
      name: "Prague",
      country: "Czech Republic",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL88HWtj_XNSWnhIcIHlc6yNol836m3y7Tt-KQ4N_srw&s=10",
      rating: 4.7,
      trips: 94,
      price: 760,
      status: "Active",
      description:
        "Discover Prague Castle, Charles Bridge and the historic Old Town.",
    },
    {
      id: 19,
      name: "Machu Picchu",
      country: "Peru",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2TkeLsvJVWTdL2h1IS24ANyaH5G-bJyFT1roznIoYLg&s=10",
      rating: 4.9,
      trips: 75,
      price: 1250,
      status: "Active",
      description:
        "Experience the ancient Inca citadel surrounded by breathtaking mountain landscapes.",
    },
    {
      id: 20,
      name: "Cape Town",
      country: "South Africa",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDHk5hXWp2vXYNVYYmHjLqqhcQRUfr1d7MmPvVih3gAw&s=10",
      rating: 4.8,
      trips: 102,
      price: 1180,
      status: "Active",
      description:
        "Explore Table Mountain, beautiful beaches, vineyards and South African wildlife.",
    },
  ];

  /* =====================================================
     TRIPS - 20 DETAILS
  ===================================================== */

  const defaultTrips = [
    {
      id: 1,
      title: "Paris Romantic Escape",
      destination: "Paris",
      country: "France",
      image: "https://travelfrancebucketlist.com/wp-content/uploads/2020/06/Eiffel-Tower-at-Sunrise.jpg",
      startDate: "2026-10-10",
      endDate: "2026-10-15",
      duration: "6 Days / 5 Nights",
      price: 1250,
      seats: 20,
      bookedSeats: 15,
      status: "Upcoming",
      category: "Romantic",
      description: "A romantic Paris holiday covering the city's most famous attractions.",
    },
    {
      id: 2,
      title: "Dubai Luxury Experience",
      destination: "Dubai",
      country: "UAE",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAYeUcdgTxxQ3q7vPZO3FCFFxCc3HVfspAsD_EOgDC6A&s=10",
      startDate: "2026-10-18",
      endDate: "2026-10-23",
      duration: "6 Days / 5 Nights",
      price: 1450,
      seats: 25,
      bookedSeats: 19,
      status: "Upcoming",
      category: "Luxury",
      description: "Luxury hotels, desert safari and modern Dubai attractions.",
    },
    {
      id: 3,
      title: "Bali Island Adventure",
      destination: "Bali",
      country: "Indonesia",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK7ahKbWEVjq-9hFnzjBpAeh6GSPoVM24FpI6KTbRIog&s=10",
      startDate: "2026-10-25",
      endDate: "2026-10-30",
      duration: "6 Days / 5 Nights",
      price: 980,
      seats: 25,
      bookedSeats: 17,
      status: "Upcoming",
      category: "Adventure",
      description: "Explore Bali beaches, temples and waterfalls.",
    },
    {
      id: 4,
      title: "Maldives Paradise",
      destination: "Maldives",
      country: "Maldives",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvHsUz7pWORr5zxQcplyOc9wbw_epxzjbyswzMA3h0vg&s=10",
      startDate: "2026-11-02",
      endDate: "2026-11-07",
      duration: "6 Days / 5 Nights",
      price: 1850,
      seats: 18,
      bookedSeats: 12,
      status: "Upcoming",
      category: "Luxury",
      description: "A relaxing island holiday in a luxury Maldives resort.",
    },
    {
      id: 5,
      title: "London Heritage Tour",
      destination: "London",
      country: "United Kingdom",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvDbn3_5--X-Rsh0FvygOpjj5A13-OYz_i1TcTUzZt5A&s=10",
      startDate: "2026-11-08",
      endDate: "2026-11-14",
      duration: "7 Days / 6 Nights",
      price: 1600,
      seats: 22,
      bookedSeats: 14,
      status: "Upcoming",
      category: "Heritage",
      description: "Explore London's famous landmarks and historic locations.",
    },
    {
      id: 6,
      title: "Singapore City Explorer",
      destination: "Singapore",
      country: "Singapore",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Y9Kk1iquFDLF0U3y5zuyebXSUuqTYAfHGqPizHM7Ag&s=10",
      startDate: "2026-11-15",
      endDate: "2026-11-19",
      duration: "5 Days / 4 Nights",
      price: 1100,
      seats: 25,
      bookedSeats: 20,
      status: "Upcoming",
      category: "City",
      description: "Discover Singapore's modern attractions and gardens.",
    },
    {
      id: 7,
      title: "Tokyo Cultural Journey",
      destination: "Tokyo",
      country: "Japan",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpU-Y6ZPoFV17dyUjYJLo0_Rthms8c4FfhmEYphWhboQ&s=10",
      startDate: "2026-11-22",
      endDate: "2026-11-28",
      duration: "7 Days / 6 Nights",
      price: 1750,
      seats: 20,
      bookedSeats: 11,
      status: "Upcoming",
      category: "Culture",
      description: "Discover Tokyo's traditional and modern attractions.",
    },
    {
      id: 8,
      title: "Swiss Alps Adventure",
      destination: "Switzerland",
      country: "Switzerland",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6aF-7o3z41Ibg3s2geh-d1OwbhxI6HczGRYbxzKAMiQ&s=10",
      startDate: "2026-12-01",
      endDate: "2026-12-07",
      duration: "7 Days / 6 Nights",
      price: 2100,
      seats: 18,
      bookedSeats: 10,
      status: "Upcoming",
      category: "Adventure",
      description: "Mountain views, scenic trains and Swiss villages.",
    },
    {
      id: 9,
      title: "New York City Lights",
      destination: "New York",
      country: "USA",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtdSemtSV3jBv8UM9ulAZ8W7alFl-pABo-6d65VSMnQ&s=10",
      startDate: "2026-12-10",
      endDate: "2026-12-16",
      duration: "7 Days / 6 Nights",
      price: 1950,
      seats: 24,
      bookedSeats: 16,
      status: "Upcoming",
      category: "City",
      description: "Experience the famous attractions of New York City.",
    },
    {
      id: 10,
      title: "Sydney Coastal Holiday",
      destination: "Sydney",
      country: "Australia",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6X2niNJ9_4VHQ0V_8zOunJtc344wLGRe5V1ArqWBz1w&s=10",
      startDate: "2026-12-18",
      endDate: "2026-12-24",
      duration: "7 Days / 6 Nights",
      price: 2200,
      seats: 20,
      bookedSeats: 13,
      status: "Upcoming",
      category: "Beach",
      description: "Enjoy Sydney beaches and famous landmarks.",
    },
    {
      id: 11,
      title: "Rome Historical Tour",
      destination: "Rome",
      country: "Italy",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtXIskPNppg7CLu47EpO5gvZfXbzjFMc3jUu_8SzAICg&s=10",
      startDate: "2027-01-05",
      endDate: "2027-01-10",
      duration: "6 Days / 5 Nights",
      price: 1350,
      seats: 20,
      bookedSeats: 15,
      status: "Upcoming",
      category: "Heritage",
      description: "Discover ancient Rome and Vatican City.",
    },
    {
      id: 12,
      title: "Santorini Sunset Escape",
      destination: "Santorini",
      country: "Greece",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2JO92f0mtHZ34KP25I5kk9CQs5oQb_FIR6hyatG3Cg&s=10",
      startDate: "2027-01-15",
      endDate: "2027-01-20",
      duration: "6 Days / 5 Nights",
      price: 1700,
      seats: 18,
      bookedSeats: 9,
      status: "Upcoming",
      category: "Romantic",
      description: "Enjoy Santorini sunsets and Mediterranean views.",
    },
    {
      id: 13,
      title: "Barcelona Art & Culture",
      destination: "Barcelona",
      country: "Spain",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjudjE5Q0sRPdm0WFlGmopwuBwq7ZTq3yFLNpjSbXRnQ&s=10",
      startDate: "2027-01-25",
      endDate: "2027-01-30",
      duration: "6 Days / 5 Nights",
      price: 1280,
      seats: 22,
      bookedSeats: 12,
      status: "Upcoming",
      category: "Culture",
      description: "Explore Barcelona architecture, art and beaches.",
    },
    {
      id: 14,
      title: "Istanbul Discovery",
      destination: "Istanbul",
      country: "Turkey",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI2NVXEz9OJyeIFhzhmZmRlLtxBU1po7HzFMTjYcZU0Q&s=10",
      startDate: "2027-02-05",
      endDate: "2027-02-10",
      duration: "6 Days / 5 Nights",
      price: 1050,
      seats: 25,
      bookedSeats: 17,
      status: "Upcoming",
      category: "Culture",
      description: "Explore historic Istanbul and the Bosphorus.",
    },
    {
      id: 15,
      title: "Egypt Ancient Wonders",
      destination: "Cairo",
      country: "Egypt",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN-hcT-Ql2AZICeAziEWsq5KO1uNPYYYfR8WWYPS7eLw&s=10",
      startDate: "2027-02-15",
      endDate: "2027-02-20",
      duration: "6 Days / 5 Nights",
      price: 1120,
      seats: 20,
      bookedSeats: 8,
      status: "Upcoming",
      category: "Heritage",
      description: "Explore the pyramids and ancient Egyptian landmarks.",
    },
    {
      id: 16,
      title: "Bangkok Food & Culture",
      destination: "Bangkok",
      country: "Thailand",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlx0RzvAKdYZbp487t4BnSQWXl27afIBVintL4SlKrDQ&s=10",
      startDate: "2027-02-25",
      endDate: "2027-03-01",
      duration: "5 Days / 4 Nights",
      price: 850,
      seats: 25,
      bookedSeats: 18,
      status: "Upcoming",
      category: "Food",
      description: "Experience Bangkok temples, markets and Thai food.",
    },
    {
      id: 17,
      title: "Amsterdam Canal Tour",
      destination: "Amsterdam",
      country: "Netherlands",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo3DhN2PloExkbGxOPO-hU_UmP7rzJ10V2qx6P924LGw&s=10",
      startDate: "2027-03-10",
      endDate: "2027-03-15",
      duration: "6 Days / 5 Nights",
      price: 1420,
      seats: 20,
      bookedSeats: 11,
      status: "Upcoming",
      category: "City",
      description: "Explore Amsterdam canals and historic neighborhoods.",
    },
    {
      id: 18,
      title: "Prague Old Town",
      destination: "Prague",
      country: "Czech Republic",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL88HWtj_XNSWnhIcIHlc6yNol836m3y7Tt-KQ4N_srw&s=10",
      startDate: "2027-03-20",
      endDate: "2027-03-25",
      duration: "6 Days / 5 Nights",
      price: 1080,
      seats: 20,
      bookedSeats: 10,
      status: "Upcoming",
      category: "Heritage",
      description: "Discover Prague's beautiful old town and castle.",
    },
    {
      id: 19,
      title: "Machu Picchu Expedition",
      destination: "Machu Picchu",
      country: "Peru",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2TkeLsvJVWTdL2h1IS24ANyaH5G-bJyFT1roznIoYLg&s=10",
      startDate: "2027-04-05",
      endDate: "2027-04-12",
      duration: "8 Days / 7 Nights",
      price: 1950,
      seats: 15,
      bookedSeats: 7,
      status: "Upcoming",
      category: "Adventure",
      description: "A memorable adventure to the ancient Inca citadel.",
    },
    {
      id: 20,
      title: "Cape Town Explorer",
      destination: "Cape Town",
      country: "South Africa",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDHk5hXWp2vXYNVYYmHjLqqhcQRUfr1d7MmPvVih3gAw&s=10",
      startDate: "2027-04-20",
      endDate: "2027-04-26",
      duration: "7 Days / 6 Nights",
      price: 1800,
      seats: 20,
      bookedSeats: 12,
      status: "Upcoming",
      category: "Adventure",
      description: "Explore Table Mountain, beaches and Cape Town.",
    },
  ];

  /* =====================================================
     CUSTOMERS - 20 DETAILS
  ===================================================== */

  const defaultCustomers = [
    {
      id: 1,
      name: "Arun Kumar",
      email: "arun@gmail.com",
      phone: "9876543210",
      city: "Chennai",
      country: "India",
      bookings: 5,
      totalSpent: 6250,
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      phone: "9876543211",
      city: "Bangalore",
      country: "India",
      bookings: 4,
      totalSpent: 4800,
      status: "Active",
    },
    {
      id: 3,
      name: "Rahul Raj",
      email: "rahul@gmail.com",
      phone: "9876543212",
      city: "Mumbai",
      country: "India",
      bookings: 3,
      totalSpent: 3900,
      status: "Active",
    },
    {
      id: 4,
      name: "Meera Krishnan",
      email: "meera@gmail.com",
      phone: "9876543213",
      city: "Coimbatore",
      country: "India",
      bookings: 6,
      totalSpent: 8200,
      status: "Active",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram@gmail.com",
      phone: "9876543214",
      city: "Delhi",
      country: "India",
      bookings: 2,
      totalSpent: 2700,
      status: "Active",
    },
    {
      id: 6,
      name: "Anjali Patel",
      email: "anjali@gmail.com",
      phone: "9876543215",
      city: "Ahmedabad",
      country: "India",
      bookings: 5,
      totalSpent: 7100,
      status: "Active",
    },
    {
      id: 7,
      name: "Karthik R",
      email: "karthik@gmail.com",
      phone: "9876543216",
      city: "Salem",
      country: "India",
      bookings: 3,
      totalSpent: 3400,
      status: "Active",
    },
    {
      id: 8,
      name: "Divya Nair",
      email: "divya@gmail.com",
      phone: "9876543217",
      city: "Kochi",
      country: "India",
      bookings: 4,
      totalSpent: 5600,
      status: "Active",
    },
    {
      id: 9,
      name: "Sanjay Kumar",
      email: "sanjay@gmail.com",
      phone: "9876543218",
      city: "Hyderabad",
      country: "India",
      bookings: 2,
      totalSpent: 2400,
      status: "Inactive",
    },
    {
      id: 10,
      name: "Sneha Iyer",
      email: "sneha@gmail.com",
      phone: "9876543219",
      city: "Pune",
      country: "India",
      bookings: 7,
      totalSpent: 9500,
      status: "Active",
    },
    {
      id: 11,
      name: "Aditya Verma",
      email: "aditya@gmail.com",
      phone: "9876543220",
      city: "Lucknow",
      country: "India",
      bookings: 3,
      totalSpent: 4100,
      status: "Active",
    },
    {
      id: 12,
      name: "Nisha Joseph",
      email: "nisha@gmail.com",
      phone: "9876543221",
      city: "Chennai",
      country: "India",
      bookings: 5,
      totalSpent: 6800,
      status: "Active",
    },
    {
      id: 13,
      name: "Rohit Das",
      email: "rohit@gmail.com",
      phone: "9876543222",
      city: "Kolkata",
      country: "India",
      bookings: 2,
      totalSpent: 2300,
      status: "Inactive",
    },
    {
      id: 14,
      name: "Aishwarya S",
      email: "aishwarya@gmail.com",
      phone: "9876543223",
      city: "Madurai",
      country: "India",
      bookings: 4,
      totalSpent: 5200,
      status: "Active",
    },
    {
      id: 15,
      name: "Manoj Kumar",
      email: "manoj@gmail.com",
      phone: "9876543224",
      city: "Trichy",
      country: "India",
      bookings: 3,
      totalSpent: 3600,
      status: "Active",
    },
    {
      id: 16,
      name: "Pooja Menon",
      email: "pooja@gmail.com",
      phone: "9876543225",
      city: "Kochi",
      country: "India",
      bookings: 6,
      totalSpent: 7900,
      status: "Active",
    },
    {
      id: 17,
      name: "Suresh Babu",
      email: "suresh@gmail.com",
      phone: "9876543226",
      city: "Bangalore",
      country: "India",
      bookings: 2,
      totalSpent: 2900,
      status: "Active",
    },
    {
      id: 18,
      name: "Keerthana Ravi",
      email: "keerthana@gmail.com",
      phone: "9876543227",
      city: "Chennai",
      country: "India",
      bookings: 5,
      totalSpent: 6400,
      status: "Active",
    },
    {
      id: 19,
      name: "Harish Kumar",
      email: "harish@gmail.com",
      phone: "9876543228",
      city: "Mumbai",
      country: "India",
      bookings: 4,
      totalSpent: 5700,
      status: "Active",
    },
    {
      id: 20,
      name: "Lakshmi Devi",
      email: "lakshmi@gmail.com",
      phone: "9876543229",
      city: "Madurai",
      country: "India",
      bookings: 3,
      totalSpent: 4300,
      status: "Active",
    },
  ];

  /* =====================================================
     BOOKINGS - 20 DETAILS
  ===================================================== */

  const defaultBookings = [
    {
      id: 1,
      bookingId: "TRV-1001",
      customerId: 1,
      customer: "Arun Kumar",
      tripId: 1,
      trip: "Paris Romantic Escape",
      destination: "Paris",
      bookingDate: "2026-09-20",
      travelDate: "2026-10-10",
      travelers: 2,
      amount: 2500,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
    {
      id: 2,
      bookingId: "TRV-1002",
      customerId: 2,
      customer: "Priya Sharma",
      tripId: 2,
      trip: "Dubai Luxury Experience",
      destination: "Dubai",
      bookingDate: "2026-09-21",
      travelDate: "2026-10-18",
      travelers: 2,
      amount: 2900,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
    {
      id: 3,
      bookingId: "TRV-1003",
      customerId: 3,
      customer: "Rahul Raj",
      tripId: 3,
      trip: "Bali Island Adventure",
      destination: "Bali",
      bookingDate: "2026-09-22",
      travelDate: "2026-10-25",
      travelers: 2,
      amount: 1960,
      bookingStatus: "Pending",
      paymentStatus: "Pending",
    },
    {
      id: 4,
      bookingId: "TRV-1004",
      customerId: 4,
      customer: "Meera Krishnan",
      tripId: 4,
      trip: "Maldives Paradise",
      destination: "Maldives",
      bookingDate: "2026-09-23",
      travelDate: "2026-11-02",
      travelers: 2,
      amount: 3700,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
    {
      id: 5,
      bookingId: "TRV-1005",
      customerId: 5,
      customer: "Vikram Singh",
      tripId: 5,
      trip: "London Heritage Tour",
      destination: "London",
      bookingDate: "2026-09-24",
      travelDate: "2026-11-08",
      travelers: 1,
      amount: 1600,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
    {
      id: 6,
      bookingId: "TRV-1006",
      customerId: 6,
      customer: "Anjali Patel",
      tripId: 6,
      trip: "Singapore City Explorer",
      destination: "Singapore",
      bookingDate: "2026-09-25",
      travelDate: "2026-11-15",
      travelers: 2,
      amount: 2200,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
    {
      id: 7,
      bookingId: "TRV-1007",
      customerId: 7,
      customer: "Karthik R",
      tripId: 7,
      trip: "Tokyo Cultural Journey",
      destination: "Tokyo",
      bookingDate: "2026-09-26",
      travelDate: "2026-11-22",
      travelers: 1,
      amount: 1750,
      bookingStatus: "Pending",
      paymentStatus: "Partial",
    },
    {
      id: 8,
      bookingId: "TRV-1008",
      customerId: 8,
      customer: "Divya Nair",
      tripId: 8,
      trip: "Swiss Alps Adventure",
      destination: "Switzerland",
      bookingDate: "2026-09-27",
      travelDate: "2026-12-01",
      travelers: 2,
      amount: 4200,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
    {
      id: 9,
      bookingId: "TRV-1009",
      customerId: 9,
      customer: "Sanjay Kumar",
      tripId: 9,
      trip: "New York City Lights",
      destination: "New York",
      bookingDate: "2026-09-28",
      travelDate: "2026-12-10",
      travelers: 1,
      amount: 1950,
      bookingStatus: "Cancelled",
      paymentStatus: "Refunded",
    },
    {
      id: 10,
      bookingId: "TRV-1010",
      customerId: 10,
      customer: "Sneha Iyer",
      tripId: 10,
      trip: "Sydney Coastal Holiday",
      destination: "Sydney",
      bookingDate: "2026-09-29",
      travelDate: "2026-12-18",
      travelers: 2,
      amount: 4400,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
    {
      id: 11,
      bookingId: "TRV-1011",
      customerId: 11,
      customer: "Aditya Verma",
      tripId: 11,
      trip: "Rome Historical Tour",
      destination: "Rome",
      bookingDate: "2026-09-30",
      travelDate: "2027-01-05",
      travelers: 2,
      amount: 2700,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
    {
      id: 12,
      bookingId: "TRV-1012",
      customerId: 12,
      customer: "Nisha Joseph",
      tripId: 12,
      trip: "Santorini Sunset Escape",
      destination: "Santorini",
      bookingDate: "2026-10-01",
      travelDate: "2027-01-15",
      travelers: 2,
      amount: 3400,
      bookingStatus: "Pending",
      paymentStatus: "Pending",
    },
    {
      id: 13,
      bookingId: "TRV-1013",
      customerId: 13,
      customer: "Rohit Das",
      tripId: 13,
      trip: "Barcelona Art & Culture",
      destination: "Barcelona",
      bookingDate: "2026-10-01",
      travelDate: "2027-01-25",
      travelers: 1,
      amount: 1280,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
    {
      id: 14,
      bookingId: "TRV-1014",
      customerId: 14,
      customer: "Aishwarya S",
      tripId: 14,
      trip: "Istanbul Discovery",
      destination: "Istanbul",
      bookingDate: "2026-10-02",
      travelDate: "2027-02-05",
      travelers: 2,
      amount: 2100,
      bookingStatus: "Confirmed",
      paymentStatus: "Partial",
    },
    {
      id: 15,
      bookingId: "TRV-1015",
      customerId: 15,
      customer: "Manoj Kumar",
      tripId: 15,
      trip: "Egypt Ancient Wonders",
      destination: "Cairo",
      bookingDate: "2026-10-02",
      travelDate: "2027-02-15",
      travelers: 1,
      amount: 1120,
      bookingStatus: "Pending",
      paymentStatus: "Pending",
    },
    {
      id: 16,
      bookingId: "TRV-1016",
      customerId: 16,
      customer: "Pooja Menon",
      tripId: 16,
      trip: "Bangkok Food & Culture",
      destination: "Bangkok",
      bookingDate: "2026-10-03",
      travelDate: "2027-02-25",
      travelers: 2,
      amount: 1700,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
    {
      id: 17,
      bookingId: "TRV-1017",
      customerId: 17,
      customer: "Suresh Babu",
      tripId: 17,
      trip: "Amsterdam Canal Tour",
      destination: "Amsterdam",
      bookingDate: "2026-10-03",
      travelDate: "2027-03-10",
      travelers: 1,
      amount: 1420,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
    {
      id: 18,
      bookingId: "TRV-1018",
      customerId: 18,
      customer: "Keerthana Ravi",
      tripId: 18,
      trip: "Prague Old Town",
      destination: "Prague",
      bookingDate: "2026-10-03",
      travelDate: "2027-03-20",
      travelers: 2,
      amount: 2160,
      bookingStatus: "Pending",
      paymentStatus: "Partial",
    },
    {
      id: 19,
      bookingId: "TRV-1019",
      customerId: 19,
      customer: "Harish Kumar",
      tripId: 19,
      trip: "Machu Picchu Expedition",
      destination: "Machu Picchu",
      bookingDate: "2026-10-03",
      travelDate: "2027-04-05",
      travelers: 1,
      amount: 1950,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
    {
      id: 20,
      bookingId: "TRV-1020",
      customerId: 20,
      customer: "Lakshmi Devi",
      tripId: 20,
      trip: "Cape Town Explorer",
      destination: "Cape Town",
      bookingDate: "2026-10-03",
      travelDate: "2027-04-20",
      travelers: 2,
      amount: 3600,
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
    },
  ];

  /* =====================================================
     PAYMENTS - 20 DETAILS
  ===================================================== */

  const defaultPayments = [
    {
      id: 1,
      transactionId: "PAY-1001",
      bookingId: "TRV-1001",
      customer: "Arun Kumar",
      date: "2026-09-20",
      amount: 2500,
      method: "Credit Card",
      status: "Paid",
    },
    {
      id: 2,
      transactionId: "PAY-1002",
      bookingId: "TRV-1002",
      customer: "Priya Sharma",
      date: "2026-09-21",
      amount: 2900,
      method: "UPI",
      status: "Paid",
    },
    {
      id: 3,
      transactionId: "PAY-1003",
      bookingId: "TRV-1003",
      customer: "Rahul Raj",
      date: "2026-09-22",
      amount: 1960,
      method: "Debit Card",
      status: "Pending",
    },
    {
      id: 4,
      transactionId: "PAY-1004",
      bookingId: "TRV-1004",
      customer: "Meera Krishnan",
      date: "2026-09-23",
      amount: 3700,
      method: "Credit Card",
      status: "Paid",
    },
    {
      id: 5,
      transactionId: "PAY-1005",
      bookingId: "TRV-1005",
      customer: "Vikram Singh",
      date: "2026-09-24",
      amount: 1600,
      method: "UPI",
      status: "Paid",
    },
    {
      id: 6,
      transactionId: "PAY-1006",
      bookingId: "TRV-1006",
      customer: "Anjali Patel",
      date: "2026-09-25",
      amount: 2200,
      method: "Net Banking",
      status: "Paid",
    },
    {
      id: 7,
      transactionId: "PAY-1007",
      bookingId: "TRV-1007",
      customer: "Karthik R",
      date: "2026-09-26",
      amount: 875,
      method: "UPI",
      status: "Partial",
    },
    {
      id: 8,
      transactionId: "PAY-1008",
      bookingId: "TRV-1008",
      customer: "Divya Nair",
      date: "2026-09-27",
      amount: 4200,
      method: "Credit Card",
      status: "Paid",
    },
    {
      id: 9,
      transactionId: "PAY-1009",
      bookingId: "TRV-1009",
      customer: "Sanjay Kumar",
      date: "2026-09-28",
      amount: 1950,
      method: "Debit Card",
      status: "Refunded",
    },
    {
      id: 10,
      transactionId: "PAY-1010",
      bookingId: "TRV-1010",
      customer: "Sneha Iyer",
      date: "2026-09-29",
      amount: 4400,
      method: "UPI",
      status: "Paid",
    },
    {
      id: 11,
      transactionId: "PAY-1011",
      bookingId: "TRV-1011",
      customer: "Aditya Verma",
      date: "2026-09-30",
      amount: 2700,
      method: "Credit Card",
      status: "Paid",
    },
    {
      id: 12,
      transactionId: "PAY-1012",
      bookingId: "TRV-1012",
      customer: "Nisha Joseph",
      date: "2026-10-01",
      amount: 3400,
      method: "UPI",
      status: "Pending",
    },
    {
      id: 13,
      transactionId: "PAY-1013",
      bookingId: "TRV-1013",
      customer: "Rohit Das",
      date: "2026-10-01",
      amount: 1280,
      method: "Debit Card",
      status: "Paid",
    },
    {
      id: 14,
      transactionId: "PAY-1014",
      bookingId: "TRV-1014",
      customer: "Aishwarya S",
      date: "2026-10-02",
      amount: 1050,
      method: "UPI",
      status: "Partial",
    },
    {
      id: 15,
      transactionId: "PAY-1015",
      bookingId: "TRV-1015",
      customer: "Manoj Kumar",
      date: "2026-10-02",
      amount: 1120,
      method: "Net Banking",
      status: "Pending",
    },
    {
      id: 16,
      transactionId: "PAY-1016",
      bookingId: "TRV-1016",
      customer: "Pooja Menon",
      date: "2026-10-03",
      amount: 1700,
      method: "Credit Card",
      status: "Paid",
    },
    {
      id: 17,
      transactionId: "PAY-1017",
      bookingId: "TRV-1017",
      customer: "Suresh Babu",
      date: "2026-10-03",
      amount: 1420,
      method: "UPI",
      status: "Paid",
    },
    {
      id: 18,
      transactionId: "PAY-1018",
      bookingId: "TRV-1018",
      customer: "Keerthana Ravi",
      date: "2026-10-03",
      amount: 1080,
      method: "Debit Card",
      status: "Partial",
    },
    {
      id: 19,
      transactionId: "PAY-1019",
      bookingId: "TRV-1019",
      customer: "Harish Kumar",
      date: "2026-10-03",
      amount: 1950,
      method: "Credit Card",
      status: "Paid",
    },
    {
      id: 20,
      transactionId: "PAY-1020",
      bookingId: "TRV-1020",
      customer: "Lakshmi Devi",
      date: "2026-10-03",
      amount: 3600,
      method: "UPI",
      status: "Paid",
    },
  ];

  /* =====================================================
     STATE
  ===================================================== */

  const [destinations, setDestinations] = useState(() =>
    getStoredData("travelDestinations", defaultDestinations)
  );

  const [trips, setTrips] = useState(() =>
    getStoredData("travelTrips", defaultTrips)
  );

  const [customers, setCustomers] = useState(() =>
    getStoredData("travelCustomers", defaultCustomers)
  );

  const [bookings, setBookings] = useState(() =>
    getStoredData("travelBookings", defaultBookings)
  );

  const [payments, setPayments] = useState(() =>
    getStoredData("travelPayments", defaultPayments)
  );

  /* =====================================================
     SAVE TO LOCAL STORAGE
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      "travelDestinations",
      JSON.stringify(destinations)
    );
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem(
      "travelTrips",
      JSON.stringify(trips)
    );
  }, [trips]);

  useEffect(() => {
    localStorage.setItem(
      "travelCustomers",
      JSON.stringify(customers)
    );
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(
      "travelBookings",
      JSON.stringify(bookings)
    );
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(
      "travelPayments",
      JSON.stringify(payments)
    );
  }, [payments]);

  /* =====================================================
     DESTINATION FUNCTIONS
  ===================================================== */

  const addDestination = (destination) => {
    const newDestination = {
      ...destination,
      id: Date.now(),
    };

    setDestinations((previous) => [
      ...previous,
      newDestination,
    ]);
  };

  const updateDestination = (id, updatedDestination) => {
    setDestinations((previous) => {
      const updated = [];

      for (const destination of previous) {
        if (destination.id === Number(id)) {
          updated.push({
            ...destination,
            ...updatedDestination,
          });
        } else {
          updated.push(destination);
        }
      }

      return updated;
    });
  };

  const deleteDestination = (id) => {
    setDestinations((previous) => {
      const updated = [];

      for (const destination of previous) {
        if (destination.id !== Number(id)) {
          updated.push(destination);
        }
      }

      return updated;
    });
  };

  /* =====================================================
     TRIP FUNCTIONS
  ===================================================== */

  const addTrip = (trip) => {
    const newTrip = {
      ...trip,
      id: Date.now(),
    };

    setTrips((previous) => [
      ...previous,
      newTrip,
    ]);
  };

  const updateTrip = (id, updatedTrip) => {
    setTrips((previous) => {
      const updated = [];

      for (const trip of previous) {
        if (trip.id === Number(id)) {
          updated.push({
            ...trip,
            ...updatedTrip,
          });
        } else {
          updated.push(trip);
        }
      }

      return updated;
    });
  };

  const deleteTrip = (id) => {
    setTrips((previous) => {
      const updated = [];

      for (const trip of previous) {
        if (trip.id !== Number(id)) {
          updated.push(trip);
        }
      }

      return updated;
    });
  };

  /* =====================================================
     CUSTOMER FUNCTIONS
  ===================================================== */

  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now(),
    };

    setCustomers((previous) => [
      ...previous,
      newCustomer,
    ]);
  };

  const updateCustomer = (id, updatedCustomer) => {
    setCustomers((previous) => {
      const updated = [];

      for (const customer of previous) {
        if (customer.id === Number(id)) {
          updated.push({
            ...customer,
            ...updatedCustomer,
          });
        } else {
          updated.push(customer);
        }
      }

      return updated;
    });
  };

  const deleteCustomer = (id) => {
    setCustomers((previous) => {
      const updated = [];

      for (const customer of previous) {
        if (customer.id !== Number(id)) {
          updated.push(customer);
        }
      }

      return updated;
    });
  };

  /* =====================================================
     BOOKING FUNCTIONS
  ===================================================== */

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(),
      bookingId: `TRV-${Date.now()}`,
    };

    setBookings((previous) => [
      ...previous,
      newBooking,
    ]);
  };

  const updateBooking = (id, updatedBooking) => {
    setBookings((previous) => {
      const updated = [];

      for (const booking of previous) {
        if (booking.id === Number(id)) {
          updated.push({
            ...booking,
            ...updatedBooking,
          });
        } else {
          updated.push(booking);
        }
      }

      return updated;
    });
  };

  const deleteBooking = (id) => {
    setBookings((previous) => {
      const updated = [];

      for (const booking of previous) {
        if (booking.id !== Number(id)) {
          updated.push(booking);
        }
      }

      return updated;
    });
  };

  /* =====================================================
     PAYMENT FUNCTIONS
  ===================================================== */

  const addPayment = (payment) => {
    const newPayment = {
      ...payment,
      id: Date.now(),
      transactionId: `PAY-${Date.now()}`,
    };

    setPayments((previous) => [
      ...previous,
      newPayment,
    ]);
  };

  const updatePayment = (id, updatedPayment) => {
    setPayments((previous) => {
      const updated = [];

      for (const payment of previous) {
        if (payment.id === Number(id)) {
          updated.push({
            ...payment,
            ...updatedPayment,
          });
        } else {
          updated.push(payment);
        }
      }

      return updated;
    });
  };

  const deletePayment = (id) => {
    setPayments((previous) => {
      const updated = [];

      for (const payment of previous) {
        if (payment.id !== Number(id)) {
          updated.push(payment);
        }
      }

      return updated;
    });
  };

  /* =====================================================
     DASHBOARD STATISTICS
  ===================================================== */

  let totalRevenue = 0;

  for (const payment of payments) {
    if (payment.status === "Paid") {
      totalRevenue += Number(payment.amount);
    }
  }

  let confirmedBookings = 0;
  let pendingBookings = 0;
  let cancelledBookings = 0;

  for (const booking of bookings) {
    if (booking.bookingStatus === "Confirmed") {
      confirmedBookings++;
    }

    if (booking.bookingStatus === "Pending") {
      pendingBookings++;
    }

    if (booking.bookingStatus === "Cancelled") {
      cancelledBookings++;
    }
  }

  const statistics = {
    totalDestinations: destinations.length,
    totalTrips: trips.length,
    totalCustomers: customers.length,
    totalBookings: bookings.length,
    totalPayments: payments.length,
    totalRevenue,
    confirmedBookings,
    pendingBookings,
    cancelledBookings,
  };

  /* =====================================================
     CONTEXT VALUE
  ===================================================== */

  const value = {
    destinations,
    trips,
    customers,
    bookings,
    payments,

    statistics,

    addDestination,
    updateDestination,
    deleteDestination,

    addTrip,
    updateTrip,
    deleteTrip,

    addCustomer,
    updateCustomer,
    deleteCustomer,

    addBooking,
    updateBooking,
    deleteBooking,

    addPayment,
    updatePayment,
    deletePayment,
  };

  return (
    <TravelContext.Provider value={value}>
      {children}
    </TravelContext.Provider>
  );
}

/* =====================================================
   CUSTOM HOOK
===================================================== */

export function useTravel() {
  const context = useContext(TravelContext);

  if (!context) {
    throw new Error(
      "useTravel must be used inside TravelProvider"
    );
  }

  return context;
}

export default TravelContext;