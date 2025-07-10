import React, { useState } from 'react';
import './App.css'; // This can be used for additional global styles or component-specific styles
import { HomePageContent } from './first';

import GardenPage from './garden';
import About from './about';
import Features from './features';
import Contact from './contact';
import Profile from './profile';
import Diagnose from './diagnose';
import SignupLogin from './signupLogin';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const showNavbar = true; 
  const mainContentPaddingTop = showNavbar ? '90px' : '2rem';

  return (
    <div className="App flex flex-col min-h-screen">
      {/* Conditionally render Navbar */}
      {showNavbar && <Navbar onNavigate={handleNavigate} currentPage={currentPage} />}

      {/* Main content area */}
      <main className="flex-grow flex flex-col items-center justify-start px-4" style={{ paddingTop: mainContentPaddingTop, paddingBottom: '2rem' }}>
        {/* Use a switch statement to render the appropriate component based on currentPage */}
        {(() => {
          switch (currentPage) {
            case 'home':
              return <HomePageContent onNavigate={handleNavigate} />;
            case 'myGarden':
              return <GardenPage onNavigate={handleNavigate} />;
            case 'aboutUs':
              return <About onNavigate={handleNavigate} />;
            case 'featuresPage':
              return <Features onNavigate={handleNavigate} />;
            case 'contactPage':
              return <Contact onNavigate={handleNavigate} />;
            case 'profilePage':
              return <Profile onNavigate={handleNavigate} />;
            case 'diagnosePage':
              return <Diagnose onNavigate={handleNavigate} />;
            case 'auth':
              return <SignupLogin onNavigate={handleNavigate} />;
            default:
              return <HomePageContent onNavigate={handleNavigate} />; 
          }
        })()}
      </main>

      {/* Footer is always rendered */}
      <Footer />

      {/* Global CSS and Bootstrap JavaScript (ideally, CSS links should be in public/index.html) */}
      {/* The @import rules for Bootstrap and Font Awesome are usually placed in a CSS file,
          not directly in a style tag within a React component. */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
          /* Your custom CSS variables and global styles */
          /* Note: Bootstrap CDN links are ideally in public/index.html */
          @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
          @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
          @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

          /* Custom CSS variables based on provided Tailwind palette */
          :root {
            --background: hsl(60, 56%, 91%); /* Beige (#F5F5DC) */
            --foreground: hsl(0, 0%, 20%); /* Dark Gray */

            --card: hsl(60, 56%, 93%); /* Slightly Lighter Beige */
            --card-foreground: hsl(0, 0%, 20%);

            --popover: hsl(60, 56%, 93%);
            --popover-foreground: hsl(0, 0%, 20%);

            --primary: hsl(120, 27%, 65%); /* Natural Green (#8FBC8F) */
            --primary-foreground: hsl(0, 0%, 10%); /* Dark text for contrast on primary */

            --secondary: hsl(60, 30%, 85%); /* Lighter desaturated beige for secondary elements */
            --secondary-foreground: hsl(0, 0%, 20%);

            --muted: hsl(60, 30%, 88%); /* Even lighter beige */
            --muted-foreground: hsl(0, 0%, 35%); /* Slightly lighter gray */

            --accent: hsl(34, 44%, 70%); /* Warm Tan (#D2B48C) */
            --accent-foreground: hsl(0, 0%, 10%); /* Dark text for contrast on accent */
            --accent-hover: hsl(34, 44%, 60%); /* Darker tan/brown for hover effect */

            --destructive: hsl(0, 84.2%, 60.2%);
            --destructive-foreground: hsl(0, 0%, 98%);

            --border: hsl(60, 30%, 80%); /* Slightly darker beige for borders */
            --input: hsl(60, 30%, 80%);
            --ring: hsl(120, 27%, 55%); /* Darker shade of primary for focus rings */
            --radius: 0.5rem;

            --chart-1: hsl(120, 27%, 65%);
            --chart-2: hsl(34, 44%, 70%);
            --chart-3: hsl(60, 56%, 80%);
            --chart-4: hsl(120, 27%, 55%);
            --chart-5: hsl(34, 44%, 60%);

            /* Sidebar colors - can be distinct or inherit. For now, slightly adjusted from main theme. */
            --sidebar-background: hsl(60, 50%, 88%); /* Lighter beige for sidebar */
            --sidebar-foreground: hsl(0, 0%, 15%);
            --sidebar-primary: hsl(120, 27%, 60%); /* Slightly adjusted primary for sidebar accents */
            --sidebar-primary-foreground: hsl(0, 0%, 5%);
            --sidebar-accent: hsl(34, 44%, 65%); /* Slightly adjusted accent */
            --sidebar-accent-foreground: hsl(0, 0%, 5%);
            --sidebar-border: hsl(60, 30%, 75%);
            --sidebar-ring: hsl(120, 27%, 50%);
          }

          body {
              font-family: "Inter", sans-serif;
              background-color: var(--background);
              color: var(--foreground);
          }

          /* Fixed Navbar */
          .navbar-fixed-top {
            position: sticky;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            transition: background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
            box-shadow: none;
          }

          .navbar-fixed-top.scrolled {
            background-color: hsla(60, 56%, 93%, 0.8);
            box-shadow: 0 2px 4px rgba(0,0,0,.08);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }

          /* Override Bootstrap's default bg-body-tertiary to match card color (for footer mostly) */
          .bg-body-tertiary {
            background-color: var(--card) !important;
          }

          .bg-light-green {
              background-color: var(--primary) !important;
          }

          .text-dark-green {
              color: var(--primary-foreground) !important;
          }

          .btn-custom-green {
              background-color: var(--primary);
              border-color: var(--primary);
              color: var(--primary-foreground);
              border-radius: var(--radius);
              padding: 0.75rem 1.5rem;
          }

          .btn-custom-green:hover {
              background-color: var(--ring);
              border-color: var(--ring);
          }

          .btn-outline-custom {
              border-color: var(--primary);
              color: var(--primary);
              border-radius: var(--radius);
              padding: 0.75rem 1.5rem;
          }

          .btn-outline-custom:hover {
              background-color: var(--primary);
              color: var(--primary-foreground);
          }

          /* Card Styling & Hover Effect - NEW */
          .card {
              border: none;
              box-shadow: 0 4px 8px rgba(0,0,0,.05);
              border-radius: 1rem;
              background-color: var(--card);
              color: var(--card-foreground);
              transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          }

          .card:hover {
              background-color: var(--secondary);
              transform: translateY(-5px);
              box-shadow: 0 8px 16px rgba(0,0,0,.15);
          }

          .section-padding {
              padding-top: 80px;
              padding-bottom: 80px;
          }

          /* Emoji styling within cards */
          .card-emoji {
              font-size: 3rem;
              line-height: 1;
              margin-bottom: 1rem;
              display: inline-block;
          }

          .image-placeholder {
              background-color: var(--muted);
              display: flex;
              justify-content: center;
              align-items: center;
              height: 250px;
              color: var(--muted-foreground);
              font-size: 1.25rem;
              border-top-left-radius: 1rem;
              border-top-right-radius: 1rem;
              overflow: hidden;
          }
          .image-placeholder img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .cta-section h2, .cta-section p {
              color: white;
          }
          .cta-section p {
              opacity: 0.9;
          }

          /* Navbar centering */
          .navbar-nav-center {
            margin-left: auto;
            margin-right: auto;
            flex-grow: 1;
            justify-content: center;
          }
          /* Adjust for small screens where navbar items stack */
          @media (max-width: 991.98px) {
            .navbar-nav-center {
              justify-content: flex-start;
              margin-left: 0;
              margin-right: 0;
            }
          }

          .navbar-nav .nav-link {
              border-radius: var(--radius);
              font-size: 1.15rem;
              color: var(--foreground);
              font-weight: 400;
              padding: 0.5rem 0.75rem;
              transition: background-color 0.2s ease, color 0.2s ease;
          }
          .navbar-nav .nav-link.active {
              font-weight: 600;
              background-color: transparent;
          }
          /* Hover effect for navbar links */
          .navbar-nav .nav-link:not(.active):hover {
            background-color: hsl(60, 30%, 80%);
            color: var(--foreground);
          }
          .navbar-nav .nav-link.active:hover {
             background-color: transparent;
             color: var(--foreground);
          }

          .navbar-brand img {
              /* No specific border-radius needed if the image itself is designed with it */
          }

        /* Profile icon container and dropdown positioning */
        .profile-icon-container {
          position: relative;
          margin-left: 1.5rem;
        }
        .profile-icon-container button.nav-link {
          cursor: pointer;
          transition: color 0.2s ease-in-out, background-color 0.2s ease;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius);
          color: var(--foreground);
          background-color: transparent;
        }
        .profile-icon-container button.nav-link:hover {
          background-color: hsl(60, 30%, 80%);
          color: var(--foreground);
        }
          .profile-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background-color: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            box-shadow: 0 4px 8px rgba(0,0,0,.1);
            min-width: 160px;
            z-index: 1001;
            padding: 0;
            text-align: left;
            transform: translateY(5px);
          }
          .profile-dropdown .dropdown-item {
            display: block;
            padding: 0.5rem 1rem;
            color: var(--foreground);
            text-decoration: none;
            cursor: pointer;
            white-space: nowrap;
          }
          .profile-dropdown .dropdown-item:hover {
            background-color: var(--secondary);
          }
          .profile-dropdown .dropdown-title {
            padding: 0.5rem 1rem;
            font-weight: 600;
            color: var(--foreground); 
            border-bottom: 1px solid var(--border);
            margin-bottom: 0.25rem;
          }

          /* Ensure consistent vertical alignment for nav items */
          .navbar-nav .nav-item {
            display: flex;
            align-items: center;
          }

          /* Media Queries for Mobile */
          @media (max-width: 767.98px) {
            .navbar-nav .nav-link {
              font-size: 1rem; /* Slightly smaller font for mobile */
              padding: 0.4rem 0.6rem;
            }

            /* Ensure navbar-collapse takes full width and items are stacked */
            .navbar-collapse {
              width: 100%;
            }

            /* Make the nav items stack vertically within the collapsed navbar */
            .navbar-nav {
              flex-direction: column !important; /* Override Bootstrap's default flex-direction */
              margin-top: 0.5rem; /* Add some space below the toggle button */
            }

            .navbar-nav .nav-item {
              width: 100%; /* Make each item take the full width */
              text-align: center; /* Center the text within each item */
            }

            .navbar-nav .nav-link {
              display: block; /* Make the link fill the entire item */
              padding: 0.75rem 1rem; /* Add more padding for touch targets */
              border-bottom: 1px solid var(--border); /* Optional: Add dividers between links */
            }

            .navbar-nav .nav-link:last-child {
              border-bottom: none; /* Remove the bottom border from the last item */
            }

            /* Adjust profile dropdown for mobile */
            .profile-icon-container {
              margin-left: 0; /* Reset margin */
              width: 100%; /* Full width */
              text-align: center; /* Center align */
              margin-top: 0.5rem; /* Add some spacing */
            }
            .profile-dropdown {
              position: static; /* Flow with the content */
              width: 100%; /* Full width */
              border-top: 1px solid var(--border); /* Add a top border to separate */
              box-shadow: none; /* Remove shadow */
              transform: translateY(0); /* Reset transform */
            }
            .profile-dropdown .dropdown-title {
              border-bottom: none; /* Remove extra bottom border */
            }
          }
            /* Original navbar state (not scrolled) */
.navbar-fixed-top {
  background-color: hsla(60, 56%, 93%, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}

/* Scrolled state */
.navbar-fixed-top.scrolled {
  background-color: hsla(60, 56%, 93%, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 2px 4px rgba(0,0,0,.08);
}

/* State for specific pages that don't need blur */
.navbar-fixed-top.no-blur {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

/* Active navigation link */
.navbar-nav .nav-link.active {
  font-weight: 600; /* Or any other style */
  color: var(--primary); /* Example color */
}
        `}
      </style>
    </div>
  );
}

export default App;