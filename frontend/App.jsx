import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
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
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/projects/live" element={<LiveProjectsPage />} />
            <Route
              path="/projects/completed"
              element={<CompletedProjectsPage />}
            />
            <Route path="/alumni/register" element={<AlumniRegister />} />
            <Route path="/alumni/view" element={<ViewAlumni />} />
            {/* Gallery */}
            <Route path="/gallery" element={<GalleryPage/>}/>
           <Route path="/placement" element={<PlacementPage/>}/>

            {isAdmin && (
              <>
                <Route path="/admin/banner" element={<BannerPage />} />
                <Route path="/admin/services" element={<ManageServicesPage />} />
                <Route path="/admin/gallery" element={<AdminGallery/>}/>
                <Route path="/admin/placement" element={<AdminPlacementPage/>}/>
              </>
            )}

            {/* Optional fallback for any unknown paths */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </HashRouter>
  );
};

export default App;