import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
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
            <Route path="/services" element={<ServicePage />} />
            <Route path="/projects/live" element={<LiveProjectsPage />} />
            <Route
              path="/projects/completed"
              element={<CompletedProjectsPage />}
            />
            <Route path="/alumni/register" element={<AlumniRegister/>} />
            <Route path="/alumni/view" element={<ViewAlumni/>}/>

            {isAdmin && (
              <>
                <Route path="/banner" element={<BannerPage />} />
                <Route path="/service" element={<ManageServicesPage />} />
              </>
            )}

            {/* Optional fallback for any unknown paths */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;