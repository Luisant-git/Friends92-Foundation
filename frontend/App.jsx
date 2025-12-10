import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import AdminLoginPage from './pages/AdminLoginPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import SkillDevelopmentPage from './pages/SkillDevelopmentPage';
import PersonalityDevelopmentPage from './pages/PersonalityDevelopmentPage';
import LiveProjectsPage from './pages/LiveProjectsPage';
import CompletedProjectsPage from './pages/CompletedProjectsPage';
import BannerPage from './pages/BannerPage';
import ManageServicesPage from './pages/ManageServicesPage';
import AlumniRegister from './pages/AluminiRegister';
import ViewAlumni from './pages/AlumniList';
import AdminGallery from './pages/AdminGallery';
import GalleryPage from './pages/GalleryPage';
import AdminPlacementPage from './pages/AdminPlacementPage';
import PlacementPage from './pages/PlacementPage';
import ProgramsPage from './pages/ProgramsPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import AdminEventsPage from './pages/AdminEventsPage';
import AdminTeam from './pages/AdminTeam';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Public Routes with Header/Footer */}
        <Route path="/" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><HomePage /></main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><AboutPage /></main>
            <Footer />
          </div>
        } />
        <Route path="/programs" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><ProgramsPage /></main>
            <Footer />
          </div>
        } />
        <Route path="/success-stories" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><SuccessStoriesPage /></main>
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><ContactPage /></main>
            <Footer />
          </div>
        } />
        <Route path="/services" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><ServicePage /></main>
            <Footer />
          </div>
        } />
        <Route path="/services/skill-development" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><SkillDevelopmentPage /></main>
            <Footer />
          </div>
        } />
        <Route path="/services/personality-development" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><PersonalityDevelopmentPage /></main>
            <Footer />
          </div>
        } />
        <Route path="/projects/live" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><LiveProjectsPage /></main>
            <Footer />
          </div>
        } />
        <Route path="/projects/completed" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><CompletedProjectsPage /></main>
            <Footer />
          </div>
        } />
        <Route path="/alumni/register" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><AlumniRegister /></main>
            <Footer />
          </div>
        } />
        <Route path="/alumni/view" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><ViewAlumni /></main>
            <Footer />
          </div>
        } />
        <Route path="/gallery" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><GalleryPage /></main>
            <Footer />
          </div>
        } />
        <Route path="/placement" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><PlacementPage /></main>
            <Footer />
          </div>
        } />
        <Route path="/events" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><EventsPage /></main>
            <Footer />
          </div>
        } />
        <Route path="/events/:id" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><EventDetailPage /></main>
            <Footer />
          </div>
        } />

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Routes with Admin Layout */}
        <Route path="/admin" element={isAdmin ? <AdminLayout /> : <Navigate to="/admin/login" />}>
          <Route path="banner" element={<BannerPage />} />
          <Route path="services" element={<ManageServicesPage />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="placement" element={<AdminPlacementPage />} />
          <Route path="events" element={<AdminEventsPage />} />
          <Route path="team" element={<AdminTeam />} />
        </Route>

        <Route path="*" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow"><HomePage /></main>
            <Footer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;